// import React, { useState, useEffect, useRef, useMemo } from "react";

// // ── Skeleton ───────────────────────────────────────────────────────────────
// const Skeleton = ({ className = "" }) => (
//   <div
//     className={`animate-pulse bg-purple-50 border-2 border-purple-100 ${className}`}
//   />
// );

// const CATEGORIES = [
//   "Accessories",
//   "Clothing",
//   "Home",
//   "Fitness",
//   "Electronics",
// ];

// const EMPTY_FORM = {
//   name: "",
//   points: "",
//   stock: "",
//   category: "Accessories",
//   description: "",
//   imageUrl: "", // URL returned from POST /api/admin/products/upload
//   isActive: true,
// };

// const LOW_STOCK = 5;

// // ── Main component ─────────────────────────────────────────────────────────
// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({ ...EMPTY_FORM });
//   const [formErrors, setFormErrors] = useState({});
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [deleting, setDeleting] = useState(null);
//   const [toggling, setToggling] = useState(null);
//   const [toast, setToast] = useState(null);

//   const fileInputRef = useRef(null);

//   // ── Toast helper ──────────────────────────────────────────────────────────
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 2500);
//   };

//   // ── Fetch products ────────────────────────────────────────────────────────
//   // PRODUCTION: GET /api/admin/products
//   // Response: { products: [{ id, name, points, stock, category, description, imageUrl, isActive }] }
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ── PRODUCTION (uncomment when API is ready) ──
//         // const res = await fetch("/api/admin/products", {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         // });
//         // if (!res.ok) throw new Error("Failed to load products");
//         // const data = await res.json();
//         // setProducts(data.products);

//         // ── SIMULATION (remove when API is ready) ──
//         await new Promise((r) => setTimeout(r, 700));
//         setProducts([
//           {
//             id: "p1",
//             name: "Recycled Backpack",
//             points: 500,
//             stock: 10,
//             category: "Accessories",
//             description: "Made from 35 recycled plastic bottles.",
//             imageUrl: "",
//             isActive: true,
//           },
//           {
//             id: "p2",
//             name: "Organic Cotton T-Shirt",
//             points: 350,
//             stock: 25,
//             category: "Clothing",
//             description: "GOTS-certified organic cotton.",
//             imageUrl: "",
//             isActive: true,
//           },
//           {
//             id: "p3",
//             name: "Bamboo Toothbrush Set",
//             points: 150,
//             stock: 50,
//             category: "Home",
//             description: "Biodegradable bamboo handles.",
//             imageUrl: "",
//             isActive: true,
//           },
//           {
//             id: "p4",
//             name: "Eco Yoga Mat",
//             points: 800,
//             stock: 3,
//             category: "Fitness",
//             description: "Natural rubber yoga mat.",
//             imageUrl: "",
//             isActive: true,
//           },
//           {
//             id: "p5",
//             name: "Solar Power Bank",
//             points: 1200,
//             stock: 0,
//             category: "Electronics",
//             description: "10,000mAh solar-powered charger.",
//             imageUrl: "",
//             isActive: false,
//           },
//         ]);
//         // ── END SIMULATION ──
//       } catch {
//         setError("Failed to load products. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // ── Image upload → server → returns URL ───────────────────────────────────
//   // PRODUCTION: POST /api/admin/products/upload  (multipart/form-data, field: "image")
//   // Response: { imageUrl: "/uploads/products/1748291234-recycled-backpack.jpg" }
//   // Backend serves /uploads as static: app.use("/uploads", express.static("uploads"))
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       setFormErrors((prev) => ({ ...prev, image: "Image must be under 2MB." }));
//       return;
//     }
//     if (
//       !["image/jpeg", "image/png", "image/webp"].includes(
//         file.mimetype ?? file.type,
//       )
//     ) {
//       setFormErrors((prev) => ({
//         ...prev,
//         image: "Only JPG, PNG or WebP allowed.",
//       }));
//       return;
//     }

//     setUploading(true);
//     setFormErrors((prev) => ({ ...prev, image: undefined }));

//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const body = new FormData();
//       // body.append("image", file);
//       // const res = await fetch("/api/admin/products/upload", {
//       //   method: "POST",
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       //   body,
//       //   // Do NOT set Content-Type — browser sets it with the multipart boundary
//       // });
//       // if (!res.ok) throw new Error("Upload failed");
//       // const data = await res.json();
//       // setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));

