// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // Waste type icon map — matches WasteClassification + PickupHistory
// const WASTE_ICONS = {
//   glass: "🍾",
//   plastic: "🥤",
//   cardboard: "📦",
//   paper: "📄",
//   metal: "🥫",
//   mixed: "♻️",
// };

// // ── Info row ───────────────────────────────────────────────────────────────
// const InfoRow = ({ icon, label, value }) => (
//   <div className="flex items-start gap-3 p-4 bg-emerald-50 border-2 border-emerald-200">
//     <span className="text-2xl flex-shrink-0">{icon}</span>
//     <div className="min-w-0">
//       <p className="font-bold text-emerald-950 text-sm uppercase tracking-wider">
//         {label}
//       </p>
//       <p className="text-emerald-700 font-medium mt-0.5 break-words">{value}</p>
//     </div>
//   </div>
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const BookingDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [accepting, setAccepting] = useState(false);
//   const [declining, setDeclining] = useState(false);
//   const [actionDone, setActionDone] = useState(null); // "accepted" | "taken" | "declined"

//   // ── Fetch booking by ID ──────────────────────────────────────────────────
//   // PRODUCTION: GET /api/driver/bookings/:id
//   // Response: { id, userName, address, scheduledDate, timeSlot,
//   //             items: [{ wasteType, quantity }], notes }
//   useEffect(() => {
//     const fetchBooking = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch(`/api/driver/bookings/${id}`, {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Booking not found");
//         // const data = await res.json();
//         // setBooking(data);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 800));
//         setBooking({
//           id,
//           userName: "John Doe",
//           address: "123 Green Street, Eco City, Ernakulam",
//           scheduledDate: "2024-03-28",
//           timeSlot: "Morning (8:00 AM – 12:00 PM)",
//           items: [
//             { wasteType: "plastic", quantity: 5 },
//             { wasteType: "glass", quantity: 3 },
//           ],
//           notes: "Please ring the doorbell. Items are kept near the gate.",
//         });
//         // ── END SIMULATION ──
//       } catch (err) {
//         setError(err.message ?? "Failed to load booking.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBooking();
//   }, [id]);

//   // ── Accept ────────────────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/driver/bookings/:id/accept
//   // 200 → assigned to this driver, navigate to active pickup
//   // 409 → another driver accepted first, show "already taken" screen
//   const handleAccept = async () => {
//     setAccepting(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch(`/api/driver/bookings/${id}/accept`, {
//       //   method: "POST",
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });
//       // if (res.status === 409) { setActionDone("taken"); return; }
//       // if (!res.ok) throw new Error("Accept failed");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 1200));

//       setActionDone("accepted");
//       setTimeout(() => navigate(`/driver/active-pickup/${id}`), 2000);
//     } catch {
//       setError("Failed to accept booking. Please try again.");
//     } finally {
//       setAccepting(false);
//     }
//   };

//   // ── Decline ───────────────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/driver/bookings/:id/decline
//   // Marks this driver's notification as declined — booking stays open for others
//   const handleDecline = async () => {
//     setDeclining(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // await fetch(`/api/driver/bookings/${id}/decline`, {
//       //   method: "POST",
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 800));

//       setActionDone("declined");
//       setTimeout(() => navigate("/driver/dashboard"), 1800);
//     } catch {
//       setError("Failed to decline. Please try again.");
//     } finally {
//       setDeclining(false);
//     }
//   };

//   // ── Action done screens ───────────────────────────────────────────────────
//   if (actionDone) {
//     const screens = {
//       accepted: {
//         icon: "✅",
//         title: "Booking Accepted!",
//         sub: "Navigating to active pickup...",
//         color: "border-emerald-600",
//         shadow: "shadow-[12px_12px_0px_rgba(6,78,59,1)]",
//       },
//       taken: {
//         icon: "⚡",
//         title: "Already Taken",
//         sub: "Another driver accepted this booking first. Going back to dashboard...",
//         color: "border-amber-500",
//         shadow: "shadow-[12px_12px_0px_rgba(245,158,11,0.5)]",
//       },
//       declined: {
//         icon: "↩️",
//         title: "Booking Declined",
//         sub: "Going back to dashboard...",
//         color: "border-gray-400",
//         shadow: "shadow-[12px_12px_0px_rgba(156,163,175,0.5)]",
//       },
//     };
//     const s = screens[actionDone];
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div
//           className={`bg-white border-4 ${s.color} p-12 ${s.shadow} text-center max-w-sm w-full`}
//         >
//           <span className="text-6xl mb-4 block">{s.icon}</span>
//           <h2 className="text-3xl font-extrabold text-emerald-950 mb-2">
//             {s.title}
//           </h2>
//           <p className="text-emerald-600 font-medium">{s.sub}</p>
//           <div className="mt-6 w-full h-1 bg-emerald-100 overflow-hidden">
//             <div
//               className="h-full bg-emerald-600 animate-[shimmer_1.5s_ease-in-out_infinite]"
//               style={{ animation: "width 2s linear forwards", width: "100%" }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error && !booking) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
//           <span className="text-5xl block mb-4">⚠️</span>
//           <p className="font-extrabold text-red-600 text-xl mb-6">{error}</p>
//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//             >
//               ← Back
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Formatted date ────────────────────────────────────────────────────────
//   const formattedDate = booking
//     ? new Date(booking.scheduledDate).toLocaleDateString("en-US", {
//         weekday: "long",
//         month: "long",
//         day: "numeric",
//       })
//     : "";

