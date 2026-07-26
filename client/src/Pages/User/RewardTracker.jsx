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

// // Badge config per transaction type
// const TYPE_CONFIG = {
//   earned: {
//     label: "Earned",
//     bg: "bg-emerald-100",
//     text: "text-emerald-800",
//     border: "border-emerald-300",
//   },
//   redeemed: {
//     label: "Redeemed",
//     bg: "bg-red-100",
//     text: "text-red-700",
//     border: "border-red-300",
//   },
//   bonus: {
//     label: "Bonus",
//     bg: "bg-amber-100",
//     text: "text-amber-800",
//     border: "border-amber-300",
//   },
// };

// const PAGE_SIZE = 5;

// // ── Main component ─────────────────────────────────────────────────────────
// const RewardTracker = () => {
//   const [filter, setFilter] = useState("all");
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/user/rewards
//   // Response: { transactions: [{ id, type, description, points, date, icon }] }
//   useEffect(() => {
//     const fetchRewards = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/user/rewards", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load rewards");
//         // const data = await res.json();
//         // setTransactions(data.transactions);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 1000));
//         setTransactions([
//           {
//             id: 1,
//             type: "earned",
//             description: "Plastic Bottle Recycling",
//             points: 5,
//             date: "2024-03-23",
//             icon: "🥤",
//           },
//           {
//             id: 2,
//             type: "earned",
//             description: "Glass Bottle Recycling",
//             points: 100,
//             date: "2024-03-22",
//             icon: "🍾",
//           },
//           {
//             id: 3,
//             type: "earned",
//             description: "Cardboard Box Recycling",
//             points: 7,
//             date: "2024-03-22",
//             icon: "📦",
//           },
//           {
//             id: 4,
//             type: "redeemed",
//             description: "Eco-Friendly Backpack",
//             points: -500,
//             date: "2024-03-20",
//             icon: "🎒",
//           },
//           {
//             id: 5,
//             type: "earned",
//             description: "Metal Can Recycling",
//             points: 20,
//             date: "2024-03-19",
//             icon: "🥫",
//           },
//           {
//             id: 6,
//             type: "earned",
//             description: "Paper Stack Recycling",
//             points: 9,
//             date: "2024-03-18",
//             icon: "📄",
//           },
//           {
//             id: 7,
//             type: "bonus",
//             description: "Weekly Streak Bonus",
//             points: 50,
//             date: "2024-03-18",
//             icon: "🔥",
//           },
//           {
//             id: 8,
//             type: "earned",
//             description: "Metal Tin Recycling",
//             points: 20,
//             date: "2024-03-15",
//             icon: "🥫",
//           },
//           {
//             id: 9,
//             type: "bonus",
//             description: "First Pickup Bonus",
//             points: 100,
//             date: "2024-03-10",
//             icon: "🎉",
//           },
//           {
//             id: 10,
//             type: "redeemed",
//             description: "Bamboo Water Bottle",
//             points: -300,
//             date: "2024-03-08",
//             icon: "🎁",
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load reward history. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRewards();
//   }, []);

//   // ── Derived values ───────────────────────────────────────────────────────
//   // FIX: balance is now derived from actual transactions — not a hardcoded string
//   const { totalEarned, totalRedeemed, currentBalance } = useMemo(() => {
//     const earned = transactions
//       .filter((t) => t.type === "earned" || t.type === "bonus")
//       .reduce((s, t) => s + t.points, 0);
//     const redeemed = Math.abs(
//       transactions
//         .filter((t) => t.type === "redeemed")
//         .reduce((s, t) => s + t.points, 0),
//     );
//     return {
//       totalEarned: earned,
//       totalRedeemed: redeemed,
//       currentBalance: earned - redeemed,
//     };
//   }, [transactions]);

//   const filtered = useMemo(
//     () =>
//       filter === "all"
//         ? transactions
//         : transactions.filter((t) => t.type === filter),
//     [transactions, filter],
//   );

//   // Paginated slice — reset page when filter changes
//   const paginated = filtered.slice(0, page * PAGE_SIZE);
//   const hasMore = paginated.length < filtered.length;

//   const handleFilterChange = (f) => {
//     setFilter(f);
//     setPage(1);
//   };

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
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-8">
//           Reward <span className="text-emerald-600">Tracker</span>
//         </h1>

//         {/* Overview cards */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           {/* Current balance — FIX: derived, not hardcoded */}
//           <div className="bg-emerald-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-white">
//             <p className="text-sm font-bold uppercase tracking-wider mb-2">
//               Current Balance
//             </p>
//             {loading ? (
//               <Skeleton className="h-14 w-32 rounded" />
//             ) : (
//               <p className="text-5xl font-extrabold">
//                 {currentBalance.toLocaleString()}
//               </p>
//             )}
//           </div>

