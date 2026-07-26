// import React, { useState, useEffect } from "react";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Reusable field display row ─────────────────────────────────────────────
// const FieldDisplay = ({ label, value }) => (
//   <div className="bg-emerald-50 border-4 border-emerald-200 p-4">
//     <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
//       {label}
//     </p>
//     <p className="text-lg font-bold text-emerald-950 break-words">
//       {value || "—"}
//     </p>
//   </div>
// );

// // ── Reusable input field ───────────────────────────────────────────────────
// const FieldInput = ({
//   label,
//   type = "text",
//   value,
//   onChange,
//   required,
//   placeholder,
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
//       className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-bold text-emerald-950 transition-all placeholder:font-normal placeholder:text-emerald-300"
//     />
//   </div>
// );

// // ── Toggle switch ──────────────────────────────────────────────────────────
// const Toggle = ({ checked, onChange }) => (
//   <div
//     onClick={onChange}
//     className={`w-14 h-8 border-4 cursor-pointer transition-colors relative flex-shrink-0
//       ${checked ? "bg-emerald-600 border-emerald-950" : "bg-gray-200 border-gray-400"}`}
//   >
//     <div
//       className={`absolute top-0.5 w-5 h-5 bg-white border-2 border-emerald-950 transition-all
//       ${checked ? "left-6" : "left-0.5"}`}
//     />
//   </div>
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("personal");
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
//     location: "",
//   });

//   // Read-only system stats (not editable, not from registration form)
//   const [stats, setStats] = useState({
//     totalPoints: 0,
//     itemsRecycled: 0,
//     rank: "—",
//     memberSince: "—",
//   });

//   // Form data mirrors profile while editing
//   const [formData, setFormData] = useState({ ...profile });

//   // Password change form
//   const [pwdForm, setPwdForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [pwdError, setPwdError] = useState("");

//   // Notification settings
//   const [settings, setSettings] = useState({
//     emailNotifications: true,
//     smsNotifications: false,
//     pickupReminders: true,
//     rewardAlerts: true,
//   });
//   const [savingSettings, setSavingSettings] = useState(false);

//   // ── Show toast helper ──────────────────────────────────────────────────
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 2500);
//   };

//   // ── Fetch profile ──────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/user/profile
//   // Response: { fullName, email, phoneNumber, address, location, stats: { totalPoints, itemsRecycled, rank, memberSince } }
//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/user/profile", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load profile");
//         // const data = await res.json();
//         // setProfile(data);
//         // setFormData(data);
//         // setStats(data.stats);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 800));
//         const mock = {
//           fullName: "John Doe",
//           email: "john.doe@example.com",
//           phoneNumber: "+91 98765 43210",
//           address: "123 Green Street, Eco City",
//           location: "Ernakulam",
//         };
//         setProfile(mock);
//         setFormData(mock);
//         setStats({
//           totalPoints: 2450,
//           itemsRecycled: 156,
//           rank: "Eco Warrior",
//           memberSince: "March 2024",
//         });
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load profile. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // ── Save profile ───────────────────────────────────────────────────────
//   // PRODUCTION: PATCH /api/user/profile
//   // Body: { fullName, phoneNumber, address, location }  ← email excluded (requires separate verify flow)
//   const handleProfileSave = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch("/api/user/profile", {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({
//       //     fullName:    formData.fullName,
//       //     phoneNumber: formData.phoneNumber,
//       //     address:     formData.address,
//       //     location:    formData.location,
//       //   }),
//       // });
//       // if (!res.ok) throw new Error("Failed to save profile");

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

//   // ── Change password ────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/user/change-password
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
//       // const res = await fetch("/api/user/change-password", {
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

//   // ── Save settings ──────────────────────────────────────────────────────
//   // PRODUCTION: PATCH /api/user/settings
//   // Body: { emailNotifications, smsNotifications, pickupReminders, rewardAlerts }
//   const handleSaveSettings = async () => {
//     setSavingSettings(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // await fetch("/api/user/settings", {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify(settings),
//       // });

//       await new Promise((r) => setTimeout(r, 700));
//       showToast("Settings saved");
//     } catch {
//       showToast("Failed to save settings.");
//     } finally {
//       setSavingSettings(false);
//     }
//   };

//   const TABS = [
//     { id: "personal", label: "Personal Info", icon: "👤" },
//     { id: "security", label: "Security", icon: "🔒" },
//     { id: "settings", label: "Settings", icon: "⚙️" },
//   ];

