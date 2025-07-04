import React, { useState } from "react";
import { Link, Zap, Menu, X } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiDocsUrl = apiBaseUrl.replace(/\/api$/, "") + "/api-docs";

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Link className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              <RouterLink to="/" className="text-blue-600">
                Shortly
              </RouterLink>
            </h1>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <HashLink
              className="text-gray-600 hover:text-blue-600 transition-colors font-semibold"
              to="/#features"
              smooth
            >
              Features
            </HashLink>
            <RouterLink
              to="/history"
              className="text-gray-600 hover:text-blue-600 transition-colors font-semibold"
            >
              History
            </RouterLink>
            <a
              href={apiDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>API Docs</span>
            </a>
          </nav>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Open menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg py-4 px-6 flex flex-col gap-4 animate-fade-in z-50">
            <HashLink
              to="/#features"
              className="text-gray-700 hover:text-blue-600 transition-colors text-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </HashLink>
            <RouterLink
              to="/history"
              className="text-gray-700 hover:text-blue-600 transition-colors text-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              History
            </RouterLink>
            <a
              href={apiDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium justify-center"
              onClick={() => setMobileOpen(false)}
            >
              <Zap className="w-5 h-5" />
              <span>API Docs</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
