// import React, { useState, useEffect, useMemo } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const Cart = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Cart is { [productId]: quantity }, userPoints passed from Shop / ProductDetail
//   const [cart, setCart] = useState(location.state?.cart ?? {});
//   const [userPoints, setUserPoints] = useState(
//     location.state?.userPoints ?? null,
//   );

//   // Hydrated product details keyed by id
//   const [products, setProducts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ── Hydrate product details for every id in cart ─────────────────────────
//   // PRODUCTION: POST /api/shop/products/batch  → { products: [...] }
//   //   body: { ids: Object.keys(cart) }
//   useEffect(() => {
//     const productIds = Object.keys(cart);
//     if (productIds.length === 0) {
//       setLoading(false);
//       return;
//     }

//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/shop/products/batch", {
//         //   method: "POST",
//         //   headers: {
//         //     "Content-Type": "application/json",
//         //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//         //   },
//         //   body: JSON.stringify({ ids: productIds }),
//         // });
//         // if (!res.ok) throw new Error("Failed to load cart items");
//         // const data = await res.json();
//         // const map = {};
//         // data.products.forEach((p) => { map[p.id] = p; });
//         // setProducts(map);
//         // if (userPoints === null) setUserPoints(data.userPoints);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 800));
//         const mockDB = {
//           1: {
//             id: "1",
//             name: "Recycled Backpack",
//             points: 500,
//             image: "🎒",
//             stock: 10,
//           },
//           2: {
//             id: "2",
//             name: "Organic Cotton T-Shirt",
//             points: 350,
//             image: "👕",
//             stock: 25,
//           },
//           3: {
//             id: "3",
//             name: "Bamboo Toothbrush Set",
//             points: 150,
//             image: "🪥",
//             stock: 50,
//           },
//           4: {
//             id: "4",
//             name: "Reusable Water Bottle",
//             points: 200,
//             image: "🥤",
//             stock: 15,
//           },
//           5: {
//             id: "5",
//             name: "Eco Yoga Mat",
//             points: 800,
//             image: "🧘",
//             stock: 8,
//           },
//           6: {
//             id: "6",
//             name: "Solar Power Bank",
//             points: 1200,
//             image: "🔋",
//             stock: 5,
//           },
//           7: {
//             id: "7",
//             name: "Bamboo Cutlery Set",
//             points: 120,
//             image: "🍴",
//             stock: 0,
//           },
//           8: {
//             id: "8",
//             name: "Hemp Tote Bag",
//             points: 3000,
//             image: "👜",
//             stock: 20,
//           },
//         };
//         const map = {};
//         productIds.forEach((id) => {
//           if (mockDB[id]) map[id] = mockDB[id];
//         });
//         setProducts(map);
//         if (userPoints === null) setUserPoints(2450);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load cart items. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []); // runs once on mount — cart ids don't change mid-session

//   // ── Cart item list (only ids that have product data) ─────────────────────
//   const cartItems = useMemo(
//     () =>
//       Object.entries(cart)
//         .filter(([id]) => products[id])
//         .map(([id, qty]) => ({ ...products[id], quantity: qty })),
//     [cart, products],
//   );

//   // ── Derived totals ────────────────────────────────────────────────────────
//   const totalCost = cartItems.reduce(
//     (s, item) => s + item.points * item.quantity,
//     0,
//   );
//   const canCheckout =
//     userPoints !== null && totalCost <= userPoints && cartItems.length > 0;
//   const pointsShort =
//     userPoints !== null ? Math.max(0, totalCost - userPoints) : 0;
//   const pointsLeft = userPoints !== null ? userPoints - totalCost : 0;

//   // ── Quantity handlers ────────────────────────────────────────────────────
//   const updateQty = (id, delta) => {
//     setCart((prev) => {
//       const current = prev[id] ?? 0;
//       const product = products[id];
//       const next = Math.min(product?.stock ?? 99, Math.max(1, current + delta));
//       return { ...prev, [id]: next };
//     });
//   };

//   // FIX: remove actually works now
//   const removeItem = (id) => {
//     setCart((prev) => {
//       const updated = { ...prev };
//       delete updated[id];
//       return updated;
//     });
//   };

