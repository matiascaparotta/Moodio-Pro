const path = require('path');

// Carga dinámica de variables de entorno según NODE_ENV
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: path.resolve(__dirname, `.env.${env}`) });

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

// Configuración de CORS mejorada para Safari y móviles
const allowedOrigins = [
  'https://moodio-pro.vercel.app',
  'http://localhost:3000',
  undefined
];

const dynamicAllowed = (origin) => {
  return (
    allowedOrigins.includes(origin) ||
    (origin && origin.endsWith('.vercel.app'))
  );
};

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || dynamicAllowed(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'], // Clave para Safari y tokens
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const sessionRoutes = require('./routes/session');
const profileRoutes = require('./routes/profile');
const therapistRoutes = require('./routes/therapist');

// Sincronización de la base de datos
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');

  // Registro de rutas
  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/therapists', therapistRoutes);

  // Inicio del servidor
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});