//       // ── SIMULATION: create a temporary object URL for preview only ──
//       // In production the server returns a permanent URL; this blob URL
//       // is only valid for the current browser session and is NOT saved.
//       await new Promise((r) => setTimeout(r, 800));
//       const tempPreviewUrl = URL.createObjectURL(file);
//       setFormData((prev) => ({ ...prev, imageUrl: tempPreviewUrl }));
//       // ── END SIMULATION ──
//     } catch {
//       setFormErrors((prev) => ({
//         ...prev,
//         image: "Upload failed. Please try again.",
//       }));
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ── Form validation ───────────────────────────────────────────────────────
//   const validate = () => {
//     const e = {};
//     if (!formData.name.trim()) e.name = "Product name is required.";
//     if (!formData.points || parseInt(formData.points) < 1)
//       e.points = "Points must be at least 1.";
//     if (formData.stock === "" || parseInt(formData.stock) < 0)
//       e.stock = "Stock must be 0 or more.";
//     setFormErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // ── Save product (add or update) ──────────────────────────────────────────
//   // PRODUCTION:
//   //   Add:  POST  /api/admin/products       body: { name, points, stock, category, description, imageUrl, isActive }
//   //   Edit: PATCH /api/admin/products/:id   body: same fields
//   // Response: { product: { id, ...fields } }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setSaving(true);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const url    = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
//       // const method = editingId ? "PATCH" : "POST";
//       // const res = await fetch(url, {
//       //   method,
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({
//       //     name:        formData.name,
//       //     points:      parseInt(formData.points),
//       //     stock:       parseInt(formData.stock),
//       //     category:    formData.category,
//       //     description: formData.description,
//       //     imageUrl:    formData.imageUrl,
//       //     isActive:    formData.isActive,
//       //   }),
//       // });
//       // if (!res.ok) throw new Error("Failed to save product");
//       // const data = await res.json();
//       // if (editingId) {
//       //   setProducts((prev) => prev.map((p) => p.id === editingId ? data.product : p));
//       // } else {
//       //   setProducts((prev) => [...prev, data.product]);
//       // }

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 700));
//       const payload = {
//         ...formData,
//         points: parseInt(formData.points),
//         stock: parseInt(formData.stock),
//       };
//       if (editingId) {
//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === editingId ? { ...payload, id: editingId } : p,
//           ),
//         );
//       } else {
//         setProducts((prev) => [...prev, { ...payload, id: `p${Date.now()}` }]);
//       }
//       // ── END SIMULATION ──

//       showToast(editingId ? "Product updated" : "Product added");
//       closeModal();
//     } catch {
//       setError("Failed to save product. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Toggle isActive ───────────────────────────────────────────────────────
//   // PRODUCTION: PATCH /api/admin/products/:id  body: { isActive: bool }
//   const handleToggleActive = async (productId, current) => {
//     setToggling(productId);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch(`/api/admin/products/${productId}`, {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       //   body: JSON.stringify({ isActive: !current }),
//       // });
//       // if (!res.ok) throw new Error("Failed to update");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 400));

//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === productId ? { ...p, isActive: !current } : p,
//         ),
//       );
//       showToast(`Product ${!current ? "activated" : "deactivated"}`);
//     } catch {
//       setError("Failed to update product status.");
//     } finally {
//       setToggling(null);
//     }
//   };

//   // ── Delete ────────────────────────────────────────────────────────────────
//   // PRODUCTION: DELETE /api/admin/products/:id
//   // Note: also deletes the image file from /uploads/products/ on the server
//   const handleDelete = async (productId) => {
//     setDeleting(productId);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const res = await fetch(`/api/admin/products/${productId}`, {
//       //   method: "DELETE",
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });
//       // if (!res.ok) throw new Error("Failed to delete");

//       // ── SIMULATION ──
//       await new Promise((r) => setTimeout(r, 500));

