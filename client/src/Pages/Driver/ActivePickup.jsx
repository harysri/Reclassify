// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // Waste type icon map
// const WASTE_ICONS = {
//   glass: "🍾",
//   plastic: "🥤",
//   cardboard: "📦",
//   paper: "📄",
//   metal: "🥫",
//   mixed: "♻️",
// };

// // ── Step indicator ─────────────────────────────────────────────────────────
// const Steps = ({ status }) => {
//   const steps = [
//     { id: "en_route", label: "En Route" },
//     { id: "arrived", label: "Arrived" },
//     { id: "completed", label: "Completed" },
//   ];
//   const currentIdx = steps.findIndex((s) => s.id === status);

//   return (
//     <div className="flex items-center mb-8">
//       {steps.map((step, i) => {
//         const done = i < currentIdx;
//         const active = i === currentIdx;
//         return (
//           <React.Fragment key={step.id}>
//             <div className="flex flex-col items-center gap-1">
//               <div
//                 className={`w-12 h-12 border-4 flex items-center justify-center font-extrabold transition-all
//                 ${
//                   done
//                     ? "bg-emerald-600 text-white border-emerald-950"
//                     : active
//                       ? "bg-blue-600 text-white border-blue-950"
//                       : "bg-white text-emerald-300 border-emerald-200"
//                 }`}
//               >
//                 {done ? "✓" : i + 1}
//               </div>
//               <p
//                 className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap
//                 ${done ? "text-emerald-600" : active ? "text-blue-600" : "text-emerald-300"}`}
//               >
//                 {step.label}
//               </p>
//             </div>
//             {i < steps.length - 1 && (
//               <div
//                 className={`flex-1 h-2 border-4 mx-2 mb-4 transition-all
//                 ${done ? "bg-emerald-600 border-emerald-950" : "bg-emerald-100 border-emerald-200"}`}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// // ── Main component ─────────────────────────────────────────────────────────
// const ActivePickup = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [pickup, setPickup] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState("en_route"); // en_route | arrived | completed
//   // Per-item check-off so driver confirms each item collected
//   const [checked, setChecked] = useState({});
//   const [completing, setCompleting] = useState(false);
//   const [arriving, setArriving] = useState(false);

//   // ── Fetch active booking ──────────────────────────────────────────────────
//   // PRODUCTION: GET /api/driver/active-pickup/:id
//   // Response: { id, userName, address, scheduledDate, timeSlot,
//   //             items: [{ wasteType, quantity }], notes }
//   useEffect(() => {
//     const fetchPickup = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch(`/api/driver/active-pickup/${id}`, {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load pickup");
//         // const data = await res.json();
//         // setPickup(data);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 800));
//         setPickup({
//           id: id ?? "BK-482931",
//           userName: "John Doe",
//           address: "123 Green Street, Eco City, Ernakulam",
//           scheduledDate: "2024-03-28",
//           timeSlot: "Morning (8:00 AM – 12:00 PM)",
//           items: [
//             { wasteType: "plastic", quantity: 5 },
//             { wasteType: "glass", quantity: 3 },
//           ],
//           notes: "Items are kept near the gate in green bags.",
//         });
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load pickup. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPickup();
//   }, [id]);

//   // ── Mark arrived ──────────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/driver/active-pickup/:id/arrived
//   // Notifies user that driver is at location
//   const handleArrived = async () => {
//     setArriving(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // await fetch(`/api/driver/active-pickup/${id}/arrived`, {
//       //   method: "POST",
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 700));

//       setStatus("arrived");
//     } catch {
//       setError("Failed to update status. Please try again.");
//     } finally {
//       setArriving(false);
//     }
//   };

//   // ── Mark complete ─────────────────────────────────────────────────────────
//   // PRODUCTION: POST /api/driver/active-pickup/:id/complete
//   // Backend: sets booking status → "completed", credits user's reward points,
//   //          sends notification to user and admin
//   const handleComplete = async () => {
//     setCompleting(true);
//     setError(null);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch(`/api/driver/active-pickup/${id}/complete`, {
//       //   method: "POST",
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });
//       // if (!res.ok) throw new Error("Failed to mark complete");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 1400));

