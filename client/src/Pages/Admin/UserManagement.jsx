// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";

// // ── Helpers ────────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
//   />
// );

// // ── Main component ─────────────────────────────────────────────────────────
// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   // Tracks which user ID is currently being toggled
//   const [toggling, setToggling] = useState(null);

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/admin/users
//   // Response: { users: [{ id, fullName, email, location, pickups, points, status }] }
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/admin/users", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load users");
//         // const data = await res.json();
//         // setUsers(data.users);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 900));
//         setUsers([
//           {
//             id: "u1",
//             fullName: "John Doe",
//             email: "john@example.com",
//             location: "Ernakulam",
//             pickups: 12,
//             points: 2450,
//             status: "active",
//           },
//           {
//             id: "u2",
//             fullName: "Sarah Smith",
//             email: "sarah@example.com",
//             location: "Thrissur",
//             pickups: 8,
//             points: 1200,
//             status: "active",
//           },
//           {
//             id: "u3",
//             fullName: "Mike Johnson",
//             email: "mike@example.com",
//             location: "Kollam",
//             pickups: 0,
//             points: 0,
//             status: "inactive",
//           },
//           {
//             id: "u4",
//             fullName: "Lisa Brown",
//             email: "lisa@example.com",
//             location: "Ernakulam",
//             pickups: 25,
//             points: 5600,
//             status: "active",
//           },
//           {
//             id: "u5",
//             fullName: "Priya Nair",
//             email: "priya@example.com",
//             location: "Kozhikode",
//             pickups: 4,
//             points: 380,
//             status: "active",
//           },
//           {
//             id: "u6",
//             fullName: "Arun Das",
//             email: "arun@example.com",
//             location: "Kollam",
//             pickups: 0,
//             points: 0,
//             status: "inactive",
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load users. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // ── Toggle active/inactive ────────────────────────────────────────────────
//   // PRODUCTION: PATCH /api/admin/users/:id/status
//   // Body: { status: "active" | "inactive" }
//   const handleToggleStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === "active" ? "inactive" : "active";
//     setToggling(userId);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch(`/api/admin/users/${userId}/status`, {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({ status: newStatus }),
//       // });
//       // if (!res.ok) throw new Error("Failed to update status");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 600));

//       // Optimistic update — no page reload needed
//       setUsers((prev) =>
//         prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)),
//       );
//     } catch {
//       setError("Failed to update user status. Please try again.");
//     } finally {
//       setToggling(null);
//     }
//   };

