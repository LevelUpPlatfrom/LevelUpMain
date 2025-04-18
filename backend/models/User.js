const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  solanaWallet: { type: String, unique: true, sparse: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  coursesOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Store IDs of completed tasks
  // Simplified profile stats for now
  profileStats: {
      tasksCompleted: { type: Number, default: 0 },
      videosWatched: { type: Number, default: 0 },
  },
  avatar: { type: String, default: `https://api.dicebear.com/6.x/initials/svg?seed=${Date.now()}` }, // Default generative avatar
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) { next(err); }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);