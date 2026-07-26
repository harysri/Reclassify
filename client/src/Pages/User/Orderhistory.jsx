// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

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

// // FIX: border added to match app-wide badge style
// const STATUS_CONFIG = {
//   delivered: {
//     label: "Delivered",
//     classes: "bg-emerald-600 text-white border-emerald-950",
//   },
//   shipped: {
//     label: "Shipped",
//     classes: "bg-blue-600    text-white border-blue-950",
//   },
//   processing: {
//     label: "Processing",
//     classes: "bg-yellow-500 text-white border-yellow-800",
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
//       className={`px-4 py-2 font-bold uppercase text-sm tracking-wider border-4 ${cfg.classes}`}
//     >
//       {cfg.label}
//     </span>
//   );
// };

// // ── Main component ─────────────────────────────────────────────────────────
// const OrderHistory = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/orders
//   // Response: { orders: [{ id, date, status, total, items: [...] }] }
//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/orders", {
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
//             date: "2024-03-20",
//             status: "delivered",
//             total: 500,
//             items: [
//               {
//                 name: "Recycled Backpack",
//                 quantity: 1,
//                 image: "🎒",
//                 points: 500,
//               },
//             ],
//           },
//           {
//             id: "ORD-391827",
//             date: "2024-03-15",
//             status: "shipped",
//             total: 300,
//             items: [
//               {
//                 name: "Bamboo Toothbrush Set",
//                 quantity: 2,
//                 image: "🪥",
//                 points: 150,
//               },
//             ],
//           },
//           {
//             id: "ORD-281047",
//             date: "2024-03-08",
//             status: "processing",
//             total: 200,
//             items: [
//               {
//                 name: "Reusable Water Bottle",
//                 quantity: 1,
//                 image: "🥤",
//                 points: 200,
//               },
//             ],
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

//   // ── Main render ───────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
//             Order <span className="text-emerald-600">History</span>
//           </h1>
//           {!loading && orders.length > 0 && (
//             <span className="bg-emerald-100 text-emerald-800 border-2 border-emerald-300 px-3 py-1 font-bold text-sm">
//               {orders.length} order{orders.length !== 1 ? "s" : ""}
//             </span>
//           )}
//         </div>

//         {/* Loading skeletons */}
//         {loading ? (
//           <div className="space-y-6">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]"
//               >
//                 <div className="flex justify-between items-start mb-4 pb-4 border-b-4 border-emerald-100">
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-28 rounded" />
//                     <Skeleton className="h-4 w-20 rounded" />
//                   </div>
//                   <Skeleton className="h-9 w-24 rounded" />
//                 </div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <Skeleton className="w-10 h-10 rounded" />
//                   <div className="space-y-2 flex-1">
//                     <Skeleton className="h-4 w-40 rounded" />
//                     <Skeleton className="h-3 w-16 rounded" />
//                   </div>
//                 </div>
//                 <div className="flex justify-between pt-4 border-t-4 border-emerald-100">
//                   <Skeleton className="h-5 w-24 rounded" />
//                   <Skeleton className="h-7 w-20 rounded" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : orders.length === 0 ? (
//           // FIX: empty state is now a conditional BEFORE the map, not after it
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl mb-4 block">📭</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No orders yet
//             </p>
//             <p className="text-emerald-500 font-medium mb-6">
//               Redeem your points in the shop to place your first order
//             </p>
//             <Link
//               to="/user/shop"
//               className="inline-block px-8 py-4 bg-emerald-600 text-white font-extrabold uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
//             >
//               Browse Shop →
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order.id}
//                 className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
//               >
//                 {/* Order header */}
//                 <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b-4 border-emerald-100">
//                   <div>
//                     <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest mb-1">
//                       Order ID
//                     </p>
//                     {/* FIX: real order ID format consistent with Checkout success screen */}
//                     <p className="font-mono font-bold text-emerald-950 text-lg">
//                       {order.id}
//                     </p>
//                     {/* FIX: formatted date */}
//                     <p className="text-emerald-500 text-sm font-medium mt-0.5">
//                       {formatDate(order.date)}
//                     </p>
//                   </div>
//                   <StatusBadge status={order.status} />
//                 </div>

