const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskType: { type: String, enum: ['video', 'task', 'golden'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  contentUrl: { type: String }, // Link for video/task
  xpReward: { type: Number, default: 20, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  order: { type: Number, required: true } // Sequence in course
}, { timestamps: true });

TaskSchema.index({ course: 1, order: 1 }, { unique: true });

module.exports = mongoose.model('Task', TaskSchema);