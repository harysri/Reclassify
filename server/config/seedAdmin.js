const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// Seeds a single hardcoded admin on first run.
// Admin has no separate registration — only this seeder creates admin accounts.
module.exports = async function seedAdmin() {
  try {
    const existing = await User.findOne({ role: "admin" });
    if (existing) return; // already seeded

    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "Admin@123",
      12,
    );
    await User.create({
      fullName: "System Admin",
      email: process.env.ADMIN_EMAIL || "admin@reclassify.com",
      passwordHash,
      role: "admin",
      phoneNumber: "0000000000",
      address: "System",
      location: "System",
    });
    console.log(
      "Admin seeded:",
      process.env.ADMIN_EMAIL || "admin@reclassify.com",
    );
  } catch (err) {
    console.error("Admin seed error:", err.message);
  }
};
