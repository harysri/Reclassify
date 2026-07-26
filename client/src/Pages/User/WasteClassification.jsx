// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const WasteClassification = () => {
//   const navigate = useNavigate();
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [scanResult, setScanResult] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [classifiedItems, setClassifiedItems] = useState([]);
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);

//   // Points configuration
//   const pointsConfig = {
//     glass: {
//       points: 100,
//       label: "Glass",
//       color: "bg-cyan-600",
//       textColor: "text-white",
//       icon: "🍾",
//     },
//     plastic: {
//       points: 5,
//       label: "Plastic",
//       color: "bg-red-500",
//       textColor: "text-white",
//       icon: "🥤",
//     },
//     cardboard: {
//       points: 7,
//       label: "Cardboard",
//       color: "bg-yellow-600",
//       textColor: "text-white",
//       icon: "📦",
//     },
//     // FIX: was bg-white with no textColor → text-white was implicit → invisible on white bg
//     paper: {
//       points: 3,
//       label: "Paper",
//       color: "bg-emerald-100",
//       textColor: "text-emerald-950",
//       icon: "📄",
//     },
//     metal: {
//       points: 20,
//       label: "Metal",
//       color: "bg-gray-600",
//       textColor: "text-white",
//       icon: "🥫",
//     },
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });
//       if (videoRef.current) videoRef.current.srcObject = stream;
//       setShowCamera(true);
//       setCameraError(null);
//     } catch {
//       setCameraError(
//         "Unable to access camera. Please use file upload instead.",
//       );
//       setShowCamera(false);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       videoRef.current.srcObject = null;
//     }
//     setShowCamera(false);
//   };

//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext("2d").drawImage(video, 0, 0);
//     const imageData = canvas.toDataURL("image/jpeg");
//     setCapturedImage(imageData);
//     stopCamera();
//     classifyImage(imageData);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setCapturedImage(reader.result);
//       classifyImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // AI Classification
//   // PRODUCTION: replace simulation block with real API call
//   // POST /api/waste/classify  →  body: { image: base64.split(",")[1] }
//   // Response: { wasteType: string, confidence: number, recyclable: boolean }
//   const classifyImage = async (imageData) => {
//     setIsScanning(true);
//     setScanResult(null);
//     try {
//       // ── PRODUCTION (uncomment when API is ready) ──
//       // const base64 = imageData.split(",")[1];
//       // const res = await fetch("/api/waste/classify", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ image: base64 }),
//       // });
//       // if (!res.ok) throw new Error("Classification failed");
//       // setScanResult(await res.json());

//       // ── SIMULATION (remove when API is ready) ──
//       await new Promise((r) => setTimeout(r, 2000));
//       const wasteTypes = Object.keys(pointsConfig);
//       const randomType =
//         wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
//       setScanResult({
//         wasteType: randomType,
//         confidence: parseFloat((Math.random() * 14 + 85).toFixed(1)),
//         recyclable: true,
//       });
//     } catch {
//       setCameraError("Classification failed. Please try again.");
//     } finally {
//       setIsScanning(false);
//       setQuantity(1);
//     }
//   };

//   // FIX: guards against NaN when user clears the input field
//   const handleQuantityChange = (e) => {
//     const parsed = parseInt(e.target.value);
//     setQuantity(isNaN(parsed) ? "" : Math.max(1, parsed));
//   };

//   const safeQuantity = !quantity || isNaN(quantity) ? 1 : quantity;

//   const addToList = () => {
//     if (!scanResult) return;
//     const config = pointsConfig[scanResult.wasteType];
//     const item = {
//       id: Date.now(),
//       wasteType: scanResult.wasteType,
//       quantity: safeQuantity,
//       pointsPerUnit: config.points,
//       totalPoints: config.points * safeQuantity,
//       image: capturedImage,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setClassifiedItems((prev) => [...prev, item]);
//     setTotalPoints((prev) => prev + item.totalPoints);
//     setCapturedImage(null);
//     setScanResult(null);
//     setQuantity(1);
//   };

//   const removeItem = (id) => {
//     const item = classifiedItems.find((i) => i.id === id);
//     if (!item) return;
//     setTotalPoints((prev) => prev - item.totalPoints);
//     setClassifiedItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   // FIX: navigates to Schedule Pickup page, passing items + totalPoints via router state
//   // In SchedulePickup.jsx, read with: const { items, totalPoints } = useLocation().state ?? {}
//   const handleSubmit = () => {
//     if (classifiedItems.length === 0) return;
//     navigate("/user/schedule-pickup", {
//       state: { items: classifiedItems, totalPoints },
//     });
//   };

//   useEffect(() => () => stopCamera(), []);

//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             Waste <span className="text-emerald-600">Classifier</span>
//           </h1>
//           <p className="text-emerald-800 font-medium text-lg">
//             Scan, identify, and earn points for every recyclable item
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Left Column – Scanner */}
//           <div className="space-y-6">
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//               <h2 className="text-2xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
//                 <span>📷</span> Scan Waste
//               </h2>

//               {/* Camera / Preview */}
//               <div className="relative aspect-[4/3] bg-emerald-100 border-4 border-emerald-200 overflow-hidden mb-4">
//                 {showCamera ? (
//                   <>
//                     <video
//                       ref={videoRef}
//                       autoPlay
//                       playsInline
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <div className="w-64 h-64 border-4 border-white/50 rounded-lg relative">
//                         <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 -mt-1 -ml-1" />
//                         <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 -mt-1 -mr-1" />
//                         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 -mb-1 -ml-1" />
//                         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 -mb-1 -mr-1" />
//                       </div>
//                     </div>
//                   </>
//                 ) : capturedImage ? (
//                   <img
//                     src={capturedImage}
//                     alt="Captured"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex flex-col items-center justify-center text-emerald-800">
//                     <span className="text-6xl mb-4">📸</span>
//                     <p className="font-bold uppercase tracking-wider">
//                       Camera Preview
//                     </p>
//                   </div>
//                 )}

