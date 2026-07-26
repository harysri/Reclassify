// import React, { useState, useEffect } from "react";

// const Login = () => {
//   const [userType, setUserType] = useState("user");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   // Auto-focus email field on mount
//   useEffect(() => {
//     const emailInput = document.getElementById("email");
//     if (emailInput) {
//       emailInput.focus();
//     }
//   }, []);

//   // Validation patterns
//   const patterns = {
//     email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//   };

//   // Validate single field
//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "email":
//         if (!value.trim()) {
//           error = "Email is required";
//         } else if (!patterns.email.test(value)) {
//           error = "Please enter a valid email address";
//         }
//         break;

//       case "password":
//         if (!value) {
//           error = "Password is required";
//         } else if (value.length < 6) {
//           error = "Password must be at least 6 characters";
//         }
//         break;

//       default:
//         break;
//     }

//     return error;
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === "checkbox" ? checked : value;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: val,
//     }));

//     // Clear login error when user types
//     if (loginError) {
//       setLoginError("");
//     }

//     // Real-time validation if field was touched
//     if (touched[name]) {
//       const error = validateField(name, val);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   // Handle blur
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));
//     const error = validateField(name, value);
//     setErrors((prev) => ({
//       ...prev,
//       [name]: error,
//     }));
//   };

//   // Validate all fields
//   const validateForm = () => {
//     const newErrors = {};
//     const fields = ["email", "password"];

//     fields.forEach((field) => {
//       const error = validateField(field, formData[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });

//     setErrors(newErrors);
//     setTouched(
//       fields.reduce((acc, field) => {
//         acc[field] = true;
//         return acc;
//       }, {}),
//     );

//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setLoginError("");

//     // Simulate API call
//     setTimeout(() => {
//       // Simulate authentication logic
//       console.log("Login attempt:", {
//         userType,
//         email: formData.email,
//         rememberMe: formData.rememberMe,
//       });

//       // Simulate successful login (in real app, check credentials)
//       setLoginSuccess(true);
//       setIsSubmitting(false);

//       // Redirect after success
//       setTimeout(() => {
//         const redirectPath =
//           userType === "admin"
//             ? "/admin/dashboard"
//             : userType === "driver"
//               ? "/driver/dashboard"
//               : "/user/dashboard";
//         console.log("Redirecting to:", redirectPath);
//         // window.location.href = redirectPath;
//       }, 1500);
//     }, 1500);
//   };

//   // Handle forgot password
//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     if (!formData.email || errors.email) {
//       setTouched((prev) => ({ ...prev, email: true }));
//       if (!formData.email) {
//         setErrors((prev) => ({
//           ...prev,
//           email: "Enter your email to reset password",
//         }));
//       }
//       return;
//     }
//     // Simulate password reset
//     alert(`Password reset link sent to ${formData.email}`);
//   };

//   // Get role color and label
//   const getRoleConfig = () => {
//     switch (userType) {
//       case "user":
//         return {
//           color: "emerald",
//           label: "Eco User",
//           bgColor: "bg-emerald-600",
//           borderColor: "border-emerald-950",
//         };
//       case "driver":
//         return {
//           color: "blue",
//           label: "Driver",
//           bgColor: "bg-blue-600",
//           borderColor: "border-blue-950",
//         };
//       case "admin":
//         return {
//           color: "purple",
//           label: "Admin",
//           bgColor: "bg-purple-600",
//           borderColor: "border-purple-950",
//         };
//       default:
//         return {
//           color: "emerald",
//           label: "Eco User",
//           bgColor: "bg-emerald-600",
//           borderColor: "border-emerald-950",
//         };
//     }
//   };

//   const roleConfig = getRoleConfig();

//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//       <div className="max-w-md w-full">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
//               <span className="text-2xl">♻️</span>
//             </div>
//             <span className="text-3xl font-extrabold tracking-tighter text-emerald-950">
//               RE-<span className="text-emerald-600">CLASSIFY</span>
//             </span>
//           </div>
//           <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-emerald-800 font-medium">
//             Sign in to continue your sustainability journey
//           </p>
//         </div>

