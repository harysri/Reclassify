// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// // Points config mirrored from WasteClassification — keep in sync or move to a shared constants file
// const pointsConfig = {
//   glass: {
//     points: 100,
//     label: "Glass",
//     color: "bg-cyan-600",
//     textColor: "text-white",
//     icon: "🍾",
//   },
//   plastic: {
//     points: 5,
//     label: "Plastic",
//     color: "bg-red-500",
//     textColor: "text-white",
//     icon: "🥤",
//   },
//   cardboard: {
//     points: 7,
//     label: "Cardboard",
//     color: "bg-yellow-600",
//     textColor: "text-white",
//     icon: "📦",
//   },
//   paper: {
//     points: 3,
//     label: "Paper",
//     color: "bg-emerald-100",
//     textColor: "text-emerald-950",
//     icon: "📄",
//   },
//   metal: {
//     points: 20,
//     label: "Metal",
//     color: "bg-gray-600",
//     textColor: "text-white",
//     icon: "🥫",
//   },
// };

// // Minimum date helper — today in YYYY-MM-DD format for the date input min attribute
// const todayString = () => new Date().toISOString().split("T")[0];

// // Time slots offered to the user
// const TIME_SLOTS = [
//   { id: "morning", label: "Morning", range: "8:00 AM – 12:00 PM", icon: "🌅" },
//   {
//     id: "afternoon",
//     label: "Afternoon",
//     range: "12:00 PM – 4:00 PM",
//     icon: "☀️",
//   },
//   { id: "evening", label: "Evening", range: "4:00 PM – 8:00 PM", icon: "🌇" },
// ];

// const SchedulePickup = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   // Data passed from WasteClassification via router state
//   const items = state?.items ?? [];
//   const totalPoints = state?.totalPoints ?? 0;

//   // Form state
//   const [date, setDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [address, setAddress] = useState("");
//   const [notes, setNotes] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [bookingId, setBookingId] = useState(null);
//   const [errors, setErrors] = useState({});

//   // Validation
//   const validate = () => {
//     const e = {};
//     if (!date) e.date = "Please select a pickup date.";
//     if (!timeSlot) e.timeSlot = "Please choose a time slot.";
//     if (!address.trim()) e.address = "Please enter your pickup address.";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // Submit handler
//   // PRODUCTION: POST /api/bookings/create
//   // Body: { items, totalPoints, date, timeSlot, address, notes }
//   // Response: { bookingId, status, driversNotified }
//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setIsSubmitting(true);

//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch("/api/bookings/create", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ items, totalPoints, date, timeSlot, address, notes }),
//       // });
//       // if (!res.ok) throw new Error("Booking failed");
//       // const data = await res.json();
//       // setBookingId(data.bookingId);

//       // ── SIMULATION (remove when API is ready) ──
//       await new Promise((r) => setTimeout(r, 1800));
//       setBookingId(`BK-${Date.now().toString().slice(-6)}`);
//       // ── END SIMULATION ──

//       setSubmitted(true);
//     } catch {
//       setErrors({ submit: "Booking failed. Please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ── Success screen ──
//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4 py-12">
//         <div className="max-w-lg w-full">
//           {/* Big stamp-style success card */}
//           <div className="bg-white border-4 border-emerald-950 shadow-[16px_16px_0px_rgba(6,78,59,1)] p-8 text-center">
//             <div className="w-24 h-24 bg-emerald-600 border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
//               <span className="text-4xl">✓</span>
//             </div>

//             <div className="inline-block bg-emerald-950 text-emerald-400 font-mono text-xs px-3 py-1 mb-4 tracking-widest uppercase">
//               Booking Confirmed
//             </div>

//             <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//               Pickup Scheduled!
//             </h2>
//             <p className="text-emerald-700 font-medium mb-6">
//               Nearby drivers have been notified. The first to accept will be
//               assigned to your pickup.
//             </p>