//                 {isScanning && (
//                   <div className="absolute inset-0 bg-emerald-950/80 flex flex-col items-center justify-center">
//                     <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4" />
//                     <p className="text-white font-bold uppercase tracking-widest animate-pulse">
//                       AI Analyzing...
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <canvas ref={canvasRef} className="hidden" />

//               {/* Controls */}
//               <div className="flex gap-3 mb-4">
//                 {!showCamera && !capturedImage && (
//                   <>
//                     <button
//                       onClick={startCamera}
//                       className="flex-1 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       📷 Open Camera
//                     </button>
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       📁 Upload
//                     </button>
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       onChange={handleFileUpload}
//                       accept="image/*"
//                       className="hidden"
//                     />
//                   </>
//                 )}

//                 {showCamera && (
//                   <>
//                     <button
//                       onClick={capturePhoto}
//                       className="flex-1 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       ⚡ Capture
//                     </button>
//                     <button
//                       onClick={stopCamera}
//                       className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-950 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       ✕ Cancel
//                     </button>
//                   </>
//                 )}

//                 {capturedImage && !isScanning && (
//                   <button
//                     onClick={() => {
//                       setCapturedImage(null);
//                       setScanResult(null);
//                     }}
//                     className="w-full py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                   >
//                     🔄 Scan Again
//                   </button>
//                 )}
//               </div>

//               {cameraError && (
//                 <p className="text-red-600 font-bold text-sm text-center bg-red-100 p-2 border-2 border-red-300">
//                   ⚠️ {cameraError}
//                 </p>
//               )}
//             </div>

//             {/* Classification Result */}
//             {scanResult && (
//               <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//                 <h3 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
//                   <span>🤖</span> AI Classification Result
//                 </h3>

//                 {/* FIX: uses textColor from config so paper category is readable */}
//                 <div
//                   className={`${pointsConfig[scanResult.wasteType].color} ${pointsConfig[scanResult.wasteType].textColor} border-4 border-emerald-950 p-4 mb-4`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className="text-4xl">
//                         {pointsConfig[scanResult.wasteType].icon}
//                       </span>
//                       <div>
//                         <p className="text-xs uppercase tracking-wider opacity-75">
//                           Detected
//                         </p>
//                         <p className="text-2xl font-extrabold">
//                           {pointsConfig[scanResult.wasteType].label}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-3xl font-extrabold">
//                         {pointsConfig[scanResult.wasteType].points}
//                       </p>
//                       <p className="text-xs uppercase tracking-wider opacity-75">
//                         pts/unit
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-3 pt-3 border-t-2 border-current opacity-20" />
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-sm font-bold">Confidence</span>
//                     <span className="bg-black/10 px-2 py-1 font-bold">
//                       {scanResult.confidence}%
//                     </span>
//                   </div>
//                 </div>

//                 {/* Quantity Selector */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                     Quantity
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() =>
//                         setQuantity((q) =>
//                           Math.max(1, (isNaN(q) || q === "" ? 1 : q) - 1),
//                         )
//                       }
//                       className="w-12 h-12 bg-emerald-100 border-4 border-emerald-950 font-bold text-xl hover:bg-emerald-200 transition-colors shadow-[3px_3px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={handleQuantityChange}
//                       onBlur={() => {
//                         if (!quantity || isNaN(quantity)) setQuantity(1);
//                       }}
//                       className="flex-1 h-12 text-center border-4 border-emerald-950 font-bold text-xl focus:outline-none focus:border-emerald-600"
//                       min="1"
//                     />
//                     <button
//                       onClick={() =>
//                         setQuantity((q) => (isNaN(q) || q === "" ? 1 : q) + 1)
//                       }
//                       className="w-12 h-12 bg-emerald-100 border-4 border-emerald-950 font-bold text-xl hover:bg-emerald-200 transition-colors shadow-[3px_3px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* Points Preview */}
//                 <div className="bg-emerald-50 border-4 border-emerald-200 p-4 mb-4">
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-emerald-800">
//                       Total Points:
//                     </span>
//                     <span className="text-3xl font-extrabold text-emerald-600">
//                       {pointsConfig[scanResult.wasteType].points * safeQuantity}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={addToList}
//                   className="w-full py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
//                 >
//                   ➕ Add to List
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Right Column – Scanned Items */}
//           <div className="space-y-6">
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
//                   <span>📋</span> Scanned Items
//                 </h3>
//                 <span className="bg-emerald-600 text-white px-3 py-1 font-bold text-sm">
//                   {classifiedItems.length} items
//                 </span>
//               </div>