//         {/* User Type Toggle */}
//         <div className="bg-white border-4 border-emerald-950 p-2 mb-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//           <div className="grid grid-cols-3 gap-2">
//             <button
//               type="button"
//               onClick={() => setUserType("user")}
//               className={`py-3 px-4 font-extrabold text-xs uppercase tracking-wider transition-all ${
//                 userType === "user"
//                   ? "bg-emerald-600 text-white shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                   : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
//               }`}
//             >
//               👤 User
//             </button>
//             <button
//               type="button"
//               onClick={() => setUserType("driver")}
//               className={`py-3 px-4 font-extrabold text-xs uppercase tracking-wider transition-all ${
//                 userType === "driver"
//                   ? "bg-blue-600 text-white shadow-[4px_4px_0px_rgba(23,37,84,1)]"
//                   : "bg-blue-50 text-blue-800 hover:bg-blue-100"
//               }`}
//             >
//               🚛 Driver
//             </button>
//             <button
//               type="button"
//               onClick={() => setUserType("admin")}
//               className={`py-3 px-4 font-extrabold text-xs uppercase tracking-wider transition-all ${
//                 userType === "admin"
//                   ? "bg-purple-600 text-white shadow-[4px_4px_0px_rgba(88,28,135,1)]"
//                   : "bg-purple-50 text-purple-800 hover:bg-purple-100"
//               }`}
//             >
//               ⚙️ Admin
//             </button>
//           </div>
//         </div>

//         {/* Success Message */}
//         {loginSuccess && (
//           <div className="mb-6 bg-emerald-100 border-4 border-emerald-600 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-center">
//             <div className="text-5xl mb-2">🎉</div>
//             <h3 className="text-2xl font-extrabold text-emerald-950 mb-2">
//               Login Successful!
//             </h3>
//             <p className="text-emerald-800 font-medium">
//               Redirecting to your dashboard...
//             </p>
//           </div>
//         )}

//         {/* Login Error */}
//         {loginError && (
//           <div className="mb-6 bg-red-100 border-4 border-red-500 p-4 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
//             <p className="text-red-800 font-bold flex items-center gap-2">
//               <span>⚠️</span> {loginError}
//             </p>
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)] space-y-6"
//           noValidate
//         >
//           {/* Role Indicator */}
//           <div
//             className={`text-center py-3 border-4 mb-6 bg-${roleConfig.color}-50 border-${roleConfig.color}-200`}
//           >
//             <span
//               className={`font-bold uppercase tracking-wider text-${roleConfig.color}-800`}
//             >
//               Signing in as {roleConfig.label}
//             </span>
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2"
//             >
//               Email Address *
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="john@example.com"
//               autoComplete="username"
//               className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                 errors.email && touched.email
//                   ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                   : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//               }`}
//             />
//             {errors.email && touched.email && (
//               <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                 <span>⚠️</span> {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2"
//             >
//               Password *
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="••••••••"
//                 autoComplete="current-password"
//                 className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all pr-12 ${
//                   errors.password && touched.password
//                     ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                     : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-emerald-600 hover:text-emerald-800 transition-colors"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? (
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             {errors.password && touched.password && (
//               <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                 <span>⚠️</span> {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2 cursor-pointer group">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="sr-only peer"
//                 />
//                 <div className="w-5 h-5 border-4 border-emerald-300 bg-white peer-checked:bg-emerald-600 peer-checked:border-emerald-950 transition-all"></div>
//                 <svg
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-950 transition-colors">
//                 Remember me
//               </span>
//             </label>

//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               className="text-sm font-bold text-emerald-600 hover:text-emerald-800 underline hover:no-underline transition-colors"
//             >
//               Forgot password?
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting || loginSuccess}
//             className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 shadow-[6px_6px_0px_rgba(6,78,59,1)] transition-all ${
//               isSubmitting || loginSuccess
//                 ? "bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed"
//                 : `${roleConfig.bgColor} ${roleConfig.borderColor} text-white hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1`
//             }`}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     fill="none"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   />
//                 </svg>
//                 Signing In...
//               </span>
//             ) : (
//               `Sign In as ${roleConfig.label}`
//             )}
//           </button>

//           {/* Sign Up Link */}
//           <div className="text-center pt-4 border-t-4 border-emerald-100">
//             <p className="text-emerald-800 font-medium">
//               Don't have an account?{" "}
//               <a
//                 href="/signup"
//                 className={`font-extrabold underline hover:no-underline text-${roleConfig.color}-600`}
//               >
//                 Create one now
//               </a>
//             </p>
//           </div>
//         </form>

//         {/* Security Note */}
//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-2 text-xs text-emerald-600 font-bold uppercase tracking-wider">
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//               />
//             </svg>
//             <span>Secure 256-bit SSL Encryption</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

//updated login page with api integration
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = "http://localhost:5000/api";

// const Login = () => {
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState("user");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   // Auto-focus email field on mount
//   useEffect(() => {
//     const emailInput = document.getElementById("email");
//     if (emailInput) {
//       emailInput.focus();
//     }
//   }, []);

//   // Validation patterns
//   const patterns = {
//     email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//   };

//   // Validate single field
//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "email":
//         if (!value.trim()) {
//           error = "Email is required";
//         } else if (!patterns.email.test(value)) {
//           error = "Please enter a valid email address";
//         }
//         break;

//       case "password":
//         if (!value) {
//           error = "Password is required";
//         } else if (value.length < 6) {
//           error = "Password must be at least 6 characters";
//         }
//         break;

//       default:
//         break;
//     }

//     return error;
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === "checkbox" ? checked : value;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: val,
//     }));

//     // Clear login error when user types
//     if (loginError) {
//       setLoginError("");
//     }

//     // Real-time validation if field was touched
//     if (touched[name]) {
//       const error = validateField(name, val);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   // Handle blur
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));
//     const error = validateField(name, value);
//     setErrors((prev) => ({
//       ...prev,
//       [name]: error,
//     }));
//   };

