// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Cart + userPoints may be passed via router state from Shop page
//   const [cart, setCart] = useState(location.state?.cart ?? {});
//   const [userPoints, setUserPoints] = useState(
//     location.state?.userPoints ?? null,
//   );

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [toastMsg, setToastMsg] = useState(null);

//   // ── Fetch product + user points ──────────────────────────────────────────
//   // PRODUCTION: GET /api/shop/product/:id  → { product }
//   // PRODUCTION: GET /api/user/points       → { points }  (only if not passed via state)
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const [productRes, pointsRes] = await Promise.all([
//         //   fetch(`/api/shop/product/${id}`, {
//         //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         //   }),
//         //   userPoints === null
//         //     ? fetch("/api/user/points", {
//         //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         //       })
//         //     : Promise.resolve(null),
//         // ]);
//         // if (!productRes.ok) throw new Error("Product not found");
//         // const productData = await productRes.json();
//         // setProduct(productData.product);
//         // if (pointsRes) {
//         //   const pointsData = await pointsRes.json();
//         //   setUserPoints(pointsData.points);
//         // }

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 900));

//         // Simulated product DB — keyed by id from useParams
//         const mockProducts = {
//           1: {
//             id: "1",
//             name: "Recycled Backpack",
//             points: 500,
//             category: "Accessories",
//             stock: 10,
//             image: "🎒",
//             description:
//               "Made from 35 recycled plastic bottles. Water-resistant, durable, and perfect for daily use. Features multiple compartments and a padded laptop sleeve.",
//             features: [
//               "35 bottles diverted from landfill",
//               "Water resistant",
//               "15L capacity",
//               "Lifetime warranty",
//             ],
//           },
//           2: {
//             id: "2",
//             name: "Organic Cotton T-Shirt",
//             points: 350,
//             category: "Clothing",
//             stock: 25,
//             image: "👕",
//             description:
//               "GOTS-certified organic cotton. Soft, breathable, and produced without harmful chemicals.",
//             features: [
//               "100% organic cotton",
//               "GOTS certified",
//               "Fair trade production",
//               "Available in 5 colours",
//             ],
//           },
//           3: {
//             id: "3",
//             name: "Bamboo Toothbrush Set",
//             points: 150,
//             category: "Home",
//             stock: 50,
//             image: "🪥",
//             description:
//               "Biodegradable bamboo handles with BPA-free bristles. Each set contains 4 brushes.",
//             features: [
//               "Biodegradable handle",
//               "BPA-free bristles",
//               "4 brushes per set",
//               "Compostable packaging",
//             ],
//           },
//           4: {
//             id: "4",
//             name: "Reusable Water Bottle",
//             points: 200,
//             category: "Accessories",
//             stock: 15,
//             image: "🥤",
//             description:
//               "Double-walled stainless steel. Keeps drinks cold 24h, hot 12h. Zero plastic.",
//             features: [
//               "Double-wall insulation",
//               "500ml capacity",
//               "Leak-proof lid",
//               "BPA-free",
//             ],
//           },
//           5: {
//             id: "5",
//             name: "Eco Yoga Mat",
//             points: 800,
//             category: "Fitness",
//             stock: 8,
//             image: "🧘",
//             description:
//               "Natural rubber yoga mat with alignment lines. Non-slip, eco-friendly, biodegradable.",
//             features: [
//               "Natural rubber",
//               "6mm thickness",
//               "Alignment guides",
//               "Carry strap included",
//             ],
//           },
//           6: {
//             id: "6",
//             name: "Solar Power Bank",
//             points: 1200,
//             category: "Electronics",
//             stock: 5,
//             image: "🔋",
//             description:
//               "10,000mAh solar-powered charger. Dual USB output, IP65 waterproof rating.",
//             features: [
//               "10,000mAh capacity",
//               "Solar + USB charging",
//               "IP65 waterproof",
//               "Dual USB output",
//             ],
//           },
//           7: {
//             id: "7",
//             name: "Bamboo Cutlery Set",
//             points: 120,
//             category: "Home",
//             stock: 0,
//             image: "🍴",
//             description:
//               "Portable bamboo cutlery set with cotton carry pouch. Perfect for on-the-go dining.",
//             features: [
//               "5-piece set",
//               "Natural bamboo",
//               "Cotton carry pouch",
//               "Dishwasher safe",
//             ],
//           },
//           8: {
//             id: "8",
//             name: "Hemp Tote Bag",
//             points: 3000,
//             category: "Accessories",
//             stock: 20,
//             image: "👜",
//             description:
//               "Handwoven hemp tote. Ultra-durable, fully compostable, and naturally mould-resistant.",
//             features: [
//               "100% hemp",
//               "15kg load capacity",
//               "Naturally mould-resistant",
//               "Fully compostable",
//             ],
//           },
//         };

