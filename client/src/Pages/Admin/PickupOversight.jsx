// import React, { useState, useEffect, useMemo } from "react";

// // ── Helpers ────────────────────────────────────────────────────────────────
// const formatDate = (iso) =>
//   new Date(iso).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-orange-50 border-2 border-orange-100 ${className}`}
//   />
// );

// const WASTE_ICONS = {
//   glass: "🍾",
//   plastic: "🥤",
//   cardboard: "📦",
//   paper: "📄",
//   metal: "🥫",
//   mixed: "♻️",
// };

// // FIX: border added, all four statuses covered
// const STATUS_CONFIG = {
//   pending: {
//     label: "Pending",
//     classes: "bg-amber-500  text-white border-amber-800",
//   },
//   accepted: {
//     label: "Accepted",
//     classes: "bg-blue-600   text-white border-blue-950",
//   },
//   in_progress: {
//     label: "In Progress",
//     classes: "bg-indigo-500 text-white border-indigo-900",
//   },
//   completed: {
//     label: "Completed",
//     classes: "bg-emerald-600 text-white border-emerald-950",
//   },
//   cancelled: {
//     label: "Cancelled",
//     classes: "bg-red-500    text-white border-red-900",
//   },
// };

// const StatusBadge = ({ status }) => {
//   const cfg = STATUS_CONFIG[status] ?? {
//     label: status,
//     classes: "bg-gray-500 text-white border-gray-800",
//   };
//   return (
//     <span
//       className={`px-3 py-1 font-bold uppercase text-xs border-4 whitespace-nowrap ${cfg.classes}`}
//     >
//       {cfg.label}
//     </span>
//   );
// };

// // ── Main component ─────────────────────────────────────────────────────────
// const PickupOversight = () => {
//   const [pickups, setPickups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [placeFilter, setPlaceFilter] = useState("all");
//   const [search, setSearch] = useState("");

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/admin/pickups
//   // Response: { pickups: [{ id, userName, driverName, place, status, scheduledDate,
//   //                         items: [{ wasteType, quantity }] }] }
//   useEffect(() => {
//     const fetchPickups = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/admin/pickups", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load pickups");
//         // const data = await res.json();
//         // setPickups(data.pickups);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 900));
//         setPickups([
//           {
//             id: "BK-482931",
//             userName: "John Doe",
//             driverName: "Mike S.",
//             place: "Ernakulam",
//             status: "completed",
//             scheduledDate: "2024-03-22",
//             items: [
//               { wasteType: "plastic", quantity: 3 },
//               { wasteType: "glass", quantity: 1 },
//             ],
//           },
//           {
//             id: "BK-391827",
//             userName: "Sarah Smith",
//             driverName: null,
//             place: "Thrissur",
//             status: "pending",
//             scheduledDate: "2024-03-23",
//             items: [{ wasteType: "cardboard", quantity: 2 }],
//           },
//           {
//             id: "BK-281047",
//             userName: "Mike Johnson",
//             driverName: "Sarah K.",
//             place: "Ernakulam",
//             status: "in_progress",
//             scheduledDate: "2024-03-23",
//             items: [{ wasteType: "metal", quantity: 1 }],
//           },
//           {
//             id: "BK-174829",
//             userName: "Lisa Brown",
//             driverName: "John P.",
//             place: "Kollam",
//             status: "accepted",
//             scheduledDate: "2024-03-24",
//             items: [
//               { wasteType: "paper", quantity: 4 },
//               { wasteType: "mixed", quantity: 2 },
//             ],
//           },
//           {
//             id: "BK-093827",
//             userName: "Priya Nair",
//             driverName: null,
//             place: "Kozhikode",
//             status: "cancelled",
//             scheduledDate: "2024-03-21",
//             items: [{ wasteType: "glass", quantity: 2 }],
//           },
//           {
//             id: "BK-072918",
//             userName: "Arun Das",
//             driverName: "Mike S.",
//             place: "Ernakulam",
//             status: "completed",
//             scheduledDate: "2024-03-20",
//             items: [{ wasteType: "plastic", quantity: 5 }],
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load pickups. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPickups();
//   }, []);

//   // ── Derived place list from actual data ───────────────────────────────────
//   // FIX: not hardcoded — built from real pickup data
//   const places = useMemo(
//     () => ["all", ...Array.from(new Set(pickups.map((p) => p.place))).sort()],
//     [pickups],
//   );

