// backend/models/Task.js
import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
  },
  type: {
    type: String,
    required: [true, 'Task type is required'],
    enum: ['video', 'action', 'quiz', 'reading', 'milestone'], // Example types - adjust as needed
    default: 'action',
  },
  xpValue: {
    type: Number,
    required: [true, 'Task XP value is required'],
    default: 10,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Task must belong to a course'],
  },
  // Optional fields you might add later:
  // videoUrl: { type: String },
  // resourceLink: { type: String },
  // orderInSection: { type: Number }, // To order tasks within a course/section
  // verificationType: { type: String, enum: ['auto', 'manual', 'quiz'], default: 'auto' }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Optional: Add indexes for fields you query often
// TaskSchema.index({ course: 1 });

const Task = model('Task', TaskSchema);

export default Task;