//   // ── Checkout navigation ───────────────────────────────────────────────────
//   // FIX: conditional navigate instead of a Link that fights e.preventDefault()
//   const handleCheckout = () => {
//     if (!canCheckout) return;
//     navigate("/user/checkout", {
//       state: { cart, cartItems, totalCost, userPoints },
//     });
//   };

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

//   // ── Empty cart ────────────────────────────────────────────────────────────
//   if (!loading && cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-8">
//             Shopping <span className="text-emerald-600">Cart</span>
//           </h1>
//           <div className="bg-white border-4 border-emerald-950 p-12 shadow-[12px_12px_0px_rgba(6,78,59,1)] text-center">
//             <span className="text-6xl mb-4 block">🛒</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               Your cart is empty
//             </p>
//             <p className="text-emerald-500 font-medium mb-6">
//               Add some eco-friendly products to get started
//             </p>
//             <Link
//               to="/user/shop"
//               className="inline-block px-8 py-4 bg-emerald-600 text-white font-extrabold uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
//             >
//               Browse Shop →
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Main render ───────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
//             Shopping <span className="text-emerald-600">Cart</span>
//           </h1>
//           {!loading && (
//             <span className="bg-emerald-100 text-emerald-800 border-2 border-emerald-300 px-3 py-1 font-bold text-sm">
//               {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
//             </span>
//           )}
//         </div>

//         <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
//           {/* ── Cart items ── */}
//           <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//             {loading ? (
//               <div className="p-6 space-y-6">
//                 {[...Array(2)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-4 pb-6 border-b-4 border-emerald-100 last:border-0 last:pb-0"
//                   >
//                     <Skeleton className="w-20 h-20 flex-shrink-0" />
//                     <div className="flex-1 space-y-2">
//                       <Skeleton className="h-6 w-40 rounded" />
//                       <Skeleton className="h-4 w-20 rounded" />
//                       <Skeleton className="h-10 w-32 rounded" />
//                     </div>
//                     <div className="space-y-2 text-right">
//                       <Skeleton className="h-8 w-20 rounded" />
//                       <Skeleton className="h-4 w-14 rounded" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="divide-y-4 divide-emerald-100">
//                 {cartItems.map((item) => {
//                   const itemTotal = item.points * item.quantity;
//                   const atMax = item.quantity >= item.stock;
//                   return (
//                     <div key={item.id} className="flex items-center gap-4 p-5">
//                       {/* Image */}
//                       <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-300 flex items-center justify-center text-3xl flex-shrink-0">
//                         {item.imageUrl ? (
//                           <img
//                             src={item.imageUrl}
//                             alt={item.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           item.image
//                         )}
//                       </div>

//                       {/* Name + qty controls */}
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-lg font-extrabold text-emerald-950 truncate">
//                           {item.name}
//                         </h3>
//                         <p className="text-emerald-500 text-xs font-medium mb-2">
//                           {item.points.toLocaleString()} pts each
//                         </p>
//                         {/* FIX: quantity adjustment directly in cart */}
//                         <div className="flex items-center border-4 border-emerald-200 w-fit">
//                           <button
//                             onClick={() => updateQty(item.id, -1)}
//                             disabled={item.quantity <= 1}
//                             className="w-9 h-9 bg-emerald-50 font-bold text-lg hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r-4 border-emerald-200"
//                           >
//                             −
//                           </button>
//                           <span className="w-10 text-center font-extrabold text-base">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => updateQty(item.id, 1)}
//                             disabled={atMax}
//                             title={atMax ? "Max stock reached" : ""}
//                             className="w-9 h-9 bg-emerald-50 font-bold text-lg hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l-4 border-emerald-200"
//                           >
//                             +
//                           </button>
//                         </div>
//                         {atMax && (
//                           <p className="text-xs text-amber-600 font-bold mt-1">
//                             Max stock ({item.stock})
//                           </p>
//                         )}
//                       </div>

