// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";

// // ── Helpers ────────────────────────────────────────────────────────────────
// const formatDate = (iso) =>
//   new Date(iso).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // Waste type icon map — matches WasteClassification pointsConfig
// const WASTE_ICONS = {
//   glass: "🍾",
//   plastic: "🥤",
//   cardboard: "📦",
//   paper: "📄",
//   metal: "🥫",
//   mixed: "♻️",
// };

// // FIX: border added to match app-wide badge style
// const STATUS_CONFIG = {
//   completed: {
//     label: "Completed",
//     classes: "bg-emerald-600 text-white border-emerald-950",
//   },
//   scheduled: {
//     label: "Scheduled",
//     classes: "bg-blue-600    text-white border-blue-950",
//   },
//   accepted: {
//     label: "Accepted",
//     classes: "bg-indigo-500  text-white border-indigo-900",
//   },
//   cancelled: {
//     label: "Cancelled",
//     classes: "bg-red-500     text-white border-red-900",
//   },
// };

// const StatusBadge = ({ status }) => {
//   const cfg = STATUS_CONFIG[status] ?? {
//     label: status,
//     classes: "bg-gray-500 text-white border-gray-800",
//   };
//   return (
//     <span
//       className={`px-3 py-1 font-bold uppercase text-xs tracking-wider border-4 ${cfg.classes}`}
//     >
//       {cfg.label}
//     </span>
//   );
// };

// // ── Main component ─────────────────────────────────────────────────────────
// const PickupHistory = () => {
//   const [pickups, setPickups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/user/pickups
//   // Response: { pickups: [{ id, date, status, items: [{ wasteType, quantity }], points, driver }] }
//   useEffect(() => {
//     const fetchPickups = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/user/pickups", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load pickup history");
//         // const data = await res.json();
//         // setPickups(data.pickups);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 900));
//         setPickups([
//           {
//             id: "PU-001",
//             date: "2024-03-22",
//             status: "completed",
//             points: 105,
//             driver: "Mike S.",
//             items: [
//               { wasteType: "plastic", quantity: 3 },
//               { wasteType: "glass", quantity: 1 },
//             ],
//           },
//           {
//             id: "PU-002",
//             date: "2024-03-15",
//             status: "completed",
//             points: 14,
//             driver: "Sarah L.",
//             items: [
//               { wasteType: "cardboard", quantity: 2 },
//               { wasteType: "paper", quantity: 1 },
//             ],
//           },
//           {
//             id: "PU-003",
//             date: "2024-03-08",
//             status: "cancelled",
//             points: 0,
//             driver: "—",
//             items: [{ wasteType: "metal", quantity: 2 }],
//           },
//           {
//             id: "PU-004",
//             date: "2024-03-01",
//             status: "completed",
//             points: 45,
//             driver: "Mike S.",
//             items: [{ wasteType: "mixed", quantity: 5 }],
//           },
//           {
//             id: "PU-005",
//             date: "2024-03-28",
//             status: "scheduled",
//             points: 0,
//             driver: "Pending",
//             items: [
//               { wasteType: "glass", quantity: 2 },
//               { wasteType: "metal", quantity: 1 },
//             ],
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load pickup history. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPickups();
//   }, []);

//   // ── Summary stats derived from real data ─────────────────────────────────
//   const stats = useMemo(
//     () => ({
//       total: pickups.length,
//       completed: pickups.filter((p) => p.status === "completed").length,
//       points: pickups.reduce((s, p) => s + (p.points ?? 0), 0),
//     }),
//     [pickups],
//   );

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
//           <span className="text-5xl block mb-4">⚠️</span>
//           <p className="font-extrabold text-red-600 text-xl mb-2">
//             Something went wrong
//           </p>
//           <p className="text-red-400 text-sm mb-6">{error}</p>
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
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
//             Pickup <span className="text-emerald-600">History</span>
//           </h1>
//           <Link
//             to="/user/schedule-pickup"
//             className="px-5 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//           >
//             + Schedule Pickup
//           </Link>
//         </div>

