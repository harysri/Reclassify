import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

// ── Route config per role ──────────────────────────────────────────────────
const ROUTES = {
  guest: [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Register", path: "/signup", icon: "📝" },
    { name: "Login", path: "/login", icon: "🔐" },
  ],
  user: [
    { name: "Dashboard", path: "/user/dashboard", icon: "📊" },
    { name: "Scan & Classify", path: "/user/classify", icon: "♻️" },
    { name: "Schedule Pickup", path: "/user/schedule-pickup", icon: "📅" },
    { name: "Shop", path: "/user/shop", icon: "🛍️" },
  ],
  driver: [
    { name: "Dashboard", path: "/driver/dashboard", icon: "🚛" },
    { name: "History", path: "/driver/history", icon: "📜" },
  ],
  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: "⚙️" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Drivers", path: "/admin/drivers", icon: "🚛" },
    { name: "Pickups", path: "/admin/pickups", icon: "📦" },
    { name: "Products", path: "/admin/products", icon: "🏷️" },
    { name: "Orders", path: "/admin/orders", icon: "🛒" },
  ],
};

const ROLE_COLORS = {
  user: {
    badge: "bg-emerald-600",
    border: "border-emerald-950",
    avatar: "bg-emerald-100 text-emerald-700",
  },
  driver: {
    badge: "bg-blue-600",
    border: "border-blue-950",
    avatar: "bg-blue-100    text-blue-700",
  },
  admin: {
    badge: "bg-purple-600",
    border: "border-purple-950",
    avatar: "bg-purple-100  text-purple-700",
  },
  guest: {
    badge: "bg-gray-600",
    border: "border-gray-950",
    avatar: "bg-gray-100    text-gray-700",
  },
};

const ROLE_LABELS = {
  user: "Eco User",
  driver: "Driver",
  admin: "Admin",
  guest: "Guest",
};
const PROFILE_PATHS = {
  user: "/user/profile",
  driver: "/driver/profile",
  admin: "/admin/dashboard",
};

const getInitials = (name) =>
  name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