//                       {/* Points + remove */}
//                       <div className="text-right flex-shrink-0">
//                         <p className="text-2xl font-extrabold text-emerald-600">
//                           {itemTotal.toLocaleString()} pts
//                         </p>
//                         {/* FIX: remove button actually works */}
//                         <button
//                           onClick={() => removeItem(item.id)}
//                           className="text-red-500 font-bold text-xs hover:text-red-700 hover:underline mt-1 uppercase tracking-wide transition-colors"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* ── Order summary ── */}
//           <div className="space-y-4">
//             <div className="bg-emerald-50 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <h2 className="text-lg font-extrabold text-emerald-950 uppercase tracking-wider mb-4 pb-3 border-b-4 border-emerald-200">
//                 Order Summary
//               </h2>

//               {loading ? (
//                 <div className="space-y-3">
//                   <Skeleton className="h-5 w-full rounded" />
//                   <Skeleton className="h-5 w-full rounded" />
//                   <Skeleton className="h-5 w-full rounded" />
//                   <Skeleton className="h-14 w-full rounded mt-4" />
//                 </div>
//               ) : (
//                 <>
//                   {/* Per-item breakdown */}
//                   <div className="space-y-2 mb-4">
//                     {cartItems.map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex justify-between text-sm"
//                       >
//                         <span className="text-emerald-700 font-medium truncate pr-2">
//                           {item.image} {item.name} ×{item.quantity}
//                         </span>
//                         <span className="font-bold text-emerald-950 flex-shrink-0">
//                           {(item.points * item.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="border-t-4 border-emerald-200 pt-4 space-y-2 mb-4">
//                     {/* Total cost */}
//                     <div className="flex justify-between items-center">
//                       <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
//                         Total
//                       </span>
//                       <span className="text-3xl font-extrabold text-emerald-600">
//                         {totalCost.toLocaleString()} pts
//                       </span>
//                     </div>
//                     {/* Balance */}
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-emerald-600 font-bold">
//                         Your balance
//                       </span>
//                       <span
//                         className={`font-extrabold ${canCheckout ? "text-emerald-700" : "text-red-500"}`}
//                       >
//                         {userPoints !== null
//                           ? userPoints.toLocaleString()
//                           : "—"}{" "}
//                         pts
//                       </span>
//                     </div>
//                     {/* Remaining after purchase */}
//                     {canCheckout && (
//                       <div className="flex justify-between items-center text-sm">
//                         <span className="text-emerald-500 font-medium">
//                           After purchase
//                         </span>
//                         <span className="font-bold text-emerald-600">
//                           {pointsLeft.toLocaleString()} pts remaining
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Insufficient points warning */}
//                   {!canCheckout &&
//                     cartItems.length > 0 &&
//                     userPoints !== null &&
//                     totalCost > userPoints && (
//                       <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//                         <p className="text-red-700 font-bold text-sm text-center">
//                           ⚠️ Need {pointsShort.toLocaleString()} more pts to
//                           checkout
//                         </p>
//                         <Link
//                           to="/user/classify"
//                           className="block text-center text-xs font-bold text-red-500 hover:underline mt-1"
//                         >
//                           Earn more by scanning waste →
//                         </Link>
//                       </div>
//                     )}

//                   {/* FIX: button instead of disabled Link — conditionally navigates */}
//                   <button
//                     onClick={handleCheckout}
//                     disabled={!canCheckout}
//                     className={`w-full py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all
//                       ${
//                         canCheckout
//                           ? "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
//                           : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                       }`}
//                   >
//                     {canCheckout
//                       ? "Proceed to Checkout →"
//                       : "Insufficient Points"}
//                   </button>

//                   <Link
//                     to="/user/shop"
//                     className="block w-full text-center py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm mt-2"
//                   >
//                     ← Continue Shopping
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Points info card */}
//             {!loading && userPoints !== null && (
//               <div className="bg-white border-4 border-emerald-950 p-4 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
//                 <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-1">
//                   Available Balance
//                 </p>
//                 <p className="text-3xl font-extrabold text-emerald-950">
//                   {userPoints.toLocaleString()} pts
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

//updated page with api integration with backend
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

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

