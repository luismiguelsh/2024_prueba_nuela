const express = require('express');
const router = express.Router();
const subjectsController = require('../controllers/subjectsController');

// Rutas para las asignaturas
router.get('/', subjectsController.getAllSubjects);
router.post('/', subjectsController.createSubject);
router.get('/:id', subjectsController.getSubjectById);
router.put('/:id', subjectsController.updateSubject);
router.delete('/:id', subjectsController.deleteSubject);

module.exports = router;