//             {/* Booking details summary */}
//             <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6 text-left space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                   Booking ID
//                 </span>
//                 <span className="font-mono font-bold text-emerald-950">
//                   {bookingId}
//                 </span>
//               </div>
//               <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
//                 <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                   Date
//                 </span>
//                 <span className="font-bold text-emerald-950">{date}</span>
//               </div>
//               <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
//                 <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                   Time
//                 </span>
//                 <span className="font-bold text-emerald-950">
//                   {TIME_SLOTS.find((s) => s.id === timeSlot)?.range}
//                 </span>
//               </div>
//               <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
//                 <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                   Items
//                 </span>
//                 <span className="font-bold text-emerald-950">
//                   {items.length} item{items.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//               <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
//                 <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                   Points Pending
//                 </span>
//                 <span className="text-2xl font-extrabold text-emerald-600">
//                   +{totalPoints}
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/user/pickup-history")}
//                 className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//               >
//                 View Pickups
//               </button>
//               <button
//                 onClick={() => navigate("/waste-classify")}
//                 className="flex-1 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//               >
//                 Scan More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Main form ──
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-wider text-sm mb-4 hover:text-emerald-950 transition-colors"
//           >
//             ← Back
//           </button>
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             Schedule <span className="text-emerald-600">Pickup</span>
//           </h1>
//           <p className="text-emerald-800 font-medium text-lg">
//             Choose a date, time, and location — nearby drivers will be notified
//             instantly
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
//           {/* ── Left: Form ── */}
//           <div className="space-y-6">
//             {/* Date picker */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h2 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
//                 <span>📅</span> Pickup Date
//               </h2>
//               <input
//                 type="date"
//                 value={date}
//                 min={todayString()}
//                 onChange={(e) => {
//                   setDate(e.target.value);
//                   setErrors((prev) => ({ ...prev, date: undefined }));
//                 }}
//                 className={`w-full h-14 px-4 border-4 font-bold text-emerald-950 text-lg focus:outline-none focus:border-emerald-600 transition-colors ${
//                   errors.date
//                     ? "border-red-500 bg-red-50"
//                     : "border-emerald-950"
//                 }`}
//               />
//               {errors.date && (
//                 <p className="text-red-600 font-bold text-sm mt-2 flex items-center gap-1">
//                   <span>⚠️</span> {errors.date}
//                 </p>
//               )}
//             </div>

//             {/* Time slot selector */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h2 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
//                 <span>⏰</span> Time Slot
//               </h2>
//               <div className="grid grid-cols-3 gap-3">
//                 {TIME_SLOTS.map((slot) => (
//                   <button
//                     key={slot.id}
//                     onClick={() => {
//                       setTimeSlot(slot.id);
//                       setErrors((prev) => ({ ...prev, timeSlot: undefined }));
//                     }}
//                     className={`p-4 border-4 font-bold transition-all text-left ${
//                       timeSlot === slot.id
//                         ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] translate-x-0 translate-y-0"
//                         : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
//                     }`}
//                   >
//                     <span className="text-2xl block mb-1">{slot.icon}</span>
//                     <span className="font-extrabold uppercase tracking-wider text-sm block">
//                       {slot.label}
//                     </span>
//                     <span
//                       className={`text-xs block mt-1 ${timeSlot === slot.id ? "text-emerald-200" : "text-emerald-600"}`}
//                     >
//                       {slot.range}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//               {errors.timeSlot && (
//                 <p className="text-red-600 font-bold text-sm mt-3 flex items-center gap-1">
//                   <span>⚠️</span> {errors.timeSlot}
//                 </p>
//               )}
//             </div>

//             {/* Address */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h2 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
//                 <span>📍</span> Pickup Address
//               </h2>
//               <textarea
//                 value={address}
//                 onChange={(e) => {
//                   setAddress(e.target.value);
//                   setErrors((prev) => ({ ...prev, address: undefined }));
//                 }}
//                 placeholder="Enter your full pickup address..."
//                 rows={3}
//                 className={`w-full px-4 py-3 border-4 font-medium text-emerald-950 text-base focus:outline-none focus:border-emerald-600 resize-none transition-colors placeholder:text-emerald-300 ${
//                   errors.address
//                     ? "border-red-500 bg-red-50"
//                     : "border-emerald-950"
//                 }`}
//               />
//               {errors.address && (
//                 <p className="text-red-600 font-bold text-sm mt-2 flex items-center gap-1">
//                   <span>⚠️</span> {errors.address}
//                 </p>
//               )}
//               <p className="text-xs text-emerald-500 font-medium mt-2">
//                 💡 This should match the location registered in your profile for
//                 driver matching.
//               </p>
//             </div>