//   // ── Main render ───────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className="text-emerald-600 font-bold mb-6 hover:text-emerald-950 transition-colors flex items-center gap-1 uppercase tracking-wider text-sm"
//         >
//           ← Back
//         </button>

//         <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-6 pb-4 border-b-4 border-emerald-100">
//             <div>
//               <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 mb-1">
//                 Booking Request
//               </p>
//               {loading ? (
//                 <Skeleton className="h-8 w-48 rounded" />
//               ) : (
//                 <>
//                   <h1 className="text-3xl font-extrabold text-emerald-950">
//                     {booking.userName}
//                   </h1>
//                   <p className="font-mono text-sm text-emerald-400 mt-0.5">
//                     {booking.id}
//                   </p>
//                 </>
//               )}
//             </div>
//             <span className="bg-blue-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-2 border-4 border-blue-950 flex-shrink-0">
//               Pending
//             </span>
//           </div>

//           {/* Info rows */}
//           {loading ? (
//             <div className="space-y-3 mb-6">
//               {[...Array(3)].map((_, i) => (
//                 <Skeleton key={i} className="h-16 w-full rounded" />
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-3 mb-6">
//               <InfoRow
//                 icon="📍"
//                 label="Pickup Address"
//                 value={booking.address}
//               />
//               <InfoRow icon="📅" label="Scheduled Date" value={formattedDate} />
//               <InfoRow icon="⏰" label="Time Slot" value={booking.timeSlot} />
//             </div>
//           )}

