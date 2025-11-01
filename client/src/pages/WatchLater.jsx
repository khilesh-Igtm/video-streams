import React from "react";

export default function WatchLater() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Watch Later</h2>
      <p className="text-slate-600">This list is visible only to logged-in users. You will store watch-later items in backend per-user.</p>
      {/* Render watch later items fetched from API */}
    </div>
  );
}
