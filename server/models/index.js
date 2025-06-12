const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Patient = require('./Patient')(sequelize, Sequelize.DataTypes);
db.Session = require('./Session')(sequelize, Sequelize.DataTypes);

db.Patient.belongsTo(db.User, { foreignKey: 'therapistId' });
db.User.hasMany(db.Patient, { foreignKey: 'therapistId' });

db.Session.belongsTo(db.Patient, { foreignKey: 'patientId' });
db.Patient.hasMany(db.Session, { foreignKey: 'patientId' });

db.Session.belongsTo(db.User, { foreignKey: 'therapistId' });
db.User.hasMany(db.Session, { foreignKey: 'therapistId' });

module.exports = db;