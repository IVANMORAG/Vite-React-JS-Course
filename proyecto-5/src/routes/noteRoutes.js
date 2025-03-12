const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();

router.post('/', noteController.create);
router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.delete);

module.exports = router;
