// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// // ── Skeleton loader component ──────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Stat card ──────────────────────────────────────────────────────────────
// const StatCard = ({ label, value, icon, color, loading }) => (
//   <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
//     <div
//       className={`${color} w-14 h-14 border-4 border-emerald-950 flex items-center justify-center text-2xl mb-3`}
//     >
//       {icon}
//     </div>
//     {loading ? (
//       <>
//         <Skeleton className="h-8 w-20 mb-2 rounded" />
//         <Skeleton className="h-4 w-24 rounded" />
//       </>
//     ) : (
//       <>
//         <p className="text-3xl font-extrabold text-emerald-950">{value}</p>
//         <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
//           {label}
//         </p>
//       </>
//     )}
//   </div>
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const UserDashboard = () => {
//   const navigate = useNavigate();

//   // ── State ────────────────────────────────────────────────────────────────
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [nextPickup, setNextPickup] = useState(null);
//   const [error, setError] = useState(null);

//   // ── Data fetching ────────────────────────────────────────────────────────
//   // PRODUCTION: replace simulation with real API calls
//   // GET /api/user/dashboard  → { user, stats, recentActivity, nextPickup }
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/user/dashboard", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load dashboard");
//         // const data = await res.json();
//         // setUserData(data.user);
//         // setStats(data.stats);
//         // setRecentActivity(data.recentActivity);
//         // setNextPickup(data.nextPickup ?? null);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 1200));
//         setUserData({
//           name: "John",
//           rank: "Eco Warrior",
//           level: 12,
//           xp: 750,
//           xpNext: 1000,
//         });
//         setStats({
//           totalPoints: 2450,
//           itemsRecycled: 156,
//           co2Saved: "45kg",
//           totalPickups: 12,
//         });
//         setRecentActivity([
//           {
//             id: 1,
//             action: "Scanned Plastic Bottle",
//             points: 5,
//             time: "2 mins ago",
//             icon: "🥤",
//             type: "scan",
//           },
//           {
//             id: 2,
//             action: "Completed Pickup",
//             points: 120,
//             time: "1 hour ago",
//             icon: "✅",
//             type: "pickup",
//           },
//           {
//             id: 3,
//             action: "Redeemed Reward",
//             points: -500,
//             time: "3 hours ago",
//             icon: "🎁",
//             type: "redeem",
//           },
//           {
//             id: 4,
//             action: "Scanned Cardboard",
//             points: 7,
//             time: "Yesterday",
//             icon: "📦",
//             type: "scan",
//           },
//         ]);
//         setNextPickup({
//           id: "BK-001",
//           date: "Tomorrow",
//           slot: "10:00 AM – 12:00 PM",
//           status: "accepted",
//         });
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   // ── Derived stat rows ────────────────────────────────────────────────────
//   const statRows = stats
//     ? [
//         {
//           label: "Total Points",
//           value: stats.totalPoints.toLocaleString(),
//           icon: "💎",
//           color: "bg-emerald-600",
//         },
//         {
//           label: "Items Recycled",
//           value: stats.itemsRecycled.toString(),
//           icon: "♻️",
//           color: "bg-blue-600",
//         },
//         {
//           label: "CO₂ Saved",
//           value: stats.co2Saved,
//           icon: "🌍",
//           color: "bg-green-600",
//         },
//         {
//           label: "Pickups",
//           value: stats.totalPickups.toString(),
//           icon: "🚛",
//           color: "bg-purple-600",
//         },
//       ]
//     : [
//         {
//           label: "Total Points",
//           value: "—",
//           icon: "💎",
//           color: "bg-emerald-600",
//         },
//         {
//           label: "Items Recycled",
//           value: "—",
//           icon: "♻️",
//           color: "bg-blue-600",
//         },
//         { label: "CO₂ Saved", value: "—", icon: "🌍", color: "bg-green-600" },
//         { label: "Pickups", value: "—", icon: "🚛", color: "bg-purple-600" },
//       ];

//   const quickActions = [
//     {
//       label: "Scan Waste",
//       icon: "📷",
//       path: "/user/classify",
//       color: "bg-emerald-600",
//     },
//     {
//       label: "Schedule Pickup",
//       icon: "📅",
//       path: "/user/schedule-pickup",
//       color: "bg-blue-600",
//     },
//     {
//       label: "Shop Rewards",
//       icon: "🛍️",
//       path: "/user/shop",
//       color: "bg-purple-600",
//     },
//     {
//       label: "View History",
//       icon: "📜",
//       path: "/user/pickup-history",
//       color: "bg-orange-600",
//     },
//   ];