//             {/* Notes (optional) */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h2 className="text-xl font-extrabold text-emerald-950 mb-1 flex items-center gap-2">
//                 <span>📝</span> Notes
//                 <span className="text-sm font-medium text-emerald-500 normal-case tracking-normal">
//                   (optional)
//                 </span>
//               </h2>
//               <p className="text-sm text-emerald-600 font-medium mb-3">
//                 Any special instructions for the driver?
//               </p>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="e.g. Ring the bell, items are near the gate..."
//                 rows={2}
//                 className="w-full px-4 py-3 border-4 border-emerald-200 font-medium text-emerald-950 text-base focus:outline-none focus:border-emerald-600 resize-none placeholder:text-emerald-300"
//               />
//             </div>

//             {/* Submit error */}
//             {errors.submit && (
//               <div className="bg-red-50 border-4 border-red-400 p-4">
//                 <p className="text-red-600 font-bold flex items-center gap-2">
//                   <span>⚠️</span> {errors.submit}
//                 </p>
//               </div>
//             )}

//             {/* Submit button */}
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="w-full py-5 bg-emerald-600 text-white font-extrabold text-xl uppercase tracking-widest border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 flex items-center justify-center gap-3"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
//                   Notifying Drivers...
//                 </>
//               ) : (
//                 <>
//                   <span>🚛</span> Confirm Pickup
//                 </>
//               )}
//             </button>
//           </div>

//           {/* ── Right: Order Summary ── */}
//           <div className="space-y-6">
//             {/* Points banner */}
//             <div className="bg-emerald-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <p className="text-emerald-200 font-bold uppercase tracking-widest text-xs mb-1">
//                 Points you'll earn
//               </p>
//               <p className="text-6xl font-extrabold text-white tracking-tighter leading-none">
//                 +{totalPoints}
//               </p>
//               <p className="text-emerald-300 text-sm font-medium mt-2">
//                 Credited after driver confirms pickup
//               </p>
//             </div>

//             {/* Items summary */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
//                   <span>📦</span> Items Summary
//                 </h3>
//                 <span className="bg-emerald-100 text-emerald-800 border-2 border-emerald-300 px-2 py-0.5 text-xs font-bold">
//                   {items.length} item{items.length !== 1 ? "s" : ""}
//                 </span>
//               </div>