//           {/* Total earned */}
//           <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <p className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">
//               Total Earned
//             </p>
//             {loading ? (
//               <Skeleton className="h-14 w-28 rounded" />
//             ) : (
//               <p className="text-5xl font-extrabold text-emerald-950">
//                 +{totalEarned.toLocaleString()}
//               </p>
//             )}
//           </div>

//           {/* Total redeemed */}
//           <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <p className="text-sm font-bold uppercase tracking-wider text-red-600 mb-2">
//               Total Redeemed
//             </p>
//             {loading ? (
//               <Skeleton className="h-14 w-28 rounded" />
//             ) : (
//               <p className="text-5xl font-extrabold text-red-500">
//                 -{totalRedeemed.toLocaleString()}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Filter tabs */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {["all", "earned", "redeemed", "bonus"].map((f) => (
//             <button
//               key={f}
//               onClick={() => handleFilterChange(f)}
//               className={`px-6 py-3 font-bold uppercase tracking-wider border-4 transition-all ${
//                 filter === f
//                   ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                   : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {/* Transactions list */}
//         <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//           <div className="flex justify-between items-center mb-6 border-b-4 border-emerald-100 pb-4">
//             <h2 className="text-2xl font-extrabold text-emerald-950">
//               Transaction History
//             </h2>
//             {!loading && (
//               <span className="text-sm font-bold text-emerald-500">
//                 {filtered.length} record{filtered.length !== 1 ? "s" : ""}
//               </span>
//             )}
//           </div>

//           {/* Loading skeletons */}
//           {loading ? (
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-4 p-4 bg-emerald-50 border-4 border-emerald-200"
//                 >
//                   <Skeleton className="w-14 h-14 rounded flex-shrink-0" />
//                   <div className="flex-1 space-y-2">
//                     <Skeleton className="h-5 w-48 rounded" />
//                     <Skeleton className="h-4 w-24 rounded" />
//                   </div>
//                   <Skeleton className="h-8 w-16 rounded flex-shrink-0" />
//                 </div>
//               ))}
//             </div>
//           ) : paginated.length === 0 ? (
//             <div className="text-center py-12">
//               <span className="text-6xl mb-4 block">📭</span>
//               <p className="text-emerald-600 font-bold">
//                 No transactions found
//               </p>
//               <p className="text-emerald-400 text-sm mt-1">
//                 {filter === "all"
//                   ? "Start recycling to earn your first points!"
//                   : `No ${filter} transactions yet.`}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {paginated.map((t) => {
//                   const cfg = TYPE_CONFIG[t.type] ?? TYPE_CONFIG.earned;
//                   return (
//                     <div
//                       key={t.id}
//                       className="flex items-center gap-4 p-4 bg-emerald-50 border-4 border-emerald-200 hover:border-emerald-400 transition-all"
//                     >
//                       {/* Icon */}
//                       <div className="w-14 h-14 bg-white border-4 border-emerald-300 flex items-center justify-center text-2xl flex-shrink-0">
//                         {t.icon}
//                       </div>

//                       {/* Description + date + type badge */}
//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-emerald-950 truncate">
//                           {t.description}
//                         </p>
//                         <div className="flex items-center gap-2 mt-1">
//                           {/* FIX: formatted date instead of raw ISO string */}
//                           <p className="text-sm text-emerald-600">
//                             {formatDate(t.date)}
//                           </p>
//                           {/* FIX: type badge so earned/bonus/redeemed are visually distinct in the row */}
//                           <span
//                             className={`text-xs font-bold px-2 py-0.5 border ${cfg.bg} ${cfg.text} ${cfg.border} uppercase tracking-wide`}
//                           >
//                             {cfg.label}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Points */}
//                       <span
//                         className={`text-2xl font-extrabold flex-shrink-0 ${t.type === "redeemed" ? "text-red-500" : t.type === "bonus" ? "text-amber-600" : "text-emerald-600"}`}
//                       >
//                         {t.points > 0 ? `+${t.points}` : t.points}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* FIX: load more instead of showing everything at once */}
//               {hasMore && (
//                 <button
//                   onClick={() => setPage((p) => p + 1)}
//                   className="w-full mt-6 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] transition-all"
//                 >
//                   Load More ({filtered.length - paginated.length} remaining)
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RewardTracker

//updated with backend integration

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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

// Badge config per transaction type
const TYPE_CONFIG = {
  earned: {
    label: "Earned",
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    border: "border-emerald-300",
  },
  redeemed: {
    label: "Redeemed",
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
  },
  bonus: {
    label: "Bonus",
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-300",
  },
};

const PAGE_SIZE = 5;

