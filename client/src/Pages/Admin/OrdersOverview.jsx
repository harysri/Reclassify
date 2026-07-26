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

// // FIX: border added, all statuses covered
// const STATUS_CONFIG = {
//   processing: {
//     label: "Processing",
//     classes: "bg-yellow-500 text-white border-yellow-800",
//   },
//   shipped: {
//     label: "Shipped",
//     classes: "bg-blue-600   text-white border-blue-950",
//   },
//   delivered: {
//     label: "Delivered",
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
// const OrdersOverview = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/admin/orders
//   // Response: { orders: [{ id, userName, date, items, status, totalPoints }] }
//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/admin/orders", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load orders");
//         // const data = await res.json();
//         // setOrders(data.orders);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 900));
//         setOrders([
//           {
//             id: "ORD-482931",
//             userName: "John Doe",
//             date: "2024-03-22",
//             items: 1,
//             status: "delivered",
//             totalPoints: 500,
//           },
//           {
//             id: "ORD-391827",
//             userName: "Sarah Smith",
//             date: "2024-03-21",
//             items: 2,
//             status: "shipped",
//             totalPoints: 700,
//           },
//           {
//             id: "ORD-281047",
//             userName: "Mike Johnson",
//             date: "2024-03-20",
//             items: 1,
//             status: "processing",
//             totalPoints: 350,
//           },
//           {
//             id: "ORD-174829",
//             userName: "Lisa Brown",
//             date: "2024-03-19",
//             items: 3,
//             status: "delivered",
//             totalPoints: 1200,
//           },
//           {
//             id: "ORD-093827",
//             userName: "Priya Nair",
//             date: "2024-03-18",
//             items: 1,
//             status: "cancelled",
//             totalPoints: 150,
//           },
//           {
//             id: "ORD-072918",
//             userName: "Arun Das",
//             date: "2024-03-17",
//             items: 2,
//             status: "delivered",
//             totalPoints: 950,
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load orders. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // ── Summary stats ─────────────────────────────────────────────────────────
//   const stats = useMemo(
//     () => ({
//       total: orders.length,
//       totalPoints: orders.reduce((s, o) => s + o.totalPoints, 0),
//       delivered: orders.filter((o) => o.status === "delivered").length,
//       processing: orders.filter((o) => o.status === "processing").length,
//     }),
//     [orders],
//   );

//   // ── Filter counts ─────────────────────────────────────────────────────────
//   const counts = useMemo(
//     () =>
//       orders.reduce((acc, o) => {
//         acc[o.status] = (acc[o.status] ?? 0) + 1;
//         return acc;
//       }, {}),
//     [orders],
//   );

