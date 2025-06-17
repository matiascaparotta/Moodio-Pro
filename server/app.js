require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

// Configuración de CORS robusta
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://moodio-pro.vercel.app',
      'http://localhost:3000',
      undefined
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Importación de rutas
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const sessionRoutes = require('./routes/session');
const profileRoutes = require('./routes/profile');
const therapistRoutes = require('./routes/therapist');

// Sincronización de la base de datos
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');

  // Registro de rutas después del sync
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