// ── Main component ─────────────────────────────────────────────────────────
const RewardTracker = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // ── Fetch rewards ────────────────────────────────────────────────────────
  const fetchRewards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/rewards`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load rewards");
      }

      const data = await res.json();
      // Transform backend data to match component structure
      const formattedTransactions = (data.transactions || []).map((t) => ({
        id: t._id || t.id,
        type: t.type,
        description: t.reason || t.description,
        points: t.points,
        date: t.createdAt || t.date,
        icon: t.type === "redeemed" ? "🎁" : t.type === "bonus" ? "🔥" : "♻️",
      }));

      setTransactions(formattedTransactions);
    } catch (err) {
      setError(
        err.message || "Failed to load reward history. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  // ── Derived values ───────────────────────────────────────────────────────
  const { totalEarned, totalRedeemed, currentBalance } = useMemo(() => {
    const earned = transactions
      .filter((t) => t.type === "earned" || t.type === "bonus")
      .reduce((s, t) => s + (t.points || 0), 0);
    const redeemed = Math.abs(
      transactions
        .filter((t) => t.type === "redeemed")
        .reduce((s, t) => s + (t.points || 0), 0),
    );
    return {
      totalEarned: earned,
      totalRedeemed: redeemed,
      currentBalance: earned - redeemed,
    };
  }, [transactions]);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? transactions
        : transactions.filter((t) => t.type === filter),
    [transactions, filter],
  );

  // Paginated slice — reset page when filter changes
  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
  };

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
              onClick={fetchRewards}
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-8">
          Reward <span className="text-emerald-600">Tracker</span>
        </h1>

        {/* Overview cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current balance */}
          <div className="bg-emerald-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] text-white">
            <p className="text-sm font-bold uppercase tracking-wider mb-2">
              Current Balance
            </p>
            {loading ? (
              <Skeleton className="h-14 w-32 rounded" />
            ) : (
              <p className="text-5xl font-extrabold">
                {currentBalance.toLocaleString()}
              </p>
            )}
          </div>

          {/* Total earned */}
          <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">
              Total Earned
            </p>
            {loading ? (
              <Skeleton className="h-14 w-28 rounded" />
            ) : (
              <p className="text-5xl font-extrabold text-emerald-950">
                +{totalEarned.toLocaleString()}
              </p>
            )}
          </div>

          {/* Total redeemed */}
          <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <p className="text-sm font-bold uppercase tracking-wider text-red-600 mb-2">
              Total Redeemed
            </p>
            {loading ? (
              <Skeleton className="h-14 w-28 rounded" />
            ) : (
              <p className="text-5xl font-extrabold text-red-500">
                -{totalRedeemed.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "earned", "redeemed", "bonus"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-6 py-3 font-bold uppercase tracking-wider border-4 transition-all ${
                filter === f
                  ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                  : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Transactions list */}
        <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
          <div className="flex justify-between items-center mb-6 border-b-4 border-emerald-100 pb-4">
            <h2 className="text-2xl font-extrabold text-emerald-950">
              Transaction History
            </h2>
            {!loading && (
              <span className="text-sm font-bold text-emerald-500">
                {filtered.length} record{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Loading skeletons */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-emerald-50 border-4 border-emerald-200"
                >
                  <Skeleton className="w-14 h-14 rounded flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                  <Skeleton className="h-8 w-16 rounded flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-emerald-600 font-bold">
                No transactions found
              </p>
              <p className="text-emerald-400 text-sm mt-1">
                {filter === "all"
                  ? "Start recycling to earn your first points!"
                  : `No ${filter} transactions yet.`}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {paginated.map((t) => {
                  const cfg = TYPE_CONFIG[t.type] ?? TYPE_CONFIG.earned;
                  return (
                    <div
                      key={t.id}
                      className="flex items-center gap-4 p-4 bg-emerald-50 border-4 border-emerald-200 hover:border-emerald-400 transition-all"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 bg-white border-4 border-emerald-300 flex items-center justify-center text-2xl flex-shrink-0">
                        {t.icon}
                      </div>

                      {/* Description + date + type badge */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-emerald-950 truncate">
                          {t.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-emerald-600">
                            {formatDate(t.date)}
                          </p>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 border ${cfg.bg} ${cfg.text} ${cfg.border} uppercase tracking-wide`}
                          >
                            {cfg.label}
                          </span>
                        </div>
                      </div>

                      {/* Points */}
                      <span
                        className={`text-2xl font-extrabold flex-shrink-0 ${t.type === "redeemed" ? "text-red-500" : t.type === "bonus" ? "text-amber-600" : "text-emerald-600"}`}
                      >
                        {t.points > 0 ? `+${t.points}` : t.points}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Load more */}
              {hasMore && (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="w-full mt-6 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 hover:shadow-[4px_4px_0px_rgba(6,78,59,1)] transition-all"
                >
                  Load More ({filtered.length - paginated.length} remaining)
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardTracker;
