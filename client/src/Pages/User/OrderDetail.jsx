import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-emerald-100 border-2 border-emerald-200 ${className}`}
  />
);

const STATUS_CONFIG = {
  delivered: {
    label: "Delivered",
    classes: "bg-emerald-600 text-white border-emerald-950",
  },
  shipped: {
    label: "Shipped",
    classes: "bg-blue-600 text-white border-blue-950",
  },
  processing: {
    label: "Processing",
    classes: "bg-yellow-500 text-white border-yellow-800",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-500 text-white border-red-900",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? {
    label: status,
    classes: "bg-gray-500 text-white border-gray-800",
  };
  return (
    <span
      className={`px-4 py-2 font-bold uppercase text-sm tracking-wider border-4 ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
};

const STATUS_ORDER = ["processing", "shipped", "delivered"];

const StatusTimeline = ({ status }) => {
  const currentIdx = STATUS_ORDER.indexOf(status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="bg-red-50 border-4 border-red-200 p-4 text-center">
        <span className="text-2xl mr-2">❌</span>
        <span className="font-extrabold text-red-700 uppercase tracking-wider">
          Order Cancelled
        </span>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 border-4 border-emerald-200 p-4">
      <div className="flex items-center justify-between">
        {STATUS_ORDER.map((step, idx) => {
          const isCompleted = currentIdx >= idx;
          const isCurrent = currentIdx === idx;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-4 flex items-center justify-center text-lg font-extrabold transition-all
                    ${
                      isCompleted
                        ? "bg-emerald-600 border-emerald-950 text-white"
                        : "bg-white border-emerald-300 text-emerald-300"
                    }
                    ${isCurrent ? "ring-4 ring-emerald-300" : ""}`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider mt-1
                    ${isCompleted ? "text-emerald-700" : "text-emerald-300"}`}
                >
                  {step}
                </span>
              </div>
              {idx < STATUS_ORDER.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full
                    ${isCompleted && currentIdx > idx ? "bg-emerald-600" : "bg-emerald-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if (res.status === 404) throw new Error("Order not found");
        if (res.status === 403) throw new Error("Access denied");
        throw new Error("Failed to load order");
      }

      const data = await res.json();
      setOrder(data.order);
    } catch (err) {
      setError(err.message || "Failed to load order.");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const itemCount = order?.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-64 w-full border-4 border-emerald-200 rounded" />
          <Skeleton className="h-48 w-full border-4 border-emerald-200 rounded" />
          <Skeleton className="h-32 w-full border-4 border-emerald-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-2">
            {error === "Order not found"
              ? "Order not found"
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
              onClick={fetchOrder}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 font-bold hover:text-emerald-950 transition-colors flex items-center gap-1"
          >
            ← Back
          </button>
          <StatusBadge status={order.status} />
        </div>

        {/* Order Meta Card */}
        <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest mb-1">
                Order ID
              </p>
              <p className="font-mono font-bold text-emerald-950 text-lg break-all">
                {order.id}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest mb-1">
                Order Date
              </p>
              <p className="font-bold text-emerald-950">
                {formatDateTime(order.date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest mb-1">
                Customer
              </p>
              <p className="font-bold text-emerald-950">{order.userName}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest mb-1">
                Delivery Address
              </p>
              <p className="font-bold text-emerald-950">
                {order.deliveryAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mb-6">
          <StatusTimeline status={order.status} />
        </div>

        {/* Items Card */}
        <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] mb-6">
          <h2 className="text-xl font-extrabold text-emerald-950 mb-4 uppercase tracking-wider">
            Items Ordered
          </h2>

          <div className="divide-y-4 divide-emerald-100">
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                {/* Image */}
                <div className="w-14 h-14 bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden rounded">
                  {item.image?.startsWith("http") ||
                  item.image?.startsWith("/") ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    item.image || "🛍️"
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-emerald-950 truncate text-base">
                    {item.name}
                  </p>
                  <p className="text-sm text-emerald-500 font-medium">
                    {item.quantity} unit{item.quantity !== 1 ? "s" : ""} ×{" "}
                    {item.points.toLocaleString()} pts
                  </p>
                </div>

                {/* Subtotal */}
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider">
                    Subtotal
                  </p>
                  <p className="text-lg font-extrabold text-emerald-600">
                    {item.subtotal.toLocaleString()} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-emerald-600 border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-emerald-100 font-bold uppercase tracking-wider text-sm">
                Total Items
              </p>
              <p className="text-2xl font-extrabold text-white">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 font-bold uppercase tracking-wider text-sm">
                Total Points Spent
              </p>
              <p className="text-3xl font-extrabold text-white">
                {order.totalPoints.toLocaleString()} pts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
