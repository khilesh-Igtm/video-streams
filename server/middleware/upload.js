const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// single storage for both image + video
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("image/")) {
      return {
        folder: "thumbnails",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png"],
      };
    } else if (file.mimetype.startsWith("video/")) {
      return {
        folder: "videos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "avi", "mkv"],
      };
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
