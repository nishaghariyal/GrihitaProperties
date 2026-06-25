const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const auth = require("../middleware/authmiddleware");

// Buyer viewed a property
router.post("/", auth, async (req, res) => {
  try {
    const { property_id } = req.body;
    const buyer_id = req.user.id;

    // Find seller
    const property = await pool.query(
      `
      SELECT owner_id
      FROM properties
      WHERE id=$1
      `,
      [property_id]
    );

    if (property.rows.length === 0) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const seller_id = property.rows[0].owner_id;

    // Seller shouldn't count as a buyer
    if (seller_id === buyer_id) {
      return res.json({
        message: "Owner view ignored",
      });
    }

    // Check existing record
    const exists = await pool.query(
      `
      SELECT *
      FROM property_views
      WHERE property_id=$1
      AND buyer_id=$2
      `,
      [property_id, buyer_id]
    );

    if (exists.rows.length > 0) {

      await pool.query(
        `
        UPDATE property_views
        SET
          view_count=view_count+1,
          last_viewed=NOW()
        WHERE property_id=$1
        AND buyer_id=$2
        `,
        [property_id, buyer_id]
      );

      return res.json({
        message: "View Updated",
      });
    }

    // First time view
    await pool.query(
      `
      INSERT INTO property_views(
        property_id,
        buyer_id,
        seller_id
      )
      VALUES($1,$2,$3)
      `,
      [property_id, buyer_id, seller_id]
    );

    res.json({
      message: "View Added",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/count", auth, async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT COALESCE(SUM(view_count), 0) AS count
      FROM property_views
      WHERE seller_id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/seller", auth, async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.phone,
        p.title,
        pv.view_count,
        pv.last_viewed
      FROM property_views pv
      JOIN users u
        ON pv.buyer_id = u.id
      JOIN properties p
        ON pv.property_id = p.id
      WHERE pv.seller_id = $1
      ORDER BY pv.last_viewed DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;