//               {items.length === 0 ? (
//                 <div className="text-center py-8 bg-emerald-50 border-4 border-dashed border-emerald-200">
//                   <p className="text-emerald-500 font-medium text-sm">
//                     No items found.
//                   </p>
//                   <button
//                     onClick={() => navigate("/waste-classify")}
//                     className="mt-3 text-emerald-600 font-bold text-sm underline underline-offset-2"
//                   >
//                     Go back to scan
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-3 max-h-80 overflow-y-auto">
//                   {items.map((item) => {
//                     const config = pointsConfig[item.wasteType] ?? {};
//                     return (
//                       <div
//                         key={item.id}
//                         className="flex items-center gap-3 bg-gray-50 border-2 border-emerald-100 p-3"
//                       >
//                         {/* Thumbnail */}
//                         {item.image ? (
//                           <img
//                             src={item.image}
//                             alt={item.wasteType}
//                             className="w-12 h-12 object-cover border-2 border-emerald-200 flex-shrink-0"
//                           />
//                         ) : (
//                           <div
//                             className={`w-12 h-12 ${config.color} border-2 border-emerald-200 flex items-center justify-center flex-shrink-0 text-xl`}
//                           >
//                             {config.icon}
//                           </div>
//                         )}
//                         <div className="flex-1 min-w-0">
//                           <p className="font-bold text-emerald-950 text-sm flex items-center gap-1">
//                             {config.icon} {config.label}
//                           </p>
//                           <p className="text-xs text-emerald-600">
//                             {item.quantity} unit{item.quantity !== 1 ? "s" : ""}{" "}
//                             × {item.pointsPerUnit} pts
//                           </p>
//                         </div>
//                         <div className="text-right flex-shrink-0">
//                           <p className="font-extrabold text-emerald-600">
//                             +{item.totalPoints}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Breakdown footer */}
//               {items.length > 0 && (
//                 <div className="border-t-4 border-emerald-200 mt-4 pt-4 space-y-2">
//                   {/* Per-type subtotals */}
//                   {Object.entries(
//                     items.reduce((acc, item) => {
//                       acc[item.wasteType] =
//                         (acc[item.wasteType] ?? 0) + item.totalPoints;
//                       return acc;
//                     }, {}),
//                   ).map(([type, pts]) => (
//                     <div
//                       key={type}
//                       className="flex justify-between items-center text-sm"
//                     >
//                       <span className="text-emerald-700 font-medium">
//                         {pointsConfig[type]?.icon} {pointsConfig[type]?.label}
//                       </span>
//                       <span className="font-bold text-emerald-800">
//                         +{pts} pts
//                       </span>
//                     </div>
//                   ))}
//                   <div className="border-t-2 border-emerald-200 pt-2 flex justify-between items-center">
//                     <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
//                       Total
//                     </span>
//                     <span className="text-2xl font-extrabold text-emerald-600">
//                       +{totalPoints}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* How it works */}
//             <div className="bg-emerald-950 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-4">
//                 How it works
//               </h3>
//               <div className="space-y-4">
//                 {[
//                   {
//                     step: "01",
//                     label: "You confirm",
//                     desc: "Your booking is created and drivers in your area are notified.",
//                   },
//                   {
//                     step: "02",
//                     label: "Driver accepts",
//                     desc: "The first available driver in your location accepts the job.",
//                   },
//                   {
//                     step: "03",
//                     label: "Pickup done",
//                     desc: "Driver completes the pickup and marks it done in the app.",
//                   },
//                   {
//                     step: "04",
//                     label: "Points credited",
//                     desc: `+${totalPoints} points land in your account instantly.`,
//                   },
//                 ].map((s) => (
//                   <div key={s.step} className="flex gap-3">
//                     <span className="font-mono text-xs font-bold text-emerald-600 pt-0.5 flex-shrink-0 w-6">
//                       {s.step}
//                     </span>
//                     <div>
//                       <p className="font-bold text-white text-sm">{s.label}</p>
//                       <p className="text-emerald-400 text-xs font-medium mt-0.5">
//                         {s.desc}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchedulePickup;

//updated with api integration
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ── API Configuration ─────────────────────────────────────────────────────
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Points config mirrored from WasteClassification — keep in sync or move to a shared constants file
const pointsConfig = {
  glass: {
    points: 100,
    label: "Glass",
    color: "bg-cyan-600",
    textColor: "text-white",
    icon: "🍾",
  },
  plastic: {
    points: 5,
    label: "Plastic",
    color: "bg-red-500",
    textColor: "text-white",
    icon: "🥤",
  },
  cardboard: {
    points: 7,
    label: "Cardboard",
    color: "bg-yellow-600",
    textColor: "text-white",
    icon: "📦",
  },
  paper: {
    points: 3,
    label: "Paper",
    color: "bg-emerald-100",
    textColor: "text-emerald-950",
    icon: "📄",
  },
  metal: {
    points: 20,
    label: "Metal",
    color: "bg-gray-600",
    textColor: "text-white",
    icon: "🥫",
  },
  trash: {
    points: 10,
    label: "Mixed / Trash",
    color: "bg-black",
    textColor: "text-white",
    icon: "🗑️",
  },
};

// Minimum date helper — today in YYYY-MM-DD format for the date input min attribute
const todayString = () => new Date().toISOString().split("T")[0];

