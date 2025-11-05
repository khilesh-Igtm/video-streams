const express = require('express')
const {toggleSubscription, getSubscription} = require('../controllers/subscriptionController')
const {verifyToken} = require('../middleware/authMiddleware')

const router = express.Router();

router.get("/check/:channelId", verifyToken, getSubscription);


router.post("/:channelId",verifyToken, toggleSubscription)

module.exports = router;
