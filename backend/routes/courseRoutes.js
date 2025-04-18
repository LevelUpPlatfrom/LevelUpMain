const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/courses/featured (Public) - Get first 3 courses
router.get('/featured', async (req, res) => {
   try {
       const featuredCourses = await Course.find()
                                           .limit(3)
                                           .sort({ createdAt: 1 }) // Get oldest 3 as example
                                           .select('title description imageUrl price _id transformationPromise');
       res.status(200).json(featuredCourses);
   } catch (error) { res.status(500).json({ message: 'Failed to fetch featured courses', error: error.message }); }
});

// GET /api/courses/:id (Protected) - Get course with sorted tasks
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    // TODO: Check if user actually owns this course (req.user.id vs course ownership logic)
    // For demo, we allow access if logged in.
    const course = await Course.findById(req.params.id).select('-__v');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const tasks = await Task.find({ course: course._id }).sort({ order: 1 }).select('-__v');
    res.status(200).json({ course, tasks });
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ message: 'Course not found' });
    res.status(500).json({ message: 'Failed to fetch course details', error: error.message });
  }
});

module.exports = router;