//       setStatus("completed");
//       setTimeout(() => navigate("/driver/dashboard"), 2500);
//     } catch {
//       setError("Failed to complete pickup. Please try again.");
//     } finally {
//       setCompleting(false);
//     }
//   };

//   // All items ticked off before allowing complete
//   const allChecked = pickup ? pickup.items.every((_, i) => checked[i]) : false;

//   const toggleCheck = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

//   // ── Success screen ────────────────────────────────────────────────────────
//   if (status === "completed") {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-emerald-950 p-12 shadow-[12px_12px_0px_rgba(6,78,59,1)] text-center max-w-sm w-full">
//           <div className="w-20 h-20 bg-emerald-600 border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
//             <span className="text-3xl text-white">✓</span>
//           </div>
//           <div className="inline-block bg-emerald-950 text-emerald-400 font-mono text-xs px-3 py-1 mb-4 tracking-widest uppercase">
//             Pickup Complete
//           </div>
//           <h2 className="text-3xl font-extrabold text-emerald-950 mb-2">
//             Great work!
//           </h2>
//           <p className="text-emerald-600 font-medium mb-1">
//             Pickup marked complete. The customer's points have been credited.
//           </p>
//           <p className="text-emerald-400 text-sm">
//             Redirecting to dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error && !pickup) {
//     return (
//       <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
//         <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
//           <span className="text-5xl block mb-4">⚠️</span>
//           <p className="font-extrabold text-red-600 text-xl mb-6">{error}</p>
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
//       <div className="max-w-3xl mx-auto">
//         {/* Active indicator + header */}
//         <div className="bg-white border-4 border-emerald-950 p-6 mb-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
//             <span className="font-extrabold text-emerald-600 uppercase tracking-widest text-xs">
//               Active Pickup
//             </span>
//           </div>

//           {loading ? (
//             <div className="space-y-2">
//               <Skeleton className="h-8 w-48 rounded" />
//               <Skeleton className="h-5 w-full rounded" />
//               <Skeleton className="h-5 w-64 rounded" />
//             </div>
//           ) : (
//             <>
//               <h1 className="text-3xl font-extrabold text-emerald-950 mb-1">
//                 {pickup.userName}
//               </h1>
//               <p className="text-emerald-700 font-medium mb-1">
//                 📍 {pickup.address}
//               </p>
//               <p className="text-emerald-500 text-sm font-medium">
//                 📅{" "}
//                 {new Date(pickup.scheduledDate).toLocaleDateString("en-US", {
//                   weekday: "long",
//                   month: "long",
//                   day: "numeric",
//                 })}
//                 &nbsp;·&nbsp;⏰ {pickup.timeSlot}
//               </p>
//               {pickup.notes && (
//                 <div className="mt-3 bg-yellow-50 border-2 border-yellow-200 p-3">
//                   <p className="text-yellow-800 text-sm font-medium">
//                     <span className="font-extrabold">📝 Note:</span>{" "}
//                     {pickup.notes}
//                   </p>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Step tracker */}
//         <Steps status={status} />

//         {/* ── En route panel ── */}
//         {status === "en_route" && (
//           <div className="bg-blue-50 border-4 border-blue-200 p-8 text-center shadow-[8px_8px_0px_rgba(23,37,84,0.15)]">
//             <span className="text-6xl mb-4 block">🚛</span>
//             <h2 className="text-2xl font-extrabold text-blue-900 mb-2">
//               On the way
//             </h2>
//             <p className="text-blue-600 font-medium mb-6">
//               Head to the pickup address. Tap below when you arrive.
//             </p>
//             <button
//               onClick={handleArrived}
//               disabled={arriving || loading}
//               className={`px-8 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center gap-3 mx-auto
//                 ${
//                   arriving || loading
//                     ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                     : "bg-blue-600 text-white border-blue-950 shadow-[6px_6px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-1 hover:translate-y-1"
//                 }`}
//             >
//               {arriving ? (
//                 <>
//                   <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                   Updating...
//                 </>
//               ) : (
//                 "📍 I've Arrived"
//               )}
//             </button>
//           </div>
//         )}

