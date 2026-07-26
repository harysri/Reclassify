// import React, { useState, useEffect } from "react";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Reusable field display ─────────────────────────────────────────────────
// const FieldDisplay = ({ label, value, note }) => (
//   <div className="bg-emerald-50 border-4 border-emerald-200 p-4">
//     <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
//       {label}
//     </p>
//     <p className="text-lg font-bold text-emerald-950 break-words">
//       {value || "—"}
//     </p>
//     {note && (
//       <p className="text-xs text-emerald-400 font-medium mt-1">{note}</p>
//     )}
//   </div>
// );

// // ── Reusable input ─────────────────────────────────────────────────────────
// const FieldInput = ({
//   label,
//   type = "text",
//   value,
//   onChange,
//   required,
//   placeholder,
//   disabled,
//   note,
// }) => (
//   <div>
//     <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       required={required}
//       placeholder={placeholder}
//       disabled={disabled}
//       className={`w-full px-4 py-3 border-4 font-bold transition-all
//         ${
//           disabled
//             ? "border-emerald-100 bg-emerald-50 text-emerald-400 cursor-not-allowed"
//             : "border-emerald-200 focus:border-blue-600 focus:outline-none text-emerald-950 placeholder:font-normal placeholder:text-emerald-300"
//         }`}
//     />
//     {note && (
//       <p className="text-xs text-emerald-400 font-medium mt-1">{note}</p>
//     )}
//   </div>
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const DriverProfile = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [savingPwd, setSavingPwd] = useState(false);
//   const [error, setError] = useState(null);
//   const [toast, setToast] = useState(null);

//   // ── Profile state — only registration fields ───────────────────────────
//   const [profile, setProfile] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     place: "",
//     licenseNumber: "",
//     isVerified: false,
//   });

//   const [formData, setFormData] = useState({ ...profile });

//   // Password change form
//   const [pwdForm, setPwdForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [pwdError, setPwdError] = useState("");

//   // ── Toast helper ──────────────────────────────────────────────────────────
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 2500);
//   };

//   // ── Fetch profile ──────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/driver/profile
//   // Response: { fullName, email, phoneNumber, address, place, licenseNumber, isVerified }
//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/driver/profile", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load profile");
//         // const data = await res.json();
//         // setProfile(data);
//         // setFormData(data);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 800));
//         const mock = {
//           fullName: "Mike S.",
//           email: "mike@example.com",
//           phoneNumber: "+91 98765 43210",
//           address: "45 Driver Lane, Ernakulam",
//           place: "Ernakulam",
//           licenseNumber: "KL04 20140000555",
//           isVerified: true,
//         };
//         setProfile(mock);
//         setFormData(mock);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load profile. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // ── Save profile ───────────────────────────────────────────────────────────
//   // PRODUCTION: PATCH /api/driver/profile
//   // Body: { fullName, phoneNumber, address, place }
//   // email and licenseNumber excluded — email needs verify flow, license is immutable credential
//   const handleSave = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch("/api/driver/profile", {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({
//       //     fullName:    formData.fullName,
//       //     phoneNumber: formData.phoneNumber,
//       //     address:     formData.address,
//       //     place:       formData.place,
//       //   }),
//       // });
//       // if (!res.ok) throw new Error("Failed to save");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 900));

//       setProfile({ ...formData });
//       setIsEditing(false);
//       showToast("Profile updated successfully");
//     } catch {
//       showToast("Failed to save. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Change password ────────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/driver/change-password
//   // Body: { currentPassword, newPassword }
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     setPwdError("");
//     if (pwdForm.newPassword !== pwdForm.confirmPassword) {
//       setPwdError("New passwords do not match.");
//       return;
//     }
//     if (pwdForm.newPassword.length < 8) {
//       setPwdError("New password must be at least 8 characters.");
//       return;
//     }
//     setSavingPwd(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch("/api/driver/change-password", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({
//       //     currentPassword: pwdForm.currentPassword,
//       //     newPassword:     pwdForm.newPassword,
//       //   }),
//       // });
//       // if (!res.ok) throw new Error("Incorrect current password.");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 900));

