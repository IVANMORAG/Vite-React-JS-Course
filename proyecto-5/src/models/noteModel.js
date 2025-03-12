const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['complete', 'incomplete'],
    default: 'incomplete', // Valor por defecto
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