//   // ── Filter + search ───────────────────────────────────────────────────────
//   const displayed = useMemo(() => {
//     let result =
//       filter === "all" ? users : users.filter((u) => u.status === filter);
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter(
//         (u) =>
//           u.fullName.toLowerCase().includes(q) ||
//           u.email.toLowerCase().includes(q) ||
//           u.location.toLowerCase().includes(q),
//       );
//     }
//     return result;
//   }, [users, filter, search]);

//   // ── Summary counts ────────────────────────────────────────────────────────
//   const activeCount = users.filter((u) => u.status === "active").length;
//   const inactiveCount = users.filter((u) => u.status === "inactive").length;

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error && users.length === 0) {
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
//             User <span className="text-emerald-600">Management</span>
//           </h1>

//           {/* Search + filter row */}
//           <div className="flex flex-wrap gap-3 items-center">
//             {/* Search */}
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name, email or location..."
//               className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
//             />

//             {/* Filter tabs */}
//             <div className="flex gap-2">
//               {[
//                 { key: "all", label: `All (${users.length})` },
//                 { key: "active", label: `Active (${activeCount})` },
//                 { key: "inactive", label: `Inactive (${inactiveCount})` },
//               ].map((f) => (
//                 <button
//                   key={f.key}
//                   onClick={() => setFilter(f.key)}
//                   className={`px-4 py-3 font-bold uppercase text-sm border-4 transition-all whitespace-nowrap
//                     ${
//                       filter === f.key
//                         ? "bg-emerald-600 text-white border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)]"
//                         : "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-400"
//                     }`}
//                 >
//                   {f.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Inline error (post-load action failure) */}
//         {error && users.length > 0 && (
//           <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//             <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//           </div>
//         )}

//         {/* Empty state — before table, not after */}
//         {!loading && displayed.length === 0 ? (
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl block mb-4">🔍</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               No users found
//             </p>
//             <p className="text-emerald-500 font-medium">
//               {search ? `No results for "${search}"` : `No ${filter} users`}
//             </p>
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="mt-4 text-emerald-600 font-bold underline underline-offset-2 hover:no-underline"
//               >
//                 Clear search
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
//                       User
//                     </th>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Location
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Pickups
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Points
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
//                     ? [...Array(5)].map((_, i) => (
//                         <tr key={i}>
//                           <td className="px-6 py-4 space-y-2">
//                             <Skeleton className="h-4 w-32 rounded" />
//                             <Skeleton className="h-3 w-40 rounded" />
//                           </td>
//                           <td className="px-6 py-4">
//                             <Skeleton className="h-4 w-24 rounded" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-8 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-14 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-6 w-16 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <Skeleton className="h-9 w-24 rounded ml-auto" />
//                           </td>
//                         </tr>
//                       ))
//                     : displayed.map((user) => (
//                         <tr
//                           key={user.id}
//                           className="hover:bg-emerald-50 transition-colors"
//                         >
//                           {/* Name + email — FIX: phone removed */}
//                           <td className="px-6 py-4">
//                             <p className="font-extrabold text-emerald-950">
//                               {user.fullName}
//                             </p>
//                             <p className="text-sm text-emerald-500 font-medium">
//                               {user.email}
//                             </p>
//                           </td>

//                           {/* Location — replaces phone, directly relevant for admin oversight */}
//                           <td className="px-6 py-4 text-emerald-700 font-medium text-sm">
//                             {user.location}
//                           </td>

//                           {/* Pickups */}
//                           <td className="px-6 py-4 text-center font-extrabold text-emerald-800">
//                             {user.pickups}
//                           </td>

//                           {/* Points — FIX: formatted */}
//                           <td className="px-6 py-4 text-center font-extrabold text-emerald-600">
//                             {user.points.toLocaleString()}
//                           </td>

//                           {/* Status badge — FIX: border added */}
//                           <td className="px-6 py-4 text-center">
//                             <span
//                               className={`px-3 py-1 font-bold uppercase text-xs border-4
//                               ${
//                                 user.status === "active"
//                                   ? "bg-emerald-600 text-white border-emerald-950"
//                                   : "bg-red-500    text-white border-red-900"
//                               }`}
//                             >
//                               {user.status}
//                             </span>
//                           </td>

//                           {/* Toggle action — FIX: real API call with spinner */}
//                           <td className="px-6 py-4 text-right">
//                             <button
//                               onClick={() =>
//                                 handleToggleStatus(user.id, user.status)
//                               }
//                               disabled={toggling === user.id}
//                               className={`px-4 py-2 font-bold text-sm uppercase border-4 transition-all flex items-center gap-2 ml-auto
//                                 ${
//                                   toggling === user.id
//                                     ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                                     : user.status === "active"
//                                       ? "bg-red-50 text-red-600 border-red-300 hover:border-red-600 hover:shadow-[3px_3px_0px_rgba(239,68,68,0.3)]"
//                                       : "bg-emerald-50 text-emerald-700 border-emerald-300 hover:border-emerald-600 hover:shadow-[3px_3px_0px_rgba(6,78,59,0.3)]"
//                                 }`}
//                             >
//                               {toggling === user.id ? (
//                                 <>
//                                   <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                                   Wait
//                                 </>
//                               ) : user.status === "active" ? (
//                                 "Deactivate"
//                               ) : (
//                                 "Activate"
//                               )}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                 </tbody>

//                 {/* Footer row */}
//                 {!loading && displayed.length > 0 && (
//                   <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
//                     <tr>
//                       <td
//                         colSpan={5}
//                         className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
//                       >
//                         Showing {displayed.length} of {users.length} users
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

// export default UserManagement;
//updated with api integeration with backend
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// ── Helpers ────────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

// API configuration
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Main component ─────────────────────────────────────────────────────────
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  // Tracks which user ID is currently being toggled
  const [toggling, setToggling] = useState(null);

  // ── Fetch Users ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/users`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load users");
        }

        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        setError(err.message || "Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ── Toggle active/inactive ────────────────────────────────────────────────
  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setToggling(userId);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      // Optimistic update — no page reload needed
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)),
      );
    } catch (err) {
      setError(
        err.message || "Failed to update user status. Please try again.",
      );
    } finally {
      setToggling(null);
    }
  };

  // ── Filter + search ───────────────────────────────────────────────────────
  const displayed = useMemo(() => {
    let result =
      filter === "all" ? users : users.filter((u) => u.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.fullName?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.location?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [users, filter, search]);

  // ── Summary counts ────────────────────────────────────────────────────────
  const activeCount = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.filter((u) => u.status === "inactive").length;

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && users.length === 0) {
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
            User <span className="text-emerald-600">Management</span>
          </h1>

          {/* Search + filter row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or location..."
              className="flex-1 min-w-48 px-4 py-3 border-4 border-emerald-200 focus:border-emerald-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
            />

            {/* Filter tabs */}
            <div className="flex gap-2">
              {[
                { key: "all", label: `All (${users.length})` },
                { key: "active", label: `Active (${activeCount})` },
                { key: "inactive", label: `Inactive (${inactiveCount})` },
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
        </div>

        {/* Inline error (post-load action failure) */}
        {error && users.length > 0 && (
          <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
            <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Empty state — before table, not after */}
        {!loading && displayed.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              No users found
            </p>
            <p className="text-emerald-500 font-medium">
              {search ? `No results for "${search}"` : `No ${filter} users`}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-emerald-600 font-bold underline underline-offset-2 hover:no-underline"
              >
                Clear search
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
                      User
                    </th>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Location
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Pickups
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Points
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
                    ? [...Array(5)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 space-y-2">
                            <Skeleton className="h-4 w-32 rounded" />
                            <Skeleton className="h-3 w-40 rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-24 rounded" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-8 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-14 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-6 w-16 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Skeleton className="h-9 w-24 rounded ml-auto" />
                          </td>
                        </tr>
                      ))
                    : displayed.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          {/* Name + email */}
                          <td className="px-6 py-4">
                            <p className="font-extrabold text-emerald-950">
                              {user.fullName}
                            </p>
                            <p className="text-sm text-emerald-500 font-medium">
                              {user.email}
                            </p>
                          </td>

                          {/* Location */}
                          <td className="px-6 py-4 text-emerald-700 font-medium text-sm">
                            {user.location}
                          </td>

                          {/* Pickups */}
                          <td className="px-6 py-4 text-center font-extrabold text-emerald-800">
                            {user.pickups}
                          </td>

                          {/* Points */}
                          <td className="px-6 py-4 text-center font-extrabold text-emerald-600">
                            {user.points?.toLocaleString()}
                          </td>

                          {/* Status badge */}
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 font-bold uppercase text-xs border-4
                              ${
                                user.status === "active"
                                  ? "bg-emerald-600 text-white border-emerald-950"
                                  : "bg-red-500    text-white border-red-900"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>

                          {/* Toggle action */}
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                handleToggleStatus(user.id, user.status)
                              }
                              disabled={toggling === user.id}
                              className={`px-4 py-2 font-bold text-sm uppercase border-4 transition-all flex items-center gap-2 ml-auto
                                ${
                                  toggling === user.id
                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                    : user.status === "active"
                                      ? "bg-red-50 text-red-600 border-red-300 hover:border-red-600 hover:shadow-[3px_3px_0px_rgba(239,68,68,0.3)]"
                                      : "bg-emerald-50 text-emerald-700 border-emerald-300 hover:border-emerald-600 hover:shadow-[3px_3px_0px_rgba(6,78,59,0.3)]"
                                }`}
                            >
                              {toggling === user.id ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                                  Wait
                                </>
                              ) : user.status === "active" ? (
                                "Deactivate"
                              ) : (
                                "Activate"
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>

                {/* Footer row */}
                {!loading && displayed.length > 0 && (
                  <tfoot className="bg-emerald-50 border-t-4 border-emerald-950">
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
                      >
                        Showing {displayed.length} of {users.length} users
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

export default UserManagement;