//       setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//       showToast("Password changed successfully");
//     } catch (err) {
//       setPwdError(err.message ?? "Failed to change password.");
//     } finally {
//       setSavingPwd(false);
//     }
//   };

//   const TABS = [
//     { id: "profile", label: "Driver Info", icon: "👤" },
//     { id: "security", label: "Security", icon: "🔒" },
//   ];

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
//           <span className="text-5xl block mb-4">⚠️</span>
//           <p className="font-extrabold text-red-600 text-xl mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="w-full py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Main render ───────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Toast */}
//         {toast && (
//           <div className="fixed top-6 right-6 z-50 bg-blue-600 text-white border-4 border-blue-950 shadow-[6px_6px_0px_rgba(23,37,84,1)] px-6 py-4 font-bold flex items-center gap-3">
//             <span>✅</span> {toast}
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             Profile & <span className="text-blue-600">Settings</span>
//           </h1>
//           <p className="text-emerald-800 font-medium">
//             Manage your driver account information
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* ── Left sidebar ── */}
//           <div className="lg:col-span-1">
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)] sticky top-8">
//               {/* Avatar initial */}
//               <div className="w-24 h-24 mx-auto bg-blue-600 border-4 border-emerald-950 flex items-center justify-center mb-4 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
//                 {loading ? (
//                   <Skeleton className="w-full h-full" />
//                 ) : (
//                   <span className="text-4xl font-extrabold text-white">
//                     {profile.fullName?.charAt(0)?.toUpperCase() ?? "?"}
//                   </span>
//                 )}
//               </div>

//               {/* Name + verification badge */}
//               {loading ? (
//                 <div className="text-center space-y-2 mb-6">
//                   <Skeleton className="h-6 w-32 mx-auto rounded" />
//                   <Skeleton className="h-5 w-24 mx-auto rounded" />
//                 </div>
//               ) : (
//                 <div className="text-center mb-6">
//                   <h2 className="text-xl font-extrabold text-emerald-950">
//                     {profile.fullName}
//                   </h2>
//                   <p className="text-emerald-500 text-xs font-medium mt-0.5">
//                     {profile.place}
//                   </p>

//                   {/* Verification status — prominently shown */}
//                   <div className="mt-3">
//                     {profile.isVerified ? (
//                       <span className="inline-block bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-emerald-950">
//                         ✓ Verified Driver
//                       </span>
//                     ) : (
//                       <span className="inline-block bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-amber-800">
//                         ⏳ Pending Verification
//                       </span>
//                     )}
//                   </div>

//                   {!profile.isVerified && (
//                     <p className="text-amber-600 text-xs font-medium mt-2 leading-snug">
//                       An admin must verify your license before you can receive
//                       pickup requests.
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Tab nav */}
//               <div className="space-y-2">
//                 {TABS.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => {
//                       setActiveTab(tab.id);
//                       setIsEditing(false);
//                     }}
//                     className={`w-full py-3 px-4 text-left font-bold uppercase tracking-wider text-sm border-4 transition-all flex items-center gap-2
//                       ${
//                         activeTab === tab.id
//                           ? "bg-blue-600 text-white border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)]"
//                           : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-950"
//                       }`}
//                   >
//                     <span>{tab.icon}</span> {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── Main content ── */}
//           <div className="lg:col-span-2">
//             {/* ── Driver Info tab ── */}
//             {activeTab === "profile" && (
//               <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//                 <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-emerald-100">
//                   <h2 className="text-2xl font-extrabold text-emerald-950">
//                     Driver Information
//                   </h2>
//                   {!isEditing && !loading && (
//                     <button
//                       onClick={() => {
//                         setFormData({ ...profile });
//                         setIsEditing(true);
//                       }}
//                       className="px-6 py-2 bg-blue-600 text-white font-bold uppercase tracking-wider border-4 border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       ✏️ Edit
//                     </button>
//                   )}
//                 </div>

