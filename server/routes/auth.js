const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const Driver = require("../models/Driver");

// ── Helper: sign JWT ───────────────────────────────────────────────────────
const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// ── POST /api/auth/register ────────────────────────────────────────────────
// Body: { userType: "user"|"driver", fullName, email, phoneNumber, address,
//         password, confirmPassword, location? (user), place? (driver), licenseNumber? (driver) }
router.post("/register", async (req, res) => {
  try {
    const {
      userType,
      fullName,
      email,
      phoneNumber,
      address,
      password,
      confirmPassword,
      location,
      place,
      licenseNumber,
    } = req.body;

    // Basic checks
    if (!["user", "driver"].includes(userType))
      return res.status(400).json({ message: "Invalid user type" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    const passwordHash = await bcrypt.hash(password, 12);

    if (userType === "user") {
      if (!location?.trim())
        return res
          .status(400)
          .json({ message: "Location is required for users" });

      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists)
        return res.status(409).json({ message: "Email already registered" });

      const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        passwordHash,
        phoneNumber,
        address,
        location,
        role: "user",
      });

      const token = signToken(user._id, "user");
      return res.status(201).json({
        message: "Registration successful",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          location: user.location,
          rewardPoints: user.rewardPoints,
        },
      });
    }

    if (userType === "driver") {
      if (!place?.trim())
        return res
          .status(400)
          .json({ message: "Place is required for drivers" });
      if (!licenseNumber?.trim())
        return res
          .status(400)
          .json({ message: "License number is required for drivers" });

      const exists = await Driver.findOne({ email: email.toLowerCase() });
      if (exists)
        return res.status(409).json({ message: "Email already registered" });

      const driver = await Driver.create({
        fullName,
        email: email.toLowerCase(),
        passwordHash,
        phoneNumber,
        address,
        place,
        licenseNumber: licenseNumber.toUpperCase(),
      });

      const token = signToken(driver._id, "driver");
      return res.status(201).json({
        message:
          "Registration successful. Await admin verification before receiving pickups.",
        token,
        user: {
          id: driver._id,
          fullName: driver.fullName,
          email: driver.email,
          role: "driver",
          place: driver.place,
          isVerified: driver.isVerified,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ── POST /api/auth/login ───────────────────────────────────────────────────
// Body: { userType: "user"|"driver"|"admin", email, password }
router.post("/login", async (req, res) => {
  try {
    const { userType, email, password } = req.body;

    if (!["user", "driver", "admin"].includes(userType))
      return res.status(400).json({ message: "Invalid user type" });

    let account;
    if (userType === "driver") {
      account = await Driver.findOne({ email: email.toLowerCase() });
    } else {
      // user and admin both live in the User collection
      account = await User.findOne({
        email: email.toLowerCase(),
        role: userType,
      });
    }

    if (!account)
      return res.status(401).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, account.passwordHash);
    if (!valid)
      return res.status(401).json({ message: "Invalid email or password" });

    // Block inactive users
    if (account.status === "inactive")
      return res
        .status(403)
        .json({ message: "Account deactivated. Contact admin." });

    const role = userType === "driver" ? "driver" : account.role;
    const token = signToken(account._id, role);

    // Build response payload per role
    let payload;
    if (role === "driver") {
      payload = {
        id: account._id,
        fullName: account.fullName,
        email: account.email,
        role: "driver",
        place: account.place,
        isVerified: account.isVerified,
      };
    } else if (role === "admin") {
      payload = {
        id: account._id,
        fullName: account.fullName,
        email: account.email,
        role: "admin",
      };
    } else {
      payload = {
        id: account._id,
        fullName: account.fullName,
        email: account.email,
        role: "user",
        location: account.location,
        rewardPoints: account.rewardPoints,
      };
    }

    res.json({ message: "Login successful", token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
