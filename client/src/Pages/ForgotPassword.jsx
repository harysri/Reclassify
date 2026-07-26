import React, { useState } from "react";
import {
  Mail,
  ArrowLeft,
  Sparkles,
  Send,
  Key,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Step states: 'email' -> 'otp' -> 'password' -> 'success'
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
  };

  // --- LOGIC STARTS HERE (Unchanged) ---

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep("otp");
        startTimer();
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const otpCode = otp.join("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otpCode }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setStep("password");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otp.join(""),
            newPassword,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setStep("success");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        toast.success(
          "Password reset successful!\nPlease welcome back to login 😊.",
        );
      } else {
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (timer > 0) return;

    setError("");
    setIsLoading(true);
    setOtp(["", "", "", "", "", ""]);

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        startTimer();
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Timer for resend OTP
  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP input change
  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // Handle OTP paste
  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    document.getElementById(`otp-${lastIndex}`)?.focus();
  };

  // Handle backspace
  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#fcfdfa] font-sans text-emerald-950 flex flex-col">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,emerald-950/10_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Back Link */}
        <div className="w-full max-w-md mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-emerald-800 hover:text-emerald-950 transition-colors duration-300 group font-bold text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300 text-emerald-600" />
            Back to Login
          </Link>
        </div>

        {/* Main Card Container */}
        <div className="w-full max-w-md relative">
          {/* Card with neo-brutalist shadow */}
          <div className="bg-white border-4 border-emerald-950 rounded-3xl shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
            <div className="relative z-10 min-h-[500px] flex flex-col">
              <AnimatePresence mode="wait">
                {/* STEP 1: Email Input */}
                {step === "email" && (
                  <motion.div
                    key="step1"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1 flex flex-col"
                  >
                    <div className="p-8 pb-6 border-b-4 border-emerald-950 bg-emerald-50">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                          <Mail className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-emerald-950 tracking-tighter">
                        Reset Password
                      </h1>
                      <p className="text-emerald-800 text-center text-sm font-medium">
                        Enter your email to receive a recovery code.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSendOTP}
                      className="p-8 flex-1 flex flex-col justify-center"
                    >
                      <div className="mb-6 space-y-2">
                        <label className="flex items-center text-xs font-bold text-emerald-900 uppercase tracking-wider">
                          <Mail className="w-3 h-3 mr-2" />
                          User Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full bg-[#fcfdfa] border-2 border-emerald-950 rounded-xl px-4 py-4 text-emerald-950 placeholder-emerald-800/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all font-medium"
                        />
                      </div>

                      {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-800 rounded-xl flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-600" />
                          <p className="text-red-800 text-sm font-bold">
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full group relative px-6 py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_rgba(6,78,59,1)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Verification Code
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 2: OTP Verification */}
                {step === "otp" && (
                  <motion.div
                    key="step2"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1 flex flex-col"
                  >
                    <div className="p-8 pb-6 border-b-4 border-emerald-950 bg-emerald-50">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                          <Key className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-emerald-950 tracking-tighter">
                        Authentication
                      </h1>
                      <p className="text-emerald-800 text-center text-sm font-medium">
                        Enter the 6-digit code sent to <br />
                        <span className="text-emerald-950 font-bold bg-emerald-200/50 px-2 py-0.5 rounded border border-emerald-950">
                          {email}
                        </span>
                      </p>
                    </div>

                    <form
                      onSubmit={handleVerifyOTP}
                      className="p-8 flex-1 flex flex-col justify-center"
                    >
                      <div className="mb-8">
                        <label className="block text-xs font-bold text-center text-emerald-900 uppercase tracking-widest mb-4">
                          Input Security Code
                        </label>
                        <div className="flex justify-center gap-2 mb-4">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              maxLength="1"
                              value={digit}
                              onChange={(e) =>
                                handleOTPChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleOTPKeyDown(index, e)}
                              onPaste={index === 0 ? handleOTPPaste : undefined}
                              className="w-10 h-12 md:w-12 md:h-14 text-center text-2xl font-extrabold bg-[#fcfdfa] border-2 border-emerald-950 rounded-lg text-emerald-950 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-300"
                            />
                          ))}
                        </div>
                        <div className="text-center">
                          {timer > 0 ? (
                            <p className="text-emerald-800 text-xs font-bold">
                              Resend available in{" "}
                              <span className="text-emerald-950">{timer}s</span>
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResendOTP}
                              disabled={isLoading}
                              className="text-emerald-700 hover:text-emerald-950 text-xs font-bold underline decoration-2 underline-offset-4 transition-colors"
                            >
                              Resend Code
                            </button>
                          )}
                        </div>
                      </div>

                      {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-800 rounded-xl text-center">
                          <p className="text-red-800 text-sm font-bold">
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || otp.some((d) => !d)}
                        className="w-full group relative px-6 py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_rgba(6,78,59,1)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isLoading ? "Verifying..." : "Verify & Continue"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="w-full mt-4 text-emerald-700 hover:text-emerald-950 text-sm font-bold transition-colors"
                      >
                        Change email address
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: New Password */}
                {step === "password" && (
                  <motion.div
                    key="step3"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1 flex flex-col"
                  >
                    <div className="p-8 pb-6 border-b-4 border-emerald-950 bg-emerald-50">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-emerald-950 tracking-tighter">
                        Secure Access
                      </h1>
                      <p className="text-emerald-800 text-center text-sm font-medium">
                        Create a new strong password.
                      </p>
                    </div>

                    <form
                      onSubmit={handleResetPassword}
                      className="p-8 flex-1 flex flex-col justify-center"
                    >
                      <div className="mb-6 space-y-2">
                        <label className="flex items-center text-xs font-bold text-emerald-900 uppercase tracking-wider">
                          <Lock className="w-3 h-3 mr-2" />
                          New Password
                        </label>
                        <div className="relative group">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Min 8 characters"
                            required
                            className="w-full bg-[#fcfdfa] border-2 border-emerald-950 rounded-xl px-4 py-4 pr-12 text-emerald-950 placeholder-emerald-800/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700 hover:text-emerald-950 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="mb-6 space-y-2">
                        <label className="flex items-center text-xs font-bold text-emerald-900 uppercase tracking-wider">
                          <Lock className="w-3 h-3 mr-2" />
                          Confirm Password
                        </label>
                        <div className="relative group">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repeat password"
                            required
                            className="w-full bg-[#fcfdfa] border-2 border-emerald-950 rounded-xl px-4 py-4 pr-12 text-emerald-950 placeholder-emerald-800/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all font-medium"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700 hover:text-emerald-950 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-800 rounded-xl">
                          <p className="text-red-800 text-sm font-bold">
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full group relative px-6 py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_rgba(6,78,59,1)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isLoading ? (
                            "Updating..."
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Update Password
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 4: Success */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1 flex flex-col justify-center p-8 text-center"
                  >
                    <div className="flex justify-center mb-8">
                      <div className="w-24 h-24 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[8px_8px_0px_rgba(6,78,59,1)] animate-pulse">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-emerald-950 mb-3 tracking-tighter">
                      Access Restored
                    </h2>
                    <p className="text-emerald-800 mb-8 font-medium">
                      Your password has been successfully updated.
                    </p>

                    <div className="bg-emerald-50 rounded-xl p-4 mb-8 border-2 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                      <p className="text-emerald-900 text-sm font-bold flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Redirecting to login...
                      </p>
                    </div>

                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center w-full px-8 py-4 font-extrabold text-lg uppercase tracking-widest bg-white text-emerald-950 border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_rgba(6,78,59,1)] transition-all duration-200"
                    >
                      Return to Login
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-8 text-center relative z-10">
          <p className="text-emerald-800 text-sm font-medium">
            Need help?{" "}
            <a
              href="mailto:support@re-classify.com"
              className="text-emerald-950 hover:underline font-bold underline-offset-4 decoration-2 transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
