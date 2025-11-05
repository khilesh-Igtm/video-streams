const pool = require('../db/index.js')

const toggleSubscription = async (req, res) => {

  const subscriberId = req.user.id; // from JWT middleware

  const { channelId } = req.params;

  if (subscriberId === channelId) {
    return res.status(400).json({ error: "You cannot subscribe to your own channel." });
  }

  try {
    // check if already subscribed
    const existing = await pool.query(
      `SELECT * FROM subscriptions WHERE subscriber_id = $1 AND subscribed_to_id = $2`,
      [subscriberId, channelId]
    );

    if (existing.rows.length > 0) {
      // already subscribed → unsubscribe
      await pool.query(
        `DELETE FROM subscriptions WHERE subscriber_id = $1 AND subscribed_to_id = $2`,
        [subscriberId, channelId]
      );

      // decrement the count in users table
      await pool.query(
        `UPDATE users SET subscriber_count = GREATEST(subscriber_count - 1, 0) WHERE id = $1`,
        [channelId]
      );

      return res.status(200).json({ message: "Unsubscribed successfully", subscribed: false });
    } else {
      // not subscribed → subscribe
      await pool.query(
        `INSERT INTO subscriptions (subscriber_id, subscribed_to_id) VALUES ($1, $2)`,
        [subscriberId, channelId]
      );

      // increment the count
      await pool.query(
        `UPDATE users SET subscriber_count = subscriber_count + 1 WHERE id = $1`,
        [channelId]
      );

      return res.status(200).json({ message: "Subscribed successfully", subscribed: true });
    }
  } catch (err) {
    console.error("Error toggling subscription:", err);
    res.status(500).json({ error: "Failed to toggle subscription" });
  }
};

const getSubscription = async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user.id;
  const result = await pool.query(
    "SELECT * FROM subscriptions WHERE subscriber_id = $1 AND subscribed_to_id = $2",
    [userId, channelId]
  );
  res.json({ subscribed: result.rows.length > 0 });
}


module.exports = { toggleSubscription, getSubscription };