module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    birthYear: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.ENUM('male', 'female', 'other') },
    profileImage: { type: DataTypes.STRING },
    existingConditions: { type: DataTypes.TEXT },
    currentMedications: { type: DataTypes.TEXT },
    treatmentGoals: { type: DataTypes.TEXT },
    notes: { type: DataTypes.TEXT }
  });

  Patient.associate = (models) => {
    Patient.belongsTo(models.User, { foreignKey: 'therapistId' });
  };

  return Patient;
};