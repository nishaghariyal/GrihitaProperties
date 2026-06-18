const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db/db");

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      whatsapp
    } = req.body;

    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users(
        name,
        email,
        password_hash,
        role,
        phone,
        whatsapp
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        name,
        email,
        hashedPassword,
        role,
        phone,
        whatsapp
      ]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result.rows[0];

    const validPassword =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;