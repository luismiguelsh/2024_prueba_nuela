// const express = require('express');
// const router = express.Router();
// const Professor = require('../models/Professor');

// // Ruta para obtener todos los profesores
// router.get('/', async (req, res) => {
//   try {
//     const professors = await Professor.find();
//     res.status(200).json(professors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;