//   const NOTIFICATION_SETTINGS = [
//     {
//       key: "emailNotifications",
//       label: "Email Notifications",
//       desc: "Receive pickup and order updates by email",
//     },
//     {
//       key: "smsNotifications",
//       label: "SMS Notifications",
//       desc: "Get text alerts for pickup reminders",
//     },
//     {
//       key: "pickupReminders",
//       label: "Pickup Reminders",
//       desc: "Get reminded before scheduled pickups",
//     },
//     {
//       key: "rewardAlerts",
//       label: "Reward Alerts",
//       desc: "Be notified when points are credited",
//     },
//   ];

//   // ── Error state ────────────────────────────────────────────────────────
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

//   // ── Main render ────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Toast */}
//         {toast && (
//           <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] px-6 py-4 font-bold flex items-center gap-3">
//             <span>✅</span> {toast}
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             My <span className="text-emerald-600">Profile</span>
//           </h1>
//           <p className="text-emerald-800 font-medium">
//             Manage your account information and preferences
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* ── Left sidebar ── */}
//           <div className="lg:col-span-1">
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)] sticky top-8">
//               {/* Avatar initial */}
//               <div className="w-24 h-24 mx-auto bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center mb-4 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
//                 {loading ? (
//                   <Skeleton className="w-full h-full" />
//                 ) : (
//                   <span className="text-4xl font-extrabold text-white">
//                     {profile.fullName?.charAt(0)?.toUpperCase() ?? "?"}
//                   </span>
//                 )}
//               </div>

//               {/* Name + rank */}
//               {loading ? (
//                 <div className="text-center space-y-2 mb-4">
//                   <Skeleton className="h-6 w-36 mx-auto rounded" />
//                   <Skeleton className="h-4 w-24 mx-auto rounded" />
//                 </div>
//               ) : (
//                 <div className="text-center mb-4">
//                   <h2 className="text-xl font-extrabold text-emerald-950">
//                     {profile.fullName}
//                   </h2>
//                   <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">
//                     {stats.rank}
//                   </p>
//                   <p className="text-emerald-400 text-xs font-medium mt-0.5">
//                     Member since {stats.memberSince}
//                   </p>
//                 </div>
//               )}

//               {/* Read-only stats — system derived, not editable */}
//               <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6">
//                 <div className="grid grid-cols-2 gap-4 text-center">
//                   <div>
//                     {loading ? (
//                       <Skeleton className="h-8 w-16 mx-auto rounded mb-1" />
//                     ) : (
//                       <p className="text-2xl font-extrabold text-emerald-600">
//                         {stats.totalPoints.toLocaleString()}
//                       </p>
//                     )}
//                     <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
//                       Points
//                     </p>
//                   </div>
//                   <div>
//                     {loading ? (
//                       <Skeleton className="h-8 w-16 mx-auto rounded mb-1" />
//                     ) : (
//                       <p className="text-2xl font-extrabold text-emerald-600">
//                         {stats.itemsRecycled}
//                       </p>
//                     )}
//                     <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
//                       Recycled
//                     </p>
//                   </div>
//                 </div>
//               </div>

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
//                           ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]"
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
//             {/* ── Personal Info tab ── */}
//             {activeTab === "personal" && (
//               <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//                 <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-emerald-100">
//                   <h2 className="text-3xl font-extrabold text-emerald-950">
//                     Personal Information
//                   </h2>
//                   {!isEditing && !loading && (
//                     <button
//                       onClick={() => {
//                         setFormData({ ...profile });
//                         setIsEditing(true);
//                       }}
//                       className="px-6 py-2 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
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
//                   <form onSubmit={handleProfileSave} className="space-y-5">
//                     <FieldInput
//                       label="Full Name"
//                       value={formData.fullName}
//                       onChange={(e) =>
//                         setFormData({ ...formData, fullName: e.target.value })
//                       }
//                       required
//                     />

//                     {/* Email shown but not editable — changing email requires verification */}
//                     <div>
//                       <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                         Email Address
//                         <span className="ml-2 text-xs font-medium text-emerald-500 normal-case tracking-normal">
//                           (contact support to change)
//                         </span>
//                       </label>
//                       <input
//                         type="email"
//                         value={profile.email}
//                         disabled
//                         className="w-full px-4 py-3 border-4 border-emerald-100 bg-emerald-50 text-emerald-400 font-bold cursor-not-allowed"
//                       />
//                     </div>

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
//                         className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-bold text-emerald-950 resize-none transition-all placeholder:font-normal placeholder:text-emerald-300"
//                       />
//                     </div>

