const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Course = require('../models/Course'); // Need Course model for demo ownership
const authMiddleware = require('../middleware/authMiddleware');
const JWT_SECRET = process.env.JWT_SECRET;

// POST /auth/register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
        return res.status(400).json({ message: 'Valid email and password (min 6 chars) required.' });
    }
    try {
        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) return res.status(400).json({ message: 'User already exists.' });

        // FOR DEMO: Give user ownership of the first course found
        const firstCourse = await Course.findOne().sort({ createdAt: 1 }); // Find oldest course
        const coursesOwned = firstCourse ? [firstCourse._id] : [];

        user = new User({
            email: email.toLowerCase(),
            password, // Hashing handled by pre-save hook
            coursesOwned: coursesOwned, // Give ownership for demo
            avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(email)}` // Avatar based on email
        });
        await user.save();

        const payload = { user: { id: user.id } };
        if (!JWT_SECRET) return res.status(500).json({ message: 'Server error (JWT)' });
        jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, userId: user.id, message: 'User registered!' });
        });
    } catch (error) { res.status(500).json({ message: 'Server error', error: error.message }); }
});

// POST /auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const payload = { user: { id: user.id } };
         if (!JWT_SECRET) return res.status(500).json({ message: 'Server error (JWT)' });
        jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, userId: user.id, message: 'Login successful!' });
        });
    } catch (error) { res.status(500).json({ message: 'Server error', error: error.message }); }
});

// GET /auth/me (Protected)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password') // Don't send password hash
            .populate('coursesOwned', 'title imageUrl _id'); // Get owned course info
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) { res.status(500).send('Server Error'); }
});

// POST /auth/complete-task (Protected) - Simplified
router.post('/complete-task', authMiddleware, async (req, res) => {
    const { taskId, xpReward, taskType } = req.body;
    const userId = req.user.id;
    if (!taskId || xpReward === undefined || !taskType) {
        return res.status(400).json({ message: 'Task ID, XP reward, and Task Type required.' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Prevent completing same task multiple times (basic check)
        if (user.completedTasks.includes(taskId)) {
             return res.status(400).json({ message: 'Task already completed.' });
        }

        user.xp += Number(xpReward);
        user.completedTasks.push(taskId); // Add task ID to completed list

        // Update simple stats
        if(taskType === 'video') user.profileStats.videosWatched += 1;
        else user.profileStats.tasksCompleted += 1;


        // Basic Level Up Logic (Example: 100 XP per level)
        const currentLevel = user.level;
        const newLevel = Math.floor(user.xp / 100) + 1;
        if (newLevel > currentLevel) {
            user.level = newLevel;
            // TODO: Add notification logic or return level up status
        }

        await user.save();
        res.status(200).json({
            message: 'Task complete, XP awarded!',
            newXP: user.xp,
            newLevel: user.level,
            completedTasks: user.completedTasks // Send back updated list
        });
    } catch (error) { res.status(500).json({ message: 'Server error completing task.', error: error.message }); }
});


module.exports = router;