import React from "react";
import { Link } from "react-router-dom";

// Custom icons for the application
const Icons = {
  Scan: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 16.5h.75v.75h-.75v-.75zM16.5 13.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 16.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM16.5 19.5h.75v.75h-.75v-.75z"
      />
    </svg>
  ),
  Truck: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.75M16.5 18.75h-2.25m0-11.178c0-.621-.504-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v7.178m11.178-11.178c1.78.147 3.174 1.666 3.174 3.441v4.306c0 .621-.504 1.125-1.125 1.125h-.867m-7.14 0a1.125 1.125 0 01-1.125-1.125V9.75M16.5 18.75v-2.25m0-6.75a1.125 1.125 0 00-1.125-1.125h-3m3 3.375a1.125 1.125 0 01-1.125 1.125h-3m3 0a1.125 1.125 0 001.125 1.125V18"
      />
    </svg>
  ),
  Gift: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25A1.5 1.5 0 013 19.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-3a1.125 1.125 0 00-1.125-1.125H3.375A1.125 1.125 0 002.25 8.25v3c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  ),
  Camera: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
      />
    </svg>
  ),
  Calendar: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  ),
  MapPin: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  Trophy: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.375m4.125 0a3 3 0 01-3-3h.001M12 2.25v2.25m0 0h.003m-.003 0H9.375m2.625 0h.003m-.003 0v2.25m0-2.25h.003m-.003 0H9.375m2.625 0h.003"
      />
    </svg>
  ),
  ShoppingBag: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  ),
  CheckCircle: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Navigation: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
      />
    </svg>
  ),
  Wallet: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
      />
    </svg>
  ),
  ChartBar: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  Star: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  ),
  Leaf: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
      />
    </svg>
  ),
  Clock: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Shield: () => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
};