// ── Main component ─────────────────────────────────────────────────────────
const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Cart is { [productId]: quantity }, userPoints passed from Shop / ProductDetail
  const [cart, setCart] = useState(location.state?.cart ?? {});
  const [userPoints, setUserPoints] = useState(
    location.state?.userPoints ?? null,
  );

  // Hydrated product details keyed by id
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Hydrate product details for every id in cart ─────────────────────────
  const fetchProducts = useCallback(async () => {
    const productIds = Object.keys(cart);
    if (productIds.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/shop/products/batch`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids: productIds }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load cart items");
      }

      const data = await res.json();
      const map = {};
      (data.products || []).forEach((p) => {
        map[p._id || p.id] = p;
      });
      setProducts(map);

      // Use userPoints from API if not passed via state
      if (userPoints === null && data.userPoints !== undefined) {
        setUserPoints(data.userPoints);
      }
    } catch (err) {
      setError(err.message || "Failed to load cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [cart, userPoints, navigate]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ── Cart item list (only ids that have product data) ─────────────────────
  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([id]) => products[id])
        .map(([id, qty]) => ({ ...products[id], quantity: qty })),
    [cart, products],
  );

  // ── Derived totals ────────────────────────────────────────────────────────
  const totalCost = cartItems.reduce(
    (s, item) => s + item.points * item.quantity,
    0,
  );
  const canCheckout =
    userPoints !== null && totalCost <= userPoints && cartItems.length > 0;
  const pointsShort =
    userPoints !== null ? Math.max(0, totalCost - userPoints) : 0;
  const pointsLeft = userPoints !== null ? userPoints - totalCost : 0;

  // ── Quantity handlers ────────────────────────────────────────────────────
  const updateQty = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] ?? 0;
      const product = products[id];
      const next = Math.min(product?.stock ?? 99, Math.max(1, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // ── Checkout navigation ───────────────────────────────────────────────────
  const handleCheckout = () => {
    if (!canCheckout) return;
    navigate("/user/checkout", {
      state: { cart, cartItems, totalCost, userPoints },
    });
  };

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
              onClick={fetchProducts}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty cart ────────────────────────────────────────────────────────────
  if (!loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-8">
            Shopping <span className="text-emerald-600">Cart</span>
          </h1>
          <div className="bg-white border-4 border-emerald-950 p-12 shadow-[12px_12px_0px_rgba(6,78,59,1)] text-center">
            <span className="text-6xl mb-4 block">🛒</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              Your cart is empty
            </p>
            <p className="text-emerald-500 font-medium mb-6">
              Add some eco-friendly products to get started
            </p>
            <Link
              to="/user/shop"
              className="inline-block px-8 py-4 bg-emerald-600 text-white font-extrabold uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Browse Shop →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
            Shopping <span className="text-emerald-600">Cart</span>
          </h1>
          {!loading && (
            <span className="bg-emerald-100 text-emerald-800 border-2 border-emerald-300 px-3 py-1 font-bold text-sm">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* ── Cart items ── */}
          <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
            {loading ? (
              <div className="p-6 space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 pb-6 border-b-4 border-emerald-100 last:border-0 last:pb-0"
                  >
                    <Skeleton className="w-20 h-20 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-40 rounded" />
                      <Skeleton className="h-4 w-20 rounded" />
                      <Skeleton className="h-10 w-32 rounded" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Skeleton className="h-8 w-20 rounded" />
                      <Skeleton className="h-4 w-14 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y-4 divide-emerald-100">
                {cartItems.map((item) => {
                  const itemTotal = item.points * item.quantity;
                  const atMax = item.quantity >= item.stock;
                  const productId = item._id || item.id;
                  return (
                    <div
                      key={productId}
                      className="flex items-center gap-4 p-5"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-300 flex items-center justify-center text-3xl flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          item.image || item.emoji || "🛍️"
                        )}
                      </div>

                      {/* Name + qty controls */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-extrabold text-emerald-950 truncate">
                          {item.name}
                        </h3>
                        <p className="text-emerald-500 text-xs font-medium mb-2">
                          {item.points.toLocaleString()} pts each
                        </p>
                        <div className="flex items-center border-4 border-emerald-200 w-fit">
                          <button
                            onClick={() => updateQty(productId, -1)}
                            disabled={item.quantity <= 1}
                            className="w-9 h-9 bg-emerald-50 font-bold text-lg hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r-4 border-emerald-200"
                          >
                            −
                          </button>
                          <span className="w-10 text-center font-extrabold text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(productId, 1)}
                            disabled={atMax}
                            title={atMax ? "Max stock reached" : ""}
                            className="w-9 h-9 bg-emerald-50 font-bold text-lg hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l-4 border-emerald-200"
                          >
                            +
                          </button>
                        </div>
                        {atMax && (
                          <p className="text-xs text-amber-600 font-bold mt-1">
                            Max stock ({item.stock})
                          </p>
                        )}
                      </div>

                      {/* Points + remove */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-extrabold text-emerald-600">
                          {itemTotal.toLocaleString()} pts
                        </p>
                        <button
                          onClick={() => removeItem(productId)}
                          className="text-red-500 font-bold text-xs hover:text-red-700 hover:underline mt-1 uppercase tracking-wide transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Order summary ── */}
          <div className="space-y-4">
            <div className="bg-emerald-50 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <h2 className="text-lg font-extrabold text-emerald-950 uppercase tracking-wider mb-4 pb-3 border-b-4 border-emerald-200">
                Order Summary
              </h2>

              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-full rounded" />
                  <Skeleton className="h-5 w-full rounded" />
                  <Skeleton className="h-5 w-full rounded" />
                  <Skeleton className="h-14 w-full rounded mt-4" />
                </div>
              ) : (
                <>
                  {/* Per-item breakdown */}
                  <div className="space-y-2 mb-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id || item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-emerald-700 font-medium truncate pr-2">
                          {item.image || item.emoji || "🛍️"} {item.name} ×
                          {item.quantity}
                        </span>
                        <span className="font-bold text-emerald-950 flex-shrink-0">
                          {(item.points * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-4 border-emerald-200 pt-4 space-y-2 mb-4">
                    {/* Total cost */}
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
                        Total
                      </span>
                      <span className="text-3xl font-extrabold text-emerald-600">
                        {totalCost.toLocaleString()} pts
                      </span>
                    </div>
                    {/* Balance */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-emerald-600 font-bold">
                        Your balance
                      </span>
                      <span
                        className={`font-extrabold ${canCheckout ? "text-emerald-700" : "text-red-500"}`}
                      >
                        {userPoints !== null
                          ? userPoints.toLocaleString()
                          : "—"}{" "}
                        pts
                      </span>
                    </div>
                    {/* Remaining after purchase */}
                    {canCheckout && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-500 font-medium">
                          After purchase
                        </span>
                        <span className="font-bold text-emerald-600">
                          {pointsLeft.toLocaleString()} pts remaining
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Insufficient points warning */}
                  {!canCheckout &&
                    cartItems.length > 0 &&
                    userPoints !== null &&
                    totalCost > userPoints && (
                      <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
                        <p className="text-red-700 font-bold text-sm text-center">
                          ⚠️ Need {pointsShort.toLocaleString()} more pts to
                          checkout
                        </p>
                        <Link
                          to="/user/classify"
                          className="block text-center text-xs font-bold text-red-500 hover:underline mt-1"
                        >
                          Earn more by scanning waste →
                        </Link>
                      </div>
                    )}

                  {/* Checkout button */}
                  <button
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                    className={`w-full py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all
                      ${
                        canCheckout
                          ? "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
                          : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      }`}
                  >
                    {canCheckout
                      ? "Proceed to Checkout →"
                      : "Insufficient Points"}
                  </button>

                  <Link
                    to="/user/shop"
                    className="block w-full text-center py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm mt-2"
                  >
                    ← Continue Shopping
                  </Link>
                </>
              )}
            </div>

            {/* Points info card */}
            {!loading && userPoints !== null && (
              <div className="bg-white border-4 border-emerald-950 p-4 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-1">
                  Available Balance
                </p>
                <p className="text-3xl font-extrabold text-emerald-950">
                  {userPoints.toLocaleString()} pts
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
