require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./db/db");

/* Middleware */
app.use(cors());
app.use(express.json());

/* Auth Middleware */
const auth = require("./middleware/authMiddleware");

/* Routes */
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const wishlistRoutes = require("./routes/wishlistRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const uploadRoutes = require("./routes/upload");

const propertyViewRoutes = require("./routes/propertyViewRoutes");
const adminRoutes = require("./routes/admin");

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/property-views",propertyViewRoutes);
app.use("/api/admin", adminRoutes);


/* Home Route */
app.get("/", (req, res) => {
  res.json({
    message: "Grihita Properties API Running",
  });
});

/* Profile Route */
app.get("/api/profile", auth, (req, res) => {
  res.json({
    user: req.user,
  });
});

/* Health Check */
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running",
  });
});

/* Database Test */
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

/* 404 Route (Always Last) */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});