//   // ── Summary counts ────────────────────────────────────────────────────────
//   const counts = useMemo(
//     () =>
//       pickups.reduce((acc, p) => {
//         acc[p.status] = (acc[p.status] ?? 0) + 1;
//         return acc;
//       }, {}),
//     [pickups],
//   );

//   // ── Filter + search ───────────────────────────────────────────────────────
//   const displayed = useMemo(() => {
//     let result = pickups;
//     if (statusFilter !== "all")
//       result = result.filter((p) => p.status === statusFilter);
//     if (placeFilter !== "all")
//       result = result.filter((p) => p.place === placeFilter);
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.id.toLowerCase().includes(q) ||
//           p.userName.toLowerCase().includes(q) ||
//           (p.driverName ?? "").toLowerCase().includes(q) ||
//           p.place.toLowerCase().includes(q),
//       );
//     }
//     return result;
//   }, [pickups, statusFilter, placeFilter, search]);

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error && pickups.length === 0) {
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
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-6">
//             Pickup <span className="text-orange-600">Oversight</span>
//           </h1>

//           {/* Summary stat pills */}
//           {!loading && (
//             <div className="flex flex-wrap gap-2 mb-5">
//               {Object.entries(STATUS_CONFIG).map(([key, cfg]) =>
//                 counts[key] ? (
//                   <button
//                     key={key}
//                     onClick={() =>
//                       setStatusFilter(statusFilter === key ? "all" : key)
//                     }
//                     className={`px-3 py-1 text-xs font-extrabold uppercase tracking-wider border-4 transition-all
//                       ${
//                         statusFilter === key
//                           ? cfg.classes +
//                             " shadow-[3px_3px_0px_rgba(0,0,0,0.15)]"
//                           : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
//                       }`}
//                   >
//                     {cfg.label}: {counts[key]}
//                   </button>
//                 ) : null,
//               )}
//               {statusFilter !== "all" && (
//                 <button
//                   onClick={() => setStatusFilter("all")}
//                   className="px-3 py-1 text-xs font-bold text-emerald-500 hover:text-emerald-800 transition-colors underline underline-offset-2"
//                 >
//                   Show all
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Search + place filter row */}
//           <div className="flex flex-wrap gap-3 items-end">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by ID, customer, driver or place..."
//               className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-orange-500 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
//             />
//             <div>
//               <label className="block text-xs font-extrabold uppercase tracking-wider text-emerald-600 mb-1">
//                 Place
//               </label>
//               <select
//                 value={placeFilter}
//                 onChange={(e) => setPlaceFilter(e.target.value)}
//                 className="px-4 py-3 border-4 border-emerald-200 focus:border-orange-500 font-bold bg-white focus:outline-none text-emerald-950"
//               >
//                 {/* FIX: places derived from actual data, not hardcoded list */}
//                 {places.map((p) => (
//                   <option key={p} value={p}>
//                     {p === "all" ? "All Places" : p}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Inline error (post-load) */}
//         {error && pickups.length > 0 && (
//           <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//             <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && displayed.length === 0 ? (
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl block mb-4">🔍</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No pickups found
//             </p>
//             <p className="text-emerald-500 font-medium">
//               {search
//                 ? `No results for "${search}"`
//                 : `No ${statusFilter !== "all" ? statusFilter.replace("_", " ") : ""} pickups${placeFilter !== "all" ? ` in ${placeFilter}` : ""}`}
//             </p>
//             {(search || statusFilter !== "all" || placeFilter !== "all") && (
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setStatusFilter("all");
//                   setPlaceFilter("all");
//                 }}
//                 className="mt-4 text-orange-600 font-bold underline underline-offset-2 hover:no-underline"
//               >
//                 Clear all filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-orange-100 border-b-4 border-emerald-950">
//                   <tr>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       ID
//                     </th>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Customer
//                     </th>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Driver
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Place
//                     </th>
//                     {/* FIX: date column now rendered — was in data but never shown */}
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Date
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Items
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y-4 divide-emerald-100">
//                   {loading
//                     ? [...Array(4)].map((_, i) => (
//                         <tr key={i}>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-24 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-28 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-24 rounded" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-20 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-24 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-6 w-20 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-32 rounded" />
//                           </td>
//                         </tr>
//                       ))
//                     : displayed.map((pickup) => (
//                         <tr
//                           key={pickup.id}
//                           className="hover:bg-orange-50 transition-colors"
//                         >
//                           {/* ID */}
//                           <td className="px-6 py-4">
//                             <span className="font-mono font-bold text-emerald-950 text-sm">
//                               {pickup.id}
//                             </span>
//                           </td>

