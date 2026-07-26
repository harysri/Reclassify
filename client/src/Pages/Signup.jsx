// import React, { useState } from "react";

// const Signup = () => {
//   const [userType, setUserType] = useState("user");
//   const [formData, setFormData] = useState({
//     // Common fields
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//     // User specific
//     location: "",
//     // Driver specific
//     place: "",
//     licenseNumber: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Validation patterns
//   const patterns = {
//     email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//     phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
//     password:
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//     licenseNumber: /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/,
//   };

//   // Validate single field
//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "fullName":
//         if (!value.trim()) {
//           error = "Full name is required";
//         } else if (value.trim().length < 3) {
//           error = "Full name must be at least 3 characters";
//         } else if (!/^[a-zA-Z\s]+$/.test(value)) {
//           error = "Full name can only contain letters and spaces";
//         }
//         break;

//       case "email":
//         if (!value.trim()) {
//           error = "Email is required";
//         } else if (!patterns.email.test(value)) {
//           error = "Please enter a valid email address";
//         }
//         break;

//       case "phoneNumber":
//         if (!value.trim()) {
//           error = "Phone number is required";
//         } else if (!patterns.phone.test(value)) {
//           error = "Please enter a valid phone number (10-12 digits)";
//         }
//         break;

//       case "address":
//         if (!value.trim()) {
//           error = "Address is required";
//         } else if (value.trim().length < 10) {
//           error = "Address must be at least 10 characters";
//         }
//         break;

//       case "location":
//         if (userType === "user" && !value.trim()) {
//           error = "Location is required";
//         }
//         break;

//       case "place":
//         if (userType === "driver" && !value.trim()) {
//           error = "Place/Zone is required";
//         }
//         break;

//       case "licenseNumber":
//         if (userType === "driver") {
//           if (!value.trim()) {
//             error = "License number is required";
//           } else if (!patterns.licenseNumber.test(value)) {
//             error =
//               "Invalid format. Use: XX00 00000000000 (e.g., DL04 20140000555)";
//           }
//         }
//         break;

//       case "password":
//         if (!value) {
//           error = "Password is required";
//         } else if (value.length < 8) {
//           error = "Password must be at least 8 characters";
//         } else if (!patterns.password.test(value)) {
//           error =
//             "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)";
//         }
//         break;

//       case "confirmPassword":
//         if (!value) {
//           error = "Please confirm your password";
//         } else if (value !== formData.password) {
//           error = "Passwords do not match";
//         }
//         break;

//       default:
//         break;
//     }

//     return error;
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Real-time validation if field was touched
//     if (touched[name]) {
//       const error = validateField(name, value);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }

//     // Special case: validate confirm password when password changes
//     if (
//       name === "password" &&
//       formData.confirmPassword &&
//       touched.confirmPassword
//     ) {
//       const confirmError =
//         value !== formData.confirmPassword ? "Passwords do not match" : "";
//       setErrors((prev) => ({
//         ...prev,
//         confirmPassword: confirmError,
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
//     const fieldsToValidate = [
//       "fullName",
//       "email",
//       "phoneNumber",
//       "address",
//       "password",
//       "confirmPassword",
//     ];

//     if (userType === "user") {
//       fieldsToValidate.push("location");
//     } else if (userType === "driver") {
//       fieldsToValidate.push("place", "licenseNumber");
//     }

//     fieldsToValidate.forEach((field) => {
//       const error = validateField(field, formData[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });

//     setErrors(newErrors);
//     setTouched(
//       fieldsToValidate.reduce((acc, field) => {
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

//     // Simulate API call
//     setTimeout(() => {
//       console.log("Form submitted:", {
//         userType,
//         data: formData,
//       });
//       setSubmitSuccess(true);
//       setIsSubmitting(false);

//       // Reset form after 2 seconds
//       setTimeout(() => {
//         setFormData({
//           fullName: "",
//           email: "",
//           phoneNumber: "",
//           address: "",
//           password: "",
//           confirmPassword: "",
//           location: "",
//           place: "",
//           licenseNumber: "",
//         });
//         setTouched({});
//         setErrors({});
//         setSubmitSuccess(false);
//       }, 2000);
//     }, 1500);
//   };

//   // Switch user type
//   const switchUserType = (type) => {
//     setUserType(type);
//     // Reset form when switching
//     setFormData({
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       address: "",
//       password: "",
//       confirmPassword: "",
//       location: "",
//       place: "",
//       licenseNumber: "",
//     });
//     setErrors({});
//     setTouched({});
//   };

