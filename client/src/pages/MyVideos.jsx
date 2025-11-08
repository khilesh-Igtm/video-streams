import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const MyVideos = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const res = await api.get(`/videos/user/${user.id}`);
        setVideos(res.data || []);
      } catch (err) {
        console.error("Error fetching user videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyVideos();
  }, [user]);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-xl font-medium mb-4">Please log in to see your videos.</p>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Videos</h1>
        <button
          onClick={() => navigate("/upload-videos")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Upload New Video
        </button>
      </div>

      {loading ? (
        <div>Loading your videos...</div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-slate-500 py-20">
          <p className="text-lg mb-4">You haven’t uploaded any videos yet.</p>
          <button
            onClick={() => navigate("/upload-videos")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Upload Your First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <Link
              key={v.id}
              to={`/watch/${v.id}`}
              className="block bg-white p-3 rounded shadow hover:shadow-md transition"
            >
              <div className="relative h-40 mb-3">
                <img
                  src={v.thumbnail_url}
                  alt={v.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="text-lg font-medium">{v.title}</div>
              <div className="text-sm text-slate-500 mt-1">
                {v.description?.slice(0, 80)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVideos;
