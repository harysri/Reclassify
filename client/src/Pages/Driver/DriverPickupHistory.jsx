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
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
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

// // ── Main component ─────────────────────────────────────────────────────────
// const DriverPickupHistory = () => {
//   const [pickups, setPickups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/driver/pickups
//   // Response: { pickups: [{ id, date, userName, items: [{ wasteType, quantity }] }] }
//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/driver/pickups", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load history");
//         // const data = await res.json();
//         // setPickups(data.pickups);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 900));
//         setPickups([
//           {
//             id: "BK-482931",
//             date: "2024-03-22",
//             userName: "John Doe",
//             items: [
//               { wasteType: "plastic", quantity: 3 },
//               { wasteType: "glass", quantity: 1 },
//             ],
//           },
//           {
//             id: "BK-391827",
//             date: "2024-03-21",
//             userName: "Sarah Smith",
//             items: [{ wasteType: "cardboard", quantity: 2 }],
//           },
//           {
//             id: "BK-281047",
//             date: "2024-03-20",
//             userName: "Mike Johnson",
//             items: [
//               { wasteType: "metal", quantity: 1 },
//               { wasteType: "paper", quantity: 4 },
//             ],
//           },
//           {
//             id: "BK-174829",
//             date: "2024-03-19",
//             userName: "Lisa Brown",
//             items: [{ wasteType: "mixed", quantity: 5 }],
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load pickup history. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHistory();
//   }, []);

//   // ── Summary stat ──────────────────────────────────────────────────────────
//   const totalCompleted = pickups.length;

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
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
//             Pickup <span className="text-blue-600">History</span>
//           </h1>
//           {/* Summary stat */}
//           {!loading && (
//             <div className="bg-blue-600 border-4 border-emerald-950 px-6 py-3 shadow-[4px_4px_0px_rgba(6,78,59,1)] text-white text-center">
//               <p className="text-2xl font-extrabold leading-none">
//                 {totalCompleted}
//               </p>
//               <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mt-0.5">
//                 Completed
//               </p>
//             </div>
//           )}
//         </div>

//         {/* FIX: empty state BEFORE the table, not after */}
//         {!loading && pickups.length === 0 ? (
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl mb-4 block">🚛</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No completed pickups yet
//             </p>
//             <p className="text-emerald-500 font-medium">
//               Accepted pickups you complete will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-blue-100 border-b-4 border-emerald-950">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       ID
//                     </th>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Date
//                     </th>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Customer
//                     </th>
//                     <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Items Collected
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y-4 divide-emerald-100">
//                   {/* Loading skeleton rows */}
//                   {loading
//                     ? [...Array(4)].map((_, i) => (
//                         <tr key={i}>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-24 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-24 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-28 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-40 rounded" />
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

//                           {/* Customer */}
//                           <td className="px-6 py-4 font-bold text-emerald-950 whitespace-nowrap">
//                             {pickup.userName}
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

//                 {/* Footer row — total count */}
//                 {!loading && pickups.length > 0 && (
//                   <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
//                     <tr>
//                       <td
//                         colSpan={3}
//                         className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
//                       >
//                         Total Completed
//                       </td>
//                       <td className="px-6 py-4 text-right text-2xl font-extrabold text-blue-600">
//                         {totalCompleted}
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

// export default DriverPickupHistory;

import React, { useState, useEffect } from "react";

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
const DriverPickupHistory = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch pickup history ─────────────────────────────────────────────────
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/driver/pickups`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load history");
        }

        const data = await res.json();
        setPickups(data.pickups);
      } catch (err) {
        setError(
          err.message || "Failed to load pickup history. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // ── Summary stat ──────────────────────────────────────────────────────────
  const totalCompleted = pickups.length;

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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
            Pickup <span className="text-blue-600">History</span>
          </h1>
          {/* Summary stat */}
          {!loading && (
            <div className="bg-blue-600 border-4 border-emerald-950 px-6 py-3 shadow-[4px_4px_0px_rgba(6,78,59,1)] text-white text-center">
              <p className="text-2xl font-extrabold leading-none">
                {totalCompleted}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mt-0.5">
                Completed
              </p>
            </div>
          )}
        </div>

        {/* Empty state */}
        {!loading && pickups.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl mb-4 block">🚛</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No completed pickups yet
            </p>
            <p className="text-emerald-500 font-medium">
              Accepted pickups you complete will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-100 border-b-4 border-emerald-950">
                  <tr>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Items Collected
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-emerald-100">
                  {/* Loading skeleton rows */}
                  {loading
                    ? [...Array(4)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-24 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-24 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-28 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-40 rounded" />
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

                          {/* Customer */}
                          <td className="px-6 py-4 font-bold text-emerald-950 whitespace-nowrap">
                            {pickup.userName}
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

                {/* Footer row — total count */}
                {!loading && pickups.length > 0 && (
                  <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
                      >
                        Total Completed
                      </td>
                      <td className="px-6 py-4 text-right text-2xl font-extrabold text-blue-600">
                        {totalCompleted}
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

export default DriverPickupHistory;