//       setProducts((prev) => prev.filter((p) => p.id !== productId));
//       setConfirmDelete(null);
//       showToast("Product deleted");
//     } catch {
//       setError("Failed to delete product.");
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const openAdd = () => {
//     setEditingId(null);
//     setFormData({ ...EMPTY_FORM });
//     setFormErrors({});
//     setShowModal(true);
//   };

//   const openEdit = (product) => {
//     setEditingId(product.id);
//     setFormData({
//       ...product,
//       points: String(product.points),
//       stock: String(product.stock),
//     });
//     setFormErrors({});
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingId(null);
//     setFormData({ ...EMPTY_FORM });
//     setFormErrors({});
//   };

//   // ── Search ────────────────────────────────────────────────────────────────
//   const displayed = useMemo(() => {
//     if (!search.trim()) return products;
//     const q = search.toLowerCase();
//     return products.filter(
//       (p) =>
//         p.name.toLowerCase().includes(q) ||
//         p.category.toLowerCase().includes(q),
//     );
//   }, [products, search]);

//   const lowStockCount = products.filter(
//     (p) => p.stock > 0 && p.stock <= LOW_STOCK,
//   ).length;
//   const outOfStock = products.filter((p) => p.stock === 0).length;

//   // ── Error state ───────────────────────────────────────────────────────────
//   if (error && products.length === 0) {
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
//       <div className="max-w-6xl mx-auto">
//         {/* Toast */}
//         {toast && (
//           <div className="fixed top-6 right-6 z-50 bg-purple-600 text-white border-4 border-purple-950 shadow-[6px_6px_0px_rgba(88,28,135,1)] px-6 py-4 font-bold flex items-center gap-3">
//             <span>✅</span> {toast}
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
//           <div>
//             <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-1">
//               Product <span className="text-purple-600">Management</span>
//             </h1>
//             {!loading && (
//               <div className="flex gap-3 mt-2">
//                 {outOfStock > 0 && (
//                   <span className="text-xs font-bold text-red-600 bg-red-50 border-2 border-red-300 px-2 py-1">
//                     ⚠️ {outOfStock} out of stock
//                   </span>
//                 )}
//                 {lowStockCount > 0 && (
//                   <span className="text-xs font-bold text-amber-700 bg-amber-50 border-2 border-amber-300 px-2 py-1">
//                     ⚡ {lowStockCount} low stock (≤{LOW_STOCK})
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>
//           <button
//             onClick={openAdd}
//             className="px-6 py-3 bg-purple-600 text-white font-bold uppercase tracking-wider border-4 border-purple-950 shadow-[4px_4px_0px_rgba(88,28,135,1)] hover:shadow-[2px_2px_0px_rgba(88,28,135,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//           >
//             ➕ Add Product
//           </button>
//         </div>

//         {/* Search */}
//         <div className="mb-5">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search by product name or category..."
//             className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-purple-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
//           />
//         </div>

//         {/* Inline error */}
//         {error && products.length > 0 && (
//           <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
//             <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && displayed.length === 0 ? (
//           <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//             <span className="text-6xl block mb-4">🛍️</span>
//             <p className="text-2xl font-extrabold text-emerald-950 mb-2">
//               {search ? "No products found" : "No products yet"}
//             </p>
//             <p className="text-emerald-500 font-medium mb-6">
//               {search
//                 ? `No results for "${search}"`
//                 : "Add your first eco-friendly product to the shop."}
//             </p>
//             {search ? (
//               <button
//                 onClick={() => setSearch("")}
//                 className="text-purple-600 font-bold underline underline-offset-2"
//               >
//                 Clear search
//               </button>
//             ) : (
//               <button
//                 onClick={openAdd}
//                 className="px-6 py-3 bg-purple-600 text-white font-bold uppercase tracking-wider border-4 border-purple-950 shadow-[4px_4px_0px_rgba(88,28,135,1)] hover:shadow-[2px_2px_0px_rgba(88,28,135,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//               >
//                 ➕ Add First Product
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-purple-100 border-b-4 border-emerald-950">
//                   <tr>
//                     <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Product
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Category
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Points
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Stock
//                     </th>
//                     <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-right  text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y-4 divide-emerald-100">
//                   {loading
//                     ? [...Array(4)].map((_, i) => (
//                         <tr key={i}>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-3">
//                               <Skeleton className="w-12 h-12 flex-shrink-0" />
//                               <div className="space-y-2">
//                                 <Skeleton className="h-4 w-36 rounded" />
//                                 <Skeleton className="h-3 w-24 rounded" />
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-20 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-14 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-4 w-10 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <Skeleton className="h-6 w-16 rounded mx-auto" />
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <div className="flex gap-2 justify-end">
//                               <Skeleton className="h-8 w-12 rounded" />
//                               <Skeleton className="h-8 w-12 rounded" />
//                               <Skeleton className="h-8 w-16 rounded" />
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     : displayed.map((product) => (
//                         <tr
//                           key={product.id}
//                           className={`transition-colors ${!product.isActive ? "bg-gray-50 opacity-70" : "hover:bg-purple-50"}`}
//                         >
//                           {/* Product image + name */}
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-12 h-12 bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
//                                 {product.imageUrl ? (
//                                   <img
//                                     src={product.imageUrl}
//                                     alt={product.name}
//                                     className="w-full h-full object-cover"
//                                   />
//                                 ) : (
//                                   <span className="text-xl">🛍️</span>
//                                 )}
//                               </div>
//                               <div>
//                                 <p
//                                   className={`font-extrabold ${product.isActive ? "text-emerald-950" : "text-gray-400"}`}
//                                 >
//                                   {product.name}
//                                 </p>
//                                 {product.description && (
//                                   <p className="text-xs text-emerald-500 font-medium max-w-48 truncate">
//                                     {product.description}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </td>

//                           {/* Category */}
//                           <td className="px-6 py-4 text-center text-emerald-700 font-medium text-sm">
//                             {product.category}
//                           </td>

//                           {/* Points */}
//                           <td className="px-6 py-4 text-center font-extrabold text-purple-600">
//                             {product.points.toLocaleString()}
//                           </td>

//                           {/* Stock */}
//                           <td className="px-6 py-4 text-center">
//                             <span
//                               className={`font-extrabold text-sm
//                               ${
//                                 product.stock === 0
//                                   ? "text-red-500"
//                                   : product.stock <= LOW_STOCK
//                                     ? "text-amber-600"
//                                     : "text-emerald-800"
//                               }`}
//                             >
//                               {product.stock === 0 ? "Out" : product.stock}
//                             </span>
//                             {product.stock > 0 &&
//                               product.stock <= LOW_STOCK && (
//                                 <span className="block text-xs text-amber-500 font-bold">
//                                   Low
//                                 </span>
//                               )}
//                           </td>

//                           {/* Status badge */}
//                           <td className="px-6 py-4 text-center">
//                             <span
//                               className={`px-3 py-1 font-bold uppercase text-xs border-4
//                               ${
//                                 product.isActive
//                                   ? "bg-emerald-600 text-white border-emerald-950"
//                                   : "bg-gray-300    text-gray-600 border-gray-500"
//                               }`}
//                             >
//                               {product.isActive ? "Active" : "Hidden"}
//                             </span>
//                           </td>

//                           {/* Actions */}
//                           <td className="px-6 py-4 text-right">
//                             {confirmDelete === product.id ? (
//                               <div className="flex items-center gap-2 justify-end">
//                                 <span className="text-xs font-bold text-red-600">
//                                   Delete?
//                                 </span>
//                                 <button
//                                   onClick={() => handleDelete(product.id)}
//                                   disabled={deleting === product.id}
//                                   className="px-3 py-1 bg-red-500 text-white font-bold text-xs uppercase border-2 border-red-900 hover:bg-red-600 transition-colors flex items-center gap-1"
//                                 >
//                                   {deleting === product.id ? (
//                                     <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                                   ) : (
//                                     "Yes"
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => setConfirmDelete(null)}
//                                   className="px-3 py-1 bg-gray-100 text-gray-600 font-bold text-xs uppercase border-2 border-gray-300 hover:bg-gray-200 transition-colors"
//                                 >
//                                   No
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="flex items-center gap-2 justify-end">
//                                 <button
//                                   onClick={() =>
//                                     handleToggleActive(
//                                       product.id,
//                                       product.isActive,
//                                     )
//                                   }
//                                   disabled={toggling === product.id}
//                                   className={`px-3 py-1 font-bold text-xs uppercase border-2 transition-colors flex items-center gap-1
//                                     ${
//                                       toggling === product.id
//                                         ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                                         : product.isActive
//                                           ? "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
//                                           : "bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200"
//                                     }`}
//                                 >
//                                   {toggling === product.id ? (
//                                     <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//                                   ) : product.isActive ? (
//                                     "Hide"
//                                   ) : (
//                                     "Show"
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => openEdit(product)}
//                                   className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs uppercase border-2 border-blue-300 hover:bg-blue-100 transition-colors"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => setConfirmDelete(product.id)}
//                                   className="px-3 py-1 bg-red-50 text-red-600 font-bold text-xs uppercase border-2 border-red-300 hover:bg-red-100 transition-colors"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                 </tbody>

//                 {!loading && displayed.length > 0 && (
//                   <tfoot className="bg-purple-50 border-t-4 border-emerald-950">
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
//                       >
//                         {displayed.length} of {products.length} product
//                         {products.length !== 1 ? "s" : ""}
//                       </td>
//                     </tr>
//                   </tfoot>
//                 )}
//               </table>
//             </div>
//           </div>
//         )}

//         {/* ── Add/Edit Modal ── */}
//         {showModal && (
//           <div className="fixed inset-0 bg-emerald-950/60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white border-4 border-emerald-950 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//               {/* Modal header */}
//               <div className="p-6 border-b-4 border-emerald-100 flex justify-between items-center sticky top-0 bg-white z-10">
//                 <h2 className="text-2xl font-extrabold text-emerald-950">
//                   {editingId ? "Edit Product" : "Add New Product"}
//                 </h2>
//                 <button
//                   onClick={closeModal}
//                   className="w-8 h-8 bg-red-100 text-red-600 border-2 border-red-400 flex items-center justify-center hover:bg-red-200 transition-colors font-bold text-sm"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-5">
//                 {/* Image upload */}
//                 <div>
//                   <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                     Product Image
//                     <span className="ml-2 text-xs font-medium text-emerald-400 normal-case tracking-normal">
//                       (JPG/PNG/WebP, max 2MB, optional)
//                     </span>
//                   </label>
//                   <div className="flex items-center gap-4">
//                     {/* Preview */}
//                     <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
//                       {uploading ? (
//                         <div className="w-6 h-6 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
//                       ) : formData.imageUrl ? (
//                         <img
//                           src={formData.imageUrl}
//                           alt="Preview"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-3xl">🛍️</span>
//                       )}
//                     </div>
//                     <div className="flex-1 space-y-2">
//                       <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         disabled={uploading}
//                         className={`w-full py-2 font-bold uppercase tracking-wider text-sm border-4 transition-all
//                           ${
//                             uploading
//                               ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                               : "bg-white text-emerald-950 border-emerald-200 hover:border-purple-600"
//                           }`}
//                       >
//                         {uploading
//                           ? "Uploading..."
//                           : formData.imageUrl
//                             ? "📷 Change Image"
//                             : "📷 Upload Image"}
//                       </button>
//                       {formData.imageUrl && !uploading && (
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setFormData((prev) => ({ ...prev, imageUrl: "" }))
//                           }
//                           className="w-full py-1 text-red-500 font-bold text-xs uppercase tracking-wider border-2 border-red-200 hover:bg-red-50 transition-all"
//                         >
//                           ✕ Remove Image
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     accept="image/jpeg,image/png,image/webp"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                   {formErrors.image && (
//                     <p className="text-red-500 text-xs font-bold mt-1">
//                       ⚠️ {formErrors.image}
//                     </p>
//                   )}
//                   {/* Backend wiring note — visible only in dev, remove in production */}
//                   {!formData.imageUrl && (
//                     <p className="text-xs text-emerald-400 font-medium mt-1">
//                       Uploads to{" "}
//                       <span className="font-mono">
//                         POST /api/admin/products/upload
//                       </span>{" "}
//                       → served from{" "}
//                       <span className="font-mono">/uploads/products/</span>
//                     </p>
//                   )}
//                 </div>

//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className={`w-full px-4 py-3 border-4 font-bold text-emerald-950 focus:outline-none transition-all
//                       ${formErrors.name ? "border-red-400 bg-red-50" : "border-emerald-200 focus:border-purple-600"}`}
//                     placeholder="e.g. Recycled Backpack"
//                   />
//                   {formErrors.name && (
//                     <p className="text-red-500 text-xs font-bold mt-1">
//                       ⚠️ {formErrors.name}
//                     </p>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                     Description
//                     <span className="ml-2 text-xs font-medium text-emerald-400 normal-case tracking-normal">
//                       (optional)
//                     </span>
//                   </label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     rows={2}
//                     placeholder="Brief product description..."
//                     className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-purple-600 focus:outline-none font-medium text-emerald-950 resize-none placeholder:text-emerald-300"
//                   />
//                 </div>

//                 {/* Points + Stock */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                       Points Cost
//                     </label>
//                     <input
//                       type="number"
//                       required
//                       min="1"
//                       value={formData.points}
//                       onChange={(e) =>
//                         setFormData({ ...formData, points: e.target.value })
//                       }
//                       className={`w-full px-4 py-3 border-4 font-bold text-emerald-950 focus:outline-none transition-all
//                         ${formErrors.points ? "border-red-400 bg-red-50" : "border-emerald-200 focus:border-purple-600"}`}
//                       placeholder="500"
//                     />
//                     {formErrors.points && (
//                       <p className="text-red-500 text-xs font-bold mt-1">
//                         ⚠️ {formErrors.points}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                       Stock Qty
//                     </label>
//                     <input
//                       type="number"
//                       required
//                       min="0"
//                       value={formData.stock}
//                       onChange={(e) =>
//                         setFormData({ ...formData, stock: e.target.value })
//                       }
//                       className={`w-full px-4 py-3 border-4 font-bold text-emerald-950 focus:outline-none transition-all
//                         ${formErrors.stock ? "border-red-400 bg-red-50" : "border-emerald-200 focus:border-purple-600"}`}
//                       placeholder="10"
//                     />
//                     {formErrors.stock && (
//                       <p className="text-red-500 text-xs font-bold mt-1">
//                         ⚠️ {formErrors.stock}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                     Category
//                   </label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-purple-600 focus:outline-none font-bold text-emerald-950 bg-white"
//                   >
//                     {CATEGORIES.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* isActive toggle */}
//                 <div className="flex items-center justify-between bg-emerald-50 border-4 border-emerald-200 p-4">
//                   <div>
//                     <p className="font-bold text-emerald-950">
//                       Visible in shop
//                     </p>
//                     <p className="text-xs text-emerald-500 font-medium">
//                       Hidden products won't appear to users
//                     </p>
//                   </div>
//                   <div
//                     onClick={() =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         isActive: !prev.isActive,
//                       }))
//                     }
//                     className={`w-14 h-8 border-4 cursor-pointer transition-colors relative flex-shrink-0
//                       ${formData.isActive ? "bg-emerald-600 border-emerald-950" : "bg-gray-200 border-gray-400"}`}
//                   >
//                     <div
//                       className={`absolute top-0.5 w-5 h-5 bg-white border-2 border-emerald-950 transition-all
//                       ${formData.isActive ? "left-6" : "left-0.5"}`}
//                     />
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-4 pt-2">
//                   <button
//                     type="submit"
//                     disabled={saving || uploading}
//                     className={`flex-1 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
//                       ${
//                         saving || uploading
//                           ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
//                           : "bg-purple-600 text-white border-purple-950 shadow-[6px_6px_0px_rgba(88,28,135,1)] hover:shadow-[2px_2px_0px_rgba(88,28,135,1)] hover:translate-x-1 hover:translate-y-1"
//                       }`}
//                   >
//                     {saving ? (
//                       <>
//                         <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                         Saving...
//                       </>
//                     ) : uploading ? (
//                       <>
//                         <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
//                         Uploading image...
//                       </>
//                     ) : (
//                       "💾 Save"
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="flex-1 py-4 bg-white text-emerald-950 font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;

//updated with api integration

import React, { useState, useEffect, useRef, useMemo } from "react";

// ── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-purple-50 border-2 border-purple-100 ${className}`}
  />
);

const CATEGORIES = [
  "Accessories",
  "Clothing",
  "Home",
  "Fitness",
  "Electronics",
];

const EMPTY_FORM = {
  name: "",
  points: "",
  stock: "",
  category: "Accessories",
  description: "",
  imageUrl: "",
  isActive: true,
};

const LOW_STOCK = 5;

// API configuration
const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = (contentType = "application/json") => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  return headers;
};

// ── Main component ─────────────────────────────────────────────────────────
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [formErrors, setFormErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Fetch products ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/products`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error("Failed to load products");
        }

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message || "Failed to load products. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ── Image upload → server → returns URL ───────────────────────────────────
  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (file.size > 2 * 1024 * 1024) {
  //     setFormErrors((prev) => ({ ...prev, image: "Image must be under 2MB." }));
  //     return;
  //   }
  //   if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
  //     setFormErrors((prev) => ({
  //       ...prev,
  //       image: "Only JPG, PNG or WebP allowed.",
  //     }));
  //     return;
  //   }

  //   setUploading(true);
  //   setFormErrors((prev) => ({ ...prev, image: undefined }));

  //   try {
  //     const body = new FormData();
  //     body.append("image", file);

  //     const res = await fetch(`${API_BASE_URL}/admin/products/upload`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       body,
  //     });

  //     if (!res.ok) {
  //       throw new Error("Upload failed");
  //     }

  //     const data = await res.json();
  //     setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
  //   } catch {
  //     setFormErrors((prev) => ({
  //       ...prev,
  //       image: "Upload failed. Please try again.",
  //     }));
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  //new imgae upload

  // ── Image upload → server → returns URL ───────────────────────────────────
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, image: "Image must be under 2MB." }));
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        image: "Only JPG, PNG or WebP allowed.",
      }));
      return;
    }

    setUploading(true);
    setFormErrors((prev) => ({ ...prev, image: undefined }));

    try {
      const body = new FormData();
      body.append("image", file);

      const res = await fetch(`${API_BASE_URL}/admin/products/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await res.json();

      // Ensure the URL is absolute
      let imageUrl = data.imageUrl;
      if (imageUrl && !imageUrl.startsWith("http")) {
        // If relative URL is returned, make it absolute
        imageUrl = `${API_BASE_URL.replace("/api", "")}${imageUrl}`;
      }

      setFormData((prev) => ({ ...prev, imageUrl }));

      // Optional: Show success message
      console.log("Image uploaded successfully:", imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      setFormErrors((prev) => ({
        ...prev,
        image: error.message || "Upload failed. Please try again.",
      }));
    } finally {
      setUploading(false);
    }
  };

  // ── Form validation ───────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Product name is required.";
    if (!formData.points || parseInt(formData.points) < 1)
      e.points = "Points must be at least 1.";
    if (formData.stock === "" || parseInt(formData.stock) < 0)
      e.stock = "Stock must be 0 or more.";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save product (add or update) ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setError(null);

    try {
      const url = editingId
        ? `${API_BASE_URL}/admin/products/${editingId}`
        : `${API_BASE_URL}/admin/products`;
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: formData.name,
          points: parseInt(formData.points),
          stock: parseInt(formData.stock),
          category: formData.category,
          description: formData.description,
          imageUrl: formData.imageUrl,
          isActive: formData.isActive,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save product");
      }

      const data = await res.json();

      if (editingId) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? data.product : p)),
        );
      } else {
        setProducts((prev) => [...prev, data.product]);
      }

      showToast(editingId ? "Product updated" : "Product added");
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle isActive ───────────────────────────────────────────────────────
  const handleToggleActive = async (productId, current) => {
    setToggling(productId);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !current }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, isActive: !current } : p,
        ),
      );
      showToast(`Product ${!current ? "activated" : "deactivated"}`);
    } catch (err) {
      setError(err.message || "Failed to update product status.");
    } finally {
      setToggling(null);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (productId) => {
    setDeleting(productId);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setConfirmDelete(null);
      showToast("Product deleted");
    } catch (err) {
      setError(err.message || "Failed to delete product.");
    } finally {
      setDeleting(null);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM });
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      ...product,
      points: String(product.points),
      stock: String(product.stock),
    });
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ ...EMPTY_FORM });
    setFormErrors({});
  };

  // ── Search ────────────────────────────────────────────────────────────────
  const displayed = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q),
    );
  }, [products, search]);

  const lowStockCount = products.filter(
    (p) => p.stock > 0 && p.stock <= LOW_STOCK,
  ).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && products.length === 0) {
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
      <div className="max-w-6xl mx-auto">
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-purple-600 text-white border-4 border-purple-950 shadow-[6px_6px_0px_rgba(88,28,135,1)] px-6 py-4 font-bold flex items-center gap-3">
            <span>✅</span> {toast}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-1">
              Product <span className="text-purple-600">Management</span>
            </h1>
            {!loading && (
              <div className="flex gap-3 mt-2">
                {outOfStock > 0 && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 border-2 border-red-300 px-2 py-1">
                    ⚠️ {outOfStock} out of stock
                  </span>
                )}
                {lowStockCount > 0 && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border-2 border-amber-300 px-2 py-1">
                    ⚡ {lowStockCount} low stock (≤{LOW_STOCK})
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={openAdd}
            className="px-6 py-3 bg-purple-600 text-white font-bold uppercase tracking-wider border-4 border-purple-950 shadow-[4px_4px_0px_rgba(88,28,135,1)] hover:shadow-[2px_2px_0px_rgba(88,28,135,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            ➕ Add Product
          </button>
        </div>

        {/* Search */}
        <div className="mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or category..."
            className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-purple-600 focus:outline-none font-medium text-emerald-950 placeholder:text-emerald-300"
          />
        </div>

        {/* Inline error */}
        {error && products.length > 0 && (
          <div className="bg-red-50 border-4 border-red-300 p-3 mb-4">
            <p className="text-red-600 font-bold text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && displayed.length === 0 ? (
          <div className="text-center py-16 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <span className="text-6xl block mb-4">🛍️</span>
            <p className="text-2xl font-extrabold text-emerald-950 mb-2">
              {search ? "No products found" : "No products yet"}
            </p>
            <p className="text-emerald-500 font-medium mb-6">
              {search
                ? `No results for "${search}"`
                : "Add your first eco-friendly product to the shop."}
            </p>
            {search ? (
              <button
                onClick={() => setSearch("")}
                className="text-purple-600 font-bold underline underline-offset-2"
              >
                Clear search
              </button>
            ) : (
              <button
                onClick={openAdd}
                className="px-6 py-3 bg-purple-600 text-white font-bold uppercase tracking-wider border-4 border-purple-950 shadow-[4px_4px_0px_rgba(88,28,135,1)] hover:shadow-[2px_2px_0px_rgba(88,28,135,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                ➕ Add First Product
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_rgba(6,78,59,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-100 border-b-4 border-emerald-950">
                  <tr>
                    <th className="px-6 py-4 text-left   text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Product
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Category
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Points
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-center text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right  text-emerald-950 font-extrabold uppercase tracking-wider text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-4 divide-emerald-100">
                  {loading
                    ? [...Array(4)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Skeleton className="w-12 h-12 flex-shrink-0" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-36 rounded" />
                                <Skeleton className="h-3 w-24 rounded" />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-20 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-14 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-4 w-10 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Skeleton className="h-6 w-16 rounded mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <Skeleton className="h-8 w-12 rounded" />
                              <Skeleton className="h-8 w-12 rounded" />
                              <Skeleton className="h-8 w-16 rounded" />
                            </div>
                          </td>
                        </tr>
                      ))
                    : displayed.map((product) => (
                        <tr
                          key={product._id}
                          className={`transition-colors ${!product.isActive ? "bg-gray-50 opacity-70" : "hover:bg-purple-50"}`}
                        >
                          {/* Product image + name */}
                          {/* <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-xl">🛍️</span>
                                )}
                              </div>
                              <div>
                                <p
                                  className={`font-extrabold ${product.isActive ? "text-emerald-950" : "text-gray-400"}`}
                                >
                                  {product.name}
                                </p>
                                {product.description && (
                                  <p className="text-xs text-emerald-500 font-medium max-w-48 truncate">
                                    {product.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td> */}

                          {/* updateted product image + name*/}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-sm">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      // Fallback if image fails to load
                                      e.target.onerror = null; // Prevent infinite loop
                                      e.target.style.display = "none";
                                      e.target.parentElement.innerHTML =
                                        '<span class="text-xl">🛍️</span>';
                                    }}
                                    loading="lazy"
                                  />
                                ) : (
                                  <span className="text-xl">🛍️</span>
                                )}
                              </div>
                              <div>
                                <p
                                  className={`font-extrabold ${product.isActive ? "text-emerald-950" : "text-gray-400"}`}
                                >
                                  {product.name}
                                </p>
                                {product.description && (
                                  <p className="text-xs text-emerald-500 font-medium max-w-48 truncate">
                                    {product.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="px-6 py-4 text-center text-emerald-700 font-medium text-sm">
                            {product.category}
                          </td>

                          {/* Points */}
                          <td className="px-6 py-4 text-center font-extrabold text-purple-600">
                            {product.points?.toLocaleString()}
                          </td>

                          {/* Stock */}
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`font-extrabold text-sm
                              ${
                                product.stock === 0
                                  ? "text-red-500"
                                  : product.stock <= LOW_STOCK
                                    ? "text-amber-600"
                                    : "text-emerald-800"
                              }`}
                            >
                              {product.stock === 0 ? "Out" : product.stock}
                            </span>
                            {product.stock > 0 &&
                              product.stock <= LOW_STOCK && (
                                <span className="block text-xs text-amber-500 font-bold">
                                  Low
                                </span>
                              )}
                          </td>

                          {/* Status badge */}
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 font-bold uppercase text-xs border-4
                              ${
                                product.isActive
                                  ? "bg-emerald-600 text-white border-emerald-950"
                                  : "bg-gray-300    text-gray-600 border-gray-500"
                              }`}
                            >
                              {product.isActive ? "Active" : "Hidden"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            {confirmDelete === product._id ? (
                              <div className="flex items-center gap-2 justify-end">
                                <span className="text-xs font-bold text-red-600">
                                  Delete?
                                </span>
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  disabled={deleting === product._id}
                                  className="px-3 py-1 bg-red-500 text-white font-bold text-xs uppercase border-2 border-red-900 hover:bg-red-600 transition-colors flex items-center gap-1"
                                >
                                  {deleting === product._id ? (
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    "Yes"
                                  )}
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(null)}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 font-bold text-xs uppercase border-2 border-gray-300 hover:bg-gray-200 transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 justify-end">
                                <button
                                  onClick={() =>
                                    handleToggleActive(
                                      product._id,
                                      product.isActive,
                                    )
                                  }
                                  disabled={toggling === product._id}
                                  className={`px-3 py-1 font-bold text-xs uppercase border-2 transition-colors flex items-center gap-1
                                    ${
                                      toggling === product._id
                                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                        : product.isActive
                                          ? "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                                          : "bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200"
                                    }`}
                                >
                                  {toggling === product._id ? (
                                    <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                  ) : product.isActive ? (
                                    "Hide"
                                  ) : (
                                    "Show"
                                  )}
                                </button>
                                <button
                                  onClick={() => openEdit(product)}
                                  className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs uppercase border-2 border-blue-300 hover:bg-blue-100 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(product._id)}
                                  className="px-3 py-1 bg-red-50 text-red-600 font-bold text-xs uppercase border-2 border-red-300 hover:bg-red-100 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>

                {!loading && displayed.length > 0 && (
                  <tfoot className="bg-purple-50 border-t-4 border-emerald-950">
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 font-extrabold text-emerald-950 uppercase tracking-wider text-sm"
                      >
                        {displayed.length} of {products.length} product
                        {products.length !== 1 ? "s" : ""}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        )}

        {/* ── Add/Edit Modal ── */}
        {showModal && (
          <div className="fixed inset-0 bg-emerald-950/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-emerald-950 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_rgba(6,78,59,1)]">
              {/* Modal header */}
              <div className="p-6 border-b-4 border-emerald-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-extrabold text-emerald-950">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-red-100 text-red-600 border-2 border-red-400 flex items-center justify-center hover:bg-red-200 transition-colors font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Image upload */}
                {/* Image upload */}
                <div>
                  <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                    Product Image
                    <span className="ml-2 text-xs font-medium text-emerald-400 normal-case tracking-normal">
                      (JPG/PNG/WebP, max 2MB, optional)
                    </span>
                  </label>
                  <div className="flex items-center gap-4">
                    {/* Preview */}
                    <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {uploading ? (
                        <div className="w-6 h-6 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
                      ) : formData.imageUrl ? (
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              formData.imageUrl,
                            );
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML =
                              '<span class="text-3xl">❌</span>';
                          }}
                        />
                      ) : (
                        <span className="text-3xl">🛍️</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className={`w-full py-2 font-bold uppercase tracking-wider text-sm border-4 transition-all
          ${
            uploading
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-emerald-950 border-emerald-200 hover:border-purple-600"
          }`}
                      >
                        {uploading
                          ? "Uploading..."
                          : formData.imageUrl
                            ? "📷 Change Image"
                            : "📷 Upload Image"}
                      </button>
                      {formData.imageUrl && !uploading && (
                        <button
                          type="button"
                          onClick={() => {
                            // Clean up blob URL if exists
                            if (formData.imageUrl.startsWith("blob:")) {
                              URL.revokeObjectURL(formData.imageUrl);
                            }
                            setFormData((prev) => ({ ...prev, imageUrl: "" }));
                          }}
                          className="w-full py-1 text-red-500 font-bold text-xs uppercase tracking-wider border-2 border-red-200 hover:bg-red-50 transition-all"
                        >
                          ✕ Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {formErrors.image && (
                    <p className="text-red-500 text-xs font-bold mt-1">
                      ⚠️ {formErrors.image}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 border-4 font-bold text-emerald-950 focus:outline-none transition-all
                      ${formErrors.name ? "border-red-400 bg-red-50" : "border-emerald-200 focus:border-purple-600"}`}
                    placeholder="e.g. Recycled Backpack"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs font-bold mt-1">
                      ⚠️ {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                    Description
                    <span className="ml-2 text-xs font-medium text-emerald-400 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    placeholder="Brief product description..."
                    className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-purple-600 focus:outline-none font-medium text-emerald-950 resize-none placeholder:text-emerald-300"
                  />
                </div>

                {/* Points + Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                      Points Cost
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.points}
                      onChange={(e) =>
                        setFormData({ ...formData, points: e.target.value })
                      }
                      className={`w-full px-4 py-3 border-4 font-bold text-emerald-950 focus:outline-none transition-all
                        ${formErrors.points ? "border-red-400 bg-red-50" : "border-emerald-200 focus:border-purple-600"}`}
                      placeholder="500"
                    />
                    {formErrors.points && (
                      <p className="text-red-500 text-xs font-bold mt-1">
                        ⚠️ {formErrors.points}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                      Stock Qty
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className={`w-full px-4 py-3 border-4 font-bold text-emerald-950 focus:outline-none transition-all
                        ${formErrors.stock ? "border-red-400 bg-red-50" : "border-emerald-200 focus:border-purple-600"}`}
                      placeholder="10"
                    />
                    {formErrors.stock && (
                      <p className="text-red-500 text-xs font-bold mt-1">
                        ⚠️ {formErrors.stock}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border-4 border-emerald-200 focus:border-purple-600 focus:outline-none font-bold text-emerald-950 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* isActive toggle */}
                <div className="flex items-center justify-between bg-emerald-50 border-4 border-emerald-200 p-4">
                  <div>
                    <p className="font-bold text-emerald-950">
                      Visible in shop
                    </p>
                    <p className="text-xs text-emerald-500 font-medium">
                      Hidden products won't appear to users
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: !prev.isActive,
                      }))
                    }
                    className={`w-14 h-8 border-4 cursor-pointer transition-colors relative flex-shrink-0
                      ${formData.isActive ? "bg-emerald-600 border-emerald-950" : "bg-gray-200 border-gray-400"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white border-2 border-emerald-950 transition-all
                      ${formData.isActive ? "left-6" : "left-0.5"}`}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className={`flex-1 py-4 font-extrabold text-lg uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                      ${
                        saving || uploading
                          ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                          : "bg-purple-600 text-white border-purple-950 shadow-[6px_6px_0px_rgba(88,28,135,1)] hover:shadow-[2px_2px_0px_rgba(88,28,135,1)] hover:translate-x-1 hover:translate-y-1"
                      }`}
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                        Saving...
                      </>
                    ) : uploading ? (
                      <>
                        <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />{" "}
                        Uploading image...
                      </>
                    ) : (
                      "💾 Save"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-4 bg-white text-emerald-950 font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
