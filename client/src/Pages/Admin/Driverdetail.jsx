import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

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

// ── Info Row Component ──────────────────────────────────────────────────────
const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start gap-3 p-4 bg-emerald-50 border-2 border-emerald-200">
    <span className="text-2xl flex-shrink-0">{icon}</span>
    <div className="min-w-0 flex-1">
      <p className="font-bold text-emerald-950 text-sm uppercase tracking-wider">
        {label}
      </p>
      <p className="text-emerald-700 font-medium mt-0.5 break-words">
        {value || "—"}
      </p>
    </div>
  </div>
);

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ isVerified }) => {
  if (isVerified) {
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-2 border-4 border-emerald-950">
        <span>✓</span> Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-2 border-4 border-amber-700">
      <span>⏳</span> Pending Verification
    </span>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
const DriverDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // ── Fetch driver details ──────────────────────────────────────────────────
  const fetchDriver = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/drivers/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if (res.status === 404) {
          throw new Error("Driver not found");
        }
        throw new Error("Failed to load driver details");
      }

      const data = await res.json();
      setDriver(data.driver);
    } catch (err) {
      setError(err.message || "Failed to load driver details.");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchDriver();
  }, [fetchDriver]);

  // ── Toggle verification status ──────────────────────────────────────────────
  const handleToggleVerification = async () => {
    if (!driver) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/drivers/${id}/verify`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isVerified: !driver.isVerified }),
      });

      if (!res.ok) throw new Error("Failed to update verification status");

      const data = await res.json();
      setDriver((prev) => ({ ...prev, isVerified: data.driver.isVerified }));
    } catch (err) {
      setError(err.message || "Failed to update verification status.");
    } finally {
      setActionLoading(false);
    }
  };

  // ── Delete driver ───────────────────────────────────────────────────────────
  const handleDeleteDriver = async () => {
    if (
      !window.confirm(
        "Are you sure? This will permanently delete this driver account.",
      )
    ) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/drivers/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete driver");

      navigate("/admin/drivers");
    } catch (err) {
      setError(err.message || "Failed to delete driver.");
      setActionLoading(false);
    }
  };

  // ── Error State ────────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center px-4">
        <div className="bg-white border-4 border-red-500 p-8 shadow-[8px_8px_0px_rgba(239,68,68,1)] text-center max-w-sm w-full">
          <span className="text-5xl block mb-4">⚠️</span>
          <p className="font-extrabold text-red-600 text-xl mb-2">
            {error === "Driver not found" ? "Driver Not Found" : "Error"}
          </p>
          <p className="text-red-400 text-sm mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/drivers")}
              className="flex-1 py-3 bg-white text-emerald-950 font-bold uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              ← All Drivers
            </button>
            <button
              onClick={fetchDriver}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-4 border-red-900 shadow-[4px_4px_0px_rgba(127,29,29,1)] hover:shadow-[2px_2px_0px_rgba(127,29,29,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-6 w-32 mb-6 rounded" />
          <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
            <div className="flex items-center gap-6 mb-8">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="space-y-3 flex-1">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfdfa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/admin/drivers"
            className="text-emerald-600 font-bold hover:text-emerald-950 transition-colors flex items-center gap-1 text-sm uppercase tracking-wider"
          >
            ← Back to Drivers
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <h1 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
            Driver <span className="text-emerald-600">Profile</span>
          </h1>
          <StatusBadge isVerified={driver?.isVerified} />
        </div>

        {/* Main Card */}
        <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
          {/* Driver Header */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b-4 border-emerald-100">
            {/* Avatar */}
            <div className="w-24 h-24 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center flex-shrink-0 shadow-[6px_6px_0px_rgba(6,78,59,1)]">
              <span className="text-4xl font-extrabold text-white">
                {driver?.fullName?.charAt(0)?.toUpperCase() || "?"}
              </span>
            </div>

            {/* Basic Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-extrabold text-emerald-950 mb-1">
                {driver?.fullName}
              </h2>
              <p className="font-mono text-sm text-emerald-400 mb-2">
                ID: {driver?._id || id}
              </p>
              <p className="text-emerald-600 font-medium">
                <span className="font-bold">Work Area:</span>{" "}
                {driver?.place || "Not specified"}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            <InfoRow icon="📧" label="Email Address" value={driver?.email} />
            <InfoRow
              icon="📱"
              label="Phone Number"
              value={driver?.phoneNumber}
            />
            <InfoRow icon="🏠" label="Address" value={driver?.address} />
            <InfoRow
              icon="📍"
              label="Work Location (Place)"
              value={driver?.place}
            />
            <InfoRow
              icon="🪪"
              label="License Number"
              value={driver?.licenseNumber}
            />
            <InfoRow
              icon="📅"
              label="Member Since"
              value={
                driver?.createdAt
                  ? new Date(driver.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "—"
              }
            />
          </div>

          {/* Stats Section */}
          <div className="bg-emerald-50 border-4 border-emerald-200 p-5 mb-8">
            <h3 className="text-lg font-extrabold text-emerald-950 mb-4 uppercase tracking-wider">
              Activity Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-extrabold text-emerald-600">
                  {driver?.completedPickups?.toLocaleString() || "0"}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mt-1">
                  Completed Pickups
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-emerald-600">
                  {driver?.totalPickups?.toLocaleString() || "0"}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mt-1">
                  Total Pickups
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-emerald-600">
                  {driver?.rating?.toFixed(1) || "—"}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mt-1">
                  Rating
                </p>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="border-t-4 border-emerald-100 pt-6">
            <h3 className="text-lg font-extrabold text-emerald-950 mb-4 uppercase tracking-wider">
              Admin Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              {/* Verify/Unverify Button */}
              <button
                onClick={handleToggleVerification}
                disabled={actionLoading}
                className={`flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all flex items-center justify-center gap-2
                  ${
                    actionLoading
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : driver?.isVerified
                        ? "bg-amber-500 text-white border-amber-700 shadow-[4px_4px_0px_rgba(180,83,9,1)] hover:shadow-[2px_2px_0px_rgba(180,83,9,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                        : "bg-emerald-600 text-white border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                  }`}
              >
                {actionLoading ? (
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : driver?.isVerified ? (
                  <>
                    <span>✕</span> Revoke Verification
                  </>
                ) : (
                  <>
                    <span>✓</span> Verify Driver
                  </>
                )}
              </button>

              {/* View Pickups Button */}
              <Link
                to={`/admin/drivers/${id}/pickups`}
                className="flex-1 py-4 bg-white text-emerald-950 font-extrabold text-base uppercase tracking-widest border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
              >
                View Pickups →
              </Link>

              {/* Delete Button */}
              <button
                onClick={handleDeleteDriver}
                disabled={actionLoading}
                className={`flex-1 py-4 font-extrabold text-base uppercase tracking-widest border-4 transition-all
                  ${
                    actionLoading
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-red-50 text-red-700 border-red-300 shadow-[4px_4px_0px_rgba(254,202,202,1)] hover:shadow-[2px_2px_0px_rgba(254,202,202,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                  }`}
              >
                🗑️ Delete Driver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetail;
