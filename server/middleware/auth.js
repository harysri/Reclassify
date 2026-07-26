const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Driver = require("../models/Driver");

// Verifies the Bearer token and attaches the decoded payload to req.user.
// Works for all three roles: user, driver, admin.
const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded: { id, role, iat, exp }

    if (decoded.role === "driver") {
      const driver = await Driver.findById(decoded.id).select("-passwordHash");
      if (!driver) return res.status(401).json({ message: "Driver not found" });
      req.user = { ...driver.toObject(), role: "driver" };
    } else {
      const user = await User.findById(decoded.id).select("-passwordHash");
      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = user.toObject();
    }

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Role-based access guards
const requireUser = (req, res, next) => {
  if (req.user?.role !== "user")
    return res.status(403).json({ message: "Users only" });
  next();
};
const requireDriver = (req, res, next) => {
  if (req.user?.role !== "driver")
    return res.status(403).json({ message: "Drivers only" });
  next();
};
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin")
    return res.status(403).json({ message: "Admins only" });
  next();
};

// Verified driver guard — unverified drivers cannot accept bookings
const requireVerifiedDriver = (req, res, next) => {
  if (req.user?.role !== "driver")
    return res.status(403).json({ message: "Drivers only" });
  if (!req.user?.isVerified)
    return res
      .status(403)
      .json({ message: "Account not yet verified by admin" });
  next();
};

module.exports = {
  protect,
  requireUser,
  requireDriver,
  requireAdmin,
  requireVerifiedDriver,
};
