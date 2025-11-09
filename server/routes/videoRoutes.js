const express = require("express");
const upload = require("../middleware/upload.js");
const { createVideo, getAllVideos, getVideo, getVideosByUser, deleteVideo, updateVideo } = require("../controllers/videoController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post(
  "/upload",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createVideo
);

router.get("/",getAllVideos);
router.get("/:id",getVideo);

// get routes for logged in user videos
router.get("/user/:userId", getVideosByUser);


// put and delete route for videos of logged in user
router.put("/:id",verifyToken, updateVideo)
router.delete("/:id",verifyToken, deleteVideo)

module.exports = router;