//   // Validate all fields
//   const validateForm = () => {
//     const newErrors = {};
//     const fields = ["email", "password"];

//     fields.forEach((field) => {
//       const error = validateField(field, formData[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });

//     setErrors(newErrors);
//     setTouched(
//       fields.reduce((acc, field) => {
//         acc[field] = true;
//         return acc;
//       }, {}),
//     );

//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setLoginError("");

//     try {
//       const res = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userType,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Store token and user data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Handle remember me
//       if (formData.rememberMe) {
//         localStorage.setItem("rememberMe", "true");
//       } else {
//         localStorage.removeItem("rememberMe");
//       }

//       setLoginSuccess(true);

//       // Redirect after success
//       setTimeout(() => {
//         const redirectPath =
//           data.user.role === "admin"
//             ? "/admin/dashboard"
//             : data.user.role === "driver"
//               ? "/driver/dashboard"
//               : "/user/dashboard";
//         navigate(redirectPath);
//       }, 1500);
//     } catch (err) {
//       setLoginError(err.message || "Invalid email or password");
//       setIsSubmitting(false);
//     }
//   };

//   // Handle forgot password
//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     if (!formData.email || errors.email) {
//       setTouched((prev) => ({ ...prev, email: true }));
//       if (!formData.email) {
//         setErrors((prev) => ({
//           ...prev,
//           email: "Enter your email to reset password",
//         }));
//       }
//       return;
//     }
//     // Simulate password reset
//     alert(`Password reset link sent to ${formData.email}`);
//   };

//   // Get role color and label
//   const getRoleConfig = () => {
//     switch (userType) {
//       case "user":
//         return {
//           color: "emerald",
//           label: "Eco User",
//           bgColor: "bg-emerald-600",
//           borderColor: "border-emerald-950",
//         };
//       case "driver":
//         return {
//           color: "blue",
//           label: "Driver",
//           bgColor: "bg-blue-600",
//           borderColor: "border-blue-950",
//         };
//       case "admin":
//         return {
//           color: "purple",
//           label: "Admin",
//           bgColor: "bg-purple-600",
//           borderColor: "border-purple-950",
//         };
//       default:
//         return {
//           color: "emerald",
//           label: "Eco User",
//           bgColor: "bg-emerald-600",
//           borderColor: "border-emerald-950",
//         };
//     }
//   };

//   const roleConfig = getRoleConfig();

//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//       <div className="max-w-md w-full">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
//               <span className="text-2xl">♻️</span>
//             </div>
//             <span className="text-3xl font-extrabold tracking-tighter text-emerald-950">
//               RE-<span className="text-emerald-600">CLASSIFY</span>
//             </span>
//           </div>
//           <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-emerald-800 font-medium">
//             Sign in to continue your sustainability journey
//           </p>
//         </div>

//         {/* User Type Toggle */}
//         <div className="bg-white border-4 border-emerald-950 p-2 mb-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//           <div className="grid grid-cols-3 gap-2">
//             <button
//               type="button"
//               onClick={() => setUserType("user")}
//               className={`py-3 px-4 font-extrabold text-xs uppercase tracking-wider transition-all ${
//                 userType === "user"
//                   ? "bg-emerald-600 text-white shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                   : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
//               }`}
//             >
//               👤 User
//             </button>
//             <button
//               type="button"
//               onClick={() => setUserType("driver")}
//               className={`py-3 px-4 font-extrabold text-xs uppercase tracking-wider transition-all ${
//                 userType === "driver"
//                   ? "bg-blue-600 text-white shadow-[4px_4px_0px_rgba(23,37,84,1)]"
//                   : "bg-blue-50 text-blue-800 hover:bg-blue-100"
//               }`}
//             >
//               🚛 Driver
//             </button>
//             <button
//               type="button"
//               onClick={() => setUserType("admin")}
//               className={`py-3 px-4 font-extrabold text-xs uppercase tracking-wider transition-all ${
//                 userType === "admin"
//                   ? "bg-purple-600 text-white shadow-[4px_4px_0px_rgba(88,28,135,1)]"
//                   : "bg-purple-50 text-purple-800 hover:bg-purple-100"
//               }`}
//             >
//               ⚙️ Admin
//             </button>
//           </div>
//         </div>

