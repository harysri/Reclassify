// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const Checkout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Data from Cart page via router state
//   const cartItems = location.state?.cartItems ?? [];
//   const totalCost = location.state?.totalCost ?? 0;
//   const userPoints = location.state?.userPoints ?? 0;

//   // ── State ────────────────────────────────────────────────────────────────
//   const [address, setAddress] = useState("");
//   const [loadingAddr, setLoadingAddr] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [orderDone, setOrderDone] = useState(false);
//   const [orderId, setOrderId] = useState(null);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0); // for success bar

//   // ── Redirect guard — if someone hits /checkout directly with no state ────
//   useEffect(() => {
//     if (cartItems.length === 0) {
//       navigate("/user/cart", { replace: true });
//     }
//   }, []);

//   // ── Fetch user's registered address from profile ─────────────────────────
//   // PRODUCTION: GET /api/user/profile  → { fullName, address, ... }
//   useEffect(() => {
//     const fetchAddress = async () => {
//       setLoadingAddr(true);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/user/profile", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error();
//         // const data = await res.json();
//         // setAddress(data.address);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 600));
//         setAddress("123 Green Street, Eco City, Kerala - 682001");
//         // ── END SIMULATION ──
//       } catch {
//         setAddress(""); // user can type manually
//       } finally {
//         setLoadingAddr(false);
//       }
//     };
//     fetchAddress();
//   }, []);

//   // ── Success progress bar animation ───────────────────────────────────────
//   useEffect(() => {
//     if (!orderDone) return;
//     let start = null;
//     const duration = 3000;
//     const tick = (ts) => {
//       if (!start) start = ts;
//       const elapsed = ts - start;
//       setProgress(Math.min(100, (elapsed / duration) * 100));
//       if (elapsed < duration) requestAnimationFrame(tick);
//       else navigate("/user/order-history");
//     };
//     requestAnimationFrame(tick);
//   }, [orderDone]);

//   // ── Submit order ──────────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/orders/create
//   // Body: { cartItems, totalCost, deliveryAddress }
//   // Response: { orderId, status, remainingPoints }
//   const handleConfirm = async () => {
//     if (!address.trim() || submitting) return;
//     setSubmitting(true);
//     setError(null);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch("/api/orders/create", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({
//       //     cartItems: cartItems.map((i) => ({ productId: i.id, quantity: i.quantity })),
//       //     totalCost,
//       //     deliveryAddress: address,
//       //   }),
//       // });
//       // if (!res.ok) throw new Error("Order failed. Please try again.");
//       // const data = await res.json();
//       // setOrderId(data.orderId);

//       // ── SIMULATION (remove when API is ready) ──
//       await new Promise((r) => setTimeout(r, 1800));
//       setOrderId(`ORD-${Date.now().toString().slice(-6)}`);
//       // ── END SIMULATION ──

//       setOrderDone(true);
//     } catch (err) {
//       setError(err.message ?? "Order failed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ── Success screen ────────────────────────────────────────────────────────
//   if (orderDone) {
//     const remaining = userPoints - totalCost;
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-emerald-950 p-10 shadow-[12px_12px_0px_rgba(6,78,59,1)] text-center max-w-md w-full">
//           {/* Checkmark */}
//           <div className="w-20 h-20 bg-emerald-600 border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
//             <span className="text-3xl text-white">✓</span>
//           </div>

//           <div className="inline-block bg-emerald-950 text-emerald-400 font-mono text-xs px-3 py-1 mb-4 tracking-widest uppercase">
//             Order Confirmed
//           </div>

//           <h2 className="text-3xl font-extrabold text-emerald-950 mb-1">
//             Order Placed!
//           </h2>
//           <p className="text-emerald-600 font-medium mb-6">
//             Your eco-friendly items are on their way.
//           </p>