//   // ── Error state ──────────────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
//           <span className="text-5xl block mb-4">⚠️</span>
//           <p className="font-extrabold text-red-600 text-xl mb-2">
//             Something went wrong
//           </p>
//           <p className="text-red-500 text-sm mb-6">{error}</p>
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

//   // ── Main render ──────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Welcome */}
//         <div className="mb-8">
//           {loading ? (
//             <>
//               <Skeleton className="h-12 w-72 mb-3 rounded" />
//               <Skeleton className="h-6 w-56 rounded" />
//             </>
//           ) : (
//             <>
//               <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//                 Welcome back,{" "}
//                 <span className="text-emerald-600">
//                   {userData?.name ?? "there"}!
//                 </span>
//               </h1>
//               <p className="text-emerald-800 font-medium text-lg">
//                 Continue your sustainability journey today
//               </p>
//             </>
//           )}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {statRows.map((stat, i) => (
//             <StatCard key={i} {...stat} loading={loading} />
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* ── Left: Actions + Activity ── */}
//           <div className="lg:col-span-2">
//             <h2 className="text-3xl font-extrabold text-emerald-950 mb-6">
//               Quick Actions
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {quickActions.map((action, i) => (
//                 <Link
//                   key={i}
//                   to={action.path}
//                   className="group bg-white border-4 border-emerald-950 p-6 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[10px_10px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-center"
//                 >
//                   <div
//                     className={`${action.color} w-16 h-16 border-4 border-emerald-950 flex items-center justify-center text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform`}
//                   >
//                     {action.icon}
//                   </div>
//                   <p className="font-bold text-emerald-950">{action.label}</p>
//                 </Link>
//               ))}
//             </div>

//             {/* Recent Activity */}
//             <div className="mt-8 bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <div className="flex justify-between items-center mb-6 border-b-4 border-emerald-100 pb-4">
//                 <h3 className="text-2xl font-extrabold text-emerald-950">
//                   Recent Activity
//                 </h3>
//                 <Link
//                   to="/user/pickup-history"
//                   className="text-emerald-600 font-bold hover:underline"
//                 >
//                   View All →
//                 </Link>
//               </div>

//               {loading ? (
//                 <div className="space-y-4">
//                   {[...Array(4)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-200"
//                     >
//                       <Skeleton className="w-10 h-10 rounded" />
//                       <div className="flex-1 space-y-2">
//                         <Skeleton className="h-4 w-40 rounded" />
//                         <Skeleton className="h-3 w-24 rounded" />
//                       </div>
//                       <Skeleton className="h-6 w-12 rounded" />
//                     </div>
//                   ))}
//                 </div>
//               ) : recentActivity.length === 0 ? (
//                 // FIX: proper empty state instead of phantom data
//                 <div className="text-center py-12 bg-emerald-50 border-4 border-dashed border-emerald-200">
//                   <span className="text-4xl block mb-2">📭</span>
//                   <p className="text-emerald-600 font-medium">
//                     No activity yet
//                   </p>
//                   <p className="text-emerald-400 text-sm">
//                     Start scanning waste to see your history here
//                   </p>
//                   <Link
//                     to="/user/classify"
//                     className="inline-block mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-sm border-2 border-emerald-950"
//                   >
//                     Scan Now
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {recentActivity.map((activity) => (
//                     <div
//                       key={activity.id}
//                       className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 transition-colors"
//                     >
//                       <span className="text-3xl">{activity.icon}</span>
//                       <div className="flex-1">
//                         <p className="font-bold text-emerald-950">
//                           {activity.action}
//                         </p>
//                         <p className="text-sm text-emerald-600">
//                           {activity.time}
//                         </p>
//                       </div>
//                       {/* FIX: points is a number now, not a pre-formatted string */}
//                       <span
//                         className={`text-xl font-extrabold ${activity.points >= 0 ? "text-emerald-600" : "text-red-500"}`}
//                       >
//                         {activity.points >= 0
//                           ? `+${activity.points}`
//                           : activity.points}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── Right Sidebar ── */}
//           <div className="space-y-6">
//             {/* Rank card */}
//             <div className="bg-emerald-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-white">
//               <h3 className="text-xl font-extrabold mb-4">Current Rank</h3>
//               {loading ? (
//                 <div className="text-center space-y-3">
//                   <Skeleton className="w-16 h-16 rounded-full mx-auto" />
//                   <Skeleton className="h-8 w-32 mx-auto rounded" />
//                   <Skeleton className="h-4 w-20 mx-auto rounded" />
//                 </div>
//               ) : (
//                 <>
//                   <div className="text-center">
//                     <span className="text-6xl mb-2 block">🏆</span>
//                     <p className="text-3xl font-extrabold mb-1">
//                       {userData?.rank}
//                     </p>
//                     <p className="text-emerald-100 text-sm">
//                       Level {userData?.level}
//                     </p>
//                   </div>
//                   <div className="mt-4 pt-4 border-t-2 border-emerald-500">
//                     <div className="flex justify-between text-xs text-emerald-200 mb-1">
//                       <span>Progress to next level</span>
//                       <span>
//                         {userData?.xp} / {userData?.xpNext} XP
//                       </span>
//                     </div>
//                     <div className="w-full h-4 bg-emerald-800 border-2 border-emerald-950">
//                       <div
//                         className="h-full bg-white transition-all duration-700"
//                         style={{
//                           width: `${Math.min(100, (userData.xp / userData.xpNext) * 100)}%`,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Next pickup card */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h3 className="text-xl font-extrabold text-emerald-950 mb-4">
//                 Next Pickup
//               </h3>
//               {loading ? (
//                 <div className="space-y-3 text-center">
//                   <Skeleton className="w-12 h-12 rounded mx-auto" />
//                   <Skeleton className="h-6 w-28 mx-auto rounded" />
//                   <Skeleton className="h-4 w-36 mx-auto rounded" />
//                   <Skeleton className="h-10 w-full rounded" />
//                 </div>
//               ) : nextPickup ? (
//                 // FIX: real data-driven pickup card with working reschedule link
//                 <div className="text-center py-2">
//                   <span className="text-5xl mb-2 block">🚛</span>
//                   <p className="text-2xl font-bold text-emerald-950">
//                     {nextPickup.date}
//                   </p>
//                   <p className="text-emerald-600 font-medium">
//                     {nextPickup.slot}
//                   </p>
//                   <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 border border-emerald-300 uppercase tracking-wide">
//                     {nextPickup.status}
//                   </span>
//                   {/* FIX: was a dead <button>, now navigates properly */}
//                   <Link
//                     to="/user/schedule-pickup"
//                     className="mt-4 w-full block py-2 text-center bg-emerald-100 text-emerald-800 font-bold border-2 border-emerald-300 hover:bg-emerald-200 transition-colors"
//                   >
//                     Reschedule
//                   </Link>
//                 </div>
//               ) : (
//                 // FIX: empty state when no upcoming pickup exists
//                 <div className="text-center py-6">
//                   <span className="text-4xl block mb-2">📭</span>
//                   <p className="text-emerald-700 font-bold">
//                     No upcoming pickup
//                   </p>
//                   <p className="text-emerald-500 text-sm mb-4">
//                     Schedule one to get started
//                   </p>
//                   <Link
//                     to="/user/schedule-pickup"
//                     className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-sm border-4 border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)] hover:shadow-[1px_1px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                   >
//                     + Schedule Now
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Available points */}
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-center">
//               <h3 className="text-xl font-extrabold text-emerald-950 mb-4">
//                 Available Points
//               </h3>
//               {loading ? (
//                 <>
//                   <Skeleton className="h-14 w-32 mx-auto mb-4 rounded" />
//                   <Skeleton className="h-12 w-full rounded" />
//                 </>
//               ) : (
//                 <>
//                   <p className="text-5xl font-extrabold text-emerald-600 mb-2">
//                     {(stats?.totalPoints ?? 0).toLocaleString()}
//                   </p>
//                   <Link
//                     to="/user/shop"
//                     className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                   >
//                     Shop Now
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

//updated code with backend integration
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── API Configuration ─────────────────────────────────────────────────────
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Skeleton loader component ──────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// ── Stat card ──────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, loading }) => (
  <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
    <div
      className={`${color} w-14 h-14 border-4 border-emerald-950 flex items-center justify-center text-2xl mb-3`}
    >
      {icon}
    </div>
    {loading ? (
      <>
        <Skeleton className="h-8 w-20 mb-2 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </>
    ) : (
      <>
        <p className="text-3xl font-extrabold text-emerald-950">{value}</p>
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          {label}
        </p>
      </>
    )}
  </div>
);

// ── Helper to format relative time ─────────────────────────────────────────
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// ── Helper to format next pickup date ──────────────────────────────────────
const formatNextPickupDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  if (isToday) return "Today";
  if (isTomorrow) return "Tomorrow";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

// ── Main component ─────────────────────────────────────────────────────────
const UserDashboard = () => {
  const navigate = useNavigate();

  // ── State ────────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [nextPickup, setNextPickup] = useState(null);
  const [error, setError] = useState(null);

  // ── Data fetching ────────────────────────────────────────────────────────
  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/user/dashboard`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load dashboard");
      }

      const data = await res.json();
      setUserData(data.user);
      setStats(data.stats);
      setRecentActivity(data.recentActivity || []);
      setNextPickup(data.nextPickup ?? null);
    } catch (err) {
      setError(err.message || "Failed to load dashboard. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // ── Derived stat rows ────────────────────────────────────────────────────
  const statRows = stats
    ? [
        {
          label: "Total Points",
          value: stats.totalPoints.toLocaleString(),
          icon: "💎",
          color: "bg-emerald-600",
        },
        {
          label: "Items Recycled",
          value: stats.itemsRecycled.toString(),
          icon: "♻️",
          color: "bg-blue-600",
        },
        {
          label: "CO₂ Saved",
          value: stats.co2Saved,
          icon: "🌍",
          color: "bg-green-600",
        },
        {
          label: "Pickups",
          value: stats.totalPickups.toString(),
          icon: "🚛",
          color: "bg-purple-600",
        },
      ]
    : [
        {
          label: "Total Points",
          value: "—",
          icon: "💎",
          color: "bg-emerald-600",
        },
        {
          label: "Items Recycled",
          value: "—",
          icon: "♻️",
          color: "bg-blue-600",
        },
        { label: "CO₂ Saved", value: "—", icon: "🌍", color: "bg-green-600" },
        { label: "Pickups", value: "—", icon: "🚛", color: "bg-purple-600" },
      ];

  const quickActions = [
    {
      label: "Scan Waste",
      icon: "📷",
      path: "/user/classify",
      color: "bg-emerald-600",
    },
    {
      label: "Schedule Pickup",
      icon: "📅",
      path: "/user/schedule-pickup",
      color: "bg-blue-600",
    },
    {
      label: "Shop Rewards",
      icon: "🛍️",
      path: "/user/shop",
      color: "bg-purple-600",
    },
    {
      label: "View History",
      icon: "📜",
      path: "/user/pickup-history",
      color: "bg-orange-600",
    },
  ];

  // ── Error state ──────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-2">
            Something went wrong
          </p>
          <p className="text-red-500 text-sm mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Login
            </button>
            <button
              onClick={fetchDashboard}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          {loading ? (
            <>
              <Skeleton className="h-12 w-72 mb-3 rounded" />
              <Skeleton className="h-6 w-56 rounded" />
            </>
          ) : (
            <>
              <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
                Welcome back,{" "}
                <span className="text-emerald-600">
                  {userData?.name ?? "there"}!
                </span>
              </h1>
              <p className="text-emerald-800 font-medium text-lg">
                Continue your sustainability journey today
              </p>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statRows.map((stat, i) => (
            <StatCard key={i} {...stat} loading={loading} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left: Actions + Activity ── */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-emerald-950 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.path}
                  className="group bg-white border-4 border-emerald-950 p-6 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[10px_10px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-center"
                >
                  <div
                    className={`${action.color} w-16 h-16 border-4 border-emerald-950 flex items-center justify-center text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform`}
                  >
                    {action.icon}
                  </div>
                  <p className="font-bold text-emerald-950">{action.label}</p>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <div className="flex justify-between items-center mb-6 border-b-4 border-emerald-100 pb-4">
                <h3 className="text-2xl font-extrabold text-emerald-950">
                  Recent Activity
                </h3>
                <Link
                  to="/user/pickup-history"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  View All →
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-200"
                    >
                      <Skeleton className="w-10 h-10 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40 rounded" />
                        <Skeleton className="h-3 w-24 rounded" />
                      </div>
                      <Skeleton className="h-6 w-12 rounded" />
                    </div>
                  ))}
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-12 bg-emerald-50 border-4 border-dashed border-emerald-200">
                  <span className="text-4xl block mb-2">📭</span>
                  <p className="text-emerald-600 font-medium">
                    No activity yet
                  </p>
                  <p className="text-emerald-400 text-sm">
                    Start scanning waste to see your history here
                  </p>
                  <Link
                    to="/user/classify"
                    className="inline-block mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-sm border-2 border-emerald-950"
                  >
                    Scan Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 transition-colors"
                    >
                      <span className="text-3xl">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-emerald-950">
                          {activity.action}
                        </p>
                        <p className="text-sm text-emerald-600">
                          {formatRelativeTime(activity.time)}
                        </p>
                      </div>
                      <span
                        className={`text-xl font-extrabold ${activity.points >= 0 ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {activity.points >= 0
                          ? `+${activity.points}`
                          : activity.points}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-6">
            {/* Rank card */}
            <div className="bg-emerald-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-white">
              <h3 className="text-xl font-extrabold mb-4">Current Rank</h3>
              {loading ? (
                <div className="text-center space-y-3">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto" />
                  <Skeleton className="h-8 w-32 mx-auto rounded" />
                  <Skeleton className="h-4 w-20 mx-auto rounded" />
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <span className="text-6xl mb-2 block">🏆</span>
                    <p className="text-3xl font-extrabold mb-1">
                      {userData?.rank}
                    </p>
                    <p className="text-emerald-100 text-sm">
                      Level {userData?.level}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-emerald-500">
                    <div className="flex justify-between text-xs text-emerald-200 mb-1">
                      <span>Progress to next level</span>
                      <span>
                        {userData?.xp} / {userData?.xpNext} XP
                      </span>
                    </div>
                    <div className="w-full h-4 bg-emerald-800 border-2 border-emerald-950">
                      <div
                        className="h-full bg-white transition-all duration-700"
                        style={{
                          width: `${Math.min(100, (userData.xp / userData.xpNext) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Next pickup card */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h3 className="text-xl font-extrabold text-emerald-950 mb-4">
                Next Pickup
              </h3>
              {loading ? (
                <div className="space-y-3 text-center">
                  <Skeleton className="w-12 h-12 rounded mx-auto" />
                  <Skeleton className="h-6 w-28 mx-auto rounded" />
                  <Skeleton className="h-4 w-36 mx-auto rounded" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
              ) : nextPickup ? (
                <div className="text-center py-2">
                  <span className="text-5xl mb-2 block">🚛</span>
                  <p className="text-2xl font-bold text-emerald-950">
                    {formatNextPickupDate(nextPickup.date)}
                  </p>
                  <p className="text-emerald-600 font-medium">
                    {nextPickup.slot}
                  </p>
                  <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 border border-emerald-300 uppercase tracking-wide">
                    {nextPickup.status}
                  </span>
                  <Link
                    to="/user/schedule-pickup"
                    className="mt-4 w-full block py-2 text-center bg-emerald-100 text-emerald-800 font-bold border-2 border-emerald-300 hover:bg-emerald-200 transition-colors"
                  >
                    Reschedule
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="text-4xl block mb-2">📭</span>
                  <p className="text-emerald-700 font-bold">
                    No upcoming pickup
                  </p>
                  <p className="text-emerald-500 text-sm mb-4">
                    Schedule one to get started
                  </p>
                  <Link
                    to="/user/schedule-pickup"
                    className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-sm border-4 border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)] hover:shadow-[1px_1px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    + Schedule Now
                  </Link>
                </div>
              )}
            </div>

            {/* Available points */}
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-center">
              <h3 className="text-xl font-extrabold text-emerald-950 mb-4">
                Available Points
              </h3>
              {loading ? (
                <>
                  <Skeleton className="h-14 w-32 mx-auto mb-4 rounded" />
                  <Skeleton className="h-12 w-full rounded" />
                </>
              ) : (
                <>
                  <p className="text-5xl font-extrabold text-emerald-600 mb-2">
                    {(stats?.totalPoints ?? 0).toLocaleString()}
                  </p>
                  <Link
                    to="/user/shop"
                    className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    Shop Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
