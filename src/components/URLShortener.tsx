import React, { useState } from "react";
import { Link, QrCode, Send, Copy, BarChart3, Mail } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link as RouterLink } from "react-router-dom";

interface ShortenedUrl {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  urlCode: string;
  qrCode: string;
  clicks: number;
  createdAt: string;
}

const URLShortener: React.FC = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShortenedUrl | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiBaseUrl}/shorten`, {
        originalUrl: url,
        email: email || undefined,
      });

      if (response.data.success) {
        setResult(response.data.data);
        toast.success("URL shortened successfully!");
        if (email) {
          toast.success("Email sent with your shortened URL!");
        }
      } else {
        toast.error(response.data.error || "Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const downloadQRCode = () => {
    if (!result) return;

    const link = document.createElement("a");
    link.download = `qr-code-${result.urlCode}.png`;
    link.href = result.qrCode;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Shorten Your URLs
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {" "}
            Instantly
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create short links, generate QR codes, and track your URLs with our
          powerful shortening service.
        </p>
        <div className="mt-6">
          <RouterLink
            to="/history"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
          >
            View History
          </RouterLink>
        </div>
      </div>
      {/* URL Input Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here (e.g., https://example.com)"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
              required
            />
          </div>

          {/* Email toggle */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setShowEmail(!showEmail)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Send to email</span>
            </button>
          </div>

          {showEmail && (
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (optional)"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Shorten URL</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Shortened URL
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* URL Results */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original URL
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={result.originalUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(result.originalUrl)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short URL
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={result.shortUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium"
                  />
                  <button
                    onClick={() => copyToClipboard(result.shortUrl)}
                    className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>{result.clicks} clicks</span>
                </div>
                <div>
                  Created: {new Date(result.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <img
                  src={result.qrCode}
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <button
                onClick={downloadQRCode}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Download QR Code</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLShortener;