//   // Password strength indicator
//   const getPasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/\d/.test(password)) strength++;
//     if (/[@$!%*?&]/.test(password)) strength++;

//     const labels = [
//       "Very Weak",
//       "Weak",
//       "Fair",
//       "Good",
//       "Strong",
//       "Very Strong",
//     ];
//     const colors = [
//       "bg-red-500",
//       "bg-red-400",
//       "bg-yellow-400",
//       "bg-yellow-300",
//       "bg-emerald-400",
//       "bg-emerald-500",
//     ];

//     return {
//       label: labels[strength],
//       color: colors[strength],
//       width: `${(strength / 5) * 100}%`,
//     };
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
//               <span className="text-2xl">♻️</span>
//             </div>
//             <span className="text-3xl font-extrabold tracking-tighter text-emerald-950">
//               RE-<span className="text-emerald-600">CLASSIFY</span>
//             </span>
//           </div>
//           <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             Create Account
//           </h2>
//           <p className="text-emerald-800 font-medium">
//             Join our community and start making a difference
//           </p>
//         </div>

//         {/* User Type Toggle */}
//         <div className="bg-white border-4 border-emerald-950 p-2 mb-8 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//           <div className="grid grid-cols-2 gap-2">
//             <button
//               type="button"
//               onClick={() => switchUserType("user")}
//               className={`py-3 px-6 font-extrabold text-sm uppercase tracking-widest transition-all ${
//                 userType === "user"
//                   ? "bg-emerald-600 text-white shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                   : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
//               }`}
//             >
//               👤 Eco User
//             </button>
//             <button
//               type="button"
//               onClick={() => switchUserType("driver")}
//               className={`py-3 px-6 font-extrabold text-sm uppercase tracking-widest transition-all ${
//                 userType === "driver"
//                   ? "bg-blue-600 text-white shadow-[4px_4px_0px_rgba(23,37,84,1)]"
//                   : "bg-blue-50 text-blue-800 hover:bg-blue-100"
//               }`}
//             >
//               🚛 Driver
//             </button>
//           </div>
//         </div>

//         {/* Success Message */}
//         {submitSuccess && (
//           <div className="mb-6 bg-emerald-100 border-4 border-emerald-600 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-center">
//             <div className="text-5xl mb-2">🎉</div>
//             <h3 className="text-2xl font-extrabold text-emerald-950 mb-2">
//               Registration Successful!
//             </h3>
//             <p className="text-emerald-800 font-medium">
//               Welcome to ReClassify. Redirecting to login...
//             </p>
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)] space-y-6"
//           noValidate
//         >
//           {/* User Type Indicator */}
//           <div
//             className={`text-center py-3 border-4 mb-6 ${
//               userType === "user"
//                 ? "bg-emerald-50 border-emerald-200"
//                 : "bg-blue-50 border-blue-200"
//             }`}
//           >
//             <span
//               className={`font-bold uppercase tracking-wider ${
//                 userType === "user" ? "text-emerald-800" : "text-blue-800"
//               }`}
//             >
//               {userType === "user"
//                 ? "Registering as Eco User"
//                 : "Registering as Driver"}
//             </span>
//           </div>

//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="John Doe"
//               className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                 errors.fullName && touched.fullName
//                   ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                   : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//               }`}
//             />
//             {errors.fullName && touched.fullName && (
//               <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                 <span>⚠️</span> {errors.fullName}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//               Email Address *
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="john@example.com"
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

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//               Phone Number *
//             </label>
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="+1 (555) 123-4567"
//               className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                 errors.phoneNumber && touched.phoneNumber
//                   ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                   : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//               }`}
//             />
//             {errors.phoneNumber && touched.phoneNumber && (
//               <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                 <span>⚠️</span> {errors.phoneNumber}
//               </p>
//             )}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//               Address *
//             </label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="123 Green Street, Eco City, 12345"
//               rows="3"
//               className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all resize-none ${
//                 errors.address && touched.address
//                   ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                   : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//               }`}
//             />
//             {errors.address && touched.address && (
//               <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                 <span>⚠️</span> {errors.address}
//               </p>
//             )}
//           </div>

