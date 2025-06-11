require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());

// Here we will add routes (e.g. /api/auth)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  sequelize.authenticate().then(() => console.log('Database connected'));
});