//                 {loading ? (
//                   <div className="space-y-4">
//                     {[...Array(5)].map((_, i) => (
//                       <Skeleton key={i} className="h-16 w-full rounded" />
//                     ))}
//                   </div>
//                 ) : isEditing ? (
//                   <form onSubmit={handleSave} className="space-y-5">
//                     <FieldInput
//                       label="Full Name"
//                       value={formData.fullName}
//                       onChange={(e) =>
//                         setFormData({ ...formData, fullName: e.target.value })
//                       }
//                       required
//                     />

//                     {/* Email read-only — needs verify flow to change */}
//                     <FieldInput
//                       label="Email Address"
//                       type="email"
//                       value={profile.email}
//                       disabled
//                       note="Contact support to change your email address"
//                     />

//                     <FieldInput
//                       label="Phone Number"
//                       type="tel"
//                       value={formData.phoneNumber}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           phoneNumber: e.target.value,
//                         })
//                       }
//                       required
//                       placeholder="+91 98765 43210"
//                     />

//                     <div>
//                       <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                         Address
//                       </label>
//                       <textarea
//                         value={formData.address}
//                         onChange={(e) =>
//                           setFormData({ ...formData, address: e.target.value })
//                         }
//                         rows={3}
//                         required
//                         placeholder="Your full address..."
//                         className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-blue-600 focus:outline-none font-bold text-emerald-950 resize-none transition-all placeholder:font-normal placeholder:text-emerald-300"
//                       />
//                     </div>

//                     {/* Place — critical for driver-user matching */}
//                     <FieldInput
//                       label="Place"
//                       value={formData.place}
//                       onChange={(e) =>
//                         setFormData({ ...formData, place: e.target.value })
//                       }
//                       required
//                       placeholder="e.g. Ernakulam"
//                       note="Must match the location field of users in your area for pickup matching to work"
//                     />

//                     {/* License — immutable credential, always read-only */}
//                     <FieldInput
//                       label="License Number"
//                       value={profile.licenseNumber}
//                       disabled
//                       note="License number cannot be changed. Contact admin for corrections."
//                     />

//                     <div className="flex gap-4 pt-2">
//                       <button
//                         type="submit"
//                         disabled={saving}
//                         className={`flex-1 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
//                           ${
//                             saving
//                               ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                               : "bg-blue-600 text-white border-blue-950 shadow-[6px_6px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-1 hover:translate-y-1"
//                           }`}
//                       >
//                         {saving ? (
//                           <>
//                             <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                             Saving...
//                           </>
//                         ) : (
//                           "💾 Save Changes"
//                         )}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setIsEditing(false);
//                           setFormData({ ...profile });
//                         }}
//                         className="flex-1 py-4 bg-white text-emerald-950 font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
//                       >
//                         ✕ Cancel
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <FieldDisplay
//                         label="Full Name"
//                         value={profile.fullName}
//                       />
//                       <FieldDisplay label="Email" value={profile.email} />
//                     </div>
//                     <FieldDisplay
//                       label="Phone Number"
//                       value={profile.phoneNumber}
//                     />
//                     <FieldDisplay label="Address" value={profile.address} />
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <FieldDisplay
//                         label="Place"
//                         value={profile.place}
//                         note="Used to match nearby user pickup requests"
//                       />
//                       <FieldDisplay
//                         label="License Number"
//                         value={profile.licenseNumber}
//                         note="Cannot be changed"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ── Security tab ── */}
//             {activeTab === "security" && (
//               <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//                 <h2 className="text-2xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
//                   Security
//                 </h2>

//                 <div className="space-y-6">
//                   {/* Change password */}
//                   <div className="bg-emerald-50 border-4 border-emerald-200 p-6">
//                     <h3 className="text-lg font-extrabold text-emerald-950 mb-4">
//                       Change Password
//                     </h3>
//                     <form onSubmit={handlePasswordChange} className="space-y-4">
//                       <FieldInput
//                         label="Current Password"
//                         type="password"
//                         value={pwdForm.currentPassword}
//                         onChange={(e) =>
//                           setPwdForm({
//                             ...pwdForm,
//                             currentPassword: e.target.value,
//                           })
//                         }
//                         required
//                         placeholder="••••••••"
//                       />
//                       <FieldInput
//                         label="New Password"
//                         type="password"
//                         value={pwdForm.newPassword}
//                         onChange={(e) =>
//                           setPwdForm({
//                             ...pwdForm,
//                             newPassword: e.target.value,
//                           })
//                         }
//                         required
//                         placeholder="Min. 8 characters"
//                       />
//                       <FieldInput
//                         label="Confirm New Password"
//                         type="password"
//                         value={pwdForm.confirmPassword}
//                         onChange={(e) =>
//                           setPwdForm({
//                             ...pwdForm,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                         required
//                         placeholder="••••••••"
//                       />

