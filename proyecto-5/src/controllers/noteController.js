const noteService = require('../services/noteService');

class NoteController {
  async create(req, res) {
    try {
      const note = await noteService.createNote(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const notes = await noteService.getNotes();
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const note = await noteService.getNoteById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const note = await noteService.updateNote(req.params.id, req.body);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const note = await noteService.deleteNote(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Nueva ruta para actualizar el estado
  async updateStatus(req, res) {
    try {
      const note = await noteService.updateStatus(req.params.id, req.body.status);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NoteController();
