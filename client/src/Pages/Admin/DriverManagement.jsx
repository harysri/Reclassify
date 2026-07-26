// import React, { useState, useEffect, useMemo } from "react";

// // ── Helpers ────────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-blue-50 border-2 border-blue-100 ${className}`}
//   />
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const DriverManagement = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   // Tracks which driver ID is currently being actioned
//   const [actioning, setActioning] = useState(null);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/admin/drivers
//   // Response: { drivers: [{ id, fullName, email, licenseNumber, place, completedPickups, isVerified }] }
//   useEffect(() => {
//     const fetchDrivers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/admin/drivers", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load drivers");
//         // const data = await res.json();
//         // setDrivers(data.drivers);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 900));
//         setDrivers([
//           {
//             id: "d1",
//             fullName: "Mike S.",
//             email: "mike@example.com",
//             licenseNumber: "KL04 20140000555",
//             place: "Ernakulam",
//             completedPickups: 45,
//             isVerified: true,
//           },
//           {
//             id: "d2",
//             fullName: "Sarah K.",
//             email: "sarah@example.com",
//             licenseNumber: "KL08 20180012345",
//             place: "Thrissur",
//             completedPickups: 0,
//             isVerified: false,
//           },
//           {
//             id: "d3",
//             fullName: "John P.",
//             email: "john@example.com",
//             licenseNumber: "KL02 20120009988",
//             place: "Kollam",
//             completedPickups: 72,
//             isVerified: true,
//           },
//           {
//             id: "d4",
//             fullName: "Arun Das",
//             email: "arun@example.com",
//             licenseNumber: "KL11 20160007711",
//             place: "Kozhikode",
//             completedPickups: 0,
//             isVerified: false,
//           },
//           {
//             id: "d5",
//             fullName: "Sana Fathima",
//             email: "sana@example.com",
//             licenseNumber: "KL06 20150003322",
//             place: "Ernakulam",
//             completedPickups: 18,
//             isVerified: true,
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load drivers. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDrivers();
//   }, []);

//   // ── Verify / Unverify ─────────────────────────────────────────────────────
//   // PRODUCTION: PATCH /api/admin/drivers/:id/verify
//   // Body: { isVerified: true | false }
//   // Verifying → driver can now receive pickup notifications
//   // Unverifying → driver stops receiving pickup notifications
//   const handleToggleVerification = async (driverId, currentVerified) => {
//     const newVerified = !currentVerified;
//     setActioning(driverId);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch(`/api/admin/drivers/${driverId}/verify`, {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({ isVerified: newVerified }),
//       // });
//       // if (!res.ok) throw new Error("Failed to update verification");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 600));

//       // Optimistic update — no page reload needed
//       setDrivers((prev) =>
//         prev.map((d) =>
//           d.id === driverId ? { ...d, isVerified: newVerified } : d,
//         ),
//       );
//     } catch {
//       setError("Failed to update driver verification. Please try again.");
//     } finally {
//       setActioning(null);
//     }
//   };

