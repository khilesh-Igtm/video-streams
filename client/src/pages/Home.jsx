import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  // const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/videos");
        setVideos(res.data || []);
      } catch (err) {
        console.error("Failed to load videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-500 animate-pulse">Loading videos...</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">No videos uploaded yet.</div>
      </div>
    );
  }

  // console.log('the videos ',videos)
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            to={`/watch/${video.id}`}
            className="group rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-gray-200">
              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Info Section */}
            <div className="p-3">
              <div className="text-sm font-semibold text-gray-900 line-clamp-2">
                {video.title}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {video.uploader_username || "Unknown"}
              </div>

              <div className="text-xs text-gray-500 mt-1">
                {video.views} views • {new Date(video.created_at).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
