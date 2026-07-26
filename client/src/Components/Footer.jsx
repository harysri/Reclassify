import React from "react";
import { Link } from "react-router-dom";

const SocialIcon = ({ type }) => {
  switch (type) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.5-.8 1.5-.8.9-1.6 2.4-1.1 3 .9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.4.1-3 0 0 1-.3 3.2 1.2a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.7.1 3 .8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
      );
    case "docs":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M7 3h8a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H7Zm1 2h6v2H8Zm0 4h6v2H8Zm0 4h4v2H8Z" />
        </svg>
      );
    default:
      return null;
  }
};

const Footer = ({ userRole = "guest" }) => {
  // Minimal links based on user role
  const getQuickLinks = () => {
    const common = [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ];

    if (userRole === "user") {
      return [
        ...common,
        { name: "Dashboard", path: "/user/dashboard" },
        { name: "Scanner", path: "/user/classify" },
      ];
    } else if (userRole === "driver") {
      return [
        ...common,
        { name: "Dashboard", path: "/driver/dashboard" },
        { name: "Schedule", path: "/driver/schedule" },
      ];
    } else if (userRole === "admin") {
      return [
        ...common,
        { name: "Admin", path: "/admin/dashboard" },
        { name: "Analytics", path: "/admin/analytics" },
      ];
    }
    return [
      ...common,
      { name: "Login", path: "/login" },
      { name: "Register", path: "/signup" },
    ];
  };

  const legal = [
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: "github", url: "https://github.com/reclassify" },
    { name: "Documentation", icon: "docs", url: "https://docs.reclassify.com" },
  ];

  return (
    <footer className="bg-emerald-950 text-white border-t-4 border-emerald-600">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-600 border-2 border-white flex items-center justify-center">
                <span className="text-xl">♻️</span>
              </div>
              <span className="text-xl font-extrabold tracking-tighter">
                RE-<span className="text-emerald-400">CLASSIFY</span>
              </span>
            </div>
            <p className="text-emerald-200 text-xs leading-relaxed">
              AI-powered waste classification for a sustainable future.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 mt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  to={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-emerald-800 border border-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:border-white transition-all"
                  aria-label={social.name}
                >
                  <span className="text-emerald-100">
                    <SocialIcon type={social.icon} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4 border-b-2 border-emerald-600 pb-2 inline-block">
              Links
            </h3>
            <ul className="space-y-2">
              {getQuickLinks().map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-emerald-200 hover:text-white text-xs uppercase tracking-wider transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-emerald-900 border-t border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-emerald-300 text-xs text-center md:text-left">
              © {new Date().getFullYear()} ReClassify. All rights reserved.
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 bg-emerald-600 border-2 border-emerald-400 flex items-center justify-center hover:bg-emerald-500 transition-all"
              aria-label="Back to top"
            >
              <span className="text-sm">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
