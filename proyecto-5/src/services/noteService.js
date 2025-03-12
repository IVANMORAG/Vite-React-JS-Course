const noteRepository = require('../repositories/noteRepository');

class NoteService {
  async createNote(noteData) {
    return await noteRepository.create(noteData);
  }

  async getNotes() {
    return await noteRepository.getAll();
  }

  async getNoteById(id) {
    return await noteRepository.getById(id);
  }

  async updateNote(id, noteData) {
    return await noteRepository.update(id, noteData);
  }

  async deleteNote(id) {
    return await noteRepository.delete(id);
  }
}

module.exports = new NoteService();
