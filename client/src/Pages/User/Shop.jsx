// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Product card ───────────────────────────────────────────────────────────
// const ProductCard = ({ product, userPoints, onAddToCart, cartQty }) => {
//   const canAfford = userPoints >= product.points;
//   const outOfStock = product.stock === 0;
//   const unavailable = outOfStock || !canAfford;

//   return (
//     <div
//       className={`bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)] transition-all group flex flex-col
//         ${!unavailable ? "hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1" : "opacity-70"}
//       `}
//     >
//       {/* Image area */}
//       <div
//         className={`relative h-48 border-b-4 border-emerald-950 flex items-center justify-center text-6xl
//         ${outOfStock ? "bg-gray-100" : canAfford ? "bg-emerald-100" : "bg-amber-50"}
//         ${!unavailable ? "group-hover:scale-y-105 origin-top transition-transform" : ""}
//       `}
//       >
//         {/* Emoji or real image — structured so swapping in <img> requires no layout change */}
//         {product.imageUrl ? (
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <span>{product.image}</span>
//         )}

//         {/* Out of stock ribbon */}
//         {outOfStock && (
//           <div className="absolute top-3 left-0 bg-gray-600 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1 border-y-2 border-gray-800">
//             Out of Stock
//           </div>
//         )}

//         {/* Can't afford ribbon */}
//         {!outOfStock && !canAfford && (
//           <div className="absolute top-3 left-0 bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1 border-y-2 border-amber-700">
//             Need {(product.points - userPoints).toLocaleString()} more pts
//           </div>
//         )}

//         {/* Cart badge */}
//         {cartQty > 0 && (
//           <div className="absolute top-3 right-3 w-7 h-7 bg-emerald-600 border-2 border-emerald-950 rounded-full flex items-center justify-center text-white text-xs font-extrabold">
//             {cartQty}
//           </div>
//         )}
//       </div>

//       {/* Details */}
//       <div className="p-5 flex flex-col flex-1">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-lg font-extrabold text-emerald-950 leading-tight flex-1 pr-2">
//             {product.name}
//           </h3>
//           <span
//             className={`px-3 py-1 text-sm font-extrabold border-2 flex-shrink-0 ${
//               canAfford
//                 ? "bg-emerald-600 text-white border-emerald-950"
//                 : "bg-gray-100 text-gray-500 border-gray-300"
//             }`}
//           >
//             {product.points.toLocaleString()} pts
//           </span>
//         </div>

//         <p
//           className={`text-sm font-bold uppercase tracking-wider mb-4 ${
//             outOfStock ? "text-gray-400" : "text-emerald-600"
//           }`}
//         >
//           {outOfStock ? "Unavailable" : `${product.stock} in stock`}
//         </p>

//         {/* Actions */}
//         <div className="flex gap-2 mt-auto">
//           <Link
//             to={`/user/shop/product/${product.id}`}
//             className="flex-1 text-center py-3 bg-emerald-50 text-emerald-900 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm"
//           >
//             Details
//           </Link>

//           {/* FIX: Add to Cart — disabled when out of stock or can't afford */}
//           <button
//             onClick={() => onAddToCart(product)}
//             disabled={unavailable}
//             title={
//               outOfStock
//                 ? "Out of stock"
//                 : !canAfford
//                   ? `Need ${(product.points - userPoints).toLocaleString()} more points`
//                   : "Add to cart"
//             }
//             className={`flex-1 py-3 font-extrabold uppercase tracking-wider border-4 text-sm transition-all
//               ${
//                 unavailable
//                   ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                   : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
//               }`}
//           >
//             {cartQty > 0 ? `In Cart (${cartQty})` : "+ Cart"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Main component ─────────────────────────────────────────────────────────
// const Shop = () => {
//   const [category, setCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("points");
//   const [products, setProducts] = useState([]);
//   const [userPoints, setUserPoints] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // cart: { [productId]: quantity }
//   const [cart, setCart] = useState({});
//   const [cartToast, setCartToast] = useState(null);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/shop  → { products, userPoints }
//   useEffect(() => {
//     const fetchShop = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/shop", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load shop");
//         // const data = await res.json();
//         // setProducts(data.products);
//         // setUserPoints(data.userPoints);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 1000));
//         setUserPoints(2450);
//         setProducts([
//           {
//             id: 1,
//             name: "Recycled Backpack",
//             points: 500,
//             category: "accessories",
//             image: "🎒",
//             stock: 10,
//           },
//           {
//             id: 2,
//             name: "Organic Cotton T-Shirt",
//             points: 350,
//             category: "clothing",
//             image: "👕",
//             stock: 25,
//           },
//           {
//             id: 3,
//             name: "Bamboo Toothbrush Set",
//             points: 150,
//             category: "home",
//             image: "🪥",
//             stock: 50,
//           },
//           {
//             id: 4,
//             name: "Reusable Water Bottle",
//             points: 200,
//             category: "accessories",
//             image: "🥤",
//             stock: 15,
//           },
//           {
//             id: 5,
//             name: "Eco Yoga Mat",
//             points: 800,
//             category: "fitness",
//             image: "🧘",
//             stock: 8,
//           },
//           {
//             id: 6,
//             name: "Solar Power Bank",
//             points: 1200,
//             category: "electronics",
//             image: "🔋",
//             stock: 5,
//           },
//           {
//             id: 7,
//             name: "Bamboo Cutlery Set",
//             points: 120,
//             category: "home",
//             image: "🍴",
//             stock: 0,
//           },
//           {
//             id: 8,
//             name: "Hemp Tote Bag",
//             points: 3000,
//             category: "accessories",
//             image: "👜",
//             stock: 20,
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load shop. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchShop();
//   }, []);