// Time slots offered to the user
const TIME_SLOTS = [
  { id: "morning", label: "Morning", range: "8:00 AM – 12:00 PM", icon: "🌅" },
  {
    id: "afternoon",
    label: "Afternoon",
    range: "12:00 PM – 4:00 PM",
    icon: "☀️",
  },
  { id: "evening", label: "Evening", range: "4:00 PM – 8:00 PM", icon: "🌇" },
];

const SchedulePickup = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Data passed from WasteClassification via router state
  const items = state?.items ?? [];
  const totalPoints = state?.totalPoints ?? 0;

  // Form state — now includes separate location field
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(""); // NEW: Separate location field for driver matching
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [driversNotified, setDriversNotified] = useState(0);
  const [errors, setErrors] = useState({});

  // ── Fetch user profile to pre-fill location ──────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/profile`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          // Pre-fill location from user's registered location if available
          if (data.location) {
            setLocation(data.location);
          }
          // Pre-fill address if available
          if (data.address) {
            setAddress(data.address);
          }
        }
      } catch {
        // Silent fail — user can manually enter
      }
    };
    fetchProfile();
  }, []);

  // Validation
  const validate = () => {
    const e = {};
    if (!date) e.date = "Please select a pickup date.";
    if (!timeSlot) e.timeSlot = "Please choose a time slot.";
    if (!address.trim()) e.address = "Please enter your pickup address.";
    if (!location.trim())
      e.location = "Please enter your location for driver matching.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit handler
  // PRODUCTION: POST /api/bookings
  // Body: { items, address, location, scheduledDate, timeSlot, notes }
  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          items,
          address,
          location, // NEW: Separate location field sent to backend
          scheduledDate: date,
          timeSlot:
            TIME_SLOTS.find((s) => s.id === timeSlot)?.range || timeSlot,
          notes: notes || "",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Booking failed");
      }

      const data = await res.json();
      setBookingId(data.bookingId);
      setDriversNotified(data.driversNotified || 0);
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: err.message || "Booking failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full">
          {/* Big stamp-style success card */}
          <div className="bg-white border-4 border-emerald-950 shadow-[16px_16px_0px_rgba(6,78,59,1)] p-8 text-center">
            <div className="w-24 h-24 bg-emerald-600 border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
              <span className="text-4xl">✓</span>
            </div>

            <div className="inline-block bg-emerald-950 text-emerald-400 font-mono text-xs px-3 py-1 mb-4 tracking-widest uppercase">
              Booking Confirmed
            </div>

            <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 mb-2">
              Pickup Scheduled!
            </h2>
            <p className="text-emerald-700 font-medium mb-6">
              {driversNotified > 0
                ? `${driversNotified} driver${driversNotified !== 1 ? "s" : ""} in your area have been notified. The first to accept will be assigned to your pickup.`
                : "Your booking has been created. We'll notify drivers in your area shortly."}
            </p>

            {/* Booking details summary */}
            <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6 text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  Booking ID
                </span>
                <span className="font-mono font-bold text-emerald-950">
                  {bookingId}
                </span>
              </div>
              <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  Date
                </span>
                <span className="font-bold text-emerald-950">{date}</span>
              </div>
              <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  Time
                </span>
                <span className="font-bold text-emerald-950">
                  {TIME_SLOTS.find((s) => s.id === timeSlot)?.range}
                </span>
              </div>
              <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  Location
                </span>
                <span className="font-bold text-emerald-950">{location}</span>
              </div>
              <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  Items
                </span>
                <span className="font-bold text-emerald-950">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="border-t-2 border-emerald-200 pt-3 flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  Points Pending
                </span>
                <span className="text-2xl font-extrabold text-emerald-600">
                  +{totalPoints}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/user/pickup-history")}
                className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                View Pickups
              </button>
              <button
                onClick={() => navigate("/user/classify")}
                className="flex-1 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Scan More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ──
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-wider text-sm mb-4 hover:text-emerald-950 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
            Schedule <span className="text-emerald-600">Pickup</span>
          </h1>
          <p className="text-emerald-800 font-medium text-lg">
            Choose a date, time, and location — nearby drivers will be notified
            instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ── Left: Form ── */}
          <div className="space-y-6">
            {/* Date picker */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h2 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
                <span>📅</span> Pickup Date
              </h2>
              <input
                type="date"
                value={date}
                min={todayString()}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors((prev) => ({ ...prev, date: undefined }));
                }}
                className={`w-full h-14 px-4 border-4 font-bold text-emerald-950 text-lg focus:outline-none focus:border-emerald-600 transition-colors ${
                  errors.date
                    ? "border-red-500 bg-red-50"
                    : "border-emerald-950"
                }`}
              />
              {errors.date && (
                <p className="text-red-600 font-bold text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.date}
                </p>
              )}
            </div>

            {/* Time slot selector */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h2 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
                <span>⏰</span> Time Slot
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => {
                      setTimeSlot(slot.id);
                      setErrors((prev) => ({ ...prev, timeSlot: undefined }));
                    }}
                    className={`p-4 border-4 font-bold transition-all text-left ${
                      timeSlot === slot.id
                        ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] translate-x-0 translate-y-0"
                        : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{slot.icon}</span>
                    <span className="font-extrabold uppercase tracking-wider text-sm block">
                      {slot.label}
                    </span>
                    <span
                      className={`text-xs block mt-1 ${timeSlot === slot.id ? "text-emerald-200" : "text-emerald-600"}`}
                    >
                      {slot.range}
                    </span>
                  </button>
                ))}
              </div>
              {errors.timeSlot && (
                <p className="text-red-600 font-bold text-sm mt-3 flex items-center gap-1">
                  <span>⚠️</span> {errors.timeSlot}
                </p>
              )}
            </div>

            {/* Location — NEW SEPARATE FIELD */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h2 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
                <span>📍</span> Location
                <span className="text-sm font-medium text-emerald-500 normal-case tracking-normal ml-2">
                  (for driver matching)
                </span>
              </h2>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setErrors((prev) => ({ ...prev, location: undefined }));
                }}
                placeholder="e.g. Ernakulam, Kochi, etc."
                className={`w-full px-4 py-3 border-4 font-bold text-emerald-950 text-lg focus:outline-none focus:border-emerald-600 transition-colors placeholder:font-normal placeholder:text-emerald-300 ${
                  errors.location
                    ? "border-red-500 bg-red-50"
                    : "border-emerald-950"
                }`}
              />
              {errors.location && (
                <p className="text-red-600 font-bold text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.location}
                </p>
              )}
              <p className="text-xs text-emerald-500 font-medium mt-2">
                💡 This must match a driver's registered place for pickup
                matching to work. Used to find nearby drivers.
              </p>
            </div>

            {/* Address */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h2 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
                <span>🏠</span> Pickup Address
              </h2>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((prev) => ({ ...prev, address: undefined }));
                }}
                placeholder="Enter your full pickup address..."
                rows={3}
                className={`w-full px-4 py-3 border-4 font-medium text-emerald-950 text-base focus:outline-none focus:border-emerald-600 resize-none transition-colors placeholder:text-emerald-300 ${
                  errors.address
                    ? "border-red-500 bg-red-50"
                    : "border-emerald-950"
                }`}
              />
              {errors.address && (
                <p className="text-red-600 font-bold text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.address}
                </p>
              )}
              <p className="text-xs text-emerald-500 font-medium mt-2">
                💡 This is the specific address where the driver will pick up
                your items.
              </p>
            </div>

            {/* Notes (optional) */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h2 className="text-xl font-extrabold text-emerald-950 mb-1 flex items-center gap-2">
                <span>📝</span> Notes
                <span className="text-sm font-medium text-emerald-500 normal-case tracking-normal">
                  (optional)
                </span>
              </h2>
              <p className="text-sm text-emerald-600 font-medium mb-3">
                Any special instructions for the driver?
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ring the bell, items are near the gate..."
                rows={2}
                className="w-full px-4 py-3 border-4 border-emerald-200 font-medium text-emerald-950 text-base focus:outline-none focus:border-emerald-600 resize-none placeholder:text-emerald-300"
              />
            </div>

            {/* Submit error */}
            {errors.submit && (
              <div className="bg-red-50 border-4 border-red-400 p-4">
                <p className="text-red-600 font-bold flex items-center gap-2">
                  <span>⚠️</span> {errors.submit}
                </p>
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-5 bg-emerald-600 text-white font-extrabold text-xl uppercase tracking-widest border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  Notifying Drivers...
                </>
              ) : (
                <>
                  <span>🚛</span> Confirm Pickup
                </>
              )}
            </button>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="space-y-6">
            {/* Points banner */}
            <div className="bg-emerald-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <p className="text-emerald-200 font-bold uppercase tracking-widest text-xs mb-1">
                Points you'll earn
              </p>
              <p className="text-6xl font-extrabold text-white tracking-tighter leading-none">
                +{totalPoints}
              </p>
              <p className="text-emerald-300 text-sm font-medium mt-2">
                Credited after driver confirms pickup
              </p>
            </div>

            {/* Items summary */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
                  <span>📦</span> Items Summary
                </h3>
                <span className="bg-emerald-100 text-emerald-800 border-2 border-emerald-300 px-2 py-0.5 text-xs font-bold">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </span>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8 bg-emerald-50 border-4 border-dashed border-emerald-200">
                  <p className="text-emerald-500 font-medium text-sm">
                    No items found.
                  </p>
                  <button
                    onClick={() => navigate("/user/classify")}
                    className="mt-3 text-emerald-600 font-bold text-sm underline underline-offset-2"
                  >
                    Go back to scan
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {items.map((item) => {
                    const config = pointsConfig[item.wasteType] ?? {};
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 bg-gray-50 border-2 border-emerald-100 p-3"
                      >
                        {/* Thumbnail */}
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.wasteType}
                            className="w-12 h-12 object-cover border-2 border-emerald-200 flex-shrink-0"
                          />
                        ) : (
                          <div
                            className={`w-12 h-12 ${config.color} border-2 border-emerald-200 flex items-center justify-center flex-shrink-0 text-xl`}
                          >
                            {config.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-emerald-950 text-sm flex items-center gap-1">
                            {config.icon} {config.label}
                          </p>
                          <p className="text-xs text-emerald-600">
                            {item.quantity} unit{item.quantity !== 1 ? "s" : ""}{" "}
                            × {item.pointsPerUnit} pts
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-extrabold text-emerald-600">
                            +{item.totalPoints}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Breakdown footer */}
              {items.length > 0 && (
                <div className="border-t-4 border-emerald-200 mt-4 pt-4 space-y-2">
                  {/* Per-type subtotals */}
                  {Object.entries(
                    items.reduce((acc, item) => {
                      acc[item.wasteType] =
                        (acc[item.wasteType] ?? 0) + item.totalPoints;
                      return acc;
                    }, {}),
                  ).map(([type, pts]) => (
                    <div
                      key={type}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-emerald-700 font-medium">
                        {pointsConfig[type]?.icon} {pointsConfig[type]?.label}
                      </span>
                      <span className="font-bold text-emerald-800">
                        +{pts} pts
                      </span>
                    </div>
                  ))}
                  <div className="border-t-2 border-emerald-200 pt-2 flex justify-between items-center">
                    <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
                      Total
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-600">
                      +{totalPoints}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* How it works */}
            <div className="bg-emerald-950 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-4">
                How it works
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    label: "You confirm",
                    desc: "Your booking is created and drivers in your area are notified.",
                  },
                  {
                    step: "02",
                    label: "Driver accepts",
                    desc: "The first available driver in your location accepts the job.",
                  },
                  {
                    step: "03",
                    label: "Pickup done",
                    desc: "Driver completes the pickup and marks it done in the app.",
                  },
                  {
                    step: "04",
                    label: "Points credited",
                    desc: `+${totalPoints} points land in your account instantly.`,
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-600 pt-0.5 flex-shrink-0 w-6">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-bold text-white text-sm">{s.label}</p>
                      <p className="text-emerald-400 text-xs font-medium mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePickup;
