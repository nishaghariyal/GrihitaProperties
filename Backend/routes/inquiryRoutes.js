const express = require("express");
const pool = require("../db/db");
const auth = require("../middleware/authmiddleware");

const verifyToken = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {

    const {
      property_id,
      seller_id
    } = req.body;

    const buyer_id = req.user.id;

    // Seller cannot contact own property
    if (buyer_id === seller_id) {
      return res.status(400).json({
        message: "You cannot contact yourself."
      });
    }

    // Prevent duplicate inquiry
    const existing = await pool.query(
      `
      SELECT *
      FROM inquiries
      WHERE property_id=$1
      AND buyer_id=$2
      `,
      [
        property_id,
        buyer_id
      ]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        message: "You have already sent an inquiry."
      });
    }

    const result = await pool.query(
      `
      INSERT INTO inquiries(
        property_id,
        buyer_id,
        seller_id
      )
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [
        property_id,
        buyer_id,
        seller_id
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

router.get("/count", auth, async (req,res)=>{

  const result = await pool.query(
    `
    SELECT COUNT(*)
    FROM inquiries
    WHERE seller_id=$1
    `,
    [req.user.id]
  );

  res.json(result.rows[0]);

});

router.get("/seller", auth, async (req, res) => {
  try {
    const sellerId = req.user.id;

    const result = await pool.query(
      `SELECT
        inquiries.id,
        inquiries.created_at,
        properties.title,
        properties.location,
        users.name AS buyer_name,
        users.email AS buyer_email,
        users.phone
      FROM inquiries
      JOIN properties
        ON inquiries.property_id = properties.id
      JOIN users
        ON inquiries.buyer_id = users.id
      WHERE inquiries.seller_id = $1
      ORDER BY inquiries.created_at DESC`,
      [sellerId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/",auth,async(req,res)=>{

const result=await pool.query(

`
SELECT

i.id,
i.created_at,

u.name,
u.email,
u.phone,

p.title,
p.location

FROM inquiries i

JOIN users u
ON i.buyer_id=u.id

JOIN properties p
ON i.property_id=p.id

WHERE p.owner_id=$1

ORDER BY i.created_at DESC

`,
[req.user.id]

);

res.json(result.rows);

});

module.exports = router;