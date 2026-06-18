const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Only Admin can create sellers
router.post("/create-seller", auth, async (req, res) => {

    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const {
            name,
            email,
            phone,
            whatsapp,
            password
        } = req.body;

        const exists = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (exists.rows.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await pool.query(
            `
            INSERT INTO users(
                name,
                email,
                phone,
                whatsapp,
                password_hash,
                role
            )
            VALUES($1,$2,$3,$4,$5,'seller')
            `,
            [
                name,
                email,
                phone,
                whatsapp,
                hashedPassword
            ]
        );

        res.json({
            message: "Seller Created Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;