//               {classifiedItems.length === 0 ? (
//                 <div className="text-center py-12 bg-emerald-50 border-4 border-dashed border-emerald-200">
//                   <span className="text-4xl mb-2 block">📸</span>
//                   <p className="text-emerald-600 font-medium">
//                     No items scanned yet
//                   </p>
//                   <p className="text-emerald-400 text-sm">
//                     Start scanning to earn points!
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
//                   {classifiedItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="bg-gray-50 border-4 border-emerald-200 p-4 relative group"
//                     >
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         ✕
//                       </button>
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={item.image}
//                           alt={item.wasteType}
//                           className="w-16 h-16 object-cover border-2 border-emerald-300"
//                         />
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <p className="font-bold text-emerald-950">
//                                 {pointsConfig[item.wasteType].icon}{" "}
//                                 {pointsConfig[item.wasteType].label}
//                               </p>
//                               <p className="text-xs text-emerald-600">
//                                 Qty: {item.quantity}
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 {item.pointsPerUnit} pts/unit
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-xl font-extrabold text-emerald-600">
//                                 +{item.totalPoints}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 {item.timestamp}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {classifiedItems.length > 0 && (
//                 <div className="border-t-4 border-emerald-200 pt-4 mt-4">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-lg font-bold text-emerald-950">
//                       Total Points:
//                     </span>
//                     <span className="text-4xl font-extrabold text-emerald-600">
//                       {totalPoints}
//                     </span>
//                   </div>
//                   {/* FIX: was alert() — now navigates to /schedule-pickup with state */}
//                   <button
//                     onClick={handleSubmit}
//                     className="w-full py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
//                   >
//                     <span>🚀</span> Schedule Pickup
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteClassification;

//worked+camera preview + classification + confidence + bbox UI + bug fixes

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// const WasteClassification = () => {
//   const navigate = useNavigate();
//   const [isScanning, setIsScanning] = useState(false);
//   const [scanResult, setScanResult] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [classifiedItems, setClassifiedItems] = useState([]);
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [showCamera, setShowCamera] = useState(false);
//   const [cameraError, setCameraError] = useState(null);
//   const [videoReady, setVideoReady] = useState(false);

//   // Bounding box UI state with confidence
//   const [bboxStyle, setBboxStyle] = useState({
//     borderColor: "#10B981",
//     label: "",
//     confidence: 0,
//   });

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const isCameraActiveRef = useRef(false);
//   const analyzeTimeoutRef = useRef(null);
//   const streamRef = useRef(null);
//   const playAttemptRef = useRef(null);
//   const analyzeLoopRef = useRef(null); // BUG FIX #2: Ref to hold latest analyze function
//   const mountedRef = useRef(false);

//   // Minimum confidence threshold
//   const CONFIDENCE_THRESHOLD = 60;

//   // Points configuration
//   const pointsConfig = {
//     glass: {
//       points: 100,
//       label: "Glass",
//       color: "bg-cyan-600",
//       textColor: "text-white",
//       icon: "🍾",
//     },
//     plastic: {
//       points: 5,
//       label: "Plastic",
//       color: "bg-red-500",
//       textColor: "text-white",
//       icon: "🥤",
//     },
//     cardboard: {
//       points: 7,
//       label: "Cardboard",
//       color: "bg-yellow-600",
//       textColor: "text-white",
//       icon: "📦",
//     },
//     paper: {
//       points: 3,
//       label: "Paper",
//       color: "bg-emerald-100",
//       textColor: "text-emerald-950",
//       icon: "📄",
//     },
//     metal: {
//       points: 20,
//       label: "Metal",
//       color: "bg-gray-600",
//       textColor: "text-white",
//       icon: "🥫",
//     },
//     trash: {
//       points: 10,
//       label: "Mixed / Trash",
//       color: "bg-black",
//       textColor: "text-white",
//       icon: "🗑️",
//     },
//   };

//   const getColorFromTailwind = (tw) => {
//     if (!tw) return "#10B981";
//     if (tw.includes("red")) return "#ef4444";
//     if (tw.includes("cyan")) return "#06b6d4";
//     if (tw.includes("yellow")) return "#ca8a04";
//     if (tw.includes("emerald")) return "#10b981";
//     if (tw.includes("gray")) return "#4b5563";
//     if (tw.includes("black")) return "#000000";
//     return "#10B981";
//   };

//   useEffect(() => {
//     mountedRef.current = true;
//     return () => {
//       mountedRef.current = false;
//     };
//   }, []);

//   // BUG FIX #2: Store analyze logic in ref to avoid stale closure
//   analyzeLoopRef.current = async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     if (
//       !isCameraActiveRef.current ||
//       !video ||
//       !canvas ||
//       !mountedRef.current
//     ) {
//       if (isCameraActiveRef.current && mountedRef.current) {
//         analyzeTimeoutRef.current = setTimeout(
//           () => analyzeLoopRef.current(),
//           500,
//         );
//       }
//       return;
//     }

//     if (video.videoWidth === 0 || video.videoHeight === 0) {
//       analyzeTimeoutRef.current = setTimeout(
//         () => analyzeLoopRef.current(),
//         500,
//       );
//       return;
//     }

//     try {
//       canvas.width = 224;
//       canvas.height = 224;

//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(video, 0, 0, 224, 224);

//       const imageData = canvas.toDataURL("image/jpeg", 0.6);
//       const base64 = imageData.split(",")[1];

//       const res = await fetch("http://localhost:5000/api/waste/classify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: base64 }),
//       });

//       if (!res.ok) throw new Error("Classification failed");
//       const data = await res.json();

//       if (data?.wasteType && mountedRef.current) {
//         const wasteType = data.wasteType.toLowerCase();
//         const confidence = parseFloat(data.confidence);

//         // Only show result if confidence is above threshold
//         if (confidence >= CONFIDENCE_THRESHOLD) {
//           setScanResult({
//             wasteType,
//             confidence: confidence.toFixed(1),
//             imageSnapshot: imageData,
//           });

//           const config = pointsConfig[wasteType] || {};
//           setBboxStyle({
//             borderColor: getColorFromTailwind(config.color),
//             label: `${config.label || wasteType}`,
//             confidence: confidence,
//           });
//         } else {
//           // Clear result if confidence too low
//           setScanResult(null);
//           setBboxStyle({
//             borderColor: "#10B981",
//             label: "Scanning...",
//             confidence: 0,
//           });
//         }
//       }
//     } catch (err) {
//       console.warn("Frame analysis error:", err);
//     }

