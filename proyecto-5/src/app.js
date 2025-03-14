const express = require('express');
const cors = require('cors'); // Importar cors
const noteRoutes = require('./routes/noteRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Configuración de CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use('/api/notes', noteRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
