// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure bcryptjs is required

// Define the main schema FIRST
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    // Add other fields like profilePicUrl, ownedCourses, completedTasks etc.
    ownedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Example
    // ... other fields
}, { timestamps: true }); // Added timestamps

// Define hooks AFTER the schema definition
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Define methods AFTER the schema definition
UserSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

// Define the model LAST
const User = mongoose.model('User', UserSchema);

module.exports = User;