//                           {/* Customer */}
//                           <td className="px-6 py-4 font-bold text-emerald-950 whitespace-nowrap">
//                             {pickup.userName}
//                           </td>

//                           {/* Driver — "Unassigned" when null */}
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {pickup.driverName ? (
//                               <span className="font-bold text-emerald-950">
//                                 {pickup.driverName}
//                               </span>
//                             ) : (
//                               <span className="text-emerald-400 font-medium italic text-sm">
//                                 Unassigned
//                               </span>
//                             )}
//                           </td>

//                           {/* Place */}
//                           <td className="px-6 py-4 text-center text-emerald-700 font-medium text-sm">
//                             {pickup.place}
//                           </td>

//                           {/* Date — FIX: now rendered, formatted */}
//                           <td className="px-6 py-4 text-center text-emerald-600 font-medium text-sm whitespace-nowrap">
//                             {formatDate(pickup.scheduledDate)}
//                           </td>

//                           {/* Status badge — FIX: border added */}
//                           <td className="px-6 py-4 text-center">
//                             <StatusBadge status={pickup.status} />
//                           </td>

//                           {/* Items — FIX: structured pills with icons */}
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
//                         </tr>
//                       ))}
//                 </tbody>

//                 {/* Footer */}
//                 {!loading && displayed.length > 0 && (
//                   <tfoot className="bg-orange-50 border-t-4 border-emerald-950">
//                     <tr>
//                       <td
//                         colSpan={7}
//                         className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
//                       >
//                         Showing {displayed.length} of {pickups.length} bookings
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

// export default PickupOversight;

import React, { useState, useEffect, useMemo } from "react";

// ── Helpers ────────────────────────────────────────────────────────────────
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-orange-50 border-2 border-orange-100 ${className}`}
  />
);

const WASTE_ICONS = {
  glass: "🍾",
  plastic: "🥤",
  cardboard: "📦",
  paper: "📄",
  metal: "🥫",
  mixed: "♻️",
};

// FIX: border added, all four statuses covered
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    classes: "bg-amber-500  text-white border-amber-800",
  },
  accepted: {
    label: "Accepted",
    classes: "bg-blue-600   text-white border-blue-950",
  },
  in_progress: {
    label: "In Progress",
    classes: "bg-indigo-500 text-white border-indigo-900",
  },
  completed: {
    label: "Completed",
    classes: "bg-emerald-600 text-white border-emerald-950",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-500    text-white border-red-900",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? {
    label: status,
    classes: "bg-gray-500 text-white border-gray-800",
  };
  return (
    <span
      className={`px-3 py-1 font-bold uppercase text-xs border-4 whitespace-nowrap ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
};

// API configuration
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Main component ─────────────────────────────────────────────────────────
const PickupOversight = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [placeFilter, setPlaceFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ── Fetch Pickups ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchPickups = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/pickups`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load pickups");
        }

        const data = await res.json();
        setPickups(data.pickups);
      } catch (err) {
        setError(err.message || "Failed to load pickups. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPickups();
  }, []);

  // ── Derived place list from actual data ───────────────────────────────────
  const places = useMemo(
    () => ["all", ...Array.from(new Set(pickups.map((p) => p.place))).sort()],
    [pickups],
  );

  // ── Summary counts ────────────────────────────────────────────────────────
  const counts = useMemo(
    () =>
      pickups.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] ?? 0) + 1;
        return acc;
      }, {}),
    [pickups],
  );

  // ── Filter + search ───────────────────────────────────────────────────────
  const displayed = useMemo(() => {
    let result = pickups;
    if (statusFilter !== "all")
      result = result.filter((p) => p.status === statusFilter);
    if (placeFilter !== "all")
      result = result.filter((p) => p.place === placeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.id?.toLowerCase().includes(q) ||
          p.userName?.toLowerCase().includes(q) ||
          (p.driverName ?? "").toLowerCase().includes(q) ||
          p.place?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [pickups, statusFilter, placeFilter, search]);

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && pickups.length === 0) {
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
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-6">
            Pickup <span className="text-orange-600">Oversight</span>
          </h1>

          {/* Summary stat pills */}
          {!loading && (
            <div className="flex flex-wrap gap-2 mb-5">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) =>
                counts[key] ? (
                  <button
                    key={key}
                    onClick={() =>
                      setStatusFilter(statusFilter === key ? "all" : key)
                    }
                    className={`px-3 py-1 text-xs font-extrabold uppercase tracking-wider border-4 transition-all
                      ${
                        statusFilter === key
                          ? cfg.classes +
                            " shadow-[3px_3px_0px_rgba(0,0,0,0.15)]"
                          : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
                      }`}
                  >
                    {cfg.label}: {counts[key]}
                  </button>
                ) : null,
              )}
              {statusFilter !== "all" && (
                <button
                  onClick={() => setStatusFilter("all")}
                  className="px-3 py-1 text-xs font-bold text-emerald-500 hover:text-emerald-800 transition-colors underline underline-offset-2"
                >
                  Show all
                </button>
              )}
            </div>
          )}

          {/* Search + place filter row */}
          <div className="flex flex-wrap gap-3 items-end">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, customer, driver or place..."
              className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-orange-500 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
            />
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-emerald-600 mb-1">
                Place
              </label>
              <select
                value={placeFilter}
                onChange={(e) => setPlaceFilter(e.target.value)}
                className="px-4 py-3 border-4 border-emerald-200 focus:border-orange-500 font-bold bg-white focus:outline-none text-emerald-950"
              >
                {places.map((p) => (
                  <option key={p} value={p}>
                    {p === "all" ? "All Places" : p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inline error (post-load) */}
        {error && pickups.length > 0 && (
          <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
            <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && displayed.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No pickups found
            </p>
            <p className="text-emerald-500 font-medium">
              {search
                ? `No results for "${search}"`
                : `No ${statusFilter !== "all" ? statusFilter.replace("_", " ") : ""} pickups${placeFilter !== "all" ? ` in ${placeFilter}` : ""}`}
            </p>
            {(search || statusFilter !== "all" || placeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setPlaceFilter("all");
                }}
                className="mt-4 text-orange-600 font-bold underline underline-offset-2 hover:no-underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-100 border-b-4 border-emerald-950">
                  <tr>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Driver
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Place
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Items
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-emerald-100">
                  {loading
                    ? [...Array(4)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-24 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-28 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-24 rounded" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-20 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-24 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-6 w-20 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-32 rounded" />
                          </td>
                        </tr>
                      ))
                    : displayed.map((pickup) => (
                        <tr
                          key={pickup.id}
                          className="hover:bg-orange-50 transition-colors"
                        >
                          {/* ID */}
                          <td className="px-6 py-4">
                            <span className="font-mono font-bold text-emerald-950 text-sm">
                              {pickup.id}
                            </span>
                          </td>

                          {/* Customer */}
                          <td className="px-6 py-4 font-bold text-emerald-950 whitespace-nowrap">
                            {pickup.userName}
                          </td>

                          {/* Driver — "Unassigned" when null */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {pickup.driverName ? (
                              <span className="font-bold text-emerald-950">
                                {pickup.driverName}
                              </span>
                            ) : (
                              <span className="text-emerald-400 font-medium italic text-sm">
                                Unassigned
                              </span>
                            )}
                          </td>

                          {/* Place */}
                          <td className="px-6 py-4 text-center text-emerald-700 font-medium text-sm">
                            {pickup.place}
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 text-center text-emerald-600 font-medium text-sm whitespace-nowrap">
                            {formatDate(pickup.scheduledDate)}
                          </td>

                          {/* Status badge */}
                          <td className="px-6 py-4 text-center">
                            <StatusBadge status={pickup.status} />
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
                        </tr>
                      ))}
                </tbody>

                {/* Footer */}
                {!loading && displayed.length > 0 && (
                  <tfoot className="bg-orange-50 border-t-4 border-emerald-950">
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
                      >
                        Showing {displayed.length} of {pickups.length} bookings
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

export default PickupOversight;
