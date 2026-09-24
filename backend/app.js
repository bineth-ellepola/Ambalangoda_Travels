const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const discriptionRoutes = require("./routes/discriptionRoutes");
const tourRoutes = require("./routes/tourRoutes");
const photoRoutes = require("./routes/photoRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const authRoutes = require("./routes/authRoutes");

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/discription", discriptionRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Upload and other unexpected errors (e.g. wrong file type, file too large)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(err.http_code || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

connectDB().catch((err) => console.error("MongoDB connection error:", err.message));

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${PORT}:`, err.message);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});
