// backend/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0, required: true }, // Price in cents
  stripePriceId: { type: String },                      // Optional comma needed if not last before tasks
  imageUrl: { type: String, default: `https://via.placeholder.com/400x200?text=Course+${Math.floor(Math.random()*100)}` },
  transformationPromise: { type: String, default: 'Gain valuable new skills!' }, // <-- Comma after this line
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],                   // <-- Comma after this line
  isSolanaCourse: { type: Boolean, default: false },                              // <-- Comma after this line
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], default: 'Beginner' } // <-- NO comma after the last item
}, { timestamps: true }); // Options object is separate

module.exports = mongoose.model('Course', CourseSchema);