// ── Navbar ─────────────────────────────────────────────────────────────────
const Navbar = () => {
  // FIX: reads from AuthContext — updates instantly on login/logout, no refresh needed
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const role = user?.role ?? "guest";
  const colors = ROLE_COLORS[role] ?? ROLE_COLORS.guest;
  const label = ROLE_LABELS[role] ?? "Guest";
  const navRoutes = ROUTES[role] ?? ROUTES.guest;

  const handleLogout = () => {
    logout(); // clears context + localStorage
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/login"); // React Router navigate — no full reload
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-emerald-950 shadow-[0_4px_0px_rgba(6,78,59,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(6,78,59,1)]">
              <span className="text-2xl">♻️</span>
            </div>
            <span className="hidden sm:block text-2xl font-extrabold tracking-tighter text-emerald-950">
              RE-<span className="text-emerald-600">CLASSIFY</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-950 border-2 border-transparent hover:border-emerald-950 hover:bg-emerald-50 transition-all whitespace-nowrap"
              >
                <span className="mr-1">{route.icon}</span>
                {route.name}
              </Link>
            ))}
          </div>

          {/* Right: badge + profile / get-started */}
          <div className="flex items-center gap-3">
            {/* Role badge */}
            <div
              className={`hidden sm:flex items-center px-3 py-1.5 ${colors.badge} text-white border-2 border-emerald-950 shadow-[3px_3px_0px_rgba(6,78,59,1)]`}
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                {label}
              </span>
            </div>

            {/* Authenticated: avatar + dropdown */}
            {role !== "guest" && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen((o) => !o)}
                  className={`w-10 h-10 ${colors.avatar} border-4 border-emerald-950 flex items-center justify-center font-bold text-base shadow-[3px_3px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`}
                >
                  {user?.fullName ? getInitials(user.fullName) : "?"}
                </button>

                {isProfileOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={closeAll} />

                    {/* Dropdown panel */}
                    <div className="absolute right-0 mt-2 w-72 bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_rgba(6,78,59,1)] z-50">
                      {/* User info header */}
                      <div className="p-4 border-b-2 border-emerald-100 bg-emerald-50">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${colors.avatar} border-2 border-emerald-950 flex items-center justify-center font-bold text-xl`}
                          >
                            {getInitials(user?.fullName)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-emerald-950 truncate">
                              {user?.fullName ?? "User"}
                            </p>
                            <p className="text-xs text-emerald-600 truncate">
                              {user?.email ?? ""}
                            </p>
                            <span
                              className={`inline-block mt-1 text-xs px-2 py-0.5 ${colors.badge} text-white font-bold uppercase tracking-wider`}
                            >
                              {label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <DropdownLinks
                          role={role}
                          user={user}
                          onClose={closeAll}
                        />

                        <hr className="my-2 border-emerald-200" />

                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-600 transition-all"
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Guest CTA */}
            {role === "guest" && (
              <Link
                to="/login"
                className="hidden sm:block px-6 py-2.5 bg-emerald-600 text-white font-bold text-sm uppercase tracking-wider border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Get Started
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="lg:hidden w-12 h-12 bg-emerald-100 border-4 border-emerald-950 flex items-center justify-center hover:bg-emerald-200 shadow-[4px_4px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-full h-1 bg-emerald-950 transition-all duration-300 ${isMenuOpen ? "top-2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-2 w-full h-1 bg-emerald-950 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 w-full h-1 bg-emerald-950 transition-all duration-300 ${isMenuOpen ? "top-2 -rotate-45" : "top-4"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden border-t-4 border-emerald-950 bg-white overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 py-6 space-y-3">
          {/* Mobile user card */}
          {role !== "guest" && (
            <div
              className={`mb-4 p-4 ${colors.avatar} border-4 border-emerald-950 shadow-[4px_4px_0px_rgba(6,78,59,1)]`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 ${colors.avatar} border-2 border-emerald-950 flex items-center justify-center font-bold text-2xl`}
                >
                  {getInitials(user?.fullName)}
                </div>
                <div>
                  <p className="font-bold text-emerald-950">
                    {user?.fullName ?? "User"}
                  </p>
                  <p className="text-xs text-emerald-700">
                    {user?.email ?? ""}
                  </p>
                  <span
                    className={`inline-block mt-1 text-xs px-2 py-0.5 ${colors.badge} text-white font-bold`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Main nav links */}
          {navRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={closeAll}
              className="block px-4 py-3 text-lg font-bold text-emerald-950 border-4 border-emerald-200 hover:border-emerald-950 hover:bg-emerald-50 transition-all shadow-[4px_4px_0px_rgba(6,78,59,0.1)] hover:shadow-[4px_4px_0px_rgba(6,78,59,1)]"
            >
              <span className="mr-3 text-2xl">{route.icon}</span>
              {route.name}
            </Link>
          ))}

          {/* Authenticated mobile extras */}
          {role !== "guest" && (
            <>
              <hr className="my-4 border-emerald-200 border-2" />
              <MobileLinks role={role} user={user} onClose={closeAll} />
              <Link
                to={PROFILE_PATHS[role] ?? "/"}
                onClick={closeAll}
                className="block px-4 py-3 text-lg font-bold text-emerald-950 border-4 border-emerald-200 hover:border-emerald-950 hover:bg-emerald-50 transition-all"
              >
                <span className="mr-3 text-2xl">👤</span> My Profile
              </Link>
              {role === "driver" && user?.isVerified === false && (
                <div className="px-4 py-2 text-xs text-yellow-700 bg-yellow-50 border-2 border-yellow-300">
                  ⏳ Account awaiting admin verification
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-lg font-bold text-red-600 border-4 border-red-200 hover:border-red-600 hover:bg-red-50 transition-all"
              >
                <span className="mr-3 text-2xl">🚪</span> Logout
              </button>
            </>
          )}

          {/* Guest mobile CTA */}
          {role === "guest" && (
            <>
              <hr className="my-4 border-emerald-200 border-2" />
              <Link
                to="/signup"
                onClick={closeAll}
                className="block w-full text-center px-6 py-4 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              >
                Join Now 🚀
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ── Dropdown link sets per role (desktop) ──────────────────────────────────
const DropdownLinks = ({ role, user, onClose }) => {
  const items = {
    user: [
      {
        path: "/user/reward-tracker",
        label: `Rewards (${user?.rewardPoints ?? 0} pts)`,
        icon: "💎",
      },
      { path: "/user/cart", label: "My Cart", icon: "🛒" },
      { path: "/user/order-history", label: "My Orders", icon: "📦" },
      { path: "/user/pickup-history", label: "Pickup History", icon: "📜" },
      { path: "/user/profile", label: "My Profile", icon: "👤" },
    ],
    driver: [
      { path: "/driver/dashboard", label: "Dashboard", icon: "🚛" },
      { path: "/driver/history", label: "Pickup History", icon: "📜" },
      { path: "/driver/profile", label: "My Profile", icon: "👤" },
    ],
    admin: [
      { path: "/admin/users", label: "Manage Users", icon: "👥" },
      { path: "/admin/drivers", label: "Manage Drivers", icon: "🚛" },
      { path: "/admin/pickups", label: "Manage Pickups", icon: "📦" },
      { path: "/admin/products", label: "Manage Products", icon: "🏷️" },
      { path: "/admin/orders", label: "Manage Orders", icon: "🛒" },
    ],
  };

  return (
    <>
      {(items[role] ?? []).map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-emerald-950 hover:bg-emerald-50 border-2 border-transparent hover:border-emerald-950 transition-all"
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
      {role === "driver" && user?.isVerified === false && (
        <div className="mx-4 mt-2 mb-1 px-3 py-2 text-xs text-yellow-700 bg-yellow-50 border border-yellow-300">
          ⏳ Awaiting admin verification
        </div>
      )}
    </>
  );
};

// ── Mobile-only extra links ────────────────────────────────────────────────
const MobileLinks = ({ role, user, onClose }) => {
  if (role === "user")
    return (
      <>
        {[
          {
            path: "/user/rewards",
            label: `Rewards (${user?.rewardPoints ?? 0} pts)`,
            icon: "💎",
          },
          { path: "/user/cart", label: "Cart", icon: "🛒" },
          { path: "/user/order-history", label: "Orders", icon: "📦" },
          { path: "/user/pickup-history", label: "Pickup History", icon: "📜" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="block px-4 py-3 text-lg font-bold text-emerald-950 border-4 border-emerald-200 hover:border-emerald-950 hover:bg-emerald-50 transition-all"
          >
            <span className="mr-3 text-2xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </>
    );
  return null; // driver and admin have enough links in the main nav
};

export default Navbar;
