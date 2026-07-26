// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-purple-100 border-2 border-purple-200 ${className}`}
//   />
// );

// // Activity type config
// const ACTIVITY_CONFIG = {
//   user: { icon: "👤", color: "bg-emerald-50  border-emerald-200" },
//   driver: { icon: "🚛", color: "bg-blue-50     border-blue-200" },
//   pickup: { icon: "📦", color: "bg-orange-50   border-orange-200" },
//   product: { icon: "🛍️", color: "bg-purple-50   border-purple-200" },
// };

// // ── Main component ─────────────────────────────────────────────────────────
// const AdminDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [pendingDrivers, setPendingDrivers] = useState([]);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/admin/dashboard
//   // Response: {
//   //   stats: { totalUsers, totalDrivers, pendingPickups, pendingVerifications },
//   //   recentActivity: [{ id, action, subject, time, type }],
//   //   pendingDrivers: [{ id, fullName, place, licenseNumber, createdAt }]
//   // }
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/admin/dashboard", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load dashboard");
//         // const data = await res.json();
//         // setStats(data.stats);
//         // setRecentActivity(data.recentActivity);
//         // setPendingDrivers(data.pendingDrivers);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 1000));
//         setStats({
//           totalUsers: 1245,
//           totalDrivers: 48,
//           pendingPickups: 23,
//           // FIX: replaced Total Orders with Pending Verifications — most actionable admin stat
//           pendingVerifications: 4,
//         });
//         setRecentActivity([
//           {
//             id: 1,
//             action: "New user registered",
//             subject: "john@example.com",
//             time: "2 mins ago",
//             type: "user",
//           },
//           {
//             id: 2,
//             action: "Driver verified",
//             subject: "Mike S.",
//             time: "15 mins ago",
//             type: "driver",
//           },
//           {
//             id: 3,
//             action: "Pickup completed",
//             subject: "BK-482931",
//             time: "1 hour ago",
//             type: "pickup",
//           },
//           {
//             id: 4,
//             action: "Product added to shop",
//             subject: "Bamboo Tote Bag",
//             time: "3 hours ago",
//             type: "product",
//           },
//         ]);
//         setPendingDrivers([
//           {
//             id: "d1",
//             fullName: "Raj Kumar",
//             place: "Ernakulam",
//             licenseNumber: "KL04 20140000555",
//             createdAt: "2024-03-27",
//           },
//           {
//             id: "d2",
//             fullName: "Priya Nair",
//             place: "Thrissur",
//             licenseNumber: "KL08 20180012345",
//             createdAt: "2024-03-26",
//           },
//           {
//             id: "d3",
//             fullName: "Arun Das",
//             place: "Kollam",
//             licenseNumber: "KL02 20120009988",
//             createdAt: "2024-03-25",
//           },
//           {
//             id: "d4",
//             fullName: "Sana Fathima",
//             place: "Kozhikode",
//             licenseNumber: "KL11 20160007711",
//             createdAt: "2024-03-24",
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

//   // ── Verify driver handler ─────────────────────────────────────────────────
//   // PRODUCTION: PATCH /api/admin/drivers/:id/verify
//   // Body: { isVerified: true }
//   const handleVerify = async (driverId) => {
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // await fetch(`/api/admin/drivers/${driverId}/verify`, {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({ isVerified: true }),
//       // });

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 500));

//       // Optimistically remove from pending list + decrement stat
//       setPendingDrivers((prev) => prev.filter((d) => d.id !== driverId));
//       setStats((prev) => ({
//         ...prev,
//         pendingVerifications: Math.max(0, prev.pendingVerifications - 1),
//       }));
//     } catch {
//       alert("Failed to verify driver. Please try again.");
//     }
//   };

//   const statRows = stats
//     ? [
//         {
//           label: "Total Users",
//           value: stats.totalUsers.toLocaleString(),
//           icon: "👥",
//           color: "bg-emerald-600",
//           path: "/admin/users",
//         },
//         {
//           label: "Total Drivers",
//           value: stats.totalDrivers.toLocaleString(),
//           icon: "🚛",
//           color: "bg-blue-600",
//           path: "/admin/drivers",
//         },
//         {
//           label: "Pending Pickups",
//           value: stats.pendingPickups.toLocaleString(),
//           icon: "📦",
//           color: "bg-orange-600",
//           path: "/admin/pickups",
//         },
//         // FIX: Pending Verifications replaces Total Orders — most critical admin action
//         {
//           label: "Pending Verifications",
//           value: stats.pendingVerifications.toLocaleString(),
//           icon: "⏳",
//           color: "bg-purple-600",
//           path: "/admin/drivers",
//         },
//       ]
//     : [];

