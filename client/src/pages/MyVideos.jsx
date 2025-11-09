import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const MyVideos = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video ?")) return;

    try {
      await api.delete(`/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleEdit = (video) => {
    setEditingId(video.id);
    setEditData({ title: video.title, description: video.description });
  };

  const handleSave = async (id) => {
    const res = await api.put(`/videos/${id}`, editData);
    setVideos(videos.map((v) => (v.id === id ? res.data : v)));
    setEditingId(null);
  };
  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-xl font-medium mb-4">
          Please log in to see your videos.
        </p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="border rounded-lg p-3 shadow-sm">
              {editingId === video.id ? (
                <>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full border p-1 mb-2"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="w-full border p-1 mb-2"
                  />
                  <button
                    onClick={() => handleSave(video.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 ml-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <video
                    src={video.video_url}
                    className="w-full rounded-lg"
                    controls
                  />
                  <h3 className="font-semibold mt-2">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => handleEdit(video)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVideos;
