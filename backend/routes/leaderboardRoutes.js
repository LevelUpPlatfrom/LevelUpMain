// backend/routes/leaderboardRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model path is correct
const authMiddleware = require('../middleware/authMiddleware'); // Assuming middleware path

// GET /api/leaderboard/preview (Protected) - Top 3 Users by XP
router.get('/preview', authMiddleware, async (req, res) => {
  try {
    const topUsers = await User.find()
                               .sort({ xp: -1 }) // Sort descending by XP
                               .limit(3)
                               .select('email xp avatar _id level'); // Select fields needed for preview

    res.status(200).json(topUsers);
  } catch (error) {
    console.error('Error fetching leaderboard preview:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard preview', error: error.message });
  }
});

// GET /api/leaderboard/full (Protected) - Top 100 Users by XP
router.get('/full', authMiddleware, async (req, res) => {
  try {
    const leaderboard = await User.find()
                                .sort({ xp: -1 }) // Sort descending by XP
                                .limit(100)       // Limit to top 100 (adjust as needed)
                                .select('email xp level avatar _id'); // Select fields for full leaderboard

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching full leaderboard:', error);
    res.status(500).json({ message: 'Failed to fetch full leaderboard', error: error.message });
  }
});

module.exports = router;