//   const MANAGEMENT_LINKS = [
//     {
//       to: "/admin/users",
//       label: "User Management",
//       icon: "👥",
//       bg: "bg-emerald-50 border-emerald-200 hover:border-emerald-600",
//     },
//     {
//       to: "/admin/drivers",
//       label: "Driver Management",
//       icon: "🚛",
//       bg: "bg-blue-50    border-blue-200    hover:border-blue-600",
//     },
//     {
//       to: "/admin/products",
//       label: "Products",
//       icon: "🛍️",
//       bg: "bg-purple-50  border-purple-200  hover:border-purple-600",
//     },
//     {
//       to: "/admin/pickups",
//       label: "All Pickups",
//       icon: "📋",
//       bg: "bg-orange-50  border-orange-200  hover:border-orange-600",
//     },
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
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             {loading ? (
//               <Skeleton className="h-12 w-72 rounded" />
//             ) : (
//               <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
//                 Admin <span className="text-purple-600">Dashboard</span>
//               </h1>
//             )}
//           </div>
//           <span className="bg-purple-600 text-white px-4 py-2 font-bold uppercase border-4 border-purple-950 text-sm tracking-widest">
//             Administrator
//           </span>
//         </div>

//         {/* Pending verifications alert — surfaced prominently per admin spec */}
//         {!loading && pendingDrivers.length > 0 && (
//           <div className="bg-amber-50 border-4 border-amber-400 p-5 mb-8 shadow-[6px_6px_0px_rgba(180,83,9,0.3)]">
//             <div className="flex items-start gap-3 mb-4">
//               <span className="text-2xl flex-shrink-0">⚠️</span>
//               <div>
//                 <p className="font-extrabold text-amber-800 text-lg">
//                   {pendingDrivers.length} driver
//                   {pendingDrivers.length !== 1 ? "s" : ""} awaiting verification
//                 </p>
//                 <p className="text-amber-600 text-sm font-medium mt-0.5">
//                   Unverified drivers cannot receive pickup requests. Review and
//                   verify below.
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               {pendingDrivers.map((driver) => (
//                 <div
//                   key={driver.id}
//                   className="flex flex-wrap items-center gap-3 bg-white border-2 border-amber-200 p-3"
//                 >
//                   <div className="flex-1 min-w-0">
//                     <p className="font-extrabold text-emerald-950">
//                       {driver.fullName}
//                     </p>
//                     <p className="text-sm text-emerald-600 font-medium">
//                       {driver.place} &nbsp;·&nbsp;
//                       <span className="font-mono">{driver.licenseNumber}</span>
//                     </p>
//                   </div>
//                   <div className="flex gap-2 flex-shrink-0">
//                     <Link
//                       to={`/admin/drivers/${driver.id}`}
//                       className="px-3 py-2 bg-white text-amber-700 font-bold text-xs uppercase tracking-wider border-2 border-amber-300 hover:border-amber-700 transition-all"
//                     >
//                       View →
//                     </Link>
//                     <button
//                       onClick={() => handleVerify(driver.id)}
//                       className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-2 border-emerald-950 shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       ✓ Verify
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Stats grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {loading
//             ? [...Array(4)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]"
//                 >
//                   <Skeleton className="w-14 h-14 mb-3" />
//                   <Skeleton className="h-9 w-20 mb-2 rounded" />
//                   <Skeleton className="h-4 w-28 rounded" />
//                 </div>
//               ))
//             : statRows.map((stat, i) => (
//                 <Link
//                   key={i}
//                   to={stat.path}
//                   className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
//                 >
//                   <div
//                     className={`${stat.color} w-14 h-14 border-4 border-emerald-950 flex items-center justify-center text-2xl mb-3`}
//                   >
//                     {stat.icon}
//                   </div>
//                   <p className="text-3xl font-extrabold text-emerald-950">
//                     {stat.value}
//                   </p>
//                   <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
//                     {stat.label}
//                   </p>
//                 </Link>
//               ))}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Recent Activity */}
//           <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <h2 className="text-2xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
//               Recent Activity
//             </h2>

//             {loading ? (
//               <div className="space-y-4">
//                 {[...Array(4)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-200"
//                   >
//                     <Skeleton className="w-10 h-10 rounded flex-shrink-0" />
//                     <div className="flex-1 space-y-2">
//                       <Skeleton className="h-4 w-40 rounded" />
//                       <Skeleton className="h-3 w-28 rounded" />
//                     </div>
//                     <Skeleton className="h-3 w-16 rounded flex-shrink-0" />
//                   </div>
//                 ))}
//               </div>
//             ) : recentActivity.length === 0 ? (
//               <div className="text-center py-10">
//                 <span className="text-4xl block mb-2">📭</span>
//                 <p className="text-emerald-500 font-medium">
//                   No recent activity
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {recentActivity.map((activity) => {
//                   const cfg =
//                     ACTIVITY_CONFIG[activity.type] ?? ACTIVITY_CONFIG.user;
//                   return (
//                     <div
//                       key={activity.id}
//                       className={`flex items-center gap-4 p-4 border-2 ${cfg.color}`}
//                     >
//                       <span className="text-2xl flex-shrink-0">{cfg.icon}</span>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-emerald-950 truncate">
//                           {activity.action}
//                         </p>
//                         <p className="text-sm text-emerald-600 font-medium truncate">
//                           {activity.subject}
//                         </p>
//                       </div>
//                       <span className="text-xs text-emerald-400 font-bold flex-shrink-0 whitespace-nowrap">
//                         {activity.time}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Management quick links */}
//           <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <h2 className="text-2xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
//               Management
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               {MANAGEMENT_LINKS.map((link) => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   className={`p-6 border-4 transition-all text-center group ${link.bg}`}
//                 >
//                   <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
//                     {link.icon}
//                   </span>
//                   <span className="font-bold text-emerald-950 text-sm">
//                     {link.label}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
//updated with api integration
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-purple-100 border-2 border-purple-200 ${className}`}
  />
);

// Activity type config
const ACTIVITY_CONFIG = {
  user: { icon: "👤", color: "bg-emerald-50  border-emerald-200" },
  driver: { icon: "🚛", color: "bg-blue-50     border-blue-200" },
  pickup: { icon: "📦", color: "bg-orange-50   border-orange-200" },
  product: { icon: "🛍️", color: "bg-purple-50   border-purple-200" },
};

// API base URL - adjust as needed for your environment
const API_BASE_URL = "http://localhost:5000/api";

// Helper to get auth headers
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Main component ─────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingDrivers, setPendingDrivers] = useState([]);

  // ── Fetch Dashboard Data ────────────────────────────────────────────────
  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load dashboard");
        }

        const data = await res.json();
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
        setPendingDrivers(data.pendingDrivers);
      } catch (err) {
        setError(err.message || "Failed to load dashboard. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ── Verify driver handler ─────────────────────────────────────────────────
  const handleVerify = async (driverId) => {
    console.log("driverId:", driverId); // 👈 add this
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/drivers/${driverId}/verify`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({ isVerified: true }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to verify driver");
      }

      // Optimistically remove from pending list + decrement stat
      setPendingDrivers((prev) => prev.filter((d) => d._id !== driverId));
      setStats((prev) => ({
        ...prev,
        pendingVerifications: Math.max(0, prev.pendingVerifications - 1),
      }));
    } catch {
      alert("Failed to verify driver. Please try again.");
    }
  };

  const statRows = stats
    ? [
        {
          label: "Total Users",
          value: stats.totalUsers?.toLocaleString() || "0",
          icon: "👥",
          color: "bg-emerald-600",
          path: "/admin/users",
        },
        {
          label: "Total Drivers",
          value: stats.totalDrivers?.toLocaleString() || "0",
          icon: "🚛",
          color: "bg-blue-600",
          path: "/admin/drivers",
        },
        {
          label: "Pending Pickups",
          value: stats.pendingPickups?.toLocaleString() || "0",
          icon: "📦",
          color: "bg-orange-600",
          path: "/admin/pickups",
        },
        {
          label: "Pending Verifications",
          value: stats.pendingVerifications?.toLocaleString() || "0",
          icon: "⏳",
          color: "bg-purple-600",
          path: "/admin/drivers",
        },
      ]
    : [];

  const MANAGEMENT_LINKS = [
    {
      to: "/admin/users",
      label: "User Management",
      icon: "👥",
      bg: "bg-emerald-50 border-emerald-200 hover:border-emerald-600",
    },
    {
      to: "/admin/drivers",
      label: "Driver Management",
      icon: "🚛",
      bg: "bg-blue-50    border-blue-200    hover:border-blue-600",
    },
    {
      to: "/admin/products",
      label: "Products",
      icon: "🛍️",
      bg: "bg-purple-50  border-purple-200  hover:border-purple-600",
    },
    {
      to: "/admin/pickups",
      label: "All Pickups",
      icon: "📋",
      bg: "bg-orange-50  border-orange-200  hover:border-orange-600",
    },
  ];

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
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
        <div className="flex justify-between items-center mb-8">
          <div>
            {loading ? (
              <Skeleton className="h-12 w-72 rounded" />
            ) : (
              <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
                Admin <span className="text-purple-600">Dashboard</span>
              </h1>
            )}
          </div>
          <span className="bg-purple-600 text-white px-4 py-2 font-bold uppercase border-4 border-purple-950 text-sm tracking-widest">
            Administrator
          </span>
        </div>

        {/* Pending verifications alert */}
        {!loading && pendingDrivers.length > 0 && (
          <div className="bg-amber-50 border-4 border-amber-400 p-5 mb-8 shadow-[6px_6px_0px_rgba(180,83,9,0.3)]">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <p className="font-extrabold text-amber-800 text-lg">
                  {pendingDrivers.length} driver
                  {pendingDrivers.length !== 1 ? "s" : ""} awaiting verification
                </p>
                <p className="text-amber-600 text-sm font-medium mt-0.5">
                  Unverified drivers cannot receive pickup requests. Review and
                  verify below.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {pendingDrivers.map((driver) => (
                <div
                  key={driver._id}
                  className="flex flex-wrap items-center gap-3 bg-white border-2 border-amber-200 p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-emerald-950">
                      {driver.fullName}
                    </p>
                    <p className="text-sm text-emerald-600 font-medium">
                      {driver.place} &nbsp;·&nbsp;
                      <span className="font-mono">{driver.licenseNumber}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      to={`/admin/drivers/${driver._id}`}
                      className="px-3 py-2 bg-white text-amber-700 font-bold text-xs uppercase tracking-wider border-2 border-amber-300 hover:border-amber-700 transition-all"
                    >
                      View →
                    </Link>
                    <button
                      onClick={() => handleVerify(driver._id)}
                      className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-2 border-emerald-950 shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      ✓ Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]"
                >
                  <Skeleton className="w-14 h-14 mb-3" />
                  <Skeleton className="h-9 w-20 mb-2 rounded" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
              ))
            : statRows.map((stat, i) => (
                <Link
                  key={i}
                  to={stat.path}
                  className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  <div
                    className={`${stat.color} w-14 h-14 border-4 border-emerald-950 flex items-center justify-center text-2xl mb-3`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-extrabold text-emerald-950">
                    {stat.value}
                  </p>
                  <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                    {stat.label}
                  </p>
                </Link>
              ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <h2 className="text-2xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
              Recent Activity
            </h2>

            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-200"
                  >
                    <Skeleton className="w-10 h-10 rounded flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40 rounded" />
                      <Skeleton className="h-3 w-28 rounded" />
                    </div>
                    <Skeleton className="h-3 w-16 rounded flex-shrink-0" />
                  </div>
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-10">
                <span className="text-4xl block mb-2">📭</span>
                <p className="text-emerald-500 font-medium">
                  No recent activity
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const cfg =
                    ACTIVITY_CONFIG[activity.type] ?? ACTIVITY_CONFIG.user;
                  return (
                    <div
                      key={activity.id}
                      className={`flex items-center gap-4 p-4 border-2 ${cfg.color}`}
                    >
                      <span className="text-2xl flex-shrink-0">{cfg.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-emerald-950 truncate">
                          {activity.action}
                        </p>
                        <p className="text-sm text-emerald-600 font-medium truncate">
                          {activity.subject}
                        </p>
                      </div>
                      <span className="text-xs text-emerald-400 font-bold flex-shrink-0 whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Management quick links */}
          <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <h2 className="text-2xl font-extrabold text-emerald-950 mb-6 pb-4 border-b-4 border-emerald-100">
              Management
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {MANAGEMENT_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`p-6 border-4 transition-all text-center group ${link.bg}`}
                >
                  <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="font-bold text-emerald-950 text-sm">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