//   // ── Cart handler ─────────────────────────────────────────────────────────
//   const handleAddToCart = (product) => {
//     setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
//     setCartToast(product.name);
//     setTimeout(() => setCartToast(null), 2000);
//   };

//   const totalCartItems = Object.values(cart).reduce((s, q) => s + q, 0);

//   // ── Filter + sort ────────────────────────────────────────────────────────
//   const displayed = useMemo(() => {
//     const filtered =
//       category === "all"
//         ? products
//         : products.filter((p) => p.category === category);
//     return [...filtered].sort((a, b) =>
//       sortBy === "points"
//         ? a.points - b.points
//         : sortBy === "stock"
//           ? b.stock - a.stock
//           : 0,
//     );
//   }, [products, category, sortBy]);

//   const categories = [
//     { id: "all", label: "All", icon: "🛍️" },
//     { id: "accessories", label: "Accessories", icon: "🎒" },
//     { id: "clothing", label: "Clothing", icon: "👕" },
//     { id: "home", label: "Home", icon: "🏠" },
//     { id: "fitness", label: "Fitness", icon: "🧘" },
//     { id: "electronics", label: "Electronics", icon: "🔌" },
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
//         {/* Toast notification */}
//         {cartToast && (
//           <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] px-6 py-4 font-bold flex items-center gap-3 animate-in slide-in-from-top-4">
//             <span>✅</span> Added to cart!
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
//             Eco-<span className="text-emerald-600">Shop</span>
//           </h1>

//           <div className="flex items-center gap-3">
//             {/* FIX: points from state, not hardcoded */}
//             <div className="bg-emerald-600 text-white px-6 py-3 border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
//               <span className="font-bold text-sm uppercase tracking-wider">
//                 Your Points:{" "}
//               </span>
//               {loading ? (
//                 <span className="inline-block w-16 h-6 bg-emerald-500 animate-pulse rounded align-middle ml-1" />
//               ) : (
//                 <span className="text-2xl font-extrabold ml-1">
//                   {userPoints.toLocaleString()}
//                 </span>
//               )}
//             </div>

//             {/* Cart link with badge */}
//             <Link
//               to="/user/cart"
//               state={{ cart, userPoints }}
//               className="relative bg-white text-emerald-950 px-5 py-3 border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[3px_3px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold text-xl"
//             >
//               🛒
//               {totalCartItems > 0 && (
//                 <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-emerald-950 rounded-full flex items-center justify-center text-white text-xs font-extrabold">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex flex-wrap gap-3 mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setCategory(cat.id)}
//               className={`flex items-center gap-2 px-5 py-3 border-4 font-bold uppercase tracking-wider transition-all text-sm ${
//                 category === cat.id
//                   ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]"
//                   : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
//               }`}
//             >
//               <span>{cat.icon}</span> {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Sort + count */}
//         <div className="flex justify-between items-center mb-6">
//           {loading ? (
//             <Skeleton className="h-5 w-32 rounded" />
//           ) : (
//             <p className="text-emerald-800 font-bold">
//               {displayed.length} product{displayed.length !== 1 ? "s" : ""}{" "}
//               found
//             </p>
//           )}
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-2 border-4 border-emerald-950 font-bold bg-white focus:outline-none text-sm"
//           >
//             <option value="points">Sort: Points (low → high)</option>
//             <option value="stock">Sort: Availability</option>
//           </select>
//         </div>

