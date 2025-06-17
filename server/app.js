require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

// Configuración avanzada de CORS
const allowedOrigins = [
  'https://moodio-f89q5x52p-matias-caparottas-projects.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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

  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/therapists', therapistRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});