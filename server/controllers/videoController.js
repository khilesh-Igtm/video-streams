
const pool = require('../db')

const createVideo = async (req, res) => {
  try {
    const uploader_id = req.body.uploader;
    const { title, description, category, tags } = req.body;

    const thumbnail = req.files.thumbnail?.[0];
    const video = req.files.video?.[0];

    if (!thumbnail || !video) {
      return res.status(400).json({ message: "Both thumbnail and video are required." });
    }

    const result = await pool.query(
      `INSERT INTO videos 
        (uploader_id, title, description, category, tags, thumbnail_url, thumbnail_public_id, video_url, video_public_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        uploader_id,
        title,
        description,
        category || null,
        tags ? JSON.parse(tags) : null,
        thumbnail.path,
        thumbnail.filename,
        video.path,
        video.filename,
      ]
    );

    return res.status(201).json({ success: true, video: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Video upload failed", error: error.message });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        v.id,
        v.title,
        v.description,
        v.category,
        v.tags,
        v.video_url,
        v.thumbnail_url,
        v.views,
        v.created_at,
        v.uploader_id,
        u.username AS uploader_username
      FROM videos v
      LEFT JOIN users u ON v.uploader_id = u.id
      ORDER BY v.created_at DESC;
      `
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};


const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT v.* , u.username FROM videos v JOIN users u ON v.uploader_id = u.id WHERE v.id = $1`, [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching video: ", error);
    res.status(500).json({ error: "Failed to fetch video" })
  }
}

const getVideosByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT id, title, description, category, tags, video_url, views, thumbnail_url, created_at 
       FROM videos WHERE uploader_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching user videos:", error);
    res.status(500).json({ error: "Failed to fetch user's videos" });
  }
}


module.exports = { createVideo, getAllVideos, getVideo, getVideosByUser };