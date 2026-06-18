const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const auth = require("../middleware/authMiddleware");

router.post("/:propertyId", auth, async (req, res) => {
  try {
      const exists = await pool.query(
    `
    SELECT *
    FROM wishlist
    WHERE user_id = $1
    AND property_id = $2
    `,
    [req.user.id, req.params.propertyId]
  );

  if (exists.rows.length > 0) {

    await pool.query(
      `
      DELETE FROM wishlist
      WHERE user_id = $1
      AND property_id = $2
      `,
      [req.user.id, req.params.propertyId]
    );

    return res.json({
      message: "Removed from wishlist"
    });

  }

  await pool.query(
    `
    INSERT INTO wishlist(user_id, property_id)
    VALUES($1, $2)
    `,
    [req.user.id, req.params.propertyId]
  );

  res.json({
    message: "Added to wishlist"
  });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.get("/", auth, async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT p.*
      FROM wishlist w
      JOIN properties p
      ON p.id = w.property_id
      WHERE w.user_id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;