//         {/* Product grid */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]"
//               >
//                 <Skeleton className="h-48 w-full" />
//                 <div className="p-5 space-y-3">
//                   <Skeleton className="h-6 w-3/4 rounded" />
//                   <Skeleton className="h-4 w-1/3 rounded" />
//                   <div className="flex gap-2 pt-2">
//                     <Skeleton className="h-12 flex-1 rounded" />
//                     <Skeleton className="h-12 flex-1 rounded" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : displayed.length === 0 ? (
//           <div className="text-center py-24 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl block mb-4">🔍</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No products found
//             </p>
//             <p className="text-emerald-500 font-medium">
//               Try a different category
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displayed.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 userPoints={userPoints}
//                 onAddToCart={handleAddToCart}
//                 cartQty={cart[product.id] ?? 0}
//               />
//             ))}
//           </div>
//         )}

//         {/* Affordability legend */}
//         {!loading && (
//           <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
//             <span className="flex items-center gap-2 text-emerald-700">
//               <span className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 inline-block" />
//               Can afford
//             </span>
//             <span className="flex items-center gap-2 text-amber-700">
//               <span className="w-4 h-4 bg-amber-50 border-2 border-amber-300 inline-block" />
//               Need more points
//             </span>
//             <span className="flex items-center gap-2 text-gray-500">
//               <span className="w-4 h-4 bg-gray-100 border-2 border-gray-300 inline-block" />
//               Out of stock
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Shop

//updated with backend integration
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

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

