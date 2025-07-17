const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  status: { type: String, enum: ['To Read', 'Reading', 'Read'], default: 'To Read' },
  coverImage: { type: String }, // file path
  googleImage: { type: String }, // Google Books cover image URL
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema); 