//         const found = mockProducts[id];
//         if (!found) throw new Error("Product not found");
//         setProduct(found);
//         if (userPoints === null) setUserPoints(2450); // fallback if not passed from Shop
//         // ── END SIMULATION ──
//       } catch (err) {
//         setError(err.message ?? "Failed to load product.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // ── Derived values ───────────────────────────────────────────────────────
//   const outOfStock = product?.stock === 0;
//   const totalCost = (product?.points ?? 0) * quantity;
//   const canAfford = userPoints !== null && totalCost <= userPoints;
//   const cartQty = cart[id] ?? 0;
//   const maxQty = Math.max(0, (product?.stock ?? 0) - cartQty);

//   // ── Quantity handlers (capped by remaining stock) ────────────────────────
//   const decrement = () => setQuantity((q) => Math.max(1, q - 1));
//   // FIX: upper bound is remaining stock, not unlimited
//   const increment = () => setQuantity((q) => Math.min(maxQty, q + 1));
//   const handleQtyInput = (e) => {
//     const val = parseInt(e.target.value);
//     if (!isNaN(val)) setQuantity(Math.min(maxQty, Math.max(1, val)));
//   };

//   // ── Add to cart ──────────────────────────────────────────────────────────
//   // FIX: actually updates cart state, passes it back through navigation
//   const handleAddToCart = () => {
//     if (!product || outOfStock || !canAfford) return;
//     const updated = { ...cart, [product.id]: cartQty + quantity };
//     setCart(updated);
//     setToastMsg(`${quantity} × ${product.name} added to cart`);
//     setTimeout(() => setToastMsg(null), 2500);
//   };

//   const totalCartItems = Object.values(cart).reduce((s, q) => s + q, 0);

//   // ── Loading state ────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <Skeleton className="h-6 w-24 mb-6 rounded" />
//           <div className="grid md:grid-cols-2 gap-8">
//             <Skeleton className="h-80 w-full border-4 border-emerald-200" />
//             <div className="space-y-4">
//               <Skeleton className="h-5 w-28 rounded" />
//               <Skeleton className="h-10 w-3/4 rounded" />
//               <Skeleton className="h-6 w-40 rounded" />
//               <Skeleton className="h-24 w-full rounded" />
//               <Skeleton className="h-32 w-full rounded" />
//               <Skeleton className="h-16 w-full rounded" />
//               <Skeleton className="h-14 w-full rounded" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Error state ──────────────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
//           <span className="text-5xl block mb-4">⚠️</span>
//           <p className="font-extrabold text-red-600 text-xl mb-2">
//             {error === "Product not found"
//               ? "Product not found"
//               : "Something went wrong"}
//           </p>
//           <p className="text-red-400 text-sm mb-6">{error}</p>
//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//             >
//               ← Go Back
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

//   // ── Main render ──────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Toast */}
//         {toastMsg && (
//           <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] px-6 py-4 font-bold flex items-center gap-3">
//             <span>✅</span> {toastMsg}
//           </div>
//         )}

//         {/* Back + cart */}
//         <div className="flex justify-between items-center mb-6">
//           {/* FIX: navigate(-1) instead of hardcoded /user/shop */}
//           <button
//             onClick={() => navigate(-1)}
//             className="text-emerald-600 font-bold hover:text-emerald-950 transition-colors flex items-center gap-1"
//           >
//             ← Back
//           </button>