//           {/* Order details */}
//           <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6 text-left space-y-3">
//             <div className="flex justify-between">
//               <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                 Order ID
//               </span>
//               {/* FIX: real generated order ID shown to user */}
//               <span className="font-mono font-bold text-emerald-950">
//                 {orderId}
//               </span>
//             </div>
//             <div className="border-t-2 border-emerald-200 pt-3 flex justify-between">
//               <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                 Points Spent
//               </span>
//               <span className="font-bold text-red-500">
//                 −{totalCost.toLocaleString()} pts
//               </span>
//             </div>
//             <div className="border-t-2 border-emerald-200 pt-3 flex justify-between">
//               <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                 Remaining Balance
//               </span>
//               <span className="font-bold text-emerald-700">
//                 {remaining.toLocaleString()} pts
//               </span>
//             </div>
//             <div className="border-t-2 border-emerald-200 pt-3 flex justify-between">
//               <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
//                 Delivery
//               </span>
//               <span className="font-bold text-emerald-950">
//                 5–7 business days
//               </span>
//             </div>
//           </div>

//           {/* FIX: real animated progress bar — fills over 3 seconds then navigates */}
//           <div className="mb-3">
//             <p className="text-xs text-emerald-500 font-medium mb-2">
//               Redirecting to your orders...
//             </p>
//             <div className="w-full h-3 bg-emerald-100 border-2 border-emerald-300">
//               <div
//                 className="h-full bg-emerald-600 transition-none"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           <button
//             onClick={() => navigate("/user/order-history")}
//             className="w-full py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm"
//           >
//             View Orders Now →
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Main render ───────────────────────────────────────────────────────────
//   const pointsAfter = userPoints - totalCost;

//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-emerald-600 font-bold hover:text-emerald-950 transition-colors flex items-center gap-1 mb-4 text-sm uppercase tracking-wider"
//           >
//             ← Back to Cart
//           </button>
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
//             Checkout
//           </h1>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* ── Order Summary ── */}
//           <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] h-fit">
//             <h2 className="text-xl font-extrabold text-emerald-950 mb-5 pb-4 border-b-4 border-emerald-100 flex items-center justify-between">
//               Order Summary
//               <span className="text-sm font-bold text-emerald-500 normal-case tracking-normal">
//                 {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
//               </span>
//             </h2>

//             {/* Item rows */}
//             <div className="space-y-4 mb-5">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-xl flex-shrink-0">
//                     {item.imageUrl ? (
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       item.image
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-bold text-emerald-950 text-sm truncate">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-emerald-500">
//                       {item.quantity} × {item.points.toLocaleString()} pts
//                     </p>
//                   </div>
//                   <span className="font-extrabold text-emerald-600 flex-shrink-0">
//                     {(item.points * item.quantity).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Totals */}
//             <div className="border-t-4 border-emerald-100 pt-4 space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
//                   Total Cost
//                 </span>
//                 <span className="text-3xl font-extrabold text-emerald-600">
//                   {totalCost.toLocaleString()} pts
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-emerald-600 font-medium">
//                   Your balance
//                 </span>
//                 <span className="font-bold text-emerald-800">
//                   {userPoints.toLocaleString()} pts
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-emerald-500 font-medium">
//                   After purchase
//                 </span>
//                 <span
//                   className={`font-bold ${pointsAfter >= 0 ? "text-emerald-700" : "text-red-500"}`}
//                 >
//                   {pointsAfter.toLocaleString()} pts
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ── Delivery + Confirm ── */}
//           <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <h2 className="text-xl font-extrabold text-emerald-950 mb-5 pb-4 border-b-4 border-emerald-100">
//               Delivery Address
//             </h2>

//             {/* FIX: pre-filled from user profile, editable */}
//             {loadingAddr ? (
//               <Skeleton className="h-24 w-full rounded mb-4" />
//             ) : (
//               <>
//                 <textarea
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   rows={3}
//                   placeholder="Your delivery address..."
//                   className={`w-full px-4 py-3 border-4 font-medium text-emerald-950 text-sm focus:outline-none focus:border-emerald-600 resize-none transition-colors placeholder:text-emerald-300 mb-1 ${
//                     !address.trim()
//                       ? "border-red-300 bg-red-50"
//                       : "border-emerald-200"
//                   }`}
//                 />
//                 {!address.trim() && (
//                   <p className="text-red-500 text-xs font-bold mb-3">
//                     ⚠️ Delivery address is required
//                   </p>
//                 )}
//                 <p className="text-xs text-emerald-500 font-medium mb-5">
//                   Pre-filled from your profile.{" "}
//                   <Link
//                     to="/user/profile"
//                     className="underline hover:text-emerald-700"
//                   >
//                     Update in profile →
//                   </Link>
//                 </p>
//               </>
//             )}

