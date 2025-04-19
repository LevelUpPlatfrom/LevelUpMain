require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


connectDB();
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => res.send('LevelUp API Running...'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));