//   // ── Filter + search ───────────────────────────────────────────────────────
//   const displayed = useMemo(() => {
//     let result =
//       filter === "all" ? orders : orders.filter((o) => o.status === filter);
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter(
//         (o) =>
//           o.id.toLowerCase().includes(q) ||
//           o.userName.toLowerCase().includes(q),
//       );
//     }
//     return result;
//   }, [orders, filter, search]);

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error && orders.length === 0) {
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
//         <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-8">
//           Orders <span className="text-emerald-600">Overview</span>
//         </h1>

//         {/* Summary stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {[
//             {
//               label: "Total Orders",
//               value: loading ? "—" : stats.total,
//               icon: "🛒",
//               color: "bg-white",
//             },
//             {
//               label: "Delivered",
//               value: loading ? "—" : stats.delivered,
//               icon: "✅",
//               color: "bg-white",
//             },
//             {
//               label: "Processing",
//               value: loading ? "—" : stats.processing,
//               icon: "⏳",
//               color: "bg-white",
//             },
//             {
//               label: "Points Redeemed",
//               value: loading ? "—" : stats.totalPoints.toLocaleString(),
//               icon: "💎",
//               color: "bg-emerald-600",
//             },
//           ].map((s, i) => (
//             <div
//               key={i}
//               className={`${s.color} border-4 border-emerald-950 p-5 shadow-[6px_6px_0px_rgba(6,78,59,1)]`}
//             >
//               <div className="text-2xl mb-2">{s.icon}</div>
//               {loading ? (
//                 <Skeleton className="h-8 w-16 mb-1 rounded" />
//               ) : (
//                 <p
//                   className={`text-2xl font-extrabold ${s.color === "bg-emerald-600" ? "text-white" : "text-emerald-950"}`}
//                 >
//                   {s.value}
//                 </p>
//               )}
//               <p
//                 className={`text-xs font-bold uppercase tracking-wider mt-1 ${s.color === "bg-emerald-600" ? "text-emerald-200" : "text-emerald-600"}`}
//               >
//                 {s.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Search + filter row */}
//         <div className="flex flex-wrap gap-3 items-center mb-6">
//           {/* Search */}
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search by order ID or customer..."
//             className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
//           />

//           {/* Filter tabs with live counts */}
//           <div className="flex flex-wrap gap-2">
//             {[
//               { key: "all", label: `All (${orders.length})` },
//               {
//                 key: "processing",
//                 label: `Processing (${counts.processing ?? 0})`,
//               },
//               { key: "shipped", label: `Shipped (${counts.shipped ?? 0})` },
//               {
//                 key: "delivered",
//                 label: `Delivered (${counts.delivered ?? 0})`,
//               },
//               {
//                 key: "cancelled",
//                 label: `Cancelled (${counts.cancelled ?? 0})`,
//               },
//             ].map((f) => (
//               <button
//                 key={f.key}
//                 onClick={() => setFilter(f.key)}
//                 className={`px-4 py-3 font-bold uppercase text-sm border-4 transition-all whitespace-nowrap
//                   ${
//                     filter === f.key
//                       ? "bg-emerald-600 text-white border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)]"
//                       : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
//                   }`}
//               >
//                 {f.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Inline error (post-load) */}
//         {error && orders.length > 0 && (
//           <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//             <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//           </div>
//         )}

//         {/* Empty state — before table */}
//         {!loading && displayed.length === 0 ? (
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl block mb-4">🔍</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No orders found
//             </p>
//             <p className="text-emerald-500 font-medium">
//               {search
//                 ? `No results for "${search}"`
//                 : `No ${filter !== "all" ? filter : ""} orders yet`}
//             </p>
//             {(search || filter !== "all") && (
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setFilter("all");
//                 }}
//                 className="mt-4 text-emerald-600 font-bold underline underline-offset-2 hover:no-underline"
//               >
//                 Clear filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-emerald-100 border-b-4 border-emerald-950">
//                   <tr>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Order ID
//                     </th>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Customer
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Date
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Items
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-right  text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Points
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y-4 divide-emerald-100">
//                   {/* Loading skeleton rows */}
//                   {loading
//                     ? [...Array(5)].map((_, i) => (
//                         <tr key={i}>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-28 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-32 rounded" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-24 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-8 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-6 w-20 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <Skeleton className="h-4 w-16 rounded ml-auto" />
//                           </td>
//                         </tr>
//                       ))
//                     : displayed.map((order) => (
//                         <tr
//                           key={order.id}
//                           className="hover:bg-emerald-50 transition-colors"
//                         >
//                           {/* Order ID */}
//                           <td className="px-6 py-4">
//                             <span className="font-mono font-bold text-emerald-950 text-sm">
//                               {order.id}
//                             </span>
//                           </td>

//                           {/* Customer — FIX: customer → userName */}
//                           <td className="px-6 py-4 font-bold text-emerald-950 whitespace-nowrap">
//                             {order.userName}
//                           </td>

//                           {/* Date — FIX: formatted */}
//                           <td className="px-6 py-4 text-center text-emerald-600 font-medium text-sm whitespace-nowrap">
//                             {formatDate(order.date)}
//                           </td>

//                           {/* Items */}
//                           <td className="px-6 py-4 text-center font-extrabold text-emerald-800">
//                             {order.items}
//                           </td>

//                           {/* Status — FIX: border added, cancelled covered */}
//                           <td className="px-6 py-4 text-center">
//                             <StatusBadge status={order.status} />
//                           </td>

//                           {/* Total points — FIX: formatted */}
//                           <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
//                             {order.totalPoints.toLocaleString()} pts
//                           </td>
//                         </tr>
//                       ))}
//                 </tbody>

//                 {/* Footer totals */}
//                 {!loading && displayed.length > 0 && (
//                   <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
//                       >
//                         Showing {displayed.length} of {orders.length} orders
//                       </td>
//                       <td className="px-6 py-4 text-right" colSpan={2}>
//                         <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm mr-3">
//                           Total redeemed:
//                         </span>
//                         <span className="text-xl font-extrabold text-emerald-600">
//                           {displayed
//                             .reduce((s, o) => s + o.totalPoints, 0)
//                             .toLocaleString()}{" "}
//                           pts
//                         </span>
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

// export default OrdersOverview;

//updated with backend api integration

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
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// FIX: border added, all statuses covered
const STATUS_CONFIG = {
  processing: {
    label: "Processing",
    classes: "bg-yellow-500 text-white border-yellow-800",
  },
  shipped: {
    label: "Shipped",
    classes: "bg-blue-600   text-white border-blue-950",
  },
  delivered: {
    label: "Delivered",
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
const OrdersOverview = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ── Fetch Orders ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/orders`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load orders");
        }

        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message || "Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ── Summary stats ─────────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: orders.length,
      totalPoints: orders.reduce((s, o) => s + (o.totalPoints || 0), 0),
      delivered: orders.filter((o) => o.status === "delivered").length,
      processing: orders.filter((o) => o.status === "processing").length,
    }),
    [orders],
  );

  // ── Filter counts ─────────────────────────────────────────────────────────
  const counts = useMemo(
    () =>
      orders.reduce((acc, o) => {
        acc[o.status] = (acc[o.status] ?? 0) + 1;
        return acc;
      }, {}),
    [orders],
  );

  // ── Filter + search ───────────────────────────────────────────────────────
  const displayed = useMemo(() => {
    let result =
      filter === "all" ? orders : orders.filter((o) => o.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.id?.toLowerCase().includes(q) ||
          o.userName?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [orders, filter, search]);

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && orders.length === 0) {
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
        <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-8">
          Orders <span className="text-emerald-600">Overview</span>
        </h1>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Orders",
              value: loading ? "—" : stats.total,
              icon: "🛒",
              color: "bg-white",
            },
            {
              label: "Delivered",
              value: loading ? "—" : stats.delivered,
              icon: "✅",
              color: "bg-white",
            },
            {
              label: "Processing",
              value: loading ? "—" : stats.processing,
              icon: "⏳",
              color: "bg-white",
            },
            {
              label: "Points Redeemed",
              value: loading ? "—" : stats.totalPoints.toLocaleString(),
              icon: "💎",
              color: "bg-emerald-600",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`${s.color} border-4 border-emerald-950 p-5 shadow-[6px_6px_0px_rgba(6,78,59,1)]`}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              {loading ? (
                <Skeleton className="h-8 w-16 mb-1 rounded" />
              ) : (
                <p
                  className={`text-2xl font-extrabold ${s.color === "bg-emerald-600" ? "text-white" : "text-emerald-950"}`}
                >
                  {s.value}
                </p>
              )}
              <p
                className={`text-xs font-bold uppercase tracking-wider mt-1 ${s.color === "bg-emerald-600" ? "text-emerald-200" : "text-emerald-600"}`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Search + filter row */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
          />

          {/* Filter tabs with live counts */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: `All (${orders.length})` },
              {
                key: "processing",
                label: `Processing (${counts.processing ?? 0})`,
              },
              { key: "shipped", label: `Shipped (${counts.shipped ?? 0})` },
              {
                key: "delivered",
                label: `Delivered (${counts.delivered ?? 0})`,
              },
              {
                key: "cancelled",
                label: `Cancelled (${counts.cancelled ?? 0})`,
              },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-3 font-bold uppercase text-sm border-4 transition-all whitespace-nowrap
                  ${
                    filter === f.key
                      ? "bg-emerald-600 text-white border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)]"
                      : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inline error (post-load) */}
        {error && orders.length > 0 && (
          <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
            <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Empty state — before table */}
        {!loading && displayed.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No orders found
            </p>
            <p className="text-emerald-500 font-medium">
              {search
                ? `No results for "${search}"`
                : `No ${filter !== "all" ? filter : ""} orders yet`}
            </p>
            {(search || filter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
                className="mt-4 text-emerald-600 font-bold underline underline-offset-2 hover:no-underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-100 border-b-4 border-emerald-950">
                  <tr>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Items
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right  text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Points
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-emerald-100">
                  {/* Loading skeleton rows */}
                  {loading
                    ? [...Array(5)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-28 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-32 rounded" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-24 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-8 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-6 w-20 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Skeleton className="h-4 w-16 rounded ml-auto" />
                          </td>
                        </tr>
                      ))
                    : displayed.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          {/* Order ID */}
                          <td className="px-6 py-4">
                            <span className="font-mono font-bold text-emerald-950 text-sm">
                              {order.id}
                            </span>
                          </td>

                          {/* Customer */}
                          <td className="px-6 py-4 font-bold text-emerald-950 whitespace-nowrap">
                            {order.userName}
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 text-center text-emerald-600 font-medium text-sm whitespace-nowrap">
                            {formatDate(order.date)}
                          </td>

                          {/* Items */}
                          <td className="px-6 py-4 text-center font-extrabold text-emerald-800">
                            {order.items}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4 text-center">
                            <StatusBadge status={order.status} />
                          </td>

                          {/* Total points */}
                          <td className="px-6 py-4 text-right font-extrabold text-emerald-600">
                            {order.totalPoints?.toLocaleString()} pts
                          </td>
                        </tr>
                      ))}
                </tbody>

                {/* Footer totals */}
                {!loading && displayed.length > 0 && (
                  <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
                      >
                        Showing {displayed.length} of {orders.length} orders
                      </td>
                      <td className="px-6 py-4 text-right" colSpan={2}>
                        <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm mr-3">
                          Total redeemed:
                        </span>
                        <span className="text-xl font-extrabold text-emerald-600">
                          {displayed
                            .reduce((s, o) => s + (o.totalPoints || 0), 0)
                            .toLocaleString()}{" "}
                          pts
                        </span>
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

export default OrdersOverview;
