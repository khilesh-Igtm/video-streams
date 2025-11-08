const express = require("express");
const upload = require("../middleware/upload.js");
const { createVideo, getAllVideos, getVideo, getVideosByUser } = require("../controllers/videoController.js");

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

router.get("/user/:userId", getVideosByUser);

module.exports = router;
