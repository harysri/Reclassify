// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Waste type icons — matches WasteClassification ────────────────────────
// const WASTE_ICONS = {
//   glass: "🍾",
//   plastic: "🥤",
//   cardboard: "📦",
//   paper: "📄",
//   metal: "🥫",
//   mixed: "♻️",
// };

// // ── Main component ─────────────────────────────────────────────────────────
// const DriverDashboard = () => {
//   const navigate = useNavigate();

//   // ── State ────────────────────────────────────────────────────────────────
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [driver, setDriver] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [pendingBookings, setPendingBookings] = useState([]);
//   const [accepting, setAccepting] = useState(null); // bookingId being accepted

//   // ── Fetch dashboard data ─────────────────────────────────────────────────
//   // PRODUCTION: GET /api/driver/dashboard
//   // Response: { driver: { fullName, place, isVerified }, stats: { completedPickups, pendingRequests, totalPickups },
//   //             pendingBookings: [{ id, userId, userName, address, items, scheduledDate, timeSlot }] }
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/driver/dashboard", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load dashboard");
//         // const data = await res.json();
//         // setDriver(data.driver);
//         // setStats(data.stats);
//         // setPendingBookings(data.pendingBookings);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 1000));
//         setDriver({
//           fullName: "Mike S.",
//           place: "Ernakulam",
//           isVerified: true,
//         });
//         setStats({
//           completedPickups: 24,
//           pendingRequests: 3,
//           totalPickups: 27,
//         });
//         setPendingBookings([
//           {
//             id: "BK-482931",
//             userName: "John Doe",
//             address: "123 Green Street, Eco City, Ernakulam",
//             items: [
//               { wasteType: "plastic", quantity: 3 },
//               { wasteType: "glass", quantity: 1 },
//             ],
//             scheduledDate: "2024-03-28",
//             timeSlot: "Morning (8 AM – 12 PM)",
//           },
//           {
//             id: "BK-391827",
//             userName: "Jane Smith",
//             address: "456 Eco Avenue, Ernakulam",
//             items: [{ wasteType: "cardboard", quantity: 2 }],
//             scheduledDate: "2024-03-28",
//             timeSlot: "Afternoon (12 PM – 4 PM)",
//           },
//           {
//             id: "BK-281047",
//             userName: "Priya K.",
//             address: "789 Sustainable Road, Ernakulam",
//             items: [
//               { wasteType: "metal", quantity: 1 },
//               { wasteType: "paper", quantity: 4 },
//             ],
//             scheduledDate: "2024-03-29",
//             timeSlot: "Morning (8 AM – 12 PM)",
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   // ── Accept booking ────────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/driver/bookings/:id/accept
//   // Uses atomic findOneAndUpdate on backend — first driver to call wins
//   // Response 200: booking assigned | Response 409: already taken by another driver
//   const handleAccept = async (bookingId) => {
//     setAccepting(bookingId);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch(`/api/driver/bookings/${bookingId}/accept`, {
//       //   method: "POST",
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });
//       // if (res.status === 409) {
//       //   // Another driver accepted first — remove from list
//       //   setPendingBookings((prev) => prev.filter((b) => b.id !== bookingId));
//       //   return;
//       // }
//       // if (!res.ok) throw new Error("Accept failed");
//       // Navigate to active booking detail
//       // navigate(`/driver/booking/${bookingId}`);

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 1200));
//       navigate(`/driver/booking/${bookingId}`);
//       // ── END SIMULATION ──
//     } catch {
//       setError("Failed to accept booking. Please try again.");
//     } finally {
//       setAccepting(null);
//     }
//   };

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
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           {loading ? (
//             <>
//               <Skeleton className="h-12 w-72 mb-3 rounded" />
//               <Skeleton className="h-5 w-48 rounded" />
//             </>
//           ) : (
//             <>
//               <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-1">
//                 Welcome,{" "}
//                 <span className="text-blue-600">{driver?.fullName}!</span>
//               </h1>
//               <div className="flex flex-wrap items-center gap-3 mt-2">
//                 <p className="text-emerald-800 font-medium">
//                   Operating zone:{" "}
//                   <span className="font-extrabold text-emerald-950">
//                     {driver?.place}
//                   </span>
//                 </p>
//                 {/* Verification status — critical: unverified drivers can't receive bookings */}
//                 {driver?.isVerified ? (
//                   <span className="bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-emerald-950">
//                     ✓ Verified
//                   </span>
//                 ) : (
//                   <span className="bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-amber-800">
//                     ⏳ Pending Verification
//                   </span>
//                 )}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Unverified warning banner */}
//         {!loading && !driver?.isVerified && (
//           <div className="bg-amber-50 border-4 border-amber-400 p-4 mb-8 flex items-start gap-3">
//             <span className="text-2xl flex-shrink-0">⚠️</span>
//             <div>
//               <p className="font-extrabold text-amber-800">
//                 Account not yet verified
//               </p>
//               <p className="text-amber-700 text-sm font-medium mt-0.5">
//                 An admin needs to verify your license and credentials before you
//                 can receive pickup requests.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Stats — only relevant operational stats */}
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           {[
//             {
//               label: "Total Pickups",
//               value: stats?.totalPickups,
//               icon: "🚛",
//               color: "bg-white",
//             },
//             {
//               label: "Completed",
//               value: stats?.completedPickups,
//               icon: "✅",
//               color: "bg-white",
//             },
//             {
//               label: "Pending Requests",
//               value: stats?.pendingRequests,
//               icon: "⏳",
//               color: "bg-blue-600",
//             },
//           ].map((stat, i) => (
//             <div
//               key={i}
//               className={`${stat.color} border-4 border-emerald-950 p-5 shadow-[6px_6px_0px_rgba(6,78,59,1)]`}
//             >
//               <div className="text-2xl mb-2">{stat.icon}</div>
//               {loading ? (
//                 <Skeleton className="h-9 w-16 mb-1 rounded" />
//               ) : (
//                 <p
//                   className={`text-3xl font-extrabold ${stat.color === "bg-blue-600" ? "text-white" : "text-emerald-950"}`}
//                 >
//                   {stat.value ?? "—"}
//                 </p>
//               )}
//               <p
//                 className={`text-xs font-bold uppercase tracking-wider mt-1 ${stat.color === "bg-blue-600" ? "text-blue-100" : "text-emerald-600"}`}
//               >
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* ── Pending bookings ── */}
//           <div className="lg:col-span-2">
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-emerald-100">
//                 <h2 className="text-2xl font-extrabold text-emerald-950">
//                   Pending Pickup Requests
//                 </h2>
//                 {!loading && (
//                   <span className="bg-blue-600 text-white px-3 py-1 font-bold text-sm border-4 border-blue-950">
//                     {pendingBookings.length} new
//                   </span>
//                 )}
//               </div>

//               {/* Loading skeletons */}
//               {loading ? (
//                 <div className="space-y-4">
//                   {[...Array(3)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="border-4 border-blue-100 p-4 space-y-3"
//                     >
//                       <div className="flex justify-between">
//                         <Skeleton className="h-5 w-32 rounded" />
//                         <Skeleton className="h-5 w-20 rounded" />
//                       </div>
//                       <Skeleton className="h-4 w-full rounded" />
//                       <Skeleton className="h-4 w-48 rounded" />
//                       <div className="flex gap-3 pt-1">
//                         <Skeleton className="h-12 flex-1 rounded" />
//                         <Skeleton className="h-12 flex-1 rounded" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : !driver?.isVerified ? (
//                 // Verified gate — unverified drivers see a lock state
//                 <div className="text-center py-12 bg-amber-50 border-4 border-dashed border-amber-300">
//                   <span className="text-5xl block mb-3">🔒</span>
//                   <p className="font-extrabold text-amber-800">
//                     Verification required
//                   </p>
//                   <p className="text-amber-600 text-sm font-medium mt-1">
//                     Pickup requests will appear here once your account is
//                     verified by an admin.
//                   </p>
//                 </div>
//               ) : pendingBookings.length === 0 ? (
//                 <div className="text-center py-12 bg-emerald-50 border-4 border-dashed border-emerald-200">
//                   <span className="text-5xl block mb-3">📭</span>
//                   <p className="font-extrabold text-emerald-800">
//                     No pending requests
//                   </p>
//                   <p className="text-emerald-500 text-sm font-medium mt-1">
//                     New pickup requests in {driver?.place} will appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {pendingBookings.map((booking) => (
//                     <div
//                       key={booking.id}
//                       className="bg-blue-50 border-4 border-blue-200 p-4 hover:border-blue-400 transition-all"
//                     >
//                       {/* Booking header */}
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <p className="font-extrabold text-blue-900 text-lg">
//                             {booking.userName}
//                           </p>
//                           <p className="text-blue-700 text-sm font-medium">
//                             {booking.address}
//                           </p>
//                         </div>
//                         <span className="font-mono text-xs font-bold text-blue-500 flex-shrink-0 ml-2">
//                           {booking.id}
//                         </span>
//                       </div>

//                       {/* Schedule */}
//                       <div className="flex flex-wrap items-center gap-3 text-sm text-blue-800 font-medium mb-3">
//                         <span>
//                           📅{" "}
//                           {new Date(booking.scheduledDate).toLocaleDateString(
//                             "en-US",
//                             { month: "short", day: "numeric" },
//                           )}
//                         </span>
//                         <span>⏰ {booking.timeSlot}</span>
//                       </div>

//                       {/* Waste items with icons */}
//                       <div className="flex flex-wrap gap-1 mb-4">
//                         {booking.items.map((item, idx) => (
//                           <span
//                             key={idx}
//                             className="inline-flex items-center gap-1 bg-white border-2 border-blue-200 px-2 py-0.5 text-xs font-bold text-blue-800"
//                           >
//                             <span>{WASTE_ICONS[item.wasteType] ?? "♻️"}</span>
//                             <span className="capitalize">{item.wasteType}</span>
//                             {item.quantity > 1 && (
//                               <span className="text-blue-400">
//                                 ×{item.quantity}
//                               </span>
//                             )}
//                           </span>
//                         ))}
//                       </div>

//                       {/* Actions — Accept directly from dashboard, first to accept wins */}
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleAccept(booking.id)}
//                           disabled={accepting === booking.id}
//                           className={`flex-1 py-3 font-extrabold uppercase tracking-wider border-4 text-sm transition-all flex items-center justify-center gap-2
//                             ${
//                               accepting === booking.id
//                                 ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                                 : "bg-blue-600 text-white border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-0.5 hover:translate-y-0.5"
//                             }`}
//                         >
//                           {accepting === booking.id ? (
//                             <>
//                               <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                               Accepting...
//                             </>
//                           ) : (
//                             "✅ Accept"
//                           )}
//                         </button>
//                         <Link
//                           to={`/driver/booking/${booking.id}`}
//                           className="flex-1 py-3 bg-white text-blue-700 font-extrabold uppercase tracking-wider text-sm text-center border-4 border-blue-200 hover:border-blue-950 transition-all"
//                         >
//                           Details →
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── Sidebar ── */}
//           <div className="space-y-6">
//             {/* Zone info card */}
//             <div className="bg-blue-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-white">
//               <h3 className="text-sm font-extrabold uppercase tracking-widest text-blue-200 mb-1">
//                 Your Zone
//               </h3>
//               {loading ? (
//                 <Skeleton className="h-8 w-32 rounded mb-2" />
//               ) : (
//                 <p className="text-3xl font-extrabold">{driver?.place}</p>
//               )}
//               <p className="text-blue-200 text-sm font-medium mt-2">
//                 You receive requests from users whose pickup location matches
//                 your registered place.
//               </p>
//             </div>

//             {/* Quick links */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h3 className="text-lg font-extrabold text-emerald-950 mb-4">
//                 Quick Links
//               </h3>
//               <div className="space-y-3">
//                 {[
//                   {
//                     to: "/driver/history",
//                     label: "Pickup History",
//                     icon: "📜",
//                   },
//                   {
//                     to: "/driver/profile",
//                     label: "Profile & Settings",
//                     icon: "👤",
//                   },
//                 ].map((link) => (
//                   <Link
//                     key={link.to}
//                     to={link.to}
//                     className="flex items-center gap-3 py-3 px-4 bg-emerald-50 border-4 border-emerald-200 font-bold text-emerald-950 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] transition-all text-sm"
//                   >
//                     <span>{link.icon}</span> {link.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* How assignments work */}
//             <div className="bg-emerald-950 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-4">
//                 How it works
//               </h3>
//               <div className="space-y-4">
//                 {[
//                   {
//                     step: "01",
//                     label: "Request arrives",
//                     desc: "A user in your zone schedules a pickup.",
//                   },
//                   {
//                     step: "02",
//                     label: "You get notified",
//                     desc: "All verified drivers in the area see the request.",
//                   },
//                   {
//                     step: "03",
//                     label: "First to accept",
//                     desc: "Tap Accept — first driver wins the job.",
//                   },
//                   {
//                     step: "04",
//                     label: "Mark complete",
//                     desc: "After pickup, mark it done to credit the user's points.",
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

// export default DriverDashboard;

//updated  dashboard with backend integration
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// ── Waste type icons ────────────────────────────────────────────────────────
const WASTE_ICONS = {
  glass: "🍾",
  plastic: "🥤",
  cardboard: "📦",
  paper: "📄",
  metal: "🥫",
  mixed: "♻️",
};

// API configuration
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Main component ─────────────────────────────────────────────────────────
const DriverDashboard = () => {
  const navigate = useNavigate();

  // ── State ────────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [driver, setDriver] = useState(null);
  const [stats, setStats] = useState(null);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [accepting, setAccepting] = useState(null);

  // ── Fetch dashboard data ─────────────────────────────────────────────────
  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch driver dashboard data
        const dashboardRes = await fetch(`${API_BASE_URL}/driver/dashboard`, {
          headers: getAuthHeaders(),
        });

        if (!dashboardRes.ok) {
          if (dashboardRes.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load dashboard");
        }

        const dashboardData = await dashboardRes.json();
        setDriver(dashboardData.driver);
        setStats(dashboardData.stats);

        // Fetch pending bookings from bookings API
        const pendingRes = await fetch(`${API_BASE_URL}/bookings/pending`, {
          headers: getAuthHeaders(),
        });

        if (!pendingRes.ok) {
          throw new Error("Failed to load pending bookings");
        }

        const pendingData = await pendingRes.json();
        setPendingBookings(pendingData.pendingBookings);
      } catch (err) {
        setError(err.message || "Failed to load dashboard. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ── Accept booking ────────────────────────────────────────────────────────
  const handleAccept = async (bookingId) => {
    setAccepting(bookingId);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/accept`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (res.status === 409) {
        // Another driver accepted first — remove from list
        setPendingBookings((prev) => prev.filter((b) => b.id !== bookingId));
        setError("This booking was just accepted by another driver.");
        return;
      }

      if (!res.ok) {
        throw new Error("Accept failed");
      }

      const data = await res.json();
      // Navigate to active booking detail
      navigate(`/driver/booking/${bookingId}`);
    } catch (err) {
      setError(err.message || "Failed to accept booking. Please try again.");
    } finally {
      setAccepting(null);
    }
  };

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && !driver) {
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {loading ? (
            <>
              <Skeleton className="h-12 w-72 mb-3 rounded" />
              <Skeleton className="h-5 w-48 rounded" />
            </>
          ) : (
            <>
              <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-1">
                Welcome,{" "}
                <span className="text-blue-600">{driver?.fullName}!</span>
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <p className="text-emerald-800 font-medium">
                  Operating zone:{" "}
                  <span className="font-extrabold text-emerald-950">
                    {driver?.place}
                  </span>
                </p>
                {driver?.isVerified ? (
                  <span className="bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-emerald-950">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-4 border-amber-800">
                    ⏳ Pending Verification
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Unverified warning banner */}
        {!loading && !driver?.isVerified && (
          <div className="bg-amber-50 border-4 border-amber-400 p-4 mb-8 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-extrabold text-amber-800">
                Account not yet verified
              </p>
              <p className="text-amber-700 text-sm font-medium mt-0.5">
                An admin needs to verify your license and credentials before you
                can receive pickup requests.
              </p>
            </div>
          </div>
        )}

        {/* Inline error (post-load) */}
        {error && driver && (
          <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
            <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Pickups",
              value: stats?.totalPickups,
              icon: "🚛",
              color: "bg-white",
            },
            {
              label: "Completed",
              value: stats?.completedPickups,
              icon: "✅",
              color: "bg-white",
            },
            {
              label: "Pending Requests",
              value: stats?.pendingRequests,
              icon: "⏳",
              color: "bg-blue-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`${stat.color} border-4 border-emerald-950 p-5 shadow-[6px_6px_0px_rgba(6,78,59,1)]`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              {loading ? (
                <Skeleton className="h-9 w-16 mb-1 rounded" />
              ) : (
                <p
                  className={`text-3xl font-extrabold ${stat.color === "bg-blue-600" ? "text-white" : "text-emerald-950"}`}
                >
                  {stat.value ?? "—"}
                </p>
              )}
              <p
                className={`text-xs font-bold uppercase tracking-wider mt-1 ${stat.color === "bg-blue-600" ? "text-blue-100" : "text-emerald-600"}`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Pending bookings ── */}
          <div className="lg:col-span-2">
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-emerald-100">
                <h2 className="text-2xl font-extrabold text-emerald-950">
                  Pending Pickup Requests
                </h2>
                {!loading && (
                  <span className="bg-blue-600 text-white px-3 py-1 font-bold text-sm border-4 border-blue-950">
                    {pendingBookings.length} new
                  </span>
                )}
              </div>

              {/* Loading skeletons */}
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="border-4 border-blue-100 p-4 space-y-3"
                    >
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-32 rounded" />
                        <Skeleton className="h-5 w-20 rounded" />
                      </div>
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-48 rounded" />
                      <div className="flex gap-3 pt-1">
                        <Skeleton className="h-12 flex-1 rounded" />
                        <Skeleton className="h-12 flex-1 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !driver?.isVerified ? (
                <div className="text-center py-12 bg-amber-50 border-4 border-dashed border-amber-300">
                  <span className="text-5xl block mb-3">🔒</span>
                  <p className="font-extrabold text-amber-800">
                    Verification required
                  </p>
                  <p className="text-amber-600 text-sm font-medium mt-1">
                    Pickup requests will appear here once your account is
                    verified by an admin.
                  </p>
                </div>
              ) : pendingBookings.length === 0 ? (
                <div className="text-center py-12 bg-emerald-50 border-4 border-dashed border-emerald-200">
                  <span className="text-5xl block mb-3">📭</span>
                  <p className="font-extrabold text-emerald-800">
                    No pending requests
                  </p>
                  <p className="text-emerald-500 text-sm font-medium mt-1">
                    New pickup requests in {driver?.place} will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-blue-50 border-4 border-blue-200 p-4 hover:border-blue-400 transition-all"
                    >
                      {/* Booking header */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-extrabold text-blue-900 text-lg">
                            {booking.userName}
                          </p>
                          <p className="text-blue-700 text-sm font-medium">
                            {booking.address}
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold text-blue-500 flex-shrink-0 ml-2">
                          {booking.id}
                        </span>
                      </div>

                      {/* Schedule */}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-blue-800 font-medium mb-3">
                        <span>
                          📅{" "}
                          {new Date(booking.scheduledDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" },
                          )}
                        </span>
                        <span>⏰ {booking.timeSlot}</span>
                      </div>

                      {/* Waste items with icons */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {booking.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 bg-white border-2 border-blue-200 px-2 py-0.5 text-xs font-bold text-blue-800"
                          >
                            <span>{WASTE_ICONS[item.wasteType] ?? "♻️"}</span>
                            <span className="capitalize">{item.wasteType}</span>
                            {item.quantity > 1 && (
                              <span className="text-blue-400">
                                ×{item.quantity}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(booking.id)}
                          disabled={accepting === booking.id}
                          className={`flex-1 py-3 font-extrabold uppercase tracking-wider border-4 text-sm transition-all flex items-center justify-center gap-2
                            ${
                              accepting === booking.id
                                ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                                : "bg-blue-600 text-white border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                            }`}
                        >
                          {accepting === booking.id ? (
                            <>
                              <div className="w-4 h-4 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                              Accepting...
                            </>
                          ) : (
                            "✅ Accept"
                          )}
                        </button>
                        <Link
                          to={`/driver/booking/${booking.id}`}
                          className="flex-1 py-3 bg-white text-blue-700 font-extrabold uppercase tracking-wider text-sm text-center border-4 border-blue-200 hover:border-blue-950 transition-all"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Zone info card */}
            <div className="bg-blue-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-white">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-blue-200 mb-1">
                Your Zone
              </h3>
              {loading ? (
                <Skeleton className="h-8 w-32 rounded mb-2" />
              ) : (
                <p className="text-3xl font-extrabold">{driver?.place}</p>
              )}
              <p className="text-blue-200 text-sm font-medium mt-2">
                You receive requests from users whose pickup location matches
                your registered place.
              </p>
            </div>

            {/* Quick links */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h3 className="text-lg font-extrabold text-emerald-950 mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                {[
                  {
                    to: "/driver/history",
                    label: "Pickup History",
                    icon: "📜",
                  },
                  {
                    to: "/driver/profile",
                    label: "Profile & Settings",
                    icon: "👤",
                  },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 py-3 px-4 bg-emerald-50 border-4 border-emerald-200 font-bold text-emerald-950 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] transition-all text-sm"
                  >
                    <span>{link.icon}</span> {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* How assignments work */}
            <div className="bg-emerald-950 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-4">
                How it works
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    label: "Request arrives",
                    desc: "A user in your zone schedules a pickup.",
                  },
                  {
                    step: "02",
                    label: "You get notified",
                    desc: "All verified drivers in the area see the request.",
                  },
                  {
                    step: "03",
                    label: "First to accept",
                    desc: "Tap Accept — first driver wins the job.",
                  },
                  {
                    step: "04",
                    label: "Mark complete",
                    desc: "After pickup, mark it done to credit the user's points.",
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

export default DriverDashboard;
