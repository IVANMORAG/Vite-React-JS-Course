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

  // Nueva función para actualizar solo el estado
  async updateStatus(id, status) {
    if (!['complete', 'incomplete'].includes(status)) {
      throw new Error('Invalid status');
    }
    return await noteRepository.update(id, { status });
  }
}

module.exports = new NoteService();