//                     {/* Location — critical for driver matching */}
//                     <div>
//                       <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                         Location
//                         <span className="ml-2 text-xs font-medium text-emerald-500 normal-case tracking-normal">
//                           (used to match nearby drivers)
//                         </span>
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.location}
//                         onChange={(e) =>
//                           setFormData({ ...formData, location: e.target.value })
//                         }
//                         required
//                         placeholder="e.g. Ernakulam"
//                         className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-bold text-emerald-950 transition-all placeholder:font-normal placeholder:text-emerald-300"
//                       />
//                       <p className="text-xs text-emerald-500 font-medium mt-1">
//                         Must match a driver's registered place for pickup
//                         matching to work.
//                       </p>
//                     </div>

//                     <div className="flex gap-4 pt-2">
//                       <button
//                         type="submit"
//                         disabled={saving}
//                         className={`flex-1 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
//                           ${
//                             saving
//                               ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                               : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
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
//                     <FieldDisplay label="Location" value={profile.location} />
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ── Security tab ── */}
//             {activeTab === "security" && (
//               <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//                 <h2 className="text-3xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
//                   Security
//                 </h2>

//                 <div className="space-y-6">
//                   {/* Change password */}
//                   <div className="bg-emerald-50 border-4 border-emerald-200 p-6">
//                     <h3 className="text-xl font-bold text-emerald-950 mb-4">
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

//                       {/* Inline password error */}
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
//                               : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
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
//                     <h3 className="text-xl font-bold text-red-800 mb-2">
//                       Danger Zone
//                     </h3>
//                     <p className="text-red-600 text-sm font-medium mb-4">
//                       Permanently deletes your account, all pickup history, and
//                       earned points. This cannot be undone.
//                     </p>
//                     <button
//                       onClick={() => {
//                         if (
//                           window.confirm(
//                             "Are you sure? This will permanently delete your account and all data.",
//                           )
//                         ) {
//                           // PRODUCTION: DELETE /api/user/account
//                           alert(
//                             "Account deletion requested. You will be logged out.",
//                           );
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

//             {/* ── Settings tab ── */}
//             {activeTab === "settings" && (
//               <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//                 <h2 className="text-3xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
//                   Notification Preferences
//                 </h2>

//                 <div className="bg-emerald-50 border-4 border-emerald-200 p-6 mb-6 space-y-5">
//                   {NOTIFICATION_SETTINGS.map((s) => (
//                     <label
//                       key={s.key}
//                       className="flex items-center justify-between gap-4 cursor-pointer"
//                     >
//                       <div>
//                         <p className="font-bold text-emerald-950">{s.label}</p>
//                         <p className="text-sm text-emerald-600">{s.desc}</p>
//                       </div>
//                       <Toggle
//                         checked={settings[s.key]}
//                         onChange={() =>
//                           setSettings((prev) => ({
//                             ...prev,
//                             [s.key]: !prev[s.key],
//                           }))
//                         }
//                       />
//                     </label>
//                   ))}
//                 </div>

//                 <button
//                   onClick={handleSaveSettings}
//                   disabled={savingSettings}
//                   className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
//                     ${
//                       savingSettings
//                         ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                         : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
//                     }`}
//                 >
//                   {savingSettings ? (
//                     <>
//                       <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                       Saving...
//                     </>
//                   ) : (
//                     "💾 Save Settings"
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
//updated profile page with backend integration
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ── API Configuration ─────────────────────────────────────────────────────
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// ── Reusable field display row ─────────────────────────────────────────────
const FieldDisplay = ({ label, value }) => (
  <div className="bg-emerald-50 border-4 border-emerald-200 p-4">
    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
      {label}
    </p>
    <p className="text-lg font-bold text-emerald-950 break-words">
      {value || "—"}
    </p>
  </div>
);