//                 {/* Items */}
//                 <div className="space-y-3 mb-4">
//                   {order.items.map((item, index) => (
//                     <div key={index} className="flex items-center gap-4">
//                       <div className="w-10 h-10 bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-xl flex-shrink-0">
//                         {item.image}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-emerald-950 truncate">
//                           {item.name}
//                         </p>
//                         <p className="text-xs text-emerald-500 font-medium">
//                           {item.quantity} unit{item.quantity !== 1 ? "s" : ""}
//                           {item.points
//                             ? ` · ${item.points.toLocaleString()} pts each`
//                             : ""}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Footer: total + view details */}
//                 <div className="flex justify-between items-center pt-4 border-t-4 border-emerald-100">
//                   <div>
//                     <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-0.5">
//                       Points Spent
//                     </p>
//                     {/* FIX: formatted with toLocaleString + "pts" label */}
//                     <p className="text-2xl font-extrabold text-emerald-600">
//                       {order.total.toLocaleString()} pts
//                     </p>
//                   </div>
//                   {/* FIX: view details link per order */}
//                   <Link
//                     to={`/user/orders/${order.id}`}
//                     className="px-5 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider text-sm border-4 border-emerald-200 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] transition-all"
//                   >
//                     View Details →
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;

//updated page with api integration with backend

import React, { useState, useEffect, useCallback } from "react";
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

const STATUS_CONFIG = {
  delivered: {
    label: "Delivered",
    classes: "bg-emerald-600 text-white border-emerald-950",
  },
  shipped: {
    label: "Shipped",
    classes: "bg-blue-600    text-white border-blue-950",
  },
  processing: {
    label: "Processing",
    classes: "bg-yellow-500 text-white border-yellow-800",
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
      className={`px-4 py-2 font-bold uppercase text-sm tracking-wider border-4 ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch orders ─────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load orders");
      }

      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
              onClick={fetchOrders}
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
            Order <span className="text-emerald-600">History</span>
          </h1>
          {!loading && orders.length > 0 && (
            <span className="bg-emerald-100 text-emerald-800 border-2 border-emerald-300 px-3 py-1 font-bold text-sm">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]"
              >
                <div className="flex justify-between items-start mb-4 pb-4 border-b-4 border-emerald-100">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                  <Skeleton className="h-9 w-24 rounded" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="w-10 h-10 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-40 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t-4 border-emerald-100">
                  <Skeleton className="h-5 w-24 rounded" />
                  <Skeleton className="h-7 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No orders yet
            </p>
            <p className="text-emerald-500 font-medium mb-6">
              Redeem your points in the shop to place your first order
            </p>
            <Link
              to="/user/shop"
              className="inline-block px-8 py-4 bg-emerald-600 text-white font-extrabold uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Browse Shop →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                {/* Order header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b-4 border-emerald-100">
                  <div>
                    <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest mb-1">
                      Order ID
                    </p>
                    <p className="font-mono font-bold text-emerald-950 text-lg">
                      {order.id}
                    </p>
                    <p className="text-emerald-500 text-sm font-medium mt-0.5">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
                        {item.image?.startsWith("http") || item.image?.startsWith("/") ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          item.image || "🛍️"
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-emerald-950 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-emerald-500 font-medium">
                          {item.quantity} unit{item.quantity !== 1 ? "s" : ""}
                          {item.points
                            ? ` · ${item.points.toLocaleString()} pts each`
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer: total + view details */}
                <div className="flex justify-between items-center pt-4 border-t-4 border-emerald-100">
                  <div>
                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-0.5">
                      Points Spent
                    </p>
                    <p className="text-2xl font-extrabold text-emerald-600">
                      {order.total.toLocaleString()} pts
                    </p>
                  </div>
                  <Link
                    to={`/user/orders/${order.id}`}
                    className="px-5 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider text-sm border-4 border-emerald-200 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] transition-all"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