//           {/* Cart link with live badge */}
//           <button
//             onClick={() =>
//               navigate("/user/cart", { state: { cart, userPoints } })
//             }
//             className="relative bg-white text-emerald-950 px-5 py-2 border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold text-xl"
//           >
//             🛒
//             {totalCartItems > 0 && (
//               <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-emerald-950 rounded-full flex items-center justify-center text-white text-xs font-extrabold">
//                 {totalCartItems}
//               </span>
//             )}
//           </button>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Image panel */}
//           <div
//             className={`border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] flex flex-col items-center justify-center p-8 gap-4
//             ${outOfStock ? "bg-gray-100" : "bg-white"}`}
//           >
//             {product.imageUrl ? (
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full max-h-72 object-contain"
//               />
//             ) : (
//               <span className="text-9xl">{product.image}</span>
//             )}
//             {outOfStock && (
//               <div className="bg-gray-600 text-white font-extrabold uppercase tracking-widest px-6 py-2 border-4 border-gray-800 text-sm">
//                 Out of Stock
//               </div>
//             )}
//             {/* FIX: affordability indicator in image panel */}
//             {!outOfStock && userPoints !== null && (
//               <div
//                 className={`w-full p-3 border-4 text-center font-bold text-sm
//                 ${
//                   canAfford
//                     ? "bg-emerald-50 border-emerald-300 text-emerald-700"
//                     : "bg-amber-50 border-amber-300 text-amber-700"
//                 }`}
//               >
//                 {canAfford
//                   ? `✓ You can afford this  (${userPoints.toLocaleString()} pts available)`
//                   : `Need ${(totalCost - userPoints).toLocaleString()} more pts (you have ${userPoints.toLocaleString()})`}
//               </div>
//             )}
//           </div>

//           {/* Info panel */}
//           <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//             {/* Category + name + price row */}
//             <p className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">
//               {product.category}
//             </p>
//             <h1 className="text-4xl font-extrabold text-emerald-950 mb-3 leading-tight">
//               {product.name}
//             </h1>
//             <div className="flex items-center gap-3 mb-6">
//               <span className="text-3xl font-extrabold text-emerald-600">
//                 {product.points.toLocaleString()} pts
//               </span>
//               <span className="text-emerald-300">|</span>
//               <span
//                 className={`font-bold ${outOfStock ? "text-gray-400" : "text-emerald-800"}`}
//               >
//                 {outOfStock ? "Out of stock" : `${product.stock} in stock`}
//               </span>
//             </div>

//             <p className="text-emerald-800 text-base mb-6 leading-relaxed">
//               {product.description}
//             </p>

//             {/* Features */}
//             <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6">
//               <h3 className="font-extrabold text-emerald-950 mb-3 uppercase tracking-wider text-sm">
//                 Features
//               </h3>
//               <ul className="space-y-2">
//                 {product.features.map((f, i) => (
//                   <li
//                     key={i}
//                     className="flex items-start gap-2 text-emerald-800 text-sm font-medium"
//                   >
//                     <span className="text-emerald-600 font-extrabold mt-0.5 flex-shrink-0">
//                       ✓
//                     </span>{" "}
//                     {f}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Quantity + stock cap */}
//             {!outOfStock && (
//               <div className="mb-4">
//                 <div className="flex items-center gap-4 mb-1">
//                   <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
//                     Quantity
//                   </span>
//                   {cartQty > 0 && (
//                     <span className="text-xs font-bold text-emerald-600 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
//                       {cartQty} already in cart
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center border-4 border-emerald-950">
//                     <button
//                       onClick={decrement}
//                       disabled={quantity <= 1}
//                       className="w-11 h-11 bg-emerald-100 font-bold text-xl hover:bg-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={handleQtyInput}
//                       min={1}
//                       max={maxQty}
//                       className="w-14 text-center font-bold text-lg focus:outline-none h-11 border-x-4 border-emerald-200"
//                     />
//                     <button
//                       onClick={increment}
//                       // FIX: capped at remaining stock
//                       disabled={quantity >= maxQty}
//                       className="w-11 h-11 bg-emerald-100 font-bold text-xl hover:bg-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <span className="text-sm text-emerald-500 font-medium">
//                     max {maxQty}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* Total cost — turns red when over budget */}
//             <div
//               className={`p-4 mb-6 border-4 border-emerald-950 ${
//                 outOfStock
//                   ? "bg-gray-200"
//                   : canAfford
//                     ? "bg-emerald-600 text-white"
//                     : "bg-amber-500 text-white"
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <span className="font-bold uppercase tracking-wider">
//                   {outOfStock ? "Unavailable" : "Total Cost"}
//                 </span>
//                 {!outOfStock && (
//                   <div className="text-right">
//                     <span className="text-3xl font-extrabold">
//                       {totalCost.toLocaleString()} pts
//                     </span>
//                     {!canAfford && userPoints !== null && (
//                       <p className="text-xs font-bold opacity-90 mt-0.5">
//                         {(totalCost - userPoints).toLocaleString()} pts short
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Add to cart button */}
//             <button
//               onClick={handleAddToCart}
//               disabled={outOfStock || !canAfford || maxQty === 0}
//               className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all
//                 ${
//                   outOfStock || !canAfford || maxQty === 0
//                     ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                     : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
//                 }`}
//             >
//               {outOfStock
//                 ? "Out of Stock"
//                 : !canAfford
//                   ? `Need ${(totalCost - userPoints).toLocaleString()} more pts`
//                   : maxQty === 0
//                     ? "Max qty in cart"
//                     : "🛒 Add to Cart"}
//             </button>

