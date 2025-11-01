// frontend: Watch.jsx
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await api.get(`/videos/${id}`);
      setVideo(res.data);
    };
    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  console.log("my vid ", video);

  return (
  <div className="min-h-screen bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">

    {/* Left: Video and info */}
    <div className="flex-1">
      {/* Video Player */}
      <div className="relative w-full pb-[56.25%] bg-black rounded-lg shadow-lg overflow-hidden">
        <video
        autoPlay
          src={video.video_url}
          controls
          controlsList="nodownload noremoteplayback"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </div>

      {/* Video Info */}
      <div className="mt-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
          {video.title}
        </h1>

        {/* Uploader + Stats */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
          <span className="font-medium text-gray-800">{video.username}</span>
          <span>•</span>
          <span>{new Date(video.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{video.views} views</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition">
            👍 Like
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition">
            👎 Dislike
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition">
            🔗 Share
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white hover:bg-red-700 rounded transition">
            🔔 Subscribe
          </button>
          <a
            href={video.video_url}
            download
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            ⬇️ Download
          </a>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
          {video.description || "No description provided."}
        </p>

        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {video.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full hover:bg-gray-300 cursor-pointer transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Comments */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Comments</h2>

          {/* New Comment */}
          <div className="flex items-start gap-4 mb-6">
            <img
              src="/default-avatar.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <textarea
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Add a public comment..."
            ></textarea>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Comment
            </button>
          </div>

          {/* Comment List */}
          <div className="space-y-4">
            {/* Example Comment */}
            <div className="flex gap-3">
              <img
                src="/default-avatar.png"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-gray-700 text-sm">
                  This video is amazing! Thanks for sharing.
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Sidebar: Suggested Videos */}
    <div className="w-full lg:w-80 flex-shrink-0">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Up Next</h3>
      {/* Example Suggested Video */}
      <div className="flex gap-3 mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition">
        <img
          src="/thumbnail1.jpg"
          alt="Thumbnail"
          className="w-32 h-20 object-cover rounded"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">Suggested Video Title</p>
          <p className="text-xs text-gray-500 mt-1">1.2M views • 2 days ago</p>
        </div>
      </div>
      {/* Add more dynamically */}
    </div>

  </div>
</div>

  );
};

export default Watch;
