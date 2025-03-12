const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();

router.post('/', noteController.create);
router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.delete);

// Nueva ruta para actualizar el estado
router.patch('/:id/status', noteController.updateStatus);

module.exports = router;
