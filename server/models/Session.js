module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      date: { type: DataTypes.DATE, allowNull: false },
      notes: { type: DataTypes.TEXT, allowNull: false }
    });
  
    Session.associate = (models) => {
      Session.belongsTo(models.Patient, { foreignKey: 'patientId' });
      Session.belongsTo(models.User, { foreignKey: 'therapistId' });
    };
  
    return Session;
  };