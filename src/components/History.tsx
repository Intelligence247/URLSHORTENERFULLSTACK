import React, { useEffect, useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

interface UrlHistoryItem {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
}

const ITEMS_PER_PAGE = 10;

const History: React.FC = () => {
  const [history, setHistory] = useState<UrlHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHistory(data.data);
        } else {
          setError("Failed to fetch history");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch history");
        setLoading(false);
      });
  }, []);

  // Derived stats
  const totalUrls = history.length;
  const totalClicks = useMemo(() => history.reduce((sum, item) => sum + item.clicks, 0), [history]);
  const topUrl = useMemo(() => history.reduce((max, item) => (item.clicks > (max?.clicks || 0) ? item : max), null as UrlHistoryItem | null), [history]);

  // Search and pagination
  const filtered = useMemo(() => {
    if (!search) return history;
    return history.filter(
      (item) =>
        item.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
        item.shortUrl.toLowerCase().includes(search.toLowerCase())
    );
  }, [history, search]);

  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1); // Reset to first page on search
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span role="img" aria-label="history">🕑</span> Shortened URL History
        </h2>
        <RouterLink to="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold">
          ← Back to Home
        </RouterLink>
      </div>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-3xl font-bold text-blue-700">{totalUrls}</span>
          <span className="text-gray-600 mt-1">Total URLs</span>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-3xl font-bold text-purple-700">{totalClicks}</span>
          <span className="text-gray-600 mt-1">Total Clicks</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow w-full">
          <span className="text-lg font-semibold text-green-700 truncate w-full text-center">
            {topUrl ? (
              <a href={topUrl.shortUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {topUrl.shortUrl}
              </a>
            ) : '--'}
          </span>
          <span className="text-gray-600 mt-1 text-sm">Top URL by Clicks</span>
          <span className="text-xs text-gray-500">{topUrl ? `${topUrl.clicks} clicks` : ''}</span>
        </div>
      </div>
      {/* Search */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Search by original or short URL..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <span className="text-gray-500 text-sm mt-1 sm:mt-0">{filtered.length} result(s)</span>
      </div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500">No history found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 text-left">Short URL</th>
                <th className="px-4 py-2 text-left">Original URL</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item._id} className="border-b hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-2 text-blue-600 underline">
                    <a href={item.shortUrl} target="_blank" rel="noopener noreferrer">
                      {item.shortUrl}
                    </a>
                  </td>
                  <td className="px-4 py-2 break-all">{item.originalUrl}</td>
                  <td className="px-4 py-2">{new Date(item.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">{item.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold">Page {page} of {pageCount}</span>
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
