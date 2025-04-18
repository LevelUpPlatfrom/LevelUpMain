const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/leaderboard/preview (Protected) - Top 3
router.get('/preview', authMiddleware, async (req, res) => {
  try {
    const topUsers = await User.find().sort({ xp: -1 }).limit(3).select('email xp avatar _id');
    res.status(200).json(topUsers);
  } catch (error) { res.status(500).json({ message: 'Failed to fetch leaderboard preview', error: error.message }); }
});

// GET /api/leaderboard/full (Protected) - Top 100
router.get('/full', authMiddleware, async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ xp: -1 }).limit(100).select('email xp level avatar _id');
    res.status(200).json(leaderboard);
  } catch (error) { res.status(500).json({ message: 'Failed to fetch leaderboard', error: error.message }); }
});

module.exports = router;