//                       {pwdError && (
//                         <div className="bg-red-50 border-4 border-red-300 p-3">
//                           <p className="text-red-600 font-bold text-sm">
//                             ⚠️ {pwdError}
//                           </p>
//                         </div>
//                       )}

//                       <button
//                         type="submit"
//                         disabled={savingPwd}
//                         className={`w-full py-3 font-extrabold uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
//                           ${
//                             savingPwd
//                               ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                               : "bg-blue-600 text-white border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-0.5 hover:translate-y-0.5"
//                           }`}
//                       >
//                         {savingPwd ? (
//                           <>
//                             <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                             Updating...
//                           </>
//                         ) : (
//                           "🔒 Update Password"
//                         )}
//                       </button>
//                     </form>
//                   </div>

//                   {/* Danger zone */}
//                   <div className="bg-red-50 border-4 border-red-300 p-6">
//                     <h3 className="text-lg font-bold text-red-800 mb-2">
//                       Danger Zone
//                     </h3>
//                     <p className="text-red-600 text-sm font-medium mb-4">
//                       Permanently deletes your driver account and all pickup
//                       history. This cannot be undone.
//                     </p>
//                     <button
//                       onClick={() => {
//                         if (
//                           window.confirm(
//                             "Are you sure? This will permanently delete your account and all data.",
//                           )
//                         ) {
//                           // PRODUCTION: DELETE /api/driver/account
//                           alert("Account deletion requested.");
//                         }
//                       }}
//                       className="w-full py-3 bg-red-500 text-white font-extrabold uppercase tracking-widest border-4 border-red-950 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       🗑️ Delete Account
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverProfile;

//updated profile page with api integration
import React, { useState, useEffect } from "react";

// ── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// API configuration
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Reusable field display ─────────────────────────────────────────────────
const FieldDisplay = ({ label, value, note }) => (
  <div className="bg-emerald-50 border-4 border-emerald-200 p-4">
    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
      {label}
    </p>
    <p className="text-lg font-bold text-emerald-950 break-words">
      {value || "—"}
    </p>
    {note && (
      <p className="text-xs text-emerald-400 font-medium mt-1">{note}</p>
    )}
  </div>
);