// ── Product card ───────────────────────────────────────────────────────────
const ProductCard = ({ product, userPoints, onAddToCart, cartQty }) => {
  const canAfford = userPoints >= product.points;
  const outOfStock = product.stock === 0;
  const unavailable = outOfStock || !canAfford;

  return (
    <div
      className={`bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)] transition-all group flex flex-col
        ${!unavailable ? "hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1" : "opacity-70"}
      `}
    >
      {/* Image area */}
      <div
        className={`relative h-48 border-b-4 border-emerald-950 flex items-center justify-center text-6xl
        ${outOfStock ? "bg-gray-100" : canAfford ? "bg-emerald-100" : "bg-amber-50"}
        ${!unavailable ? "group-hover:scale-y-105 origin-top transition-transform" : ""}
      `}
      >
        {/* Real image or emoji fallback */}
        {product.imageUrl || product.image ? (
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{product.emoji || "🛍️"}</span>
        )}

        {/* Out of stock ribbon */}
        {outOfStock && (
          <div className="absolute top-3 left-0 bg-gray-600 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1 border-y-2 border-gray-800">
            Out of Stock
          </div>
        )}

        {/* Can't afford ribbon */}
        {!outOfStock && !canAfford && (
          <div className="absolute top-3 left-0 bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1 border-y-2 border-amber-700">
            Need {(product.points - userPoints).toLocaleString()} more pts
          </div>
        )}

        {/* Cart badge */}
        {cartQty > 0 && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-emerald-600 border-2 border-emerald-950 rounded-full flex items-center justify-center text-white text-xs font-extrabold">
            {cartQty}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-extrabold text-emerald-950 leading-tight flex-1 pr-2">
            {product.name}
          </h3>
          <span
            className={`px-3 py-1 text-sm font-extrabold border-2 flex-shrink-0 ${
              canAfford
                ? "bg-emerald-600 text-white border-emerald-950"
                : "bg-gray-100 text-gray-500 border-gray-300"
            }`}
          >
            {product.points.toLocaleString()} pts
          </span>
        </div>

        <p
          className={`text-sm font-bold uppercase tracking-wider mb-4 ${
            outOfStock ? "text-gray-400" : "text-emerald-600"
          }`}
        >
          {outOfStock ? "Unavailable" : `${product.stock} in stock`}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/user/shop/product/${product._id || product.id}`}
            className="flex-1 text-center py-3 bg-emerald-50 text-emerald-900 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm"
          >
            Details
          </Link>

          {/* Add to Cart — disabled when out of stock or can't afford */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={unavailable}
            title={
              outOfStock
                ? "Out of stock"
                : !canAfford
                  ? `Need ${(product.points - userPoints).toLocaleString()} more points`
                  : "Add to cart"
            }
            className={`flex-1 py-3 font-extrabold uppercase tracking-wider border-4 text-sm transition-all
              ${
                unavailable
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
              }`}
          >
            {cartQty > 0 ? `In Cart (${cartQty})` : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const Shop = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("points");
  const [products, setProducts] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // cart: { [productId]: quantity }
  const [cart, setCart] = useState({});
  const [cartToast, setCartToast] = useState(null);

  // ── Fetch shop data ───────────────────────────────────────────────────────
  const fetchShop = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/shop`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load shop");
      }

      const data = await res.json();
      setProducts(data.products || []);
      setUserPoints(data.userPoints || 0);
    } catch (err) {
      setError(err.message || "Failed to load shop. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  // ── Cart handler ─────────────────────────────────────────────────────────
  const handleAddToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product._id || product.id]: (prev[product._id || product.id] ?? 0) + 1,
    }));
    setCartToast(product.name);
    setTimeout(() => setCartToast(null), 2000);
  };

  const totalCartItems = Object.values(cart).reduce((s, q) => s + q, 0);

  // ── Filter + sort ────────────────────────────────────────────────────────
  const displayed = useMemo(() => {
    const filtered =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    return [...filtered].sort((a, b) =>
      sortBy === "points"
        ? a.points - b.points
        : sortBy === "stock"
          ? b.stock - a.stock
          : 0,
    );
  }, [products, category, sortBy]);

  const categories = [
    { id: "all", label: "All", icon: "🛍️" },
    { id: "accessories", label: "Accessories", icon: "🎒" },
    { id: "clothing", label: "Clothing", icon: "👕" },
    { id: "home", label: "Home", icon: "🏠" },
    { id: "fitness", label: "Fitness", icon: "🧘" },
    { id: "electronics", label: "Electronics", icon: "🔌" },
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
              onClick={fetchShop}
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
        {/* Toast notification */}
        {cartToast && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] px-6 py-4 font-bold flex items-center gap-3 animate-in slide-in-from-top-4">
            <span>✅</span> Added to cart!
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
            Eco-<span className="text-emerald-600">Shop</span>
          </h1>

          <div className="flex items-center gap-3">
            {/* Points from state */}
            <div className="bg-emerald-600 text-white px-6 py-3 border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
              <span className="font-bold text-sm uppercase tracking-wider">
                Your Points:{" "}
              </span>
              {loading ? (
                <span className="inline-block w-16 h-6 bg-emerald-500 animate-pulse rounded align-middle ml-1" />
              ) : (
                <span className="text-2xl font-extrabold ml-1">
                  {userPoints.toLocaleString()}
                </span>
              )}
            </div>

            {/* Cart link with badge */}
            <Link
              to="/user/cart"
              state={{ cart, userPoints }}
              className="relative bg-white text-emerald-950 px-5 py-3 border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[3px_3px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold text-xl"
            >
              🛒
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-emerald-950 rounded-full flex items-center justify-center text-white text-xs font-extrabold">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 border-4 font-bold uppercase tracking-wider transition-all text-sm ${
                category === cat.id
                  ? "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]"
                  : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="flex justify-between items-center mb-6">
          {loading ? (
            <Skeleton className="h-5 w-32 rounded" />
          ) : (
            <p className="text-emerald-800 font-bold">
              {displayed.length} product{displayed.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border-4 border-emerald-950 font-bold bg-white focus:outline-none text-sm"
          >
            <option value="points">Sort: Points (low → high)</option>
            <option value="stock">Sort: Availability</option>
          </select>
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/3 rounded" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-12 flex-1 rounded" />
                    <Skeleton className="h-12 flex-1 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-24 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No products found
            </p>
            <p className="text-emerald-500 font-medium">
              Try a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                userPoints={userPoints}
                onAddToCart={handleAddToCart}
                cartQty={cart[product._id || product.id] ?? 0}
              />
            ))}
          </div>
        )}

        {/* Affordability legend */}
        {!loading && (
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
            <span className="flex items-center gap-2 text-emerald-700">
              <span className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 inline-block" />
              Can afford
            </span>
            <span className="flex items-center gap-2 text-amber-700">
              <span className="w-4 h-4 bg-amber-50 border-2 border-amber-300 inline-block" />
              Need more points
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <span className="w-4 h-4 bg-gray-100 border-2 border-gray-300 inline-block" />
              Out of stock
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