//             {/* Already in cart nudge */}
//             {cartQty > 0 && !outOfStock && (
//               <button
//                 onClick={() =>
//                   navigate("/user/cart", { state: { cart, userPoints } })
//                 }
//                 className="w-full mt-3 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm"
//               >
//                 View Cart ({totalCartItems} item
//                 {totalCartItems !== 1 ? "s" : ""}) →
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

//updated page with backend integration
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

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
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Cart + userPoints may be passed via router state from Shop page
  const [cart, setCart] = useState(location.state?.cart ?? {});
  const [userPoints, setUserPoints] = useState(
    location.state?.userPoints ?? null,
  );

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [toastMsg, setToastMsg] = useState(null);

  // ── Fetch product + user points ──────────────────────────────────────────
  const fetchProductData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch product details
      const productRes = await fetch(`${API_BASE_URL}/shop/product/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!productRes.ok) {
        if (productRes.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if (productRes.status === 404) {
          throw new Error("Product not found");
        }
        throw new Error("Failed to load product");
      }

      const productData = await productRes.json();
      setProduct(productData.product);

      // Fetch user points only if not passed via state
      if (userPoints === null) {
        const pointsRes = await fetch(`${API_BASE_URL}/user/points`, {
          headers: getAuthHeaders(),
        });

        if (pointsRes.ok) {
          const pointsData = await pointsRes.json();
          setUserPoints(pointsData.points);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to load product.");
    } finally {
      setLoading(false);
    }
  }, [id, userPoints, navigate]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  // ── Derived values ───────────────────────────────────────────────────────
  const outOfStock = product?.stock === 0;
  const totalCost = (product?.points ?? 0) * quantity;
  const canAfford = userPoints !== null && totalCost <= userPoints;
  const cartQty = cart[product?._id || product?.id] ?? 0;
  const maxQty = Math.max(0, (product?.stock ?? 0) - cartQty);

  // ── Quantity handlers (capped by remaining stock) ────────────────────────
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(maxQty, q + 1));
  const handleQtyInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) setQuantity(Math.min(maxQty, Math.max(1, val)));
  };

  // ── Add to cart ──────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!product || outOfStock || !canAfford) return;
    const productId = product._id || product.id;
    const updated = { ...cart, [productId]: (cart[productId] ?? 0) + quantity };
    setCart(updated);
    setToastMsg(`${quantity} × ${product.name} added to cart`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const totalCartItems = Object.values(cart).reduce((s, q) => s + q, 0);

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-6 w-24 mb-6 rounded" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-80 w-full border-4 border-emerald-200" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-10 w-3/4 rounded" />
              <Skeleton className="h-6 w-40 rounded" />
              <Skeleton className="h-24 w-full rounded" />
              <Skeleton className="h-32 w-full rounded" />
              <Skeleton className="h-16 w-full rounded" />
              <Skeleton className="h-14 w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-2">
            {error === "Product not found"
              ? "Product not found"
              : "Something went wrong"}
          </p>
          <p className="text-red-400 text-sm mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              ← Go Back
            </button>
            <button
              onClick={fetchProductData}
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
      <div className="max-w-6xl mx-auto">
        {/* Toast */}
        {toastMsg && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] px-6 py-4 font-bold flex items-center gap-3">
            <span>✅</span> {toastMsg}
          </div>
        )}

        {/* Back + cart */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 font-bold hover:text-emerald-950 transition-colors flex items-center gap-1"
          >
            ← Back
          </button>

          {/* Cart link with live badge */}
          <button
            onClick={() =>
              navigate("/user/cart", { state: { cart, userPoints } })
            }
            className="relative bg-white text-emerald-950 px-5 py-2 border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold text-xl"
          >
            🛒
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-emerald-950 rounded-full flex items-center justify-center text-white text-xs font-extrabold">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image panel */}
          <div
            className={`border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] flex flex-col items-center justify-center p-8 gap-4
            ${outOfStock ? "bg-gray-100" : "bg-white"}`}
          >
            {product.imageUrl || product.image ? (
              <img
                src={product.imageUrl || product.image}
                alt={product.name}
                className="w-full max-h-72 object-contain"
              />
            ) : (
              <span className="text-9xl">{product.emoji || "🛍️"}</span>
            )}
            {outOfStock && (
              <div className="bg-gray-600 text-white font-extrabold uppercase tracking-widest px-6 py-2 border-4 border-gray-800 text-sm">
                Out of Stock
              </div>
            )}
            {/* Affordability indicator in image panel */}
            {!outOfStock && userPoints !== null && (
              <div
                className={`w-full p-3 border-4 text-center font-bold text-sm
                ${
                  canAfford
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-amber-50 border-amber-300 text-amber-700"
                }`}
              >
                {canAfford
                  ? `✓ You can afford this  (${userPoints.toLocaleString()} pts available)`
                  : `Need ${(totalCost - userPoints).toLocaleString()} more pts (you have ${userPoints.toLocaleString()})`}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
            {/* Category + name + price row */}
            <p className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-extrabold text-emerald-950 mb-3 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-extrabold text-emerald-600">
                {product.points.toLocaleString()} pts
              </span>
              <span className="text-emerald-300">|</span>
              <span
                className={`font-bold ${outOfStock ? "text-gray-400" : "text-emerald-800"}`}
              >
                {outOfStock ? "Out of stock" : `${product.stock} in stock`}
              </span>
            </div>

            <p className="text-emerald-800 text-base mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6">
              <h3 className="font-extrabold text-emerald-950 mb-3 uppercase tracking-wider text-sm">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features?.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-emerald-800 text-sm font-medium"
                  >
                    <span className="text-emerald-600 font-extrabold mt-0.5 flex-shrink-0">
                      ✓
                    </span>{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + stock cap */}
            {!outOfStock && (
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-1">
                  <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
                    Quantity
                  </span>
                  {cartQty > 0 && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
                      {cartQty} already in cart
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-4 border-emerald-950">
                    <button
                      onClick={decrement}
                      disabled={quantity <= 1}
                      className="w-11 h-11 bg-emerald-100 font-bold text-xl hover:bg-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQtyInput}
                      min={1}
                      max={maxQty}
                      className="w-14 text-center font-bold text-lg focus:outline-none h-11 border-x-4 border-emerald-200"
                    />
                    <button
                      onClick={increment}
                      disabled={quantity >= maxQty}
                      className="w-11 h-11 bg-emerald-100 font-bold text-xl hover:bg-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-emerald-500 font-medium">
                    max {maxQty}
                  </span>
                </div>
              </div>
            )}

            {/* Total cost */}
            <div
              className={`p-4 mb-6 border-4 border-emerald-950 ${
                outOfStock
                  ? "bg-gray-200"
                  : canAfford
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-500 text-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider">
                  {outOfStock ? "Unavailable" : "Total Cost"}
                </span>
                {!outOfStock && (
                  <div className="text-right">
                    <span className="text-3xl font-extrabold">
                      {totalCost.toLocaleString()} pts
                    </span>
                    {!canAfford && userPoints !== null && (
                      <p className="text-xs font-bold opacity-90 mt-0.5">
                        {(totalCost - userPoints).toLocaleString()} pts short
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={outOfStock || !canAfford || maxQty === 0}
              className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all
                ${
                  outOfStock || !canAfford || maxQty === 0
                    ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
                }`}
            >
              {outOfStock
                ? "Out of Stock"
                : !canAfford
                  ? `Need ${(totalCost - userPoints).toLocaleString()} more pts`
                  : maxQty === 0
                    ? "Max qty in cart"
                    : "🛒 Add to Cart"}
            </button>

            {/* Already in cart nudge */}
            {cartQty > 0 && !outOfStock && (
              <button
                onClick={() =>
                  navigate("/user/cart", { state: { cart, userPoints } })
                }
                className="w-full mt-3 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm"
              >
                View Cart ({totalCartItems} item
                {totalCartItems !== 1 ? "s" : ""}) →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