//           {/* User Specific: Location */}
//           {userType === "user" && (
//             <div>
//               <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                 Location/Zone *
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="e.g., Downtown, North Zone"
//                 className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                   errors.location && touched.location
//                     ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                     : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                 }`}
//               />
//               {errors.location && touched.location && (
//                 <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                   <span>⚠️</span> {errors.location}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Driver Specific: Place */}
//           {userType === "driver" && (
//             <div>
//               <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                 Operating Place/Zone *
//               </label>
//               <input
//                 type="text"
//                 name="place"
//                 value={formData.place}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="e.g., City Center, Industrial Area"
//                 className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                   errors.place && touched.place
//                     ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                     : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                 }`}
//               />
//               {errors.place && touched.place && (
//                 <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                   <span>⚠️</span> {errors.place}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Driver Specific: License Number */}
//           {userType === "driver" && (
//             <div>
//               <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                 Driver's License Number *
//               </label>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 value={formData.licenseNumber}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="DL04 20140000555"
//                 className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all uppercase ${
//                   errors.licenseNumber && touched.licenseNumber
//                     ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                     : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                 }`}
//               />
//               <p className="mt-1 text-xs text-emerald-600 font-medium">
//                 Format: XX00 00000000000 (e.g., DL04 20140000555)
//               </p>
//               {errors.licenseNumber && touched.licenseNumber && (
//                 <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                   <span>⚠️</span> {errors.licenseNumber}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//               Password *
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="••••••••"
//               className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                 errors.password && touched.password
//                   ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                   : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//               }`}
//             />

//             {/* Password Strength Indicator */}
//             {formData.password && (
//               <div className="mt-3">
//                 <div className="flex justify-between items-center mb-1">
//                   <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
//                     Strength: {passwordStrength.label}
//                   </span>
//                 </div>
//                 <div className="w-full h-3 bg-emerald-100 border-2 border-emerald-200">
//                   <div
//                     className={`h-full transition-all duration-300 ${passwordStrength.color}`}
//                     style={{ width: passwordStrength.width }}
//                   ></div>
//                 </div>
//               </div>
//             )}

//             <p className="mt-2 text-xs text-emerald-600 font-medium">
//               Min 8 chars, uppercase, lowercase, number, special char (@$!%*?&)
//             </p>

//             {errors.password && touched.password && (
//               <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                 <span>⚠️</span> {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//               Confirm Password *
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="••••••••"
//               className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
//                 errors.confirmPassword && touched.confirmPassword
//                   ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
//                   : formData.confirmPassword &&
//                       formData.confirmPassword === formData.password
//                     ? "border-emerald-500 shadow-[4px_4px_0px_rgba(16,185,129,1)]"
//                     : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//               }`}
//             />
//             {formData.confirmPassword &&
//               formData.confirmPassword === formData.password && (
//                 <p className="mt-2 text-sm font-bold text-emerald-600 flex items-center gap-1">
//                   <span>✓</span> Passwords match
//                 </p>
//               )}
//             {errors.confirmPassword && touched.confirmPassword && (
//               <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
//                 <span>⚠️</span> {errors.confirmPassword}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 shadow-[6px_6px_0px_rgba(6,78,59,1)] transition-all ${
//               isSubmitting
//                 ? "bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed"
//                 : userType === "user"
//                   ? "bg-emerald-600 border-emerald-950 text-white hover:bg-emerald-700 hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
//                   : "bg-blue-600 border-blue-950 text-white hover:bg-blue-700 hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-1 hover:translate-y-1"
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
//                 Creating Account...
//               </span>
//             ) : (
//               `Create ${userType === "user" ? "User" : "Driver"} Account`
//             )}
//           </button>

//           {/* Login Link */}
//           <div className="text-center pt-4 border-t-4 border-emerald-100">
//             <p className="text-emerald-800 font-medium">
//               Already have an account?{" "}
//               <a
//                 href="/login"
//                 className={`font-extrabold underline hover:no-underline ${
//                   userType === "user" ? "text-emerald-600" : "text-blue-600"
//                 }`}
//               >
//                 Login here
//               </a>
//             </p>
//           </div>
//         </form>

//         {/* Admin Note */}
//         <div className="mt-8 text-center">
//           <p className="text-sm text-emerald-600 font-medium">
//             🔒 Admin access is restricted. Contact system administrator for
//             admin account creation.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

//api integration with backend is added
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Authcontext";