// ── Reusable input ─────────────────────────────────────────────────────────
const FieldInput = ({
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  disabled,
  note,
}) => (
  <div>
    <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 border-4 font-bold transition-all
        ${
          disabled
            ? "border-emerald-100 bg-emerald-50 text-emerald-400 cursor-not-allowed"
            : "border-emerald-200 focus:border-blue-600 focus:outline-none text-emerald-950 placeholder:font-normal placeholder:text-emerald-300"
        }`}
    />
    {note && (
      <p className="text-xs text-emerald-400 font-medium mt-1">{note}</p>
    )}
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const DriverProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // ── Profile state ─────────────────────────────────────────────────────────
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    place: "",
    licenseNumber: "",
    isVerified: false,
  });

  const [formData, setFormData] = useState({ ...profile });

  // Password change form
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwdError, setPwdError] = useState("");

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Fetch profile ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/driver/profile`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load profile");
        }

        const data = await res.json();
        setProfile(data);
        setFormData(data);
      } catch (err) {
        setError(err.message || "Failed to load profile. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ── Save profile ───────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/driver/profile`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          place: formData.place,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await res.json();
      setProfile(data.driver);
      setIsEditing(false);
      showToast("Profile updated successfully");
    } catch (err) {
      showToast(err.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Change password ────────────────────────────────────────────────────────
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdError("");
    setError(null);

    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdError("New passwords do not match.");
      return;
    }
    if (pwdForm.newPassword.length < 8) {
      setPwdError("New password must be at least 8 characters.");
      return;
    }

    setSavingPwd(true);
    try {
      const res = await fetch(`${API_BASE_URL}/driver/change-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: pwdForm.currentPassword,
          newPassword: pwdForm.newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to change password");
      }

      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password changed successfully");
    } catch (err) {
      setPwdError(err.message || "Failed to change password.");
    } finally {
      setSavingPwd(false);
    }
  };

  // ── Delete account ─────────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure? This will permanently delete your driver account and all pickup history. This cannot be undone.",
      )
    ) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/driver/account`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) {
        throw new Error("Failed to delete account");
      }

      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "Failed to delete account. Please try again.");
      setDeleting(false);
    }
  };

  const TABS = [
    { id: "profile", label: "Driver Info", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && !profile.fullName) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-blue-600 text-white border-4 border-blue-950 shadow-[6px_6px_0px_rgba(23,37,84,1)] px-6 py-4 font-bold flex items-center gap-3">
            <span>✅</span> {toast}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
            Profile & <span className="text-blue-600">Settings</span>
          </h1>
          <p className="text-emerald-800 font-medium">
            Manage your driver account information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)] sticky top-8">
              {/* Avatar initial */}
              <div className="w-24 h-24 mx-auto bg-blue-600 border-4 border-emerald-950 flex items-center justify-center mb-4 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <span className="text-4xl font-extrabold text-white">
                    {profile.fullName?.charAt(0)?.toUpperCase() ?? "?"}
                  </span>
                )}
              </div>

              {/* Name + verification badge */}
              {loading ? (
                <div className="text-center space-y-2 mb-6">
                  <Skeleton className="h-6 w-32 mx-auto rounded" />
                  <Skeleton className="h-5 w-24 mx-auto rounded" />
                </div>
              ) : (
                <div className="text-center mb-6">
                  <h2 className="text-xl font-extrabold text-emerald-950">
                    {profile.fullName}
                  </h2>
                  <p className="text-emerald-500 text-xs font-medium mt-0.5">
                    {profile.place}
                  </p>

                  {/* Verification status */}
                  <div className="mt-3">
                    {profile.isVerified ? (
                      <span className="inline-block bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-emerald-950">
                        ✓ Verified Driver
                      </span>
                    ) : (
                      <span className="inline-block bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-amber-800">
                        ⏳ Pending Verification
                      </span>
                    )}
                  </div>

                  {!profile.isVerified && (
                    <p className="text-amber-600 text-xs font-medium mt-2 leading-snug">
                      An admin must verify your license before you can receive
                      pickup requests.
                    </p>
                  )}
                </div>
              )}

              {/* Tab nav */}
              <div className="space-y-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsEditing(false);
                    }}
                    className={`w-full py-3 px-4 text-left font-bold uppercase tracking-wider text-sm border-4 transition-all flex items-center gap-2
                      ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)]"
                          : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-950"
                      }`}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="lg:col-span-2">
            {/* ── Driver Info tab ── */}
            {activeTab === "profile" && (
              <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-emerald-100">
                  <h2 className="text-2xl font-extrabold text-emerald-950">
                    Driver Information
                  </h2>
                  {!isEditing && !loading && (
                    <button
                      onClick={() => {
                        setFormData({ ...profile });
                        setIsEditing(true);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white font-bold uppercase tracking-wider border-4 border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      ✏️ Edit
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full rounded" />
                    ))}
                  </div>
                ) : isEditing ? (
                  <form onSubmit={handleSave} className="space-y-5">
                    <FieldInput
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />

                    {/* Email read-only */}
                    <FieldInput
                      label="Email Address"
                      type="email"
                      value={profile.email}
                      disabled
                      note="Contact support to change your email address"
                    />

                    <FieldInput
                      label="Phone Number"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                      placeholder="+91 98765 43210"
                    />

                    <div>
                      <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                        Address
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        rows={3}
                        required
                        placeholder="Your full address..."
                        className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-blue-600 focus:outline-none font-bold text-emerald-950 resize-none transition-all placeholder:font-normal placeholder:text-emerald-300"
                      />
                    </div>

                    {/* Place */}
                    <FieldInput
                      label="Place"
                      value={formData.place}
                      onChange={(e) =>
                        setFormData({ ...formData, place: e.target.value })
                      }
                      required
                      placeholder="e.g. Ernakulam"
                      note="Must match the location field of users in your area for pickup matching to work"
                    />

                    {/* License — immutable */}
                    <FieldInput
                      label="License Number"
                      value={profile.licenseNumber}
                      disabled
                      note="License number cannot be changed. Contact admin for corrections."
                    />

                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className={`flex-1 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                          ${
                            saving
                              ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                              : "bg-blue-600 text-white border-blue-950 shadow-[6px_6px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-1 hover:translate-y-1"
                          }`}
                      >
                        {saving ? (
                          <>
                            <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                            Saving...
                          </>
                        ) : (
                          "💾 Save Changes"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ ...profile });
                        }}
                        className="flex-1 py-4 bg-white text-emerald-950 font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                      >
                        ✕ Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FieldDisplay
                        label="Full Name"
                        value={profile.fullName}
                      />
                      <FieldDisplay label="Email" value={profile.email} />
                    </div>
                    <FieldDisplay
                      label="Phone Number"
                      value={profile.phoneNumber}
                    />
                    <FieldDisplay label="Address" value={profile.address} />
                    <div className="grid md:grid-cols-2 gap-4">
                      <FieldDisplay
                        label="Place"
                        value={profile.place}
                        note="Used to match nearby user pickup requests"
                      />
                      <FieldDisplay
                        label="License Number"
                        value={profile.licenseNumber}
                        note="Cannot be changed"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Security tab ── */}
            {activeTab === "security" && (
              <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
                <h2 className="text-2xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
                  Security
                </h2>

                <div className="space-y-6">
                  {/* Change password */}
                  <div className="bg-emerald-50 border-4 border-emerald-200 p-6">
                    <h3 className="text-lg font-extrabold text-emerald-950 mb-4">
                      Change Password
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <FieldInput
                        label="Current Password"
                        type="password"
                        value={pwdForm.currentPassword}
                        onChange={(e) =>
                          setPwdForm({
                            ...pwdForm,
                            currentPassword: e.target.value,
                          })
                        }
                        required
                        placeholder="••••••••"
                      />
                      <FieldInput
                        label="New Password"
                        type="password"
                        value={pwdForm.newPassword}
                        onChange={(e) =>
                          setPwdForm({
                            ...pwdForm,
                            newPassword: e.target.value,
                          })
                        }
                        required
                        placeholder="Min. 8 characters"
                      />
                      <FieldInput
                        label="Confirm New Password"
                        type="password"
                        value={pwdForm.confirmPassword}
                        onChange={(e) =>
                          setPwdForm({
                            ...pwdForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                        placeholder="••••••••"
                      />

                      {pwdError && (
                        <div className="bg-red-50 border-4 border-red-300 p-3">
                          <p className="text-red-600 font-bold text-sm">
                            ⚠️ {pwdError}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={savingPwd}
                        className={`w-full py-3 font-extrabold uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                          ${
                            savingPwd
                              ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                              : "bg-blue-600 text-white border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                          }`}
                      >
                        {savingPwd ? (
                          <>
                            <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                            Updating...
                          </>
                        ) : (
                          "🔒 Update Password"
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Danger zone */}
                  <div className="bg-red-50 border-4 border-red-300 p-6">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-red-600 text-sm font-medium mb-4">
                      Permanently deletes your driver account and all pickup
                      history. This cannot be undone.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleting}
                      className={`w-full py-3 font-extrabold uppercase tracking-widest border-4 shadow-[4px_4px_0px_rgba(127,29,29,1)] transition-all flex items-center justify-center gap-2
                        ${
                          deleting
                            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                            : "bg-red-500 text-white border-red-950 hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                        }`}
                    >
                      {deleting ? (
                        <>
                          <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                          Deleting...
                        </>
                      ) : (
                        "🗑️ Delete Account"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