//             {/* Delivery note */}
//             <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-5">
//               <p className="text-sm text-emerald-800 font-medium">
//                 <span className="font-extrabold">📦 Delivery:</span> 5–7
//                 business days
//               </p>
//               <p className="text-xs text-emerald-600 mt-1">
//                 Email confirmation with tracking details will be sent on
//                 dispatch.
//               </p>
//             </div>

//             {/* Submit error */}
//             {error && (
//               <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//                 <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//               </div>
//             )}

//             {/* FIX: confirm button with real submitting state */}
//             <button
//               onClick={handleConfirm}
//               disabled={submitting || loadingAddr || !address.trim()}
//               className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-3
//                 ${
//                   submitting || loadingAddr || !address.trim()
//                     ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                     : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
//                 }`}
//             >
//               {submitting ? (
//                 <>
//                   <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
//                   Placing Order...
//                 </>
//               ) : (
//                 "✅ Confirm Order"
//               )}
//             </button>

//             <p className="text-xs text-emerald-400 text-center mt-3 font-medium">
//               {totalCost.toLocaleString()} pts will be deducted from your
//               balance
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

//updated page with api integration with backend

import React, { useState, useEffect, useCallback } from "react";
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
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data from Cart page via router state
  const cartItems = location.state?.cartItems ?? [];
  const totalCost = location.state?.totalCost ?? 0;
  const userPoints = location.state?.userPoints ?? 0;

  // ── State ────────────────────────────────────────────────────────────────
  const [address, setAddress] = useState("");
  const [loadingAddr, setLoadingAddr] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // ── Redirect guard — if someone hits /checkout directly with no state ────
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/user/cart", { replace: true });
    }
  }, [cartItems.length, navigate]);

  // ── Fetch user's registered address from profile ─────────────────────────
  const fetchAddress = useCallback(async () => {
    setLoadingAddr(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to load address");
      }

      const data = await res.json();
      setAddress(data.address || "");
    } catch {
      setAddress("");
    } finally {
      setLoadingAddr(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  // ── Success progress bar animation ───────────────────────────────────────
  useEffect(() => {
    if (!orderDone) return;
    let start = null;
    const duration = 3000;
    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed < duration) requestAnimationFrame(tick);
      else navigate("/user/order-history");
    };
    requestAnimationFrame(tick);
  }, [orderDone, navigate]);

  // ── Submit order ──────────────────────────────────────────────────────────
  const handleConfirm = async () => {
    if (!address.trim() || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      // Format cart items for backend
      const formattedCartItems = cartItems.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        imageUrl: item.imageUrl || item.image,
        points: item.points,
        quantity: item.quantity,
      }));

      const res = await fetch(`${API_BASE_URL}/orders/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          cartItems: formattedCartItems,
          totalCost,
          deliveryAddress: address,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Order failed. Please try again.");
      }

      const data = await res.json();
      setOrderId(data.orderId);
      setRemainingPoints(data.remainingPoints || userPoints - totalCost);
      setOrderDone(true);
    } catch (err) {
      setError(err.message || "Order failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (orderDone) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-emerald-950 p-10 shadow-[12px_12px_0px_rgba(6,78,59,1)] text-center max-w-md w-full">
          {/* Checkmark */}
          <div className="w-20 h-20 bg-emerald-600 border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
            <span className="text-3xl text-white">✓</span>
          </div>

          <div className="inline-block bg-emerald-950 text-emerald-400 font-mono text-xs px-3 py-1 mb-4 tracking-widest uppercase">
            Order Confirmed
          </div>

          <h2 className="text-3xl font-extrabold text-emerald-950 mb-1">
            Order Placed!
          </h2>
          <p className="text-emerald-600 font-medium mb-6">
            Your eco-friendly items are on their way.
          </p>

          {/* Order details */}
          <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-6 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Order ID
              </span>
              <span className="font-mono font-bold text-emerald-950">
                {orderId}
              </span>
            </div>
            <div className="border-t-2 border-emerald-200 pt-3 flex justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Points Spent
              </span>
              <span className="font-bold text-red-500">
                −{totalCost.toLocaleString()} pts
              </span>
            </div>
            <div className="border-t-2 border-emerald-200 pt-3 flex justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Remaining Balance
              </span>
              <span className="font-bold text-emerald-700">
                {remainingPoints.toLocaleString()} pts
              </span>
            </div>
            <div className="border-t-2 border-emerald-200 pt-3 flex justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Delivery
              </span>
              <span className="font-bold text-emerald-950">
                5–7 business days
              </span>
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="mb-3">
            <p className="text-xs text-emerald-500 font-medium mb-2">
              Redirecting to your orders...
            </p>
            <div className="w-full h-3 bg-emerald-100 border-2 border-emerald-300">
              <div
                className="h-full bg-emerald-600 transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => navigate("/user/order-history")}
            className="w-full py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-200 hover:border-emerald-950 transition-all text-sm"
          >
            View Orders Now →
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  const pointsAfter = userPoints - totalCost;

  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 font-bold hover:text-emerald-950 transition-colors flex items-center gap-1 mb-4 text-sm uppercase tracking-wider"
          >
            ← Back to Cart
          </button>
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
            Checkout
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ── Order Summary ── */}
          <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] h-fit">
            <h2 className="text-xl font-extrabold text-emerald-950 mb-5 pb-4 border-b-4 border-emerald-100 flex items-center justify-between">
              Order Summary
              <span className="text-sm font-bold text-emerald-500 normal-case tracking-normal">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </span>
            </h2>

            {/* Item rows */}
            <div className="space-y-4 mb-5">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-xl flex-shrink-0">
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
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-emerald-950 text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-emerald-500">
                      {item.quantity} × {item.points.toLocaleString()} pts
                    </p>
                  </div>
                  <span className="font-extrabold text-emerald-600 flex-shrink-0">
                    {(item.points * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t-4 border-emerald-100 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-sm">
                  Total Cost
                </span>
                <span className="text-3xl font-extrabold text-emerald-600">
                  {totalCost.toLocaleString()} pts
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600 font-medium">
                  Your balance
                </span>
                <span className="font-bold text-emerald-800">
                  {userPoints.toLocaleString()} pts
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-500 font-medium">
                  After purchase
                </span>
                <span
                  className={`font-bold ${pointsAfter >= 0 ? "text-emerald-700" : "text-red-500"}`}
                >
                  {pointsAfter.toLocaleString()} pts
                </span>
              </div>
            </div>
          </div>

          {/* ── Delivery + Confirm ── */}
          <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <h2 className="text-xl font-extrabold text-emerald-950 mb-5 pb-4 border-b-4 border-emerald-100">
              Delivery Address
            </h2>

            {loadingAddr ? (
              <Skeleton className="h-24 w-full rounded mb-4" />
            ) : (
              <>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Your delivery address..."
                  className={`w-full px-4 py-3 border-4 font-medium text-emerald-950 text-sm focus:outline-none focus:border-emerald-600 resize-none transition-colors placeholder:text-emerald-300 mb-1 ${
                    !address.trim()
                      ? "border-red-300 bg-red-50"
                      : "border-emerald-200"
                  }`}
                />
                {!address.trim() && (
                  <p className="text-red-500 text-xs font-bold mb-3">
                    ⚠️ Delivery address is required
                  </p>
                )}
                <p className="text-xs text-emerald-500 font-medium mb-5">
                  Pre-filled from your profile.{" "}
                  <Link
                    to="/user/profile"
                    className="underline hover:text-emerald-700"
                  >
                    Update in profile →
                  </Link>
                </p>
              </>
            )}

            {/* Delivery note */}
            <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-5">
              <p className="text-sm text-emerald-800 font-medium">
                <span className="font-extrabold">📦 Delivery:</span> 5–7
                business days
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                Email confirmation with tracking details will be sent on
                dispatch.
              </p>
            </div>

            {/* Submit error */}
            {error && (
              <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
                <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
              </div>
            )}

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              disabled={submitting || loadingAddr || !address.trim()}
              className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-3
                ${
                  submitting || loadingAddr || !address.trim()
                    ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
                }`}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </>
              ) : (
                "✅ Confirm Order"
              )}
            </button>

            <p className="text-xs text-emerald-400 text-center mt-3 font-medium">
              {totalCost.toLocaleString()} pts will be deducted from your
              balance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
