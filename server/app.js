require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

// Importación de rutas
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const sessionRoutes = require('./routes/session'); // 👈 agregado
const profileRoutes = require('./routes/profile');
const therapistRoutes = require('./routes/therapist');

// Sincronización de la base de datos
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');

  // Registro de rutas después del sync
  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/sessions', sessionRoutes); // 👈 agregado
  app.use('/api/profile', profileRoutes);
  app.use('/api/therapists', therapistRoutes);
  // Inicio del servidor
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});