const API_BASE_URL = "http://localhost:5000/api";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    // User specific
    location: "",
    // Driver specific
    place: "",
    licenseNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Validation patterns
  const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    licenseNumber: /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/,
  };

  // Validate single field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.trim().length < 3) {
          error = "Full name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Full name can only contain letters and spaces";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!patterns.email.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "phoneNumber":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!patterns.phone.test(value)) {
          error = "Please enter a valid phone number (10-12 digits)";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        } else if (value.trim().length < 10) {
          error = "Address must be at least 10 characters";
        }
        break;

      case "location":
        if (userType === "user" && !value.trim()) {
          error = "Location is required";
        }
        break;

      case "place":
        if (userType === "driver" && !value.trim()) {
          error = "Place/Zone is required";
        }
        break;

      case "licenseNumber":
        if (userType === "driver") {
          if (!value.trim()) {
            error = "License number is required";
          } else if (!patterns.licenseNumber.test(value)) {
            error =
              "Invalid format. Use: XX00 00000000000 (e.g., DL04 20140000555)";
          }
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!patterns.password.test(value)) {
          error =
            "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear API error when user starts typing
    if (apiError) setApiError(null);

    // Real-time validation if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }

    // Special case: validate confirm password when password changes
    if (
      name === "password" &&
      formData.confirmPassword &&
      touched.confirmPassword
    ) {
      const confirmError =
        value !== formData.confirmPassword ? "Passwords do not match" : "";
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = [
      "fullName",
      "email",
      "phoneNumber",
      "address",
      "password",
      "confirmPassword",
    ];

    if (userType === "user") {
      fieldsToValidate.push("location");
    } else if (userType === "driver") {
      fieldsToValidate.push("place", "licenseNumber");
    }

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {}),
    );

    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Build request body based on user type
      const requestBody = {
        userType,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      if (userType === "user") {
        requestBody.location = formData.location;
      } else if (userType === "driver") {
        requestBody.place = formData.place;
        requestBody.licenseNumber = formData.licenseNumber;
      }

      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Update context + localStorage atomically, Navbar updates instantly
      login(data.user, data.token);

      setSubmitSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        const redirectMap = {
          user: "/user/dashboard",
          driver: "/driver/dashboard",
          admin: "/admin/dashboard",
        };
        navigate(redirectMap[data.user.role] ?? "/user/dashboard", {
          replace: true,
        });
      }, 2000);
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Switch user type
  const switchUserType = (type) => {
    setUserType(type);
    setApiError(null);
    // Reset form when switching
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      location: "",
      place: "",
      licenseNumber: "",
    });
    setErrors({});
    setTouched({});
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const labels = [
      "Very Weak",
      "Weak",
      "Fair",
      "Good",
      "Strong",
      "Very Strong",
    ];
    const colors = [
      "bg-red-500",
      "bg-red-400",
      "bg-yellow-400",
      "bg-yellow-300",
      "bg-emerald-400",
      "bg-emerald-500",
    ];

    return {
      label: labels[strength],
      color: colors[strength],
      width: `${(strength / 5) * 100}%`,
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-[#fcfdfa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
              <span className="text-2xl">♻️</span>
            </div>
            <span className="text-3xl font-extrabold tracking-tighter text-emerald-950">
              RE-<span className="text-emerald-600">CLASSIFY</span>
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 mb-2">
            Create Account
          </h2>
          <p className="text-emerald-800 font-medium">
            Join our community and start making a difference
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="bg-white border-4 border-emerald-950 p-2 mb-8 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => switchUserType("user")}
              className={`py-3 px-6 font-extrabold text-sm uppercase tracking-widest transition-all ${
                userType === "user"
                  ? "bg-emerald-600 text-white shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              👤 Eco User
            </button>
            <button
              type="button"
              onClick={() => switchUserType("driver")}
              className={`py-3 px-6 font-extrabold text-sm uppercase tracking-widest transition-all ${
                userType === "driver"
                  ? "bg-blue-600 text-white shadow-[4px_4px_0px_rgba(23,37,84,1)]"
                  : "bg-blue-50 text-blue-800 hover:bg-blue-100"
              }`}
            >
              🚛 Driver
            </button>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 bg-emerald-100 border-4 border-emerald-600 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-center">
            <div className="text-5xl mb-2">🎉</div>
            <h3 className="text-2xl font-extrabold text-emerald-950 mb-2">
              Registration Successful!
            </h3>
            <p className="text-emerald-800 font-medium">
              {userType === "driver"
                ? "Welcome! Please await admin verification before receiving pickups. Redirecting..."
                : "Welcome to ReClassify. Redirecting to dashboard..."}
            </p>
          </div>
        )}

        {/* API Error Message */}
        {apiError && (
          <div className="mb-6 bg-red-100 border-4 border-red-500 p-6 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <h3 className="text-xl font-extrabold text-red-950 mb-2">
              Registration Failed
            </h3>
            <p className="text-red-800 font-medium">{apiError}</p>
          </div>
        )}

        {/* Form */}
        {!submitSuccess && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)] space-y-6"
            noValidate
          >
            {/* User Type Indicator */}
            <div
              className={`text-center py-3 border-4 mb-6 ${
                userType === "user"
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <span
                className={`font-bold uppercase tracking-wider ${
                  userType === "user" ? "text-emerald-800" : "text-blue-800"
                }`}
              >
                {userType === "user"
                  ? "Registering as Eco User"
                  : "Registering as Driver"}
              </span>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                  errors.fullName && touched.fullName
                    ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                    : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                }`}
              />
              {errors.fullName && touched.fullName && (
                <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                  errors.email && touched.email
                    ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                    : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                }`}
              />
              {errors.email && touched.email && (
                <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+1 (555) 123-4567"
                className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                  errors.phoneNumber && touched.phoneNumber
                    ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                    : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                }`}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="123 Green Street, Eco City, 12345"
                rows="3"
                className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all resize-none ${
                  errors.address && touched.address
                    ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                    : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                }`}
              />
              {errors.address && touched.address && (
                <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.address}
                </p>
              )}
            </div>

            {/* User Specific: Location */}
            {userType === "user" && (
              <div>
                <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                  Location/Zone *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., Downtown, North Zone"
                  className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                    errors.location && touched.location
                      ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                      : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                  }`}
                />
                {errors.location && touched.location && (
                  <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.location}
                  </p>
                )}
              </div>
            )}

            {/* Driver Specific: Place */}
            {userType === "driver" && (
              <div>
                <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                  Operating Place/Zone *
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., City Center, Industrial Area"
                  className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                    errors.place && touched.place
                      ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                      : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                  }`}
                />
                {errors.place && touched.place && (
                  <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.place}
                  </p>
                )}
              </div>
            )}

            {/* Driver Specific: License Number */}
            {userType === "driver" && (
              <div>
                <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                  Driver's License Number *
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="DL04 20140000555"
                  className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all uppercase ${
                    errors.licenseNumber && touched.licenseNumber
                      ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                      : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                  }`}
                />
                <p className="mt-1 text-xs text-emerald-600 font-medium">
                  Format: XX00 00000000000 (e.g., DL04 20140000555)
                </p>
                {errors.licenseNumber && touched.licenseNumber && (
                  <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.licenseNumber}
                  </p>
                )}
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                  errors.password && touched.password
                    ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                    : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                }`}
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Strength: {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-emerald-100 border-2 border-emerald-200">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    ></div>
                  </div>
                </div>
              )}

              <p className="mt-2 text-xs text-emerald-600 font-medium">
                Min 8 chars, uppercase, lowercase, number, special char
                (@$!%*?&)
              </p>

              {errors.password && touched.password && (
                <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border-4 bg-white text-emerald-950 font-bold placeholder-emerald-300 focus:outline-none transition-all ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,1)]"
                    : formData.confirmPassword &&
                        formData.confirmPassword === formData.password
                      ? "border-emerald-500 shadow-[4px_4px_0px_rgba(16,185,129,1)]"
                      : "border-emerald-200 focus:border-emerald-600 shadow-[4px_4px_0px_rgba(6,78,59,0.1)] focus:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                }`}
              />
              {formData.confirmPassword &&
                formData.confirmPassword === formData.password && (
                  <p className="mt-2 text-sm font-bold text-emerald-600 flex items-center gap-1">
                    <span>✓</span> Passwords match
                  </p>
                )}
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 shadow-[6px_6px_0px_rgba(6,78,59,1)] transition-all ${
                isSubmitting
                  ? "bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed"
                  : userType === "user"
                    ? "bg-emerald-600 border-emerald-950 text-white hover:bg-emerald-700 hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
                    : "bg-blue-600 border-blue-950 text-white hover:bg-blue-700 hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-1 hover:translate-y-1"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                `Create ${userType === "user" ? "User" : "Driver"} Account`
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t-4 border-emerald-100">
              <p className="text-emerald-800 font-medium">
                Already have an account?{" "}
                <a
                  href="/login"
                  className={`font-extrabold underline hover:no-underline ${
                    userType === "user" ? "text-emerald-600" : "text-blue-600"
                  }`}
                >
                  Login here
                </a>
              </p>
            </div>
          </form>
        )}

        {/* Admin Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-emerald-600 font-medium">
            🔒 Admin access is restricted. Contact system administrator for
            admin account creation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
