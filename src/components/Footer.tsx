import React from "react";
import { Link, Github, Twitter, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Link className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">URLShortener</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The most powerful URL shortening service with advanced features
              and analytics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  URL Shortening
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  QR Code Generator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Email Integration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Developers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href={`${base_url}-docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  SDK
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 URLShortener. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