const PillarCard = ({ icon: Icon, title, description, items }) => (
  <div className="bg-white border-4 border-emerald-950 p-8 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
    <div className="bg-emerald-100 text-emerald-900 w-20 h-20 border-4 border-emerald-950 flex items-center justify-center mb-6">
      <Icon />
    </div>
    <h3 className="text-3xl font-extrabold text-emerald-950 mb-4 tracking-tight">
      {title}
    </h3>
    <p className="text-emerald-800 text-lg mb-6 leading-relaxed">
      {description}
    </p>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="bg-emerald-950 text-white px-4 py-1.5 text-sm font-bold tracking-wide uppercase"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const FeatureItem = ({ icon: Icon, title, description, theme }) => {
  const iconColors = {
    user: "bg-emerald-100 text-emerald-900 border-emerald-950",
    driver: "bg-blue-100 text-blue-900 border-blue-950",
  };

  return (
    <div className="flex gap-4 items-start">
      <div
        className={`w-12 h-12 border-4 flex-shrink-0 flex items-center justify-center ${iconColors[theme]}`}
      >
        <Icon />
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-sm opacity-80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const ReclassifyHome = () => {
  return (
    <div className="min-h-screen bg-[#fcfdfa] font-sans text-emerald-950">
      {/* Hero Section */}
      <section className="bg-emerald-50 border-b-4 border-emerald-950 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white border-2 border-emerald-950 px-4 py-1 rounded-full shadow-[4px_4px_0px_rgba(6,78,59,1)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-sm uppercase tracking-wider text-emerald-900">
                AI-Powered Waste Management
              </span>
            </div>
            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-emerald-950">
              RE-<span className="text-emerald-600">CLASSIFY</span>
            </h1>
            <p className="text-2xl text-emerald-800 max-w-xl leading-relaxed font-medium">
              Turn your waste into wealth. Our intelligent system scans, sorts,
              and rewards responsible disposal to build a cleaner planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link
                to="/login"
                className="px-10 py-5 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center"
              >
                Scan & Get Started
                <span className="ml-3">→</span>
              </Link>
              <Link
                to="/signup"
                className="px-10 py-5 bg-white border-4 border-emerald-950 text-emerald-950 font-extrabold text-lg uppercase tracking-widest shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center"
              >
                Join as Driver
              </Link>
            </div>
          </div>

          {/* Visual: Simulated AI Scan */}
          <div className="bg-white border-4 border-emerald-950 p-6 shadow-[12px_12px_0px_rgba(6,78,59,1)] relative aspect-square flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-emerald-950/5 flex flex-wrap gap-2 p-4 opacity-30">
              {Array(30)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 border-2 border-emerald-800 ${i % 3 === 0 ? "bg-emerald-200" : ""}`}
                  ></div>
                ))}
            </div>
            <div className="relative border-4 border-emerald-500 p-8 bg-white/90 backdrop-blur-sm z-10 text-center space-y-4">
              <div className="text-7xl">♻️</div>
              <div className="text-emerald-950 font-mono text-xl font-bold p-2 bg-emerald-100 border-2 border-emerald-950">
                [ SCANNING... ]
              </div>
              <div className="text-sm font-bold text-emerald-700 uppercase tracking-widest">
                Type: Plastic Bottle (PET)
              </div>
              <div className="text-xs font-mono text-emerald-900/60">
                Confidence: 98.7% | Reward: +15 PTS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundational Pillars */}
      <section className="py-28 px-6 md:px-12 bg-[#f4f6f0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-emerald-950 mb-6">
              Our Foundational Pillars
            </h2>
            <p className="text-xl text-emerald-800 font-medium leading-relaxed">
              Three core innovations designed to streamline waste management,
              engage communities, and drive environmental impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <PillarCard
              icon={Icons.Scan}
              title="AI Classification"
              description="Our deep learning models accurately identify waste types, ensuring everything goes to the right place."
              items={[
                "Plastic",
                "Paper",
                "Metal",
                "Glass",
                "Cardboard",
                "Trash",
              ]}
            />
            <PillarCard
              icon={Icons.Truck}
              title="Structured Pickup"
              description="Book seamless, scheduled collections from verified local drivers right from your doorstep."
              items={["Verified Drivers", "Scheduled Slots"]}
            />
            <PillarCard
              icon={Icons.Gift}
              title="Rewards E-Commerce"
              description="Convert your sorted waste into points and redeem them for exclusive, high-quality sustainable products."
              items={[
                "Gamified Experience",
                "Point System",
                "Recycled Goods",
                "Eco-Shop",
              ]}
            />
          </div>
        </div>
      </section>

      {/* User Module - Detailed Section */}
      <section className="py-28 px-6 md:px-12 bg-emerald-50 border-y-4 border-emerald-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border-2 border-emerald-950 px-4 py-2 mb-6 shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                <span className="text-2xl">👤</span>
                <span className="font-bold text-sm uppercase tracking-wider text-emerald-900">
                  For Conscious Disposers
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-emerald-950 mb-6">
                User Module
              </h2>
              <p className="text-xl text-emerald-800 font-medium leading-relaxed mb-8">
                Transform your recycling habits into rewards. Our comprehensive
                user experience combines AI-powered scanning, gamified tracking,
                and a curated marketplace of premium recycled products.
              </p>
              <div className="flex gap-4"></div>
            </div>

            {/* User Module Visual */}
            <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)]">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-emerald-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 border-2 border-emerald-950 rounded-full flex items-center justify-center">
                      <span className="text-xl">🌟</span>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-950">
                        Eco Warrior
                      </div>
                      <div className="text-sm text-emerald-600">Level 12</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-emerald-600">
                      2,450
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Points
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border-2 border-emerald-200 p-4 text-center">
                    <Icons.Leaf />
                    <div className="text-2xl font-bold text-emerald-800 mt-2">
                      45kg
                    </div>
                    <div className="text-xs uppercase tracking-wider text-emerald-600">
                      CO2 Saved
                    </div>
                  </div>
                  <div className="bg-emerald-50 border-2 border-emerald-200 p-4 text-center">
                    <Icons.Trophy />
                    <div className="text-2xl font-bold text-emerald-800 mt-2">
                      23
                    </div>
                    <div className="text-xs uppercase tracking-wider text-emerald-600">
                      Badges
                    </div>
                  </div>
                </div>

                <div className="border-2 border-emerald-200 p-4 bg-emerald-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-emerald-900">
                      Recent Scans
                    </span>
                    <span className="text-sm text-emerald-600">
                      +180 pts today
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Plastic Bottle (PET)</span>
                      <span className="font-bold text-emerald-600">
                        +15 pts
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Cardboard Box</span>
                      <span className="font-bold text-emerald-600">
                        +25 pts
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Aluminum Can</span>
                      <span className="font-bold text-emerald-600">
                        +10 pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-emerald-100 w-14 h-14 border-4 border-emerald-950 flex items-center justify-center mb-4">
                <Icons.Camera />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950 mb-2">
                AI Waste Scanner
              </h3>
              <p className="text-emerald-800 text-sm leading-relaxed">
                Point your camera at any waste item for instant AI
                classification. Get accurate categorization with confidence
                scores and disposal instructions.
              </p>
            </div>

            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-emerald-100 w-14 h-14 border-4 border-emerald-950 flex items-center justify-center mb-4">
                <Icons.Calendar />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950 mb-2">
                Smart Scheduling
              </h3>
              <p className="text-emerald-800 text-sm leading-relaxed">
                Book pickups at your convenience. Choose time slots that work
                for you and get real-time notifications when your driver is
                approaching.
              </p>
            </div>

            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-emerald-100 w-14 h-14 border-4 border-emerald-950 flex items-center justify-center mb-4">
                <Icons.Trophy />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950 mb-2">
                Gamified Rewards
              </h3>
              <p className="text-emerald-800 text-sm leading-relaxed">
                Earn points for every item scanned and collected. Unlock badges,
                climb leaderboards, and achieve milestones that track your
                environmental impact.
              </p>
            </div>

            <div className="bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-emerald-100 w-14 h-14 border-4 border-emerald-950 flex items-center justify-center mb-4">
                <Icons.ShoppingBag />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950 mb-2">
                Eco-Shop
              </h3>
              <p className="text-emerald-800 text-sm leading-relaxed">
                Redeem points for high-quality recycled products. From upcycled
                fashion to sustainable home goods, shop consciously with your
                earned credits.
              </p>
            </div>
          </div>

          {/* User Journey */}
          <div className="mt-16 bg-white border-4 border-emerald-950 p-8 shadow-[8px_8px_0px_rgba(6,78,59,1)]">
            <h3 className="text-2xl font-extrabold text-emerald-950 mb-8 text-center">
              How It Works
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                  1
                </div>
                <h4 className="font-bold text-lg mb-2">Scan Your Waste</h4>
                <p className="text-sm text-emerald-800">
                  Use AI camera to identify and classify your recyclable items
                  instantly.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                  2
                </div>
                <h4 className="font-bold text-lg mb-2">Earn Points</h4>
                <p className="text-sm text-emerald-800">
                  Get rewarded for every verified item. Track your impact
                  dashboard.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                  3
                </div>
                <h4 className="font-bold text-lg mb-2">Schedule Pickup</h4>
                <p className="text-sm text-emerald-800">
                  Book a verified driver to collect your sorted waste from your
                  doorstep.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white border-4 border-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                  4
                </div>
                <h4 className="font-bold text-lg mb-2">Shop Rewards</h4>
                <p className="text-sm text-emerald-800">
                  Redeem points for premium recycled products in our curated
                  marketplace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Module - Detailed Section */}
      <section className="py-28 px-6 md:px-12 bg-blue-50 border-b-4 border-blue-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 md:order-1">
              {/* Driver Module Visual */}
              <div className="bg-white border-4 border-blue-950 p-8 shadow-[12px_12px_0px_rgba(23,37,84,1)]">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-blue-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 border-2 border-blue-950 rounded-full flex items-center justify-center">
                        <span className="text-xl">🚛</span>
                      </div>
                      <div>
                        <div className="font-bold text-blue-950">
                          Driver Dashboard
                        </div>
                        <div className="text-sm text-blue-600">Active Now</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 border-2 border-green-800 text-green-800 text-xs font-bold uppercase rounded-full">
                      Online
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 p-4 text-center">
                      <Icons.CheckCircle />
                      <div className="text-2xl font-bold text-blue-800 mt-2">
                        12
                      </div>
                      <div className="text-xs uppercase tracking-wider text-blue-600">
                        Today's Pickups
                      </div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-200 p-4 text-center">
                      <Icons.Wallet />
                      <div className="text-2xl font-bold text-blue-800 mt-2">
                        ₹1,240
                      </div>
                      <div className="text-xs uppercase tracking-wider text-blue-600">
                        Earned Today
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-blue-200 p-4 bg-blue-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-blue-900">
                        Next Pickup
                      </span>
                      <span className="text-sm text-blue-600">2.5 km away</span>
                    </div>
                    <div className="bg-white border-2 border-blue-200 p-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">Priya Sharma</span>
                        <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                          Zone 4
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        123 Green Avenue, Apt 4B
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-green-100 px-2 py-1 rounded">
                          Plastic: 5kg
                        </span>
                        <span className="bg-yellow-100 px-2 py-1 rounded">
                          Paper: 3kg
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 font-bold uppercase text-sm tracking-wider border-2 border-blue-800 shadow-[4px_4px_0px_rgba(23,37,84,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
                      Navigate to Pickup
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-white border-2 border-blue-950 px-4 py-2 mb-6 shadow-[4px_4px_0px_rgba(23,37,84,1)]">
                <span className="text-2xl">🚛</span>
                <span className="font-bold text-sm uppercase tracking-wider text-blue-900">
                  For Logistics Partners
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-blue-950 mb-6">
                Driver Module
              </h2>
              <p className="text-xl text-blue-800 font-medium leading-relaxed mb-8">
                Maximize your earnings with intelligent route optimization,
                real-time job management, and instant verification tools
                designed for waste collection professionals.
              </p>
            </div>
          </div>

          {/* Driver Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-4 border-blue-950 p-6 shadow-[8px_8px_0px_rgba(23,37,84,1)] hover:shadow-[12px_12px_0px_rgba(23,37,84,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-blue-100 w-14 h-14 border-4 border-blue-950 flex items-center justify-center mb-4">
                <Icons.CheckCircle />
              </div>
              <h3 className="text-xl font-extrabold text-blue-950 mb-2">
                Waste Verification
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Built-in verification tools to confirm waste authenticity at
                pickup. Photo capture and digital signatures for secure
                transactions.
              </p>
            </div>

            <div className="bg-white border-4 border-blue-950 p-6 shadow-[8px_8px_0px_rgba(23,37,84,1)] hover:shadow-[12px_12px_0px_rgba(23,37,84,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-blue-100 w-14 h-14 border-4 border-blue-950 flex items-center justify-center mb-4">
                <Icons.Clock />
              </div>
              <h3 className="text-xl font-extrabold text-blue-950 mb-2">
                Live Updates
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Real-time status updates and communication with users. Instant
                notifications for new pickup requests and schedule changes.
              </p>
            </div>

            <div className="bg-white border-4 border-blue-950 p-6 shadow-[8px_8px_0px_rgba(23,37,84,1)] hover:shadow-[12px_12px_0px_rgba(23,37,84,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-blue-100 w-14 h-14 border-4 border-blue-950 flex items-center justify-center mb-4">
                <Icons.ChartBar />
              </div>
              <h3 className="text-xl font-extrabold text-blue-950 mb-2">
                Earnings Dashboard
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Track daily earnings, completion rates, and performance metrics.
                Weekly payouts with detailed transaction history.
              </p>
            </div>
          </div>

          {/* Driver Benefits */}
          <div className="mt-16 bg-white border-4 border-blue-950 p-8 shadow-[8px_8px_0px_rgba(23,37,84,1)]">
            <h3 className="text-2xl font-extrabold text-blue-950 mb-8 text-center">
              Why Drive With Us
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 border-4 border-blue-950 flex items-center justify-center mx-auto mb-4">
                  <Icons.Wallet />
                </div>
                <h4 className="font-bold text-lg mb-2 text-blue-950">
                  Competitive Earnings
                </h4>
                <p className="text-sm text-blue-800">
                  Earn per pickup with bonus incentives for high-performance and
                  consistent service quality.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 border-4 border-blue-950 flex items-center justify-center mx-auto mb-4">
                  <Icons.MapPin />
                </div>
                <h4 className="font-bold text-lg mb-2 text-blue-950">
                  Flexible Zones
                </h4>
                <p className="text-sm text-blue-800">
                  Choose your preferred operating areas. Work when you want with
                  no minimum hour requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 border-4 border-blue-950 flex items-center justify-center mx-auto mb-4">
                  <Icons.Shield />
                </div>
                <h4 className="font-bold text-lg mb-2 text-blue-950">
                  Verified & Secure
                </h4>
                <p className="text-sm text-blue-800">
                  All users are verified. Digital proof of service protects you
                  from disputes and ensures payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards E-Commerce Showcase */}
      <section className="py-28 px-6 md:px-12 bg-[#f4f6f0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-emerald-950 mb-6">
              The Rewards Marketplace
            </h2>
            <p className="text-xl text-emerald-800 font-medium leading-relaxed">
              Your waste has value. Exchange your earned points for premium
              sustainable products crafted from recycled materials.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border-4 border-emerald-950 overflow-hidden shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group">
              <div className="h-48 bg-emerald-100 border-b-4 border-emerald-950 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                🎒
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-extrabold text-emerald-950">
                    Recycled Backpack
                  </h3>
                  <span className="bg-emerald-600 text-white px-3 py-1 text-sm font-bold">
                    500 pts
                  </span>
                </div>
                <p className="text-emerald-800 text-sm mb-4">
                  Made from 35 recycled plastic bottles. Water-resistant and
                  durable.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-600 uppercase tracking-wider">
                  <Icons.Leaf />
                  <span>35 bottles diverted</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-emerald-950 overflow-hidden shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group">
              <div className="h-48 bg-emerald-100 border-b-4 border-emerald-950 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                👕
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-extrabold text-emerald-950">
                    Organic Cotton Tee
                  </h3>
                  <span className="bg-emerald-600 text-white px-3 py-1 text-sm font-bold">
                    350 pts
                  </span>
                </div>
                <p className="text-emerald-800 text-sm mb-4">
                  100% organic cotton with natural dyes. Zero waste
                  manufacturing.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-600 uppercase tracking-wider">
                  <Icons.Leaf />
                  <span>Zero water waste</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-emerald-950 overflow-hidden shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group">
              <div className="h-48 bg-emerald-100 border-b-4 border-emerald-950 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                🏠
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-extrabold text-emerald-950">
                    Home Composter
                  </h3>
                  <span className="bg-emerald-600 text-white px-3 py-1 text-sm font-bold">
                    800 pts
                  </span>
                </div>
                <p className="text-emerald-800 text-sm mb-4">
                  Compact kitchen composter made from recycled ocean plastics.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-600 uppercase tracking-wider">
                  <Icons.Leaf />
                  <span>Ocean plastic recovered</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/signup"
              className="px-10 py-5 bg-emerald-600 text-white font-extrabold text-lg uppercase tracking-widest shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all inline-flex items-center justify-center"
            >
              Browse All Rewards
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReclassifyHome;
