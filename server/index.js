const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded product images as static files
// Access via: GET /uploads/products/filename.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const wasteRoutes = require("./routes/waste_classify");

// ── Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/Passwordreset"));
app.use("/api/user", require("./routes/user"));
app.use("/api/driver", require("./routes/driver"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/shop", require("./routes/shop"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/rewards", require("./routes/rewards"));
app.use("/api/waste", wasteRoutes);

// ── Health check ──────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ── Global error handler ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

// ── MongoDB + server start ─────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    // Seed hardcoded admin on first run
    require("./config/seedAdmin")();

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
