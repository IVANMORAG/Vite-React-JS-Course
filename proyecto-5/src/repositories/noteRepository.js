const Note = require('../models/noteModel');

class NoteRepository {
  async create(noteData) {
    const note = new Note(noteData);
    return await note.save();
  }

  async getAll() {
    return await Note.find();
  }

  async getById(id) {
    return await Note.findById(id);
  }

  async update(id, noteData) {
    return await Note.findByIdAndUpdate(id, noteData, { new: true });
  }

  async delete(id) {
    return await Note.findByIdAndDelete(id);
  }
}

module.exports = new NoteRepository();
