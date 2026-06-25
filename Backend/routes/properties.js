const express = require("express");
const pool = require("../db/db");
const auth = require("../middleware/authmiddleware");

const router = express.Router();

////////// Get All Properties ///////////

router.get("/", async (req, res) => {
try {

const result = await pool.query(
  "SELECT * FROM properties ORDER BY id DESC"
);

res.json(result.rows);

} catch (error) {

console.log(error);

res.status(500).json({
  message: "Server Error"
});

}
});


router.get("/my", auth, async (req,res)=>{

const result = await pool.query(

`
SELECT *
FROM properties
WHERE owner_id=$1
ORDER BY id DESC
`,
[req.user.id]

);

res.json(result.rows);

});





////////// Get Property By ID ///////////

router.get("/:id", async (req, res) => {
try {

const result = await pool.query(
  `
  SELECT
    p.*,
    u.name as seller_name,
    u.email as seller_email,
    u.phone as seller_phone,
    u.whatsapp as seller_whatsapp
  FROM properties p
  JOIN users u
    ON p.owner_id = u.id
  WHERE p.id = $1
  `,
  [req.params.id]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    message: "Property not found"
  });
}

res.json(result.rows[0]);

} catch (error) {

console.log(error);

res.status(500).json({
  message: "Server Error"
});

}
});

////////// Create Property ///////////

router.post("/", auth, async (req, res) => {

try {

const {
  title,
  description,
  price,
  listing_type,
  property_type,
  location,
  bedrooms,
  bathrooms,
  image_urls
} = req.body;

const result = await pool.query(
  `
  INSERT INTO properties(
    title,
    description,
    price,
    listing_type,
    property_type,
    location,
    bedrooms,
    bathrooms,
    image_urls,
    owner_id
  )
  VALUES(
    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
  )
  RETURNING *
  `,
  [
    title,
    description,
    price,
    listing_type,
    property_type,
    location,
    bedrooms,
    bathrooms,
    image_urls,
    req.user.id
  ]
);

res.status(201).json(
  result.rows[0]
);

} catch (error) {

console.log(error);

res.status(500).json({
  message: "Server Error"
});

}

});

////////// Update Property ///////////

router.put("/:id", auth, async (req, res) => {

try {

const property = await pool.query(
  "SELECT * FROM properties WHERE id=$1",
  [req.params.id]
);

if (property.rows.length === 0) {
  return res.status(404).json({
    message: "Property not found"
  });
}

if (
  property.rows[0].owner_id !== req.user.id
) {
  return res.status(403).json({
    message: "Not authorized"
  });
}

const {
  title,
  description,
  price,
  listing_type,
  property_type,
  location,
  bedrooms,
  bathrooms,
  image_urls
} = req.body;

const result = await pool.query(
  `
  UPDATE properties
  SET
  title=$1,
  description=$2,
  price=$3,
  listing_type=$4,
  property_type=$5,
  location=$6,
  bedrooms=$7,
  bathrooms=$8,
  image_urls=$9
  WHERE id=$10
  RETURNING *
  `,
  [
    title,
    description,
    price,
    listing_type,
    property_type,
    location,
    bedrooms,
    bathrooms,
    image_urls,
    req.params.id
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

////////// Delete Property ///////////

router.delete("/:id", auth, async (req, res) => {

try {

const property = await pool.query(
  "SELECT * FROM properties WHERE id=$1",
  [req.params.id]
);

if (property.rows.length === 0) {
  return res.status(404).json({
    message: "Property not found"
  });
}

if (
  property.rows[0].owner_id !== req.user.id
) {
  return res.status(403).json({
    message: "Not authorized"
  });
}

await pool.query(
  "DELETE FROM properties WHERE id=$1",
  [req.params.id]
);

res.json({
  message: "Property deleted"
});

} catch (error) {

console.log(error);

res.status(500).json({
  message: "Server Error"
});

}

});

////////// Increase Property View ///////////

// router.post("/:id/view", auth, async (req, res) => {
//   try {
//     // Find property owner
//     const property = await pool.query(
//       "SELECT owner_id FROM properties WHERE id = $1",
//       [req.params.id]
//     );

//     if (property.rows.length === 0) {
//       return res.status(404).json({
//         message: "Property not found",
//       });
//     }

//     // Seller opening own property -> don't increase
//     if (property.rows[0].owner_id === req.user.id) {
//       return res.json({
//         message: "Owner view ignored",
//       });
//     }

//     // Increase view
//     await pool.query(
//       "UPDATE properties SET views = views + 1 WHERE id = $1",
//       [req.params.id]
//     );

//     res.json({
//       message: "View Updated",
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// });



module.exports = router;