//     if (isCameraActiveRef.current && mountedRef.current) {
//       analyzeTimeoutRef.current = setTimeout(
//         () => analyzeLoopRef.current(),
//         800,
//       );
//     }
//   };

//   const startCamera = useCallback(async () => {
//     if (!mountedRef.current) return;

//     try {
//       setCameraError(null);

//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//         streamRef.current = null;
//       }

//       await new Promise((resolve) => setTimeout(resolve, 100));

//       if (!mountedRef.current) return;

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: "environment",
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//         },
//         audio: false,
//       });

//       if (!mountedRef.current) {
//         stream.getTracks().forEach((track) => track.stop());
//         return;
//       }

//       streamRef.current = stream;

//       if (videoRef.current) {
//         // BUG FIX #3: Imperative assignment in requestAnimationFrame
//         const video = videoRef.current;

//         video.pause();
//         video.srcObject = null;
//         video.load();

//         await new Promise((resolve) => setTimeout(resolve, 50));

//         if (!mountedRef.current) return;

//         requestAnimationFrame(() => {
//           if (!videoRef.current || !mountedRef.current) return;

//           const video = videoRef.current;
//           video.srcObject = stream;
//           video.muted = true;
//           video.playsInline = true;
//           video.autoplay = true;
//           video.setAttribute("playsinline", "true");
//           video.setAttribute("webkit-playsinline", "true");

//           // BUG FIX #3: Imperative event handler assignment
//           video.onloadedmetadata = () => {
//             video.play().catch((err) => {
//               console.warn("Play on loadedmetadata failed:", err);
//             });
//           };

//           // Fallback play attempts
//           const attemptPlay = async (retries = 10) => {
//             if (
//               !videoRef.current ||
//               !isCameraActiveRef.current ||
//               !mountedRef.current
//             )
//               return;

//             try {
//               await videoRef.current.play();
//               console.log("Camera playing successfully");
//             } catch (err) {
//               if (retries > 0) {
//                 playAttemptRef.current = setTimeout(
//                   () => attemptPlay(retries - 1),
//                   100,
//                 );
//               }
//             }
//           };

//           attemptPlay();
//         });

//         setShowCamera(true);
//         setIsScanning(true);
//         isCameraActiveRef.current = true;
//         setVideoReady(false);
//       }
//     } catch (err) {
//       console.error("Camera error:", err);
//       if (mountedRef.current) {
//         setCameraError(err.message || "Unable to access camera.");
//         setShowCamera(false);
//       }
//     }
//   }, []);

//   const stopCamera = useCallback(() => {
//     isCameraActiveRef.current = false;
//     setIsScanning(false);
//     setShowCamera(false);
//     setVideoReady(false);

//     if (playAttemptRef.current) {
//       clearTimeout(playAttemptRef.current);
//     }

//     if (analyzeTimeoutRef.current) {
//       clearTimeout(analyzeTimeoutRef.current);
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }

//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.srcObject = null;
//       videoRef.current.load();
//       videoRef.current.onloadedmetadata = null; // Clean up handler
//     }

//     setScanResult(null);
//     setBboxStyle({ borderColor: "#10B981", label: "", confidence: 0 });
//   }, []);

//   // BUG FIX #2: Use ref instead of stale callback
//   const handleVideoCanPlay = useCallback(() => {
//     if (
//       videoRef.current &&
//       videoRef.current.videoWidth > 0 &&
//       mountedRef.current
//     ) {
//       setVideoReady(true);
//       if (isCameraActiveRef.current) {
//         analyzeLoopRef.current(); // Call through ref, not stale callback
//       }
//     }
//   }, []);

//   const handleFileUpload = useCallback((e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       setIsScanning(true);
//       const imageData = reader.result;
//       const base64 = imageData.split(",")[1];

//       try {
//         const res = await fetch("http://localhost:5000/api/waste/classify", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ image: base64 }),
//         });
//         if (!res.ok) throw new Error("Classification failed");
//         const data = await res.json();

//         if (mountedRef.current) {
//           const confidence = parseFloat(data.confidence);

//           if (confidence >= CONFIDENCE_THRESHOLD) {
//             setScanResult({
//               wasteType: data.wasteType.toLowerCase(),
//               confidence: confidence.toFixed(1),
//               imageSnapshot: imageData,
//             });

//             const config = pointsConfig[data.wasteType.toLowerCase()] || {};
//             setBboxStyle({
//               borderColor: getColorFromTailwind(config.color),
//               label: `${config.label || data.wasteType}`,
//               confidence: confidence,
//             });
//           }
//         }
//       } catch {
//         if (mountedRef.current) {
//           setCameraError("Classification failed. Please try again.");
//         }
//       } finally {
//         if (mountedRef.current) {
//           setIsScanning(false);
//         }
//       }
//     };
//     reader.readAsDataURL(file);
//   }, []);

//   const handleQuantityChange = useCallback((e) => {
//     const parsed = parseInt(e.target.value);
//     setQuantity(isNaN(parsed) ? "" : Math.max(1, parsed));
//   }, []);

//   const safeQuantity = !quantity || isNaN(quantity) ? 1 : quantity;

//   const addToList = useCallback(() => {
//     if (!scanResult) return;
//     const config = pointsConfig[scanResult.wasteType];
//     const item = {
//       id: Date.now(),
//       wasteType: scanResult.wasteType,
//       quantity: safeQuantity,
//       pointsPerUnit: config.points,
//       totalPoints: config.points * safeQuantity,
//       image: scanResult.imageSnapshot,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setClassifiedItems((prev) => [...prev, item]);
//     setTotalPoints((prev) => prev + item.totalPoints);
//     setQuantity(1);
//   }, [scanResult, safeQuantity]);

//   const removeItem = useCallback(
//     (id) => {
//       const item = classifiedItems.find((i) => i.id === id);
//       if (!item) return;
//       setTotalPoints((prev) => prev - item.totalPoints);
//       setClassifiedItems((prev) => prev.filter((i) => i.id !== id));
//     },
//     [classifiedItems],
//   );

//   const handleSubmit = useCallback(() => {
//     if (classifiedItems.length === 0) return;
//     navigate("/user/schedule-pickup", {
//       state: { items: classifiedItems, totalPoints },
//     });
//   }, [classifiedItems, totalPoints, navigate]);

//   useEffect(() => {
//     return () => {
//       mountedRef.current = false;
//       stopCamera();
//     };
//   }, [stopCamera]);

//   return (
//     <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
//             Waste <span className="text-emerald-600">Classifier</span>
//           </h1>
//           <p className="text-emerald-800 font-medium text-lg">
//             Scan in real-time and earn points for every recyclable item
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Left Column – Scanner */}
//           <div className="space-y-6">
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
//                   <span>📷</span> Live Scanner
//                 </h2>
//                 {isScanning && showCamera && videoReady && (
//                   <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 animate-pulse">
//                     <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
//                     ANALYZING LIVE
//                   </span>
//                 )}
//               </div>

//               {/* BUG FIX #1: Always render video, toggle with display style */}
//               <div className="relative aspect-[4/3] bg-emerald-100 border-4 border-emerald-200 overflow-hidden mb-4">
//                 {/* Video always in DOM, controlled by style */}
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   muted
//                   onCanPlay={handleVideoCanPlay}
//                   className="w-full h-full object-cover"
//                   style={{
//                     display: showCamera ? "block" : "none",
//                   }}
//                 />

//                 {/* Uploaded image or offline state overlay */}
//                 {!showCamera && (
//                   <>
//                     {scanResult?.imageSnapshot && !isScanning ? (
//                       <img
//                         src={scanResult.imageSnapshot}
//                         alt="Uploaded"
//                         className="w-full h-full object-cover absolute inset-0"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex flex-col items-center justify-center text-emerald-800 absolute inset-0">
//                         <span className="text-6xl mb-4">📹</span>
//                         <p className="font-bold uppercase tracking-wider">
//                           Camera Offline
//                         </p>
//                         <p className="text-xs mt-2">
//                           Click "Start Scanner" to begin
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Bounding Box Overlay */}
//                 {showCamera && videoReady && (
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <div
//                       style={{
//                         width: "250px",
//                         height: "250px",
//                         border: `4px solid ${bboxStyle.borderColor}`,
//                         borderRadius: "12px",
//                         boxShadow: `0 0 20px ${bboxStyle.borderColor}`,
//                         position: "relative",
//                       }}
//                     >
//                       {bboxStyle.label && (
//                         <div
//                           style={{
//                             position: "absolute",
//                             top: "-40px",
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             background: bboxStyle.borderColor,
//                             color: "#fff",
//                             padding: "6px 12px",
//                             borderRadius: "4px",
//                             fontWeight: "bold",
//                             fontSize: "12px",
//                             whiteSpace: "nowrap",
//                             minWidth: "120px",
//                             textAlign: "center",
//                           }}
//                         >
//                           <div>{bboxStyle.label}</div>
//                           {/* Confidence bar */}
//                           {bboxStyle.confidence > 0 && (
//                             <div
//                               style={{
//                                 width: "100%",
//                                 height: "4px",
//                                 background: "rgba(255,255,255,0.3)",
//                                 borderRadius: "2px",
//                                 marginTop: "4px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   width: `${bboxStyle.confidence}%`,
//                                   height: "100%",
//                                   background: "#fff",
//                                   borderRadius: "2px",
//                                   transition: "width 0.3s ease",
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Loading indicator */}
//                 {showCamera && !videoReady && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
//                     <div className="text-white text-center">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
//                       <p className="text-sm">Initializing camera...</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <canvas ref={canvasRef} className="hidden" />

//               {/* Controls */}
//               <div className="flex gap-3 mb-4">
//                 {!showCamera && (
//                   <>
//                     <button
//                       onClick={startCamera}
//                       className="flex-1 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       ▶ Start Scanner
//                     </button>
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                     >
//                       📁 Upload File
//                     </button>
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       onChange={handleFileUpload}
//                       accept="image/*"
//                       className="hidden"
//                     />
//                   </>
//                 )}

//                 {showCamera && (
//                   <button
//                     onClick={stopCamera}
//                     className="w-full py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-950 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
//                   >
//                     ⏹ Stop Scanner
//                   </button>
//                 )}
//               </div>

//               {cameraError && (
//                 <p className="text-red-600 font-bold text-sm text-center bg-red-100 p-2 border-2 border-red-300">
//                   ⚠️ {cameraError}
//                 </p>
//               )}
//             </div>

//             {/* Live Classification Result */}
//             {scanResult && pointsConfig[scanResult.wasteType] && (
//               <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)] animate-in fade-in slide-in-from-bottom-4">
//                 <h3 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
//                   <span>🎯</span> Live Detection
//                 </h3>

//                 <div
//                   className={`${pointsConfig[scanResult.wasteType].color} ${pointsConfig[scanResult.wasteType].textColor} border-4 border-emerald-950 p-4 mb-4 transition-colors duration-300`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className="text-4xl">
//                         {pointsConfig[scanResult.wasteType].icon}
//                       </span>
//                       <div>
//                         <p className="text-xs uppercase tracking-wider opacity-75">
//                           Detected
//                         </p>
//                         <p className="text-2xl font-extrabold">
//                           {pointsConfig[scanResult.wasteType].label}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-3xl font-extrabold">
//                         {pointsConfig[scanResult.wasteType].points}
//                       </p>
//                       <p className="text-xs uppercase tracking-wider opacity-75">
//                         pts/unit
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-3 pt-3 border-t-2 border-current opacity-20" />
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-sm font-bold">Confidence</span>
//                     <span className="bg-black/10 px-2 py-1 font-bold">
//                       {scanResult.confidence}%
//                     </span>
//                   </div>
//                 </div>

//                 {/* Quantity Selector */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
//                     Quantity
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() =>
//                         setQuantity((q) =>
//                           Math.max(1, (isNaN(q) || q === "" ? 1 : q) - 1),
//                         )
//                       }
//                       className="w-12 h-12 bg-emerald-100 border-4 border-emerald-950 font-bold text-xl hover:bg-emerald-200 transition-colors shadow-[3px_3px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={handleQuantityChange}
//                       onBlur={() => {
//                         if (!quantity || isNaN(quantity)) setQuantity(1);
//                       }}
//                       className="flex-1 h-12 text-center border-4 border-emerald-950 font-bold text-xl focus:outline-none focus:border-emerald-600"
//                       min="1"
//                     />
//                     <button
//                       onClick={() =>
//                         setQuantity((q) => (isNaN(q) || q === "" ? 1 : q) + 1)
//                       }
//                       className="w-12 h-12 bg-emerald-100 border-4 border-emerald-950 font-bold text-xl hover:bg-emerald-200 transition-colors shadow-[3px_3px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={addToList}
//                   className="w-full py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
//                 >
//                   🔒 Lock In & Add to List
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Right Column – Scanned Items */}
//           <div className="space-y-6">
//             <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
//                   <span>📋</span> Scanned Items
//                 </h3>
//                 <span className="bg-emerald-600 text-white px-3 py-1 font-bold text-sm">
//                   {classifiedItems.length} items
//                 </span>
//               </div>

//               {classifiedItems.length === 0 ? (
//                 <div className="text-center py-12 bg-emerald-50 border-4 border-dashed border-emerald-200">
//                   <span className="text-4xl mb-2 block">📸</span>
//                   <p className="text-emerald-600 font-medium">
//                     No items locked in yet
//                   </p>
//                   <p className="text-emerald-400 text-sm">
//                     Start scanning to earn points!
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3 max-h-96 overflow-y-auto mb-4 pr-2">
//                   {classifiedItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="bg-gray-50 border-4 border-emerald-200 p-4 relative group"
//                     >
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         ✕
//                       </button>
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={item.image}
//                           alt={item.wasteType}
//                           className="w-16 h-16 object-cover border-2 border-emerald-300"
//                         />
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <p className="font-bold text-emerald-950">
//                                 {pointsConfig[item.wasteType].icon}{" "}
//                                 {pointsConfig[item.wasteType].label}
//                               </p>
//                               <p className="text-xs text-emerald-600">
//                                 Qty: {item.quantity}
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 {item.pointsPerUnit} pts/unit
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-xl font-extrabold text-emerald-600">
//                                 +{item.totalPoints}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 {item.timestamp}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {classifiedItems.length > 0 && (
//                 <div className="border-t-4 border-emerald-200 pt-4 mt-4">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-lg font-bold text-emerald-950">
//                       Total Points:
//                     </span>
//                     <span className="text-4xl font-extrabold text-emerald-600">
//                       {totalPoints}
//                     </span>
//                   </div>
//                   <button
//                     onClick={handleSubmit}
//                     className="w-full py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
//                   >
//                     <span>🚀</span> Schedule Pickup
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteClassification;

//worked  with cameara preview + classification

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const WasteClassification = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [classifiedItems, setClassifiedItems] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [bboxStyle, setBboxStyle] = useState({
    borderColor: "#10B981",
    label: "",
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);
  const analyzeTimeoutRef = useRef(null);
  const isCameraActiveRef = useRef(false);
  // Use a ref for videoReady so analyzeFrame always reads the latest value
  const videoReadyRef = useRef(false);

  const pointsConfig = {
    glass: {
      points: 100,
      label: "Glass",
      color: "bg-cyan-600",
      textColor: "text-white",
      icon: "🍾",
    },
    plastic: {
      points: 5,
      label: "Plastic",
      color: "bg-red-500",
      textColor: "text-white",
      icon: "🥤",
    },
    cardboard: {
      points: 7,
      label: "Cardboard",
      color: "bg-yellow-600",
      textColor: "text-white",
      icon: "📦",
    },
    paper: {
      points: 3,
      label: "Paper",
      color: "bg-emerald-100",
      textColor: "text-emerald-950",
      icon: "📄",
    },
    metal: {
      points: 20,
      label: "Metal",
      color: "bg-gray-600",
      textColor: "text-white",
      icon: "🥫",
    },
    trash: {
      points: 10,
      label: "Mixed / Trash",
      color: "bg-black",
      textColor: "text-white",
      icon: "🗑️",
    },
  };

  const getColorFromTailwind = (tw = "") => {
    if (tw.includes("red")) return "#ef4444";
    if (tw.includes("cyan")) return "#06b6d4";
    if (tw.includes("yellow")) return "#ca8a04";
    if (tw.includes("emerald")) return "#10b981";
    if (tw.includes("gray")) return "#4b5563";
    if (tw.includes("black")) return "#000000";
    return "#10B981";
  };

  // ─── Core analyze loop ────────────────────────────────────────────────────
  // Written as a plain function stored in a ref so it never goes stale.
  const analyzeLoopRef = useRef(null);
  analyzeLoopRef.current = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!isCameraActiveRef.current) return;

    // Wait until the video element has real dimensions
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      analyzeTimeoutRef.current = setTimeout(
        () => analyzeLoopRef.current(),
        300,
      );
      return;
    }

    try {
      canvas.width = 224;
      canvas.height = 224;
      canvas.getContext("2d").drawImage(video, 0, 0, 224, 224);

      const imageData = canvas.toDataURL("image/jpeg", 0.6);
      const base64 = imageData.split(",")[1];

      const res = await fetch("http://localhost:5000/api/waste/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      if (!res.ok) throw new Error("Classification failed");
      const data = await res.json();

      if (data?.wasteType && isCameraActiveRef.current) {
        const wasteType = data.wasteType.toLowerCase();
        const confidence = parseFloat(data.confidence).toFixed(1);
        const config = pointsConfig[wasteType] || {};

        setScanResult({ wasteType, confidence, imageSnapshot: imageData });
        setBboxStyle({
          borderColor: getColorFromTailwind(config.color),
          label: `${config.label || wasteType} (${confidence}%)`,
        });
      }
    } catch (err) {
      console.warn("Frame analysis error:", err.message);
    }

    if (isCameraActiveRef.current) {
      analyzeTimeoutRef.current = setTimeout(
        () => analyzeLoopRef.current(),
        800,
      );
    }
  };

  // ─── Start camera ─────────────────────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setCameraError(null);

    // Clean up any previous stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    clearTimeout(analyzeTimeoutRef.current);

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
    } catch (err) {
      setCameraError(
        "Camera permission denied. Please allow camera access and try again.",
      );
      return;
    }

    streamRef.current = stream;
    isCameraActiveRef.current = true;
    videoReadyRef.current = false;
    setVideoReady(false);
    setShowCamera(true);
    setIsScanning(true);

    // Attach stream AFTER React has rendered the <video> element
    // requestAnimationFrame ensures the DOM node exists
    requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;

      // onloadedmetadata fires when the browser knows dimensions
      video.onloadedmetadata = () => {
        video
          .play()
          .then(() => {
            // Small delay so first frame is actually painted
            setTimeout(() => {
              videoReadyRef.current = true;
              setVideoReady(true);
              // Kick off the analysis loop
              analyzeLoopRef.current();
            }, 200);
          })
          .catch((err) => {
            console.error("video.play() failed:", err);
            setCameraError(
              "Could not start video playback. Try clicking the page first.",
            );
          });
      };
    });
  }, []);

  // ─── Stop camera ──────────────────────────────────────────────────────────
  const stopCamera = useCallback(() => {
    isCameraActiveRef.current = false;
    videoReadyRef.current = false;
    clearTimeout(analyzeTimeoutRef.current);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = null;
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    setShowCamera(false);
    setIsScanning(false);
    setVideoReady(false);
    setScanResult(null);
    setBboxStyle({ borderColor: "#10B981", label: "" });
  }, []);

  // ─── File upload ──────────────────────────────────────────────────────────
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      setIsScanning(true);
      const imageData = reader.result;
      const base64 = imageData.split(",")[1];

      try {
        const res = await fetch("http://localhost:5000/api/waste/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        if (!res.ok) throw new Error("Classification failed");
        const data = await res.json();
        const wasteType = data.wasteType.toLowerCase();
        const confidence = parseFloat(data.confidence).toFixed(1);
        const config = pointsConfig[wasteType] || {};

        setScanResult({ wasteType, confidence, imageSnapshot: imageData });
        setBboxStyle({
          borderColor: getColorFromTailwind(config.color),
          label: `${config.label || wasteType} (${confidence}%)`,
        });
      } catch {
        setCameraError("Classification failed. Please try again.");
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // ─── Quantity helpers ─────────────────────────────────────────────────────
  const handleQuantityChange = useCallback((e) => {
    const parsed = parseInt(e.target.value);
    setQuantity(isNaN(parsed) ? "" : Math.max(1, parsed));
  }, []);

  const safeQuantity = !quantity || isNaN(quantity) ? 1 : quantity;

  const addToList = useCallback(() => {
    if (!scanResult) return;
    const config = pointsConfig[scanResult.wasteType];
    const item = {
      id: Date.now(),
      wasteType: scanResult.wasteType,
      quantity: safeQuantity,
      pointsPerUnit: config.points,
      totalPoints: config.points * safeQuantity,
      image: scanResult.imageSnapshot,
      timestamp: new Date().toLocaleTimeString(),
    };
    setClassifiedItems((prev) => [...prev, item]);
    setTotalPoints((prev) => prev + item.totalPoints);
    setQuantity(1);
  }, [scanResult, safeQuantity]);

  const removeItem = useCallback((id) => {
    setClassifiedItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) setTotalPoints((p) => p - item.totalPoints);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (classifiedItems.length === 0) return;
    navigate("/user/schedule-pickup", {
      state: { items: classifiedItems, totalPoints },
    });
  }, [classifiedItems, totalPoints, navigate]);

  // Cleanup on unmount
  useEffect(() => () => stopCamera(), [stopCamera]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950 mb-2">
            Waste <span className="text-emerald-600">Classifier</span>
          </h1>
          <p className="text-emerald-800 font-medium text-lg">
            Scan in real-time and earn points for every recyclable item
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ── Left: Scanner ───────────────────────────────────────────── */}
          <div className="space-y-6">
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
                  <span>📷</span> Live Scanner
                </h2>
                {isScanning && showCamera && videoReady && (
                  <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    ANALYZING LIVE
                  </span>
                )}
              </div>

              {/* Video preview */}
              <div className="relative aspect-[4/3] bg-emerald-100 border-4 border-emerald-200 overflow-hidden mb-4">
                {/* Always render <video> when camera is on — hiding it breaks srcObject */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ display: showCamera ? "block" : "none" }}
                />

                {/* Bounding box — only once video is playing */}
                {showCamera && videoReady && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      style={{
                        width: "250px",
                        height: "250px",
                        border: `4px solid ${bboxStyle.borderColor}`,
                        borderRadius: "12px",
                        boxShadow: `0 0 20px ${bboxStyle.borderColor}55`,
                        position: "relative",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                      }}
                    >
                      {bboxStyle.label && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-32px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: bboxStyle.borderColor,
                            color: "#fff",
                            padding: "4px 12px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {bboxStyle.label}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Spinner while camera initialises */}
                {showCamera && !videoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        Initializing camera…
                      </p>
                    </div>
                  </div>
                )}

                {/* Idle placeholder */}
                {!showCamera && !(scanResult?.imageSnapshot && !isScanning) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-800">
                    <span className="text-6xl mb-4">📹</span>
                    <p className="font-bold uppercase tracking-wider">
                      Camera Offline
                    </p>
                    <p className="text-xs mt-2 text-emerald-600">
                      Click "Start Scanner" to begin
                    </p>
                  </div>
                )}

                {/* Uploaded image preview */}
                {!showCamera && scanResult?.imageSnapshot && !isScanning && (
                  <img
                    src={scanResult.imageSnapshot}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <canvas ref={canvasRef} className="hidden" />

              {/* Buttons */}
              <div className="flex gap-3 mb-4">
                {!showCamera ? (
                  <>
                    <button
                      onClick={startCamera}
                      className="flex-1 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      ▶ Start Scanner
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      📁 Upload File
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="w-full py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-950 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    ⏹ Stop Scanner
                  </button>
                )}
              </div>

              {cameraError && (
                <p className="text-red-600 font-bold text-sm text-center bg-red-100 p-2 border-2 border-red-300">
                  ⚠️ {cameraError}
                </p>
              )}
            </div>

            {/* Live result card */}
            {scanResult && pointsConfig[scanResult.wasteType] && (
              <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
                <h3 className="text-xl font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
                  <span>🎯</span> Live Detection
                </h3>

                <div
                  className={`${pointsConfig[scanResult.wasteType].color} ${pointsConfig[scanResult.wasteType].textColor} border-4 border-emerald-950 p-4 mb-4 transition-colors duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">
                        {pointsConfig[scanResult.wasteType].icon}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider opacity-75">
                          Detected
                        </p>
                        <p className="text-2xl font-extrabold">
                          {pointsConfig[scanResult.wasteType].label}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-extrabold">
                        {pointsConfig[scanResult.wasteType].points}
                      </p>
                      <p className="text-xs uppercase tracking-wider opacity-75">
                        pts/unit
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t-2 border-current opacity-20" />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-bold">Confidence</span>
                    <span className="bg-black/10 px-2 py-1 font-bold">
                      {scanResult.confidence}%
                    </span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-sm font-extrabold uppercase tracking-wider text-emerald-950 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setQuantity((q) =>
                          Math.max(1, (isNaN(q) || q === "" ? 1 : q) - 1),
                        )
                      }
                      className="w-12 h-12 bg-emerald-100 border-4 border-emerald-950 font-bold text-xl hover:bg-emerald-200 transition-colors shadow-[3px_3px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      onBlur={() => {
                        if (!quantity || isNaN(quantity)) setQuantity(1);
                      }}
                      className="flex-1 h-12 text-center border-4 border-emerald-950 font-bold text-xl focus:outline-none focus:border-emerald-600"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        setQuantity((q) => (isNaN(q) || q === "" ? 1 : q) + 1)
                      }
                      className="w-12 h-12 bg-emerald-100 border-4 border-emerald-950 font-bold text-xl hover:bg-emerald-200 transition-colors shadow-[3px_3px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={addToList}
                  className="w-full py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  🔒 Lock In & Add to List
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Scanned items ─────────────────────────────────────── */}
          <div className="space-y-6">
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
                  <span>📋</span> Scanned Items
                </h3>
                <span className="bg-emerald-600 text-white px-3 py-1 font-bold text-sm">
                  {classifiedItems.length} items
                </span>
              </div>

              {classifiedItems.length === 0 ? (
                <div className="text-center py-12 bg-emerald-50 border-4 border-dashed border-emerald-200">
                  <span className="text-4xl mb-2 block">📸</span>
                  <p className="text-emerald-600 font-medium">
                    No items locked in yet
                  </p>
                  <p className="text-emerald-400 text-sm">
                    Start scanning to earn points!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto mb-4 pr-2">
                  {classifiedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 border-4 border-emerald-200 p-4 relative group"
                    >
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.wasteType}
                          className="w-16 h-16 object-cover border-2 border-emerald-300"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-emerald-950">
                                {pointsConfig[item.wasteType].icon}{" "}
                                {pointsConfig[item.wasteType].label}
                              </p>
                              <p className="text-xs text-emerald-600">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-xs text-gray-400">
                                {item.pointsPerUnit} pts/unit
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-extrabold text-emerald-600">
                                +{item.totalPoints}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {classifiedItems.length > 0 && (
                <div className="border-t-4 border-emerald-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-emerald-950">
                      Total Points:
                    </span>
                    <span className="text-4xl font-extrabold text-emerald-600">
                      {totalPoints}
                    </span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    <span>🚀</span> Schedule Pickup
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteClassification;