//         {/* ── Arrived panel ── */}
//         {status === "arrived" && (
//           <div className="bg-emerald-50 border-4 border-emerald-200 p-6 shadow-[8px_8px_0px_rgba(6,78,59,0.15)]">
//             <h2 className="text-2xl font-extrabold text-emerald-950 mb-1">
//               Collect Items
//             </h2>
//             <p className="text-emerald-600 font-medium mb-5 text-sm">
//               Tick each item as you collect it, then mark the pickup complete.
//             </p>

//             {/* Per-item checklist */}
//             {loading ? (
//               <div className="space-y-3 mb-6">
//                 {[...Array(2)].map((_, i) => (
//                   <Skeleton key={i} className="h-14 w-full rounded" />
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-3 mb-6">
//                 {pickup.items.map((item, i) => (
//                   <button
//                     key={i}
//                     onClick={() => toggleCheck(i)}
//                     className={`w-full flex items-center gap-4 p-4 border-4 font-bold text-left transition-all
//                       ${
//                         checked[i]
//                           ? "bg-emerald-600 text-white border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)]"
//                           : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
//                       }`}
//                   >
//                     {/* Checkbox */}
//                     <div
//                       className={`w-7 h-7 border-4 flex items-center justify-center flex-shrink-0 font-extrabold text-sm
//                       ${
//                         checked[i]
//                           ? "bg-white border-white text-emerald-600"
//                           : "bg-white border-emerald-300 text-transparent"
//                       }`}
//                     >
//                       ✓
//                     </div>

//                     {/* Icon + label */}
//                     <span className="text-2xl">
//                       {WASTE_ICONS[item.wasteType] ?? "♻️"}
//                     </span>
//                     <div className="flex-1">
//                       <p className="capitalize font-extrabold">
//                         {item.wasteType}
//                       </p>
//                     </div>
//                     <span
//                       className={`text-sm font-extrabold px-3 py-1 border-2
//                       ${
//                         checked[i]
//                           ? "bg-emerald-500 border-emerald-300 text-white"
//                           : "bg-emerald-100 border-emerald-200 text-emerald-800"
//                       }`}
//                     >
//                       ×{item.quantity}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Progress indicator */}
//             {!loading && (
//               <div className="mb-5">
//                 <div className="flex justify-between text-xs font-bold text-emerald-600 mb-1">
//                   <span>Items collected</span>
//                   <span>
//                     {Object.values(checked).filter(Boolean).length} /{" "}
//                     {pickup.items.length}
//                   </span>
//                 </div>
//                 <div className="w-full h-3 bg-emerald-100 border-2 border-emerald-200">
//                   <div
//                     className="h-full bg-emerald-600 transition-all duration-300"
//                     style={{
//                       width: `${(Object.values(checked).filter(Boolean).length / pickup.items.length) * 100}%`,
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Inline error */}
//             {error && (
//               <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//                 <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//               </div>
//             )}

//             {/* Complete button — only active when all items ticked */}
//             <button
//               onClick={handleComplete}
//               disabled={!allChecked || completing}
//               className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-3
//                 ${
//                   !allChecked || completing
//                     ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                     : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
//                 }`}
//             >
//               {completing ? (
//                 <>
//                   <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                   Completing...
//                 </>
//               ) : allChecked ? (
//                 "✅ Mark Pickup Complete"
//               ) : (
//                 `Collect all items first (${Object.values(checked).filter(Boolean).length}/${pickup?.items.length ?? 0})`
//               )}
//             </button>

//             <p className="text-xs text-emerald-400 text-center mt-3 font-medium">
//               Marking complete credits the customer's reward points and notifies
//               the admin.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActivePickup;

//updated with backend integration for active pickup flow
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// Waste type icon map
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