//           {/* Items to collect */}
//           <div className="bg-blue-50 border-4 border-blue-200 p-5 mb-6">
//             <h3 className="text-base font-extrabold text-blue-900 uppercase tracking-wider mb-4">
//               Items to Collect
//             </h3>
//             {loading ? (
//               <div className="space-y-3">
//                 {[...Array(2)].map((_, i) => (
//                   <Skeleton key={i} className="h-12 w-full rounded" />
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 {booking.items.map((item, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 p-3 bg-white border-2 border-blue-100"
//                   >
//                     <span className="text-2xl">
//                       {WASTE_ICONS[item.wasteType] ?? "♻️"}
//                     </span>
//                     <div className="flex-1">
//                       <p className="font-bold text-blue-900 capitalize">
//                         {item.wasteType}
//                       </p>
//                     </div>
//                     <span className="bg-blue-100 border-2 border-blue-200 px-3 py-1 text-sm font-extrabold text-blue-800">
//                       ×{item.quantity}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Notes */}
//           {!loading && booking.notes && (
//             <div className="bg-yellow-50 border-4 border-yellow-300 p-4 mb-6">
//               <p className="font-extrabold text-yellow-800 text-sm uppercase tracking-wider mb-1">
//                 📝 Customer Notes
//               </p>
//               <p className="text-yellow-700 font-medium">{booking.notes}</p>
//             </div>
//           )}

//           {/* Inline error (post-load) */}
//           {error && booking && (
//             <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//               <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleDecline}
//               disabled={declining || accepting}
//               className={`flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
//                 ${
//                   declining || accepting
//                     ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "bg-red-50 text-red-700 border-red-300 shadow-[4px_4px_0px_rgba(254,202,202,1)] hover:shadow-[2px_2px_0px_rgba(254,202,202,1)] hover:translate-x-0.5 hover:translate-y-0.5"
//                 }`}
//             >
//               {declining ? (
//                 <>
//                   <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                   Declining...
//                 </>
//               ) : (
//                 "✕ Decline"
//               )}
//             </button>

//             <button
//               onClick={handleAccept}
//               disabled={accepting || declining}
//               className={`flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
//                 ${
//                   accepting || declining
//                     ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                     : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
//                 }`}
//             >
//               {accepting ? (
//                 <>
//                   <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />{" "}
//                   Accepting...
//                 </>
//               ) : (
//                 "✅ Accept Pickup"
//               )}
//             </button>
//           </div>

//           <p className="text-xs text-emerald-400 text-center mt-3 font-medium">
//             First driver to accept gets assigned this job
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetail;

//updated with api integration with the back end

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

// Waste type icon map — matches WasteClassification + PickupHistory
const WASTE_ICONS = {
  glass: "🍾",
  plastic: "🥤",
  cardboard: "📦",
  paper: "📄",
  metal: "🥫",
  mixed: "♻️",
};

// ── Info row ───────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 bg-emerald-50 border-2 border-emerald-200">
    <span className="text-2xl flex-shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="font-bold text-emerald-950 text-sm uppercase tracking-wider">
        {label}
      </p>
      <p className="text-emerald-700 font-medium mt-0.5 break-words">{value}</p>
    </div>
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [actionDone, setActionDone] = useState(null); // "accepted" | "taken" | "declined"

  // ── Fetch booking by ID ──────────────────────────────────────────────────
  const fetchBooking = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 404) throw new Error("Booking not found");
        if (res.status === 403) throw new Error("Access denied");
        throw new Error("Failed to load booking");
      }

      const data = await res.json();
      setBooking(data);
    } catch (err) {
      setError(err.message ?? "Failed to load booking.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  // ── Accept ────────────────────────────────────────────────────────────────
  const handleAccept = async () => {
    setAccepting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}/accept`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (res.status === 409) {
        setActionDone("taken");
        setTimeout(() => navigate("/driver/dashboard"), 3000);
        return;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Accept failed");
      }

      const data = await res.json();
      setActionDone("accepted");
      setTimeout(() => navigate(`/driver/active-pickup/${id}`), 2000);
    } catch (err) {
      setError(err.message || "Failed to accept booking. Please try again.");
    } finally {
      setAccepting(false);
    }
  };

  // ── Decline ───────────────────────────────────────────────────────────────
  const handleDecline = async () => {
    setDeclining(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}/decline`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Decline failed");
      }

      setActionDone("declined");
      setTimeout(() => navigate("/driver/dashboard"), 1800);
    } catch (err) {
      setError(err.message || "Failed to decline. Please try again.");
    } finally {
      setDeclining(false);
    }
  };

  // ── Action done screens ───────────────────────────────────────────────────
  if (actionDone) {
    const screens = {
      accepted: {
        icon: "✅",
        title: "Booking Accepted!",
        sub: "Navigating to active pickup...",
        color: "border-emerald-600",
        shadow: "shadow-[12px_12px_0px_rgba(6,78,59,1)]",
      },
      taken: {
        icon: "⚡",
        title: "Already Taken",
        sub: "Another driver accepted this booking first. Going back to dashboard...",
        color: "border-amber-500",
        shadow: "shadow-[12px_12px_0px_rgba(245,158,11,0.5)]",
      },
      declined: {
        icon: "↩️",
        title: "Booking Declined",
        sub: "Going back to dashboard...",
        color: "border-gray-400",
        shadow: "shadow-[12px_12px_0px_rgba(156,163,175,0.5)]",
      },
    };
    const s = screens[actionDone];
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div
          className={`bg-white border-4 ${s.color} p-12 ${s.shadow} text-center max-w-sm w-full`}
        >
          <span className="text-6xl mb-4 block">{s.icon}</span>
          <h2 className="text-3xl font-extrabold text-emerald-950 mb-2">
            {s.title}
          </h2>
          <p className="text-emerald-600 font-medium">{s.sub}</p>
          <div className="mt-6 w-full h-1 bg-emerald-100 overflow-hidden">
            <div
              className="h-full bg-emerald-600 animate-[shimmer_1.5s_ease-in-out_infinite]"
              style={{ animation: "width 2s linear forwards", width: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && !booking) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              ← Back
            </button>
            <button
              onClick={fetchBooking}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Formatted date ────────────────────────────────────────────────────────
  const formattedDate = booking
    ? new Date(booking.scheduledDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  // ── Status badge color mapping ────────────────────────────────────────────
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-blue-600 border-blue-950 text-white",
      accepted: "bg-emerald-600 border-emerald-950 text-white",
      in_progress: "bg-amber-500 border-amber-950 text-white",
      completed: "bg-gray-600 border-gray-950 text-white",
    };
    return styles[status] || styles.pending;
  };

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-emerald-600 font-bold mb-6 hover:text-emerald-950 transition-colors flex items-center gap-1 uppercase tracking-wider text-sm"
        >
          ← Back
        </button>

        <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 pb-4 border-b-4 border-emerald-100">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 mb-1">
                Booking Request
              </p>
              {loading ? (
                <Skeleton className="h-8 w-48 rounded" />
              ) : (
                <>
                  <h1 className="text-3xl font-extrabold text-emerald-950">
                    {booking.userName}
                  </h1>
                  <p className="font-mono text-sm text-emerald-400 mt-0.5">
                    {booking.id}
                  </p>
                </>
              )}
            </div>
            <span
              className={`${getStatusBadge(booking?.status)} text-xs font-extrabold uppercase tracking-widest px-3 py-2 border-4 flex-shrink-0`}
            >
              {booking?.status || "Loading..."}
            </span>
          </div>

          {/* Info rows */}
          {loading ? (
            <div className="space-y-3 mb-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              <InfoRow
                icon="📍"
                label="Pickup Address"
                value={booking.address}
              />
              <InfoRow icon="📅" label="Scheduled Date" value={formattedDate} />
              <InfoRow icon="⏰" label="Time Slot" value={booking.timeSlot} />
              {booking.driverName && (
                <InfoRow icon="🚚" label="Driver" value={booking.driverName} />
              )}
            </div>
          )}

          {/* Items to collect */}
          <div className="bg-blue-50 border-4 border-blue-200 p-5 mb-6">
            <h3 className="text-base font-extrabold text-blue-900 uppercase tracking-wider mb-4">
              Items to Collect
            </h3>
            {loading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {booking.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white border-2 border-blue-100"
                  >
                    <span className="text-2xl">
                      {WASTE_ICONS[item.wasteType] ?? "♻️"}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold text-blue-900 capitalize">
                        {item.wasteType}
                      </p>
                    </div>
                    <span className="bg-blue-100 border-2 border-blue-200 px-3 py-1 text-sm font-extrabold text-blue-800">
                      ×{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          {!loading && booking.notes && (
            <div className="bg-yellow-50 border-4 border-yellow-300 p-4 mb-6">
              <p className="font-extrabold text-yellow-800 text-sm uppercase tracking-wider mb-1">
                📝 Customer Notes
              </p>
              <p className="text-yellow-700 font-medium">{booking.notes}</p>
            </div>
          )}

          {/* Points Awarded (if available) */}
          {!loading && booking.pointsAwarded > 0 && (
            <div className="bg-purple-50 border-4 border-purple-200 p-4 mb-6">
              <p className="font-extrabold text-purple-800 text-sm uppercase tracking-wider mb-1">
                🎁 Reward Points
              </p>
              <p className="text-purple-700 font-medium">
                Customer will earn <strong>{booking.pointsAwarded}</strong>{" "}
                points for this pickup
              </p>
            </div>
          )}

          {/* Inline error (post-load) */}
          {error && booking && (
            <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
              <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
            </div>
          )}

          {/* Actions - Only show for pending bookings */}
          {!loading && booking?.status === "pending" && (
            <>
              <div className="flex gap-4">
                <button
                  onClick={handleDecline}
                  disabled={declining || accepting}
                  className={`flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                    ${
                      declining || accepting
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-red-50 text-red-700 border-red-300 shadow-[4px_4px_0px_rgba(254,202,202,1)] hover:shadow-[2px_2px_0px_rgba(254,202,202,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                    }`}
                >
                  {declining ? (
                    <>
                      <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                      Declining...
                    </>
                  ) : (
                    "✕ Decline"
                  )}
                </button>

                <button
                  onClick={handleAccept}
                  disabled={accepting || declining}
                  className={`flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                    ${
                      accepting || declining
                        ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                        : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
                    }`}
                >
                  {accepting ? (
                    <>
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />{" "}
                      Accepting...
                    </>
                  ) : (
                    "✅ Accept Pickup"
                  )}
                </button>
              </div>

              <p className="text-xs text-emerald-400 text-center mt-3 font-medium">
                First driver to accept gets assigned this job
              </p>
            </>
          )}

          {/* Navigation for non-pending bookings */}
          {!loading && booking?.status !== "pending" && (
            <div className="flex gap-4">
              {booking?.status === "accepted" && (
                <button
                  onClick={() => navigate(`/driver/active-pickup/${id}`)}
                  className="flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Go to Active Pickup →
                </button>
              )}
              <button
                onClick={() => navigate("/driver/dashboard")}
                className="flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 bg-white text-emerald-950 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