//         {/* Success Message */}
//         {loginSuccess && (
//           <div className="mb-6 bg-emerald-100 border-4 border-emerald-600 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-center">
//             <div className="text-5xl mb-2">🎉</div>
//             <h3 className="text-2xl font-extrabold text-emerald-950 mb-2">
//               Login Successful!
//             </h3>
//             <p className="text-emerald-800 font-medium">
//               Redirecting to your dashboard...
//             </p>
//           </div>
//         )}

//         {/* Login Error */}
//         {loginError && (
//           <div className="mb-6 bg-red-100 border-4 border-red-500 p-4 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
//             <p className="text-red-800 font-bold flex items-center gap-2">
//               <span>⚠️</span> {loginError}
//             </p>
//           </div>
//         )}

//         {/* Form */}
//         {!loginSuccess && (
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)] space-y-6"
//             noValidate
//           >
//             {/* Role Indicator */}
//             <div
//               className={`text-center py-3 border-4 mb-6 bg-${roleConfig.color}-50 border-${roleConfig.color}-200`}
//             >
//               <span
//                 className={`font-bold uppercase tracking-wider text-${roleConfig.color}-800`}
//               >
//                 Signing in as {roleConfig.label}
//               </span>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2"
//               >
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="john@example.com"
//                 autoComplete="username"
//                 className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                   errors.email && touched.email
//                     ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                     : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                 }`}
//               />
//               {errors.email && touched.email && (
//                 <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                   <span>⚠️</span> {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2"
//               >
//                 Password *
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                   className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all pr-12 ${
//                     errors.password && touched.password
//                       ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                       : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-emerald-600 hover:text-emerald-800 transition-colors"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && touched.password && (
//                 <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                   <span>⚠️</span> {errors.password}
//                 </p>
//               )}
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 cursor-pointer group">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     name="rememberMe"
//                     checked={formData.rememberMe}
//                     onChange={handleChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-5 h-5 border-4 border-emerald-300 bg-white peer-checked:bg-emerald-600 peer-checked:border-emerald-950 transition-all"></div>
//                   <svg
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-950 transition-colors">
//                   Remember me
//                 </span>
//               </label>

//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="text-sm font-bold text-emerald-600 hover:text-emerald-800 underline hover:no-underline transition-colors"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 shadow-[6px_6px_0px_rgba(6,78,59,1)] transition-all ${
//                 isSubmitting
//                   ? "bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed"
//                   : `${roleConfig.bgColor} ${roleConfig.borderColor} text-white hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1`
//               }`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                       fill="none"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Signing In...
//                 </span>
//               ) : (
//                 `Sign In as ${roleConfig.label}`
//               )}
//             </button>

//             {/* Sign Up Link */}
//             <div className="text-center pt-4 border-t-4 border-emerald-100">
//               <p className="text-emerald-800 font-medium">
//                 Don't have an account?{" "}
//                 <a
//                   href="/signup"
//                   className={`font-extrabold underline hover:no-underline text-${roleConfig.color}-600`}
//                 >
//                   Create one now
//                 </a>
//               </p>
//             </div>
//           </form>
//         )}

//         {/* Security Note */}
//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-2 text-xs text-emerald-600 font-bold uppercase tracking-wider">
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//               />
//             </svg>
//             <span>Secure 256-bit SSL Encryption</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Authcontext"; // FIX: import useAuth to access login function
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // FIX: use context login, not localStorage directly

  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!patterns.email.test(value))
        return "Please enter a valid email address";
    }
    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (loginError) setLoginError("");
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const fields = ["email", "password"];
    const newErrors = {};
    fields.forEach((f) => {
      const e = validateField(f, formData[f]);
      if (e) newErrors[f] = e;
    });
    setErrors(newErrors);
    setTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setLoginError("");

    try {
      // ── PRODUCTION ──────────────────────────────────────────────────────
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.message ?? "Login failed. Please try again.");
        return;
      }

      // FIX: login() writes to context + localStorage atomically.
      // Navbar reads from context so it updates instantly — no refresh needed.
      login(data.user, data.token);

      // Redirect based on role
      const redirectMap = {
        user: "/user/dashboard",
        driver: "/driver/dashboard",
        admin: "/admin/dashboard",
      };
      navigate(redirectMap[data.user.role] ?? "/", { replace: true });
    } catch {
      setLoginError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ROLE_CONFIG = {
    user: {
      bgColor: "bg-emerald-600",
      borderColor: "border-emerald-950",
      color: "emerald",
      label: "Eco User",
    },
    driver: {
      bgColor: "bg-blue-600",
      borderColor: "border-blue-950",
      color: "blue",
      label: "Driver",
    },
    admin: {
      bgColor: "bg-purple-600",
      borderColor: "border-purple-950",
      color: "purple",
      label: "Admin",
    },
  };
  const rc = ROLE_CONFIG[userType];

  return (
    <div className="min-h-screen bg-[#fcfdfa] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
              <span className="text-2xl">♻️</span>
            </div>
            <span className="text-3xl font-extrabold tracking-tighter text-emerald-950">
              RE-<span className="text-emerald-600">CLASSIFY</span>
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 mb-2">
            Welcome Back
          </h2>
          <p className="text-emerald-800 font-medium">
            Sign in to continue your sustainability journey
          </p>
        </div>

        {/* Role toggle */}
        <div className="bg-white border-4 border-emerald-950 p-2 mb-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                type: "user",
                label: "👤 User",
                active:
                  "bg-emerald-600 text-white shadow-[4px_4px_0px_rgba(6,78,59,1)]",
                inactive: "bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
              },
              {
                type: "driver",
                label: "🚛 Driver",
                active:
                  "bg-blue-600    text-white shadow-[4px_4px_0px_rgba(23,37,84,1)]",
                inactive: "bg-blue-50    text-blue-800    hover:bg-blue-100",
              },
              {
                type: "admin",
                label: "⚙️ Admin",
                active:
                  "bg-purple-600  text-white shadow-[4px_4px_0px_rgba(88,28,135,1)]",
                inactive: "bg-purple-50  text-purple-800  hover:bg-purple-100",
              },
            ].map(({ type, label, active, inactive }) => (
              <button
                key={type}
                type="button"
                onClick={() => setUserType(type)}
                className={`py-3 px-4 font-extrabold text-xs uppercase tracking-wider transition-all ${userType === type ? active : inactive}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Login error */}
        {loginError && (
          <div className="mb-6 bg-red-100 border-4 border-red-500 p-4 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
            <p className="text-red-800 font-bold flex items-center gap-2">
              ⚠️ {loginError}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)] space-y-6"
          noValidate
        >
          {/* Role indicator */}
          <div
            className={`text-center py-3 border-4 mb-6 bg-${rc.color}-50 border-${rc.color}-200`}
          >
            <span
              className={`font-bold uppercase tracking-wider text-${rc.color}-800`}
            >
              Signing in as {rc.label}
            </span>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2"
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              autoComplete="username"
              className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                errors.email && touched.email
                  ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                  : "border-emerald-200 focus:border-emerald-600"
              }`}
            />
            {errors.email && touched.email && (
              <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                ⚠️ {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2"
            >
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full px-4 py-3 pr-12 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                  errors.password && touched.password
                    ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                    : "border-emerald-200 focus:border-emerald-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                ⚠️ {errors.password}
              </p>
            )}
          </div>

          {/* Remember me + forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 border-2 border-emerald-400 accent-emerald-600"
              />
              <span className="text-sm font-bold text-emerald-800">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-bold text-emerald-600 hover:text-emerald-800 underline hover:no-underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 shadow-[6px_6px_0px_rgba(6,78,59,1)] transition-all flex items-center justify-center gap-2
              ${
                isSubmitting
                  ? "bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed"
                  : `${rc.bgColor} ${rc.borderColor} text-white hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1`
              }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />{" "}
                Signing In...
              </>
            ) : (
              `Sign In as ${rc.label}`
            )}
          </button>

          {/* Sign up link */}
          <div className="text-center pt-4 border-t-4 border-emerald-100">
            <p className="text-emerald-800 font-medium">
              Don't have an account?{" "}
              <a
                href="/signup"
                className={`font-extrabold underline hover:no-underline text-${rc.color}-600`}
              >
                Create one now
              </a>
            </p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
            🔒 Secure 256-bit SSL Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