// ── Step indicator ─────────────────────────────────────────────────────────
const Steps = ({ status }) => {
  const steps = [
    { id: "en_route", label: "En Route" },
    { id: "arrived", label: "Arrived" },
    { id: "completed", label: "Completed" },
  ];
  const currentIdx = steps.findIndex((s) => s.id === status);

  return (
    <div className="flex items-center mb-8">
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-12 h-12 border-4 flex items-center justify-center font-extrabold transition-all
                ${
                  done
                    ? "bg-emerald-600 text-white border-emerald-950"
                    : active
                      ? "bg-blue-600 text-white border-blue-950"
                      : "bg-white text-emerald-300 border-emerald-200"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <p
                className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap
                ${done ? "text-emerald-600" : active ? "text-blue-600" : "text-emerald-300"}`}
              >
                {step.label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-2 border-4 mx-2 mb-4 transition-all
                ${done ? "bg-emerald-600 border-emerald-950" : "bg-emerald-100 border-emerald-200"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const ActivePickup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("en_route");
  const [checked, setChecked] = useState({});
  const [completing, setCompleting] = useState(false);
  const [arriving, setArriving] = useState(false);

  // ── Fetch active booking ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchPickup = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/driver/active-pickup/${id}`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          if (res.status === 404) {
            throw new Error("Active pickup not found");
          }
          throw new Error("Failed to load pickup");
        }

        const data = await res.json();
        setPickup(data);
        // Set initial status from backend if available
        if (data.status) {
          setStatus(data.status === "accepted" ? "en_route" : data.status);
        }
      } catch (err) {
        setError(err.message || "Failed to load pickup. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPickup();
    }
  }, [id]);

  // ── Mark arrived ──────────────────────────────────────────────────────────
  const handleArrived = async () => {
    setArriving(true);
    setError(null);
    try {
      const res = await fetch(
        // `${API_BASE_URL}/driver/active-pickup/${id}/arrived`,
        `${API_BASE_URL}/bookings/${id}/arrived`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setStatus("arrived");
    } catch (err) {
      setError(err.message || "Failed to update status. Please try again.");
    } finally {
      setArriving(false);
    }
  };

  // ── Mark complete ─────────────────────────────────────────────────────────
  const handleComplete = async () => {
    setCompleting(true);
    setError(null);
    try {
      const res = await fetch(
        // `${API_BASE_URL}/driver/active-pickup/${id}/complete`,
        `${API_BASE_URL}/bookings/${id}/complete`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to mark complete");
      }

      setStatus("completed");
      setTimeout(() => navigate("/driver/dashboard"), 2500);
    } catch (err) {
      setError(err.message || "Failed to complete pickup. Please try again.");
    } finally {
      setCompleting(false);
    }
  };

  // All items ticked off before allowing complete
  const allChecked = pickup ? pickup.items.every((_, i) => checked[i]) : false;

  const toggleCheck = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  // ── Success screen ────────────────────────────────────────────────────────
  if (status === "completed") {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-emerald-950 p-12 shadow-[12px_12px_0px_rgba(6,78,59,1)] text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-emerald-600 border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
            <span className="text-3xl text-white">✓</span>
          </div>
          <div className="inline-block bg-emerald-950 text-emerald-400 font-mono text-xs px-3 py-1 mb-4 tracking-widest uppercase">
            Pickup Complete
          </div>
          <h2 className="text-3xl font-extrabold text-emerald-950 mb-2">
            Great work!
          </h2>
          <p className="text-emerald-600 font-medium mb-1">
            Pickup marked complete. The customer's points have been credited.
          </p>
          <p className="text-emerald-400 text-sm">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && !pickup) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              ← Back
            </button>
            <button
              onClick={() => window.location.reload()}
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
      <div className="max-w-3xl mx-auto">
        {/* Active indicator + header */}
        <div className="bg-white border-4 border-emerald-950 p-6 mb-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-extrabold text-emerald-600 uppercase tracking-widest text-xs">
              Active Pickup
            </span>
          </div>

          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-64 rounded" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold text-emerald-950 mb-1">
                {pickup?.userName}
              </h1>
              <p className="text-emerald-700 font-medium mb-1">
                📍 {pickup?.address}
              </p>
              <p className="text-emerald-500 text-sm font-medium">
                📅{" "}
                {pickup?.scheduledDate &&
                  new Date(pickup.scheduledDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                &nbsp;·&nbsp;⏰ {pickup?.timeSlot}
              </p>
              {pickup?.notes && (
                <div className="mt-3 bg-yellow-50 border-2 border-yellow-200 p-3">
                  <p className="text-yellow-800 text-sm font-medium">
                    <span className="font-extrabold">📝 Note:</span>{" "}
                    {pickup.notes}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Step tracker */}
        <Steps status={status} />

        {/* ── En route panel ── */}
        {status === "en_route" && (
          <div className="bg-blue-50 border-4 border-blue-200 p-8 text-center shadow-[8px_8px_0px_rgba(23,37,84,0.15)]">
            <span className="text-6xl mb-4 block">🚛</span>
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2">
              On the way
            </h2>
            <p className="text-blue-600 font-medium mb-6">
              Head to the pickup address. Tap below when you arrive.
            </p>
            <button
              onClick={handleArrived}
              disabled={arriving || loading}
              className={`px-8 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center gap-3 mx-auto
                ${
                  arriving || loading
                    ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white border-blue-950 shadow-[6px_6px_0px_rgba(23,37,84,1)] hover:shadow-[2px_2px_0px_rgba(23,37,84,1)] hover:translate-x-1 hover:translate-y-1"
                }`}
            >
              {arriving ? (
                <>
                  <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                  Updating...
                </>
              ) : (
                "📍 I've Arrived"
              )}
            </button>
          </div>
        )}

        {/* ── Arrived panel ── */}
        {status === "arrived" && (
          <div className="bg-emerald-50 border-4 border-emerald-200 p-6 shadow-[8px_8px_0px_rgba(6,78,59,0.15)]">
            <h2 className="text-2xl font-extrabold text-emerald-950 mb-1">
              Collect Items
            </h2>
            <p className="text-emerald-600 font-medium mb-5 text-sm">
              Tick each item as you collect it, then mark the pickup complete.
            </p>

            {/* Per-item checklist */}
            {loading ? (
              <div className="space-y-3 mb-6">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {pickup?.items?.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => toggleCheck(i)}
                    className={`w-full flex items-center gap-4 p-4 border-4 font-bold text-left transition-all
                      ${
                        checked[i]
                          ? "bg-emerald-600 text-white border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)]"
                          : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
                      }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-7 h-7 border-4 flex items-center justify-center flex-shrink-0 font-extrabold text-sm
                      ${
                        checked[i]
                          ? "bg-white border-white text-emerald-600"
                          : "bg-white border-emerald-300 text-transparent"
                      }`}
                    >
                      ✓
                    </div>

                    {/* Icon + label */}
                    <span className="text-2xl">
                      {WASTE_ICONS[item.wasteType] ?? "♻️"}
                    </span>
                    <div className="flex-1">
                      <p className="capitalize font-extrabold">
                        {item.wasteType}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-extrabold px-3 py-1 border-2
                      ${
                        checked[i]
                          ? "bg-emerald-500 border-emerald-300 text-white"
                          : "bg-emerald-100 border-emerald-200 text-emerald-800"
                      }`}
                    >
                      ×{item.quantity}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Progress indicator */}
            {!loading && pickup?.items && (
              <div className="mb-5">
                <div className="flex justify-between text-xs font-bold text-emerald-600 mb-1">
                  <span>Items collected</span>
                  <span>
                    {Object.values(checked).filter(Boolean).length} /{" "}
                    {pickup.items.length}
                  </span>
                </div>
                <div className="w-full h-3 bg-emerald-100 border-2 border-emerald-200">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{
                      width: `${(Object.values(checked).filter(Boolean).length / pickup.items.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Inline error */}
            {error && (
              <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
                <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
              </div>
            )}

            {/* Complete button — only active when all items ticked */}
            <button
              onClick={handleComplete}
              disabled={!allChecked || completing}
              className={`w-full py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-3
                ${
                  !allChecked || completing
                    ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-emerald-600 text-white border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1"
                }`}
            >
              {completing ? (
                <>
                  <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                  Completing...
                </>
              ) : allChecked ? (
                "✅ Mark Pickup Complete"
              ) : (
                `Collect all items first (${Object.values(checked).filter(Boolean).length}/${pickup?.items?.length ?? 0})`
              )}
            </button>

            <p className="text-xs text-emerald-400 text-center mt-3 font-medium">
              Marking complete credits the customer's reward points and notifies
              the admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivePickup;
