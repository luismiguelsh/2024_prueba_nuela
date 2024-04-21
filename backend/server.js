const express = require('express');
const mongoose = require('mongoose');
// const professorsRouter = require('./routes/professors');
const subjectsRouter = require('./routes/subjects');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para el análisis del cuerpo de las solicitudes JSON
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/colegio', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Rutas
// app.use('/api/professors', professorsRouter);
app.use('/api/subjects', subjectsRouter);

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