//   // ── Filter + search ───────────────────────────────────────────────────────
//   const displayed = useMemo(() => {
//     let result = drivers;
//     if (filter === "verified") result = result.filter((d) => d.isVerified);
//     if (filter === "unverified") result = result.filter((d) => !d.isVerified);
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter(
//         (d) =>
//           d.fullName.toLowerCase().includes(q) ||
//           d.email.toLowerCase().includes(q) ||
//           d.licenseNumber.toLowerCase().includes(q) ||
//           d.place.toLowerCase().includes(q),
//       );
//     }
//     return result;
//   }, [drivers, filter, search]);

//   // ── Summary counts ────────────────────────────────────────────────────────
//   const verifiedCount = drivers.filter((d) => d.isVerified).length;
//   const unverifiedCount = drivers.filter((d) => !d.isVerified).length;

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error && drivers.length === 0) {
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
//             Driver <span className="text-blue-600">Management</span>
//           </h1>

//           {/* Search + filter row */}
//           <div className="flex flex-wrap gap-3 items-center">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name, email, license or place..."
//               className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-blue-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
//             />
//             <div className="flex gap-2">
//               {[
//                 { key: "all", label: `All (${drivers.length})` },
//                 { key: "verified", label: `Verified (${verifiedCount})` },
//                 { key: "unverified", label: `Unverified (${unverifiedCount})` },
//               ].map((f) => (
//                 <button
//                   key={f.key}
//                   onClick={() => setFilter(f.key)}
//                   className={`px-4 py-3 font-bold uppercase text-sm border-4 transition-all whitespace-nowrap
//                     ${
//                       filter === f.key
//                         ? "bg-blue-600 text-white border-blue-950 shadow-[3px_3px_0px_rgba(23,37,84,1)]"
//                         : "bg-white text-emerald-950 border-emerald-200 hover:border-blue-400"
//                     }`}
//                 >
//                   {f.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Unverified alert — mirrors AdminDashboard alert */}
//         {!loading && unverifiedCount > 0 && filter !== "verified" && (
//           <div className="bg-amber-50 border-4 border-amber-400 p-4 mb-6 flex items-center gap-3">
//             <span className="text-xl flex-shrink-0">⚠️</span>
//             <p className="font-bold text-amber-800 text-sm">
//               {unverifiedCount} driver{unverifiedCount !== 1 ? "s" : ""} pending
//               verification — unverified drivers cannot receive pickup requests.
//             </p>
//           </div>
//         )}

//         {/* Inline error (post-load action failure) */}
//         {error && drivers.length > 0 && (
//           <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//             <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && displayed.length === 0 ? (
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl block mb-4">🔍</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No drivers found
//             </p>
//             <p className="text-emerald-500 font-medium">
//               {search ? `No results for "${search}"` : `No ${filter} drivers`}
//             </p>
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="mt-4 text-blue-600 font-bold underline underline-offset-2 hover:no-underline"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-blue-100 border-b-4 border-emerald-950">
//                   <tr>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Driver
//                     </th>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       License No.
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Place
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Pickups
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-right  text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y-4 divide-emerald-100">
//                   {loading
//                     ? [...Array(4)].map((_, i) => (
//                         <tr key={i}>
//                           <td className="px-6 py-4 space-y-2">
//                             <Skeleton className="h-4 w-32 rounded" />
//                             <Skeleton className="h-3 w-40 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-36 rounded" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-20 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-8 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-6 w-20 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <Skeleton className="h-9 w-24 rounded ml-auto" />
//                           </td>
//                         </tr>
//                       ))
//                     : displayed.map((driver) => (
//                         <tr
//                           key={driver.id}
//                           className={`transition-colors ${!driver.isVerified ? "bg-amber-50 hover:bg-amber-100" : "hover:bg-emerald-50"}`}
//                         >
//                           {/* Name + email */}
//                           <td className="px-6 py-4">
//                             <p className="font-extrabold text-emerald-950">
//                               {driver.fullName}
//                             </p>
//                             <p className="text-sm text-emerald-500 font-medium">
//                               {driver.email}
//                             </p>
//                           </td>

//                           {/* License number — shown as plain text, no alert() */}
//                           <td className="px-6 py-4">
//                             <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 border-2 border-blue-200 px-2 py-0.5">
//                               {driver.licenseNumber}
//                             </span>
//                           </td>

//                           {/* Place */}
//                           <td className="px-6 py-4 text-center text-emerald-700 font-medium text-sm">
//                             {driver.place}
//                           </td>

//                           {/* Completed pickups — FIX: trips → completedPickups, earnings removed */}
//                           <td className="px-6 py-4 text-center font-extrabold text-emerald-800">
//                             {driver.completedPickups}
//                           </td>

//                           {/* Verification status badge — FIX: border added */}
//                           <td className="px-6 py-4 text-center">
//                             <span
//                               className={`px-3 py-1 font-bold uppercase text-xs border-4
//                               ${
//                                 driver.isVerified
//                                   ? "bg-emerald-600 text-white border-emerald-950"
//                                   : "bg-amber-500  text-white border-amber-800"
//                               }`}
//                             >
//                               {driver.isVerified ? "Verified" : "Pending"}
//                             </span>
//                           </td>

//                           {/* Verify / Unverify — FIX: real API call, both directions work */}
//                           <td className="px-6 py-4 text-right">
//                             <button
//                               onClick={() =>
//                                 handleToggleVerification(
//                                   driver.id,
//                                   driver.isVerified,
//                                 )
//                               }
//                               disabled={actioning === driver.id}
//                               className={`px-4 py-2 font-bold text-sm uppercase border-4 transition-all flex items-center gap-2 ml-auto
//                                 ${
//                                   actioning === driver.id
//                                     ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                                     : driver.isVerified
//                                       ? "bg-red-50 text-red-600 border-red-300 hover:border-red-600 hover:shadow-[3px_3px_0px_rgba(239,68,68,0.3)]"
//                                       : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
//                                 }`}
//                             >
//                               {actioning === driver.id ? (
//                                 <>
//                                   <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                                   Wait
//                                 </>
//                               ) : driver.isVerified ? (
//                                 "Unverify"
//                               ) : (
//                                 "✓ Verify"
//                               )}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                 </tbody>

//                 {/* Footer */}
//                 {!loading && displayed.length > 0 && (
//                   <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
//                     <tr>
//                       <td
//                         colSpan={5}
//                         className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
//                       >
//                         Showing {displayed.length} of {drivers.length} drivers
//                       </td>
//                       <td className="px-6 py-4" />
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

// export default DriverManagement;

//update with real API integration when backend routes are ready

import React, { useState, useEffect, useMemo } from "react";

// ── Helpers ────────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-blue-50 border-2 border-blue-100 ${className}`}
  />
);

// API configuration
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Main component ─────────────────────────────────────────────────────────
const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  // Tracks which driver ID is currently being actioned
  const [actioning, setActioning] = useState(null);

  // ── Fetch Drivers ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/drivers`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load drivers");
        }

        const data = await res.json();
        setDrivers(data.drivers);
      } catch (err) {
        setError(err.message || "Failed to load drivers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // ── Verify / Unverify ─────────────────────────────────────────────────────
  // const handleToggleVerification = async (driverId, currentVerified) => {
  //   const newVerified = !currentVerified;
  //   setActioning(driverId);

  //   try {
  //     const res = await fetch(
  //       `${API_BASE_URL}/admin/drivers/${driverId}/verify`,
  //       {
  //         method: "PATCH",
  //         headers: getAuthHeaders(),
  //         body: JSON.stringify({ isVerified: newVerified }),
  //       },
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to update verification");
  //     }

  //     // Optimistic update — no page reload needed
  //     setDrivers((prev) =>
  //       prev.map((d) =>
  //         d._id === driverId ? { ...d, isVerified: newVerified } : d,
  //       ),
  //     );
  //   } catch (err) {
  //     setError(
  //       err.message ||
  //         "Failed to update driver verification. Please try again.",
  //     );
  //   } finally {
  //     setActioning(null);
  //   }
  // };

  const handleToggleVerification = async (driverId, currentVerified) => {
    if (!driverId) {
      console.error("Invalid driverId:", driverId);
      return;
    }

    const newVerified = !currentVerified;
    setActioning(driverId);

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/drivers/${driverId}/verify`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({ isVerified: newVerified }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update verification");
      }

      // ✅ Optimistic update
      setDrivers((prev) =>
        prev.map((d) =>
          (d._id || d.id) === driverId ? { ...d, isVerified: newVerified } : d,
        ),
      );
    } catch (err) {
      setError(
        err.message ||
          "Failed to update driver verification. Please try again.",
      );
    } finally {
      setActioning(null);
    }
  };

  // ── Filter + search ───────────────────────────────────────────────────────
  const displayed = useMemo(() => {
    let result = drivers;
    if (filter === "verified") result = result.filter((d) => d.isVerified);
    if (filter === "unverified") result = result.filter((d) => !d.isVerified);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.fullName?.toLowerCase().includes(q) ||
          d.email?.toLowerCase().includes(q) ||
          d.licenseNumber?.toLowerCase().includes(q) ||
          d.place?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [drivers, filter, search]);

  // ── Summary counts ────────────────────────────────────────────────────────
  const verifiedCount = drivers.filter((d) => d.isVerified).length;
  const unverifiedCount = drivers.filter((d) => !d.isVerified).length;

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && drivers.length === 0) {
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
            Driver <span className="text-blue-600">Management</span>
          </h1>

          {/* Search + filter row */}
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, license or place..."
              className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-blue-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
            />
            <div className="flex gap-2">
              {[
                { key: "all", label: `All (${drivers.length})` },
                { key: "verified", label: `Verified (${verifiedCount})` },
                { key: "unverified", label: `Unverified (${unverifiedCount})` },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-3 font-bold uppercase text-sm border-4 transition-all whitespace-nowrap
                    ${
                      filter === f.key
                        ? "bg-blue-600 text-white border-blue-950 shadow-[3px_3px_0px_rgba(23,37,84,1)]"
                        : "bg-white text-emerald-950 border-emerald-200 hover:border-blue-400"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Unverified alert — mirrors AdminDashboard alert */}
        {!loading && unverifiedCount > 0 && filter !== "verified" && (
          <div className="bg-amber-50 border-4 border-amber-400 p-4 mb-6 flex items-center gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <p className="font-bold text-amber-800 text-sm">
              {unverifiedCount} driver{unverifiedCount !== 1 ? "s" : ""} pending
              verification — unverified drivers cannot receive pickup requests.
            </p>
          </div>
        )}

        {/* Inline error (post-load action failure) */}
        {error && drivers.length > 0 && (
          <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
            <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && displayed.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No drivers found
            </p>
            <p className="text-emerald-500 font-medium">
              {search ? `No results for "${search}"` : `No ${filter} drivers`}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-blue-600 font-bold underline underline-offset-2 hover:no-underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-100 border-b-4 border-emerald-950">
                  <tr>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Driver
                    </th>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      License No.
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Place
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Pickups
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right  text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-emerald-100">
                  {loading
                    ? [...Array(4)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 space-y-2">
                            <Skeleton className="h-4 w-32 rounded" />
                            <Skeleton className="h-3 w-40 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-36 rounded" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-20 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-8 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-6 w-20 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Skeleton className="h-9 w-24 rounded ml-auto" />
                          </td>
                        </tr>
                      ))
                    : displayed.map((driver) => (
                        <tr
                          key={driver._id}
                          className={`transition-colors ${!driver.isVerified ? "bg-amber-50 hover:bg-amber-100" : "hover:bg-emerald-50"}`}
                        >
                          {/* Name + email */}
                          <td className="px-6 py-4">
                            <p className="font-extrabold text-emerald-950">
                              {driver.fullName}
                            </p>
                            <p className="text-sm text-emerald-500 font-medium">
                              {driver.email}
                            </p>
                          </td>

                          {/* License number */}
                          <td className="px-6 py-4">
                            <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 border-2 border-blue-200 px-2 py-0.5">
                              {driver.licenseNumber}
                            </span>
                          </td>

                          {/* Place */}
                          <td className="px-6 py-4 text-center text-emerald-700 font-medium text-sm">
                            {driver.place}
                          </td>

                          {/* Completed pickups */}
                          <td className="px-6 py-4 text-center font-extrabold text-emerald-800">
                            {driver.completedPickups}
                          </td>

                          {/* Verification status badge */}
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 font-bold uppercase text-xs border-4
                              ${
                                driver.isVerified
                                  ? "bg-emerald-600 text-white border-emerald-950"
                                  : "bg-amber-500  text-white border-amber-800"
                              }`}
                            >
                              {driver.isVerified ? "Verified" : "Pending"}
                            </span>
                          </td>

                          {/* Verify / Unverify */}
                          {/* <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                handleToggleVerification(
                                  driver._id,
                                  driver.isVerified,
                                )
                              }
                              disabled={actioning === driver._id}
                              className={`px-4 py-2 font-bold text-sm uppercase border-4 transition-all flex items-center gap-2 ml-auto
                                ${
                                  actioning === driver._id
                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                    : driver.isVerified
                                      ? "bg-red-50 text-red-600 border-red-300 hover:border-red-600 hover:shadow-[3px_3px_0px_rgba(239,68,68,0.3)]"
                                      : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                                }`}
                            >
                              {actioning === driver._id ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                                  Wait
                                </>
                              ) : driver.isVerified ? (
                                "Unverify"
                              ) : (
                                "✓ Verify"
                              )}
                            </button>
                          </td> */}
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                handleToggleVerification(
                                  driver._id || driver.id, // ✅ fallback fix
                                  driver.isVerified,
                                )
                              }
                              disabled={actioning === (driver._id || driver.id)}
                              className={`px-4 py-2 font-bold text-sm uppercase border-4 transition-all flex items-center gap-2 ml-auto
      ${
        actioning === (driver._id || driver.id)
          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          : driver.isVerified
            ? "bg-red-50 text-red-600 border-red-300 hover:border-red-600 hover:shadow-[3px_3px_0px_rgba(239,68,68,0.3)]"
            : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
      }`}
                            >
                              {actioning === (driver._id || driver.id) ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                                  Wait
                                </>
                              ) : driver.isVerified ? (
                                "Unverify"
                              ) : (
                                "✓ Verify"
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>

                {/* Footer */}
                {!loading && displayed.length > 0 && (
                  <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
                      >
                        Showing {displayed.length} of {drivers.length} drivers
                      </td>
                      <td className="px-6 py-4" />
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

export default DriverManagement;
