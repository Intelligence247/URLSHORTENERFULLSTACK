import React from 'react';
import { Link, Zap } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Link className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              URL<span className="text-blue-600">Shortener</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#api" className="text-gray-600 hover:text-blue-600 transition-colors">
              API
            </a>
            <RouterLink to="/history" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">
              History
            </RouterLink>
            <a href={`${apiBaseUrl.replace(/\/api$/, '')}/api-docs`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Zap className="w-4 h-4" />
              <span>API Docs</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;