// ── Reusable input field ───────────────────────────────────────────────────
const FieldInput = ({
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
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
      className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-bold text-emerald-950 transition-all placeholder:font-normal placeholder:text-emerald-300"
    />
  </div>
);

// ── Toggle switch ──────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`w-14 h-8 border-4 cursor-pointer transition-colors relative flex-shrink-0
      ${checked ? "bg-emerald-600 border-emerald-950" : "bg-gray-200 border-gray-400"}`}
  >
    <div
      className={`absolute top-0.5 w-5 h-5 bg-white border-2 border-emerald-950 transition-all
      ${checked ? "left-6" : "left-0.5"}`}
    />
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const Profile = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // ── Profile state — only registration fields ───────────────────────────
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    location: "",
  });

  // Read-only system stats (not editable, not from registration form)
  const [stats, setStats] = useState({
    totalPoints: 0,
    itemsRecycled: 0,
    rank: "—",
    memberSince: "—",
  });

  // Form data mirrors profile while editing
  const [formData, setFormData] = useState({ ...profile });

  // Password change form
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwdError, setPwdError] = useState("");

  // Notification settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pickupReminders: true,
    rewardAlerts: true,
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // ── Show toast helper ──────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Fetch profile ──────────────────────────────────────────────────────
  // GET /api/user/profile
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load profile");
      }

      const data = await res.json();
      const profileData = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        location: data.location,
      };
      setProfile(profileData);
      setFormData(profileData);
    } catch (err) {
      setError(err.message || "Failed to load profile. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ── Fetch dashboard stats ──────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/dashboard`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) return;

      const data = await res.json();
      if (data.user && data.stats) {
        setStats({
          totalPoints: data.stats.totalPoints || 0,
          itemsRecycled: data.stats.itemsRecycled || 0,
          rank: data.user.rank || "—",
          memberSince: data.user.memberSince || "—",
        });
      }
    } catch {
      // Stats are secondary, don't block on error
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, [fetchProfile, fetchStats]);

  // ── Save profile ───────────────────────────────────────────────────────
  // PATCH /api/user/profile
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          location: formData.location,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save profile");
      }

      const data = await res.json();
      const updatedProfile = {
        fullName: data.user.fullName,
        email: data.user.email,
        phoneNumber: data.user.phoneNumber,
        address: data.user.address,
        location: data.user.location,
      };

      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
      showToast("Profile updated successfully");
    } catch (err) {
      showToast(err.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Change password ────────────────────────────────────────────────────
  // POST /api/user/change-password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdError("");
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
      const res = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: pwdForm.currentPassword,
          newPassword: pwdForm.newPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to change password");
      }

      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password changed successfully");
    } catch (err) {
      setPwdError(err.message || "Failed to change password.");
    } finally {
      setSavingPwd(false);
    }
  };

  // ── Save settings ──────────────────────────────────────────────────────
  // PATCH /api/user/settings
  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user/settings`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      showToast("Settings saved");
    } catch {
      showToast("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  // ── Delete account ─────────────────────────────────────────────────────
  // DELETE /api/user/account
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure? This will permanently delete your account and all data.",
      )
    ) {
      try {
        const res = await fetch(`${API_BASE_URL}/user/account`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });

        if (!res.ok) throw new Error("Failed to delete account");

        localStorage.removeItem("token");
        navigate("/");
      } catch {
        showToast("Failed to delete account. Please try again.");
      }
    }
  };

  const TABS = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const NOTIFICATION_SETTINGS = [
    {
      key: "emailNotifications",
      label: "Email Notifications",
      desc: "Receive pickup and order updates by email",
    },
    {
      key: "smsNotifications",
      label: "SMS Notifications",
      desc: "Get text alerts for pickup reminders",
    },
    {
      key: "pickupReminders",
      label: "Pickup Reminders",
      desc: "Get reminded before scheduled pickups",
    },
    {
      key: "rewardAlerts",
      label: "Reward Alerts",
      desc: "Be notified when points are credited",
    },
  ];

  // ── Error state ────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Login
            </button>
            <button
              onClick={fetchProfile}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] px-6 py-4 font-bold flex items-center gap-3">
            <span>✅</span> {toast}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
            My <span className="text-emerald-600">Profile</span>
          </h1>
          <p className="text-emerald-800 font-medium">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)] sticky top-8">
              {/* Avatar initial */}
              <div className="w-24 h-24 mx-auto bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center mb-4 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <span className="text-4xl font-extrabold text-white">
                    {profile.fullName?.charAt(0)?.toUpperCase() ?? "?"}
                  </span>
                )}
              </div>

              {/* Name + rank */}
              {loading ? (
                <div className="text-center space-y-2 mb-4">
                  <Skeleton className="h-6 w-36 mx-auto rounded" />
                  <Skeleton className="h-4 w-24 mx-auto rounded" />
                </div>
              ) : (
                <div className="text-center mb-4">
                  <h2 className="text-xl font-extrabold text-emerald-950">
                    {profile.fullName}
                  </h2>
                  <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">
                    {stats.rank}
                  </p>
                  <p className="text-emerald-400 text-xs font-medium mt-0.5">
                    Member since {stats.memberSince}
                  </p>
                </div>
              )}

              {/* Read-only stats — system derived, not editable */}
              <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    {loading ? (
                      <Skeleton className="h-8 w-16 mx-auto rounded mb-1" />
                    ) : (
                      <p className="text-2xl font-extrabold text-emerald-600">
                        {stats.totalPoints.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Points
                    </p>
                  </div>
                  <div>
                    {loading ? (
                      <Skeleton className="h-8 w-16 mx-auto rounded mb-1" />
                    ) : (
                      <p className="text-2xl font-extrabold text-emerald-600">
                        {stats.itemsRecycled}
                      </p>
                    )}
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Recycled
                    </p>
                  </div>
                </div>
              </div>

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
                          ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]"
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
            {/* ── Personal Info tab ── */}
            {activeTab === "personal" && (
              <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-emerald-100">
                  <h2 className="text-3xl font-extrabold text-emerald-950">
                    Personal Information
                  </h2>
                  {!isEditing && !loading && (
                    <button
                      onClick={() => {
                        setFormData({ ...profile });
                        setIsEditing(true);
                      }}
                      className="px-6 py-2 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
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
                  <form onSubmit={handleProfileSave} className="space-y-5">
                    <FieldInput
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />

                    {/* Email shown but not editable — changing email requires verification */}
                    <div>
                      <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                        Email Address
                        <span className="ml-2 text-xs font-medium text-emerald-500 normal-case tracking-normal">
                          (contact support to change)
                        </span>
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full px-4 py-3 border-4 border-emerald-100 bg-emerald-50 text-emerald-400 font-bold cursor-not-allowed"
                      />
                    </div>

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
                        className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-bold text-emerald-950 resize-none transition-all placeholder:font-normal placeholder:text-emerald-300"
                      />
                    </div>

                    {/* Location — critical for driver matching */}
                    <div>
                      <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                        Location
                        <span className="ml-2 text-xs font-medium text-emerald-500 normal-case tracking-normal">
                          (used to match nearby drivers)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        required
                        placeholder="e.g. Ernakulam"
                        className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-bold text-emerald-950 transition-all placeholder:font-normal placeholder:text-emerald-300"
                      />
                      <p className="text-xs text-emerald-500 font-medium mt-1">
                        Must match a driver's registered place for pickup
                        matching to work.
                      </p>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className={`flex-1 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                          ${
                            saving
                              ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                              : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
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
                    <FieldDisplay label="Location" value={profile.location} />
                  </div>
                )}
              </div>
            )}

            {/* ── Security tab ── */}
            {activeTab === "security" && (
              <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
                <h2 className="text-3xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
                  Security
                </h2>

                <div className="space-y-6">
                  {/* Change password */}
                  <div className="bg-emerald-50 border-4 border-emerald-200 p-6">
                    <h3 className="text-xl font-bold text-emerald-950 mb-4">
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

                      {/* Inline password error */}
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
                              : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
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
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-red-600 text-sm font-medium mb-4">
                      Permanently deletes your account, all pickup history, and
                      earned points. This cannot be undone.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="w-full py-3 bg-red-500 text-white font-extrabold uppercase tracking-widest border-4 border-red-950 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      🗑️ Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Settings tab ── */}
            {activeTab === "settings" && (
              <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
                <h2 className="text-3xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
                  Notification Preferences
                </h2>

                <div className="bg-emerald-50 border-4 border-emerald-200 p-6 mb-6 space-y-5">
                  {NOTIFICATION_SETTINGS.map((s) => (
                    <label
                      key={s.key}
                      className="flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div>
                        <p className="font-bold text-emerald-950">{s.label}</p>
                        <p className="text-sm text-emerald-600">{s.desc}</p>
                      </div>
                      <Toggle
                        checked={settings[s.key]}
                        onChange={() =>
                          setSettings((prev) => ({
                            ...prev,
                            [s.key]: !prev[s.key],
                          }))
                        }
                      />
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                    ${
                      savingSettings
                        ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                        : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
                    }`}
                >
                  {savingSettings ? (
                    <>
                      <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "💾 Save Settings"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
