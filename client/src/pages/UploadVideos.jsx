import React, { useState,  useContext  } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext"

export default function UploadVideos() {
  const{user} = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log('my user in child comp is  >>',user)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !thumbnail || !video) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);
    formData.append("uploader", user?.id);

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "http://localhost:5000/api/videos/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      // console.log("✅ Uploaded:", res.data);

      // Reset
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setVideo(null);
      setThumbPreview(null);
      setVideoPreview(null);
    } catch (err) {
      console.error("❌ Upload error:", err.response?.data || err.message);
      alert(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg p-8 flex gap-8">
        {/* LEFT SIDE - FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 w-2/3">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title for your video"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the description for your video"
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail"
              />
              <label
                htmlFor="thumbnail"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-10 h-10 text-gray-400" />
                <span className="text-gray-500 mt-2">
                  Click or drag to upload thumbnail
                </span>
              </label>
            </div>
          </div>

          {/* Video */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Video
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video"
              />
              <label
                htmlFor="video"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-10 h-10 text-gray-400" />
                <span className="text-gray-500 mt-2">
                  Click or drag to upload video
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
          >
            {isSubmitting ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* RIGHT SIDE - PREVIEW */}
        <div className="w-1/3 flex flex-col items-center">
          <h3 className="text-gray-700 font-medium mb-3">Preview</h3>
          <div className="w-full rounded-lg overflow-hidden shadow-md bg-black relative">
            {videoPreview && (
              <video
                src={videoPreview}
                poster={thumbPreview}
                controls
                className="w-full rounded-lg"
                onPlay={() => setThumbPreview(null)}
              />
            )}
            {!videoPreview && thumbPreview && (
              <img
                src={thumbPreview}
                alt="Thumbnail Preview"
                className="w-full rounded-lg cursor-pointer"
                onClick={() => setVideoPreview(videoPreview)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
