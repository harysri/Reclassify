const router = require("express").Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const Driver = require("../models/Driver");
const OTP = require("../models/Otp");
const nodemailer = require("nodemailer");
const { getPasswordResetTemplate } = require("../utils/emailTemplates");
const dotenv = require("dotenv");
dotenv.config();

// ── Helper: generate a 6-digit numeric OTP ────────────────────────────────
const generateOTP = () => String(Math.floor(100000 + Math.random() * 900000));

// ── Helper: send OTP via email ─────────────────────────────────────────────

// For development, logs the OTP to the console so you can test without SMTP.
const sendOTPEmail = async (email, otp) => {
  console.log(`\n📧 OTP for ${email}: ${otp}\n`);

  // ── configure nodemailer ──────────────────────
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // your email address
      pass: process.env.SMTP_PASS, // app password / SMTP password
    },
  });
  // await transporter.sendMail({
  //   from: `"Re-classify" <${process.env.SMTP_USER}>`,
  //   to: email,
  //   subject: "Your Re-classify Password Reset Code",
  //   html: `
  //     <div style="font-family:sans-serif;max-width:480px;margin:auto">
  //       <h2 style="color:#059669">Password Reset</h2>
  //       <p>Your 6-digit verification code is:</p>
  //       <div style="font-size:36px;font-weight:bold;letter-spacing:8px;
  //                   padding:20px;background:#f0fdf4;border:2px solid #059669;
  //                   text-align:center;margin:20px 0">
  //         ${otp}
  //       </div>
  //       <p style="color:#6b7280;font-size:13px">
  //         This code expires in <strong>10 minutes</strong>.
  //         If you did not request a password reset, ignore this email.
  //       </p>
  //     </div>
  //   `,
  // });

  await transporter.sendMail({
    from: `"Re-classify" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Re-classify Password Reset Code",
    html: getPasswordResetTemplate(otp),
  });
};

// ════════════════════════════════════════════════════════════════════════════
// POST /api/auth/send-otp
// Step 1 — Find the account by email (searches User then Driver),
//           generate an OTP, store it, and email it.
//
// Body: { email }
// Response 200: { message }
// Response 404: email not registered
// ════════════════════════════════════════════════════════════════════════════
router.post("/send-otp", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase()?.trim();
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Search User collection first (includes admin), then Driver
    let accountType = null;
    const userAccount = await User.findOne({ email });
    const driverAccount = !userAccount ? await Driver.findOne({ email }) : null;

    if (userAccount) accountType = "user";
    else if (driverAccount) accountType = "driver";
    else {
      // Don't reveal whether the email exists — return a generic message
      return res
        .status(404)
        .json({ message: "No account found with that email address" });
    }

    const otp = generateOTP();
    const hash = await bcrypt.hash(otp, 10); // hash OTP before storing

    // Upsert: replace any existing OTP for this email
    await OTP.findOneAndUpdate(
      { email },
      {
        email,
        code: hash,
        accountType,
        verified: false,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    await sendOTPEmail(email, otp);

    res.json({ message: "Verification code sent to your email" });
  } catch (err) {
    console.error("send-otp error:", err);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

// ════════════════════════════════════════════════════════════════════════════
// POST /api/auth/verify-otp
// Step 2 — Verify the 6-digit code the user entered.
//           Marks the OTP record as verified so the reset step can proceed.
//
// Body: { email, otp }
// Response 200: { message }
// Response 400: invalid or expired OTP
// ════════════════════════════════════════════════════════════════════════════
router.post("/verify-otp", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase()?.trim();
    const otpInput = req.body.otp?.trim();

    if (!email || !otpInput)
      return res.status(400).json({ message: "Email and OTP are required" });

    const record = await OTP.findOne({ email });

    if (!record)
      return res.status(400).json({
        message: "OTP expired or not found. Please request a new code.",
      });

    // Compare submitted OTP against the stored hash
    const valid = await bcrypt.compare(otpInput, record.code);
    if (!valid)
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please check the code and try again." });

    // Mark as verified — step 3 requires this flag
    await OTP.findOneAndUpdate({ email }, { verified: true });

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("verify-otp error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ════════════════════════════════════════════════════════════════════════════
// POST /api/auth/reset-password
// Step 3 — Reset the password. Only succeeds if the OTP was verified in step 2.
//           Uses the accountType stored in the OTP record to update the correct
//           collection (User or Driver) without the frontend needing to send it.
//
// Body: { email, otp, newPassword }
// Response 200: { message }
// Response 400: OTP not verified, expired, or invalid
// ════════════════════════════════════════════════════════════════════════════
router.post("/reset-password", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase()?.trim();
    const otpInput = req.body.otp?.trim();
    const newPassword = req.body.newPassword;

    if (!email || !otpInput || !newPassword)
      return res
        .status(400)
        .json({ message: "Email, OTP, and new password are required" });

    if (newPassword.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    const record = await OTP.findOne({ email });

    if (!record)
      return res.status(400).json({
        message: "OTP expired. Please start the reset process again.",
      });

    // Require step 2 to have been completed
    if (!record.verified)
      return res.status(400).json({
        message: "OTP has not been verified. Please complete step 2 first.",
      });

    // Re-verify the OTP code (prevents someone skipping step 2 by setting verified manually)
    const valid = await bcrypt.compare(otpInput, record.code);
    if (!valid) return res.status(400).json({ message: "Invalid OTP" });

    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update the correct collection based on accountType stored at send time
    if (record.accountType === "driver") {
      const updated = await Driver.findOneAndUpdate(
        { email },
        { passwordHash },
      );
      if (!updated)
        return res.status(404).json({ message: "Driver account not found" });
    } else {
      // "user" covers both regular users and admin
      const updated = await User.findOneAndUpdate({ email }, { passwordHash });
      if (!updated)
        return res.status(404).json({ message: "User account not found" });
    }

    // Delete the used OTP record — cannot be reused
    await OTP.deleteOne({ email });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("reset-password error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