//         {/* FIX: summary stats derived from real data */}
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           {[
//             {
//               label: "Total Pickups",
//               value: loading ? "—" : stats.total,
//               icon: "🚛",
//               color: "bg-white",
//             },
//             {
//               label: "Completed",
//               value: loading ? "—" : stats.completed,
//               icon: "✅",
//               color: "bg-white",
//             },
//             {
//               label: "Points Earned",
//               value: loading ? "—" : `+${stats.points.toLocaleString()}`,
//               icon: "💎",
//               color: "bg-emerald-600 text-white",
//             },
//           ].map((s, i) => (
//             <div
//               key={i}
//               className={`${s.color} border-4 border-emerald-950 p-5 shadow-[6px_6px_0px_rgba(6,78,59,1)]`}
//             >
//               <div className="text-2xl mb-1">{s.icon}</div>
//               <p
//                 className={`text-2xl font-extrabold ${s.color.includes("emerald-6") ? "text-white" : "text-emerald-950"}`}
//               >
//                 {loading ? (
//                   <span className="inline-block w-12 h-6 bg-emerald-200 animate-pulse rounded" />
//                 ) : (
//                   s.value
//                 )}
//               </p>
//               <p
//                 className={`text-xs font-bold uppercase tracking-wider mt-1 ${s.color.includes("emerald-6") ? "text-emerald-200" : "text-emerald-600"}`}
//               >
//                 {s.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* FIX: empty state BEFORE the table, not after */}
//         {!loading && pickups.length === 0 ? (
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl mb-4 block">🚛</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No pickups yet
//             </p>
//             <p className="text-emerald-500 font-medium mb-6">
//               Schedule your first pickup and start earning points
//             </p>
//             <Link
//               to="/user/schedule-pickup"
//               className="inline-block px-8 py-4 bg-emerald-600 text-white font-extrabold uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
//             >
//               Schedule Now →
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-emerald-100 border-b-4 border-emerald-950">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       ID
//                     </th>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Date
//                     </th>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Items
//                     </th>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Driver
//                     </th>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-right text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Points
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y-4 divide-emerald-100">
//                   {/* Loading skeleton rows */}
//                   {loading
//                     ? [...Array(4)].map((_, i) => (
//                         <tr key={i}>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-20 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-24 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-32 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-16 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-6 w-20 rounded" />
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <Skeleton className="h-4 w-12 rounded ml-auto" />
//                           </td>
//                         </tr>
//                       ))
//                     : pickups.map((pickup) => (
//                         <tr
//                           key={pickup.id}
//                           className="hover:bg-emerald-50 transition-colors"
//                         >
//                           {/* ID */}
//                           <td className="px-6 py-4">
//                             <span className="font-mono font-bold text-emerald-950 text-sm">
//                               {pickup.id}
//                             </span>
//                           </td>

//                           {/* Date — FIX: formatted */}
//                           <td className="px-6 py-4 text-emerald-700 text-sm font-medium whitespace-nowrap">
//                             {formatDate(pickup.date)}
//                           </td>

//                           {/* Items — FIX: structured array with icons instead of plain string */}
//                           <td className="px-6 py-4">
//                             <div className="flex flex-wrap gap-1">
//                               {pickup.items.map((item, idx) => (
//                                 <span
//                                   key={idx}
//                                   className="inline-flex items-center gap-1 bg-emerald-50 border-2 border-emerald-200 px-2 py-0.5 text-xs font-bold text-emerald-800"
//                                 >
//                                   <span>
//                                     {WASTE_ICONS[item.wasteType] ?? "♻️"}
//                                   </span>
//                                   <span className="capitalize">
//                                     {item.wasteType}
//                                   </span>
//                                   {item.quantity > 1 && (
//                                     <span className="text-emerald-500">
//                                       ×{item.quantity}
//                                     </span>
//                                   )}
//                                 </span>
//                               ))}
//                             </div>
//                           </td>

//                           {/* Driver */}
//                           <td className="px-6 py-4 text-emerald-700 text-sm font-medium whitespace-nowrap">
//                             {pickup.driver}
//                           </td>

//                           {/* Status — FIX: border added */}
//                           <td className="px-6 py-4">
//                             <StatusBadge status={pickup.status} />
//                           </td>

//                           {/* Points — FIX: formatted */}
//                           <td className="px-6 py-4 text-right">
//                             <span
//                               className={`font-extrabold text-lg ${pickup.points > 0 ? "text-emerald-600" : "text-gray-400"}`}
//                             >
//                               {pickup.points > 0
//                                 ? `+${pickup.points.toLocaleString()}`
//                                 : "—"}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                 </tbody>

//                 {/* Points total footer row */}
//                 {!loading && pickups.length > 0 && (
//                   <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
//                     <tr>
//                       <td
//                         colSpan={5}
//                         className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
//                       >
//                         Total Points Earned
//                       </td>
//                       <td className="px-6 py-4 text-right text-2xl font-extrabold text-emerald-600">
//                         +{stats.points.toLocaleString()}
//                       </td>
//                     </tr>
//                   </tfoot>
//                 )}
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PickupHistory;

//updated with backend integration
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── API Configuration ─────────────────────────────────────────────────────
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Helpers ────────────────────────────────────────────────────────────────
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// Waste type icon map — matches WasteClassification pointsConfig
const WASTE_ICONS = {
  glass: "🍾",
  plastic: "🥤",
  cardboard: "📦",
  paper: "📄",
  metal: "🥫",
  mixed: "♻️",
};

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    classes: "bg-emerald-600 text-white border-emerald-950",
  },
  scheduled: {
    label: "Scheduled",
    classes: "bg-blue-600    text-white border-blue-950",
  },
  accepted: {
    label: "Accepted",
    classes: "bg-indigo-500  text-white border-indigo-900",
  },
  in_progress: {
    label: "In Progress",
    classes: "bg-amber-500   text-white border-amber-900",
  },
  pending: {
    label: "Pending",
    classes: "bg-gray-500    text-white border-gray-800",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-500     text-white border-red-900",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? {
    label: status,
    classes: "bg-gray-500 text-white border-gray-800",
  };
  return (
    <span
      className={`px-3 py-1 font-bold uppercase text-xs tracking-wider border-4 ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const PickupHistory = () => {
  const navigate = useNavigate();

  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch pickup history ─────────────────────────────────────────────────
  const fetchPickups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/user/pickups`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load pickup history");
      }

      const data = await res.json();
      setPickups(data.pickups || []);
    } catch (err) {
      setError(
        err.message || "Failed to load pickup history. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchPickups();
  }, [fetchPickups]);

  // ── Summary stats derived from real data ─────────────────────────────────
  const stats = useMemo(
    () => ({
      total: pickups.length,
      completed: pickups.filter((p) => p.status === "completed").length,
      points: pickups.reduce((s, p) => s + (p.points ?? 0), 0),
    }),
    [pickups],
  );

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-2">
            Something went wrong
          </p>
          <p className="text-red-400 text-sm mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Login
            </button>
            <button
              onClick={fetchPickups}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
            Pickup <span className="text-emerald-600">History</span>
          </h1>
          <Link
            to="/user/schedule-pickup"
            className="px-5 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            + Schedule Pickup
          </Link>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Pickups",
              value: loading ? "—" : stats.total,
              icon: "🚛",
              color: "bg-white",
            },
            {
              label: "Completed",
              value: loading ? "—" : stats.completed,
              icon: "✅",
              color: "bg-white",
            },
            {
              label: "Points Earned",
              value: loading ? "—" : `+${stats.points.toLocaleString()}`,
              icon: "💎",
              color: "bg-emerald-600 text-white",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`${s.color} border-4 border-emerald-950 p-5 shadow-[6px_6px_0px_rgba(6,78,59,1)]`}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <p
                className={`text-2xl font-extrabold ${s.color.includes("emerald-6") ? "text-white" : "text-emerald-950"}`}
              >
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-emerald-200 animate-pulse rounded" />
                ) : (
                  s.value
                )}
              </p>
              <p
                className={`text-xs font-bold uppercase tracking-wider mt-1 ${s.color.includes("emerald-6") ? "text-emerald-200" : "text-emerald-600"}`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!loading && pickups.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl mb-4 block">🚛</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No pickups yet
            </p>
            <p className="text-emerald-500 font-medium mb-6">
              Schedule your first pickup and start earning points
            </p>
            <Link
              to="/user/schedule-pickup"
              className="inline-block px-8 py-4 bg-emerald-600 text-white font-extrabold uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Schedule Now →
            </Link>
          </div>
        ) : (
          <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-100 border-b-4 border-emerald-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Driver
                    </th>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Points
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-emerald-100">
                  {/* Loading skeleton rows */}
                  {loading
                    ? [...Array(4)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-20 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-24 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-32 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-16 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-6 w-20 rounded" />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Skeleton className="h-4 w-12 rounded ml-auto" />
                          </td>
                        </tr>
                      ))
                    : pickups.map((pickup) => (
                        <tr
                          key={pickup.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          {/* ID */}
                          <td className="px-6 py-4">
                            <span className="font-mono font-bold text-emerald-950 text-sm">
                              {pickup.id}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 text-emerald-700 text-sm font-medium whitespace-nowrap">
                            {formatDate(pickup.date)}
                          </td>

                          {/* Items */}
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {pickup.items?.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 bg-emerald-50 border-2 border-emerald-200 px-2 py-0.5 text-xs font-bold text-emerald-800"
                                >
                                  <span>
                                    {WASTE_ICONS[item.wasteType] ?? "♻️"}
                                  </span>
                                  <span className="capitalize">
                                    {item.wasteType}
                                  </span>
                                  {item.quantity > 1 && (
                                    <span className="text-emerald-500">
                                      ×{item.quantity}
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Driver */}
                          <td className="px-6 py-4 text-emerald-700 text-sm font-medium whitespace-nowrap">
                            {pickup.driver || "—"}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <StatusBadge status={pickup.status} />
                          </td>

                          {/* Points */}
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`font-extrabold text-lg ${pickup.points > 0 ? "text-emerald-600" : "text-gray-400"}`}
                            >
                              {pickup.points > 0
                                ? `+${pickup.points.toLocaleString()}`
                                : "—"}
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>

                {/* Points total footer row */}
                {!loading && pickups.length > 0 && (
                  <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
                      >
                        Total Points Earned
                      </td>
                      <td className="px-6 py-4 text-right text-2xl font-extrabold text-emerald-600">
                        +{stats.points.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupHistory;
