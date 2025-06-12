const db = require('../models');
const Patient = db.Patient;

// ✅ CREAR PACIENTE EXPANDIDO
exports.createPatient = async (req, res) => {
  try {
    const therapistId = req.user.userId;  // Obtenemos el terapeuta desde el token

    const {
      firstName,
      lastName,
      birthYear,
      gender,
      profileImage,
      existingConditions,
      currentMedications,
      treatmentGoals,
      notes
    } = req.body;

    const patient = await Patient.create({
      firstName,
      lastName,
      birthYear,
      gender,
      profileImage,
      existingConditions,
      currentMedications,
      treatmentGoals,
      notes,
      therapistId
    });

    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating patient' });
  }
};

// ✅ LISTAR PACIENTES SOLO DEL TERAPEUTA
exports.getPatients = async (req, res) => {
  try {
    const therapistId = req.user.userId;
    const patients = await Patient.findAll({
      where: { therapistId }
    });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching patients' });
  }
};

// ✅ ACTUALIZAR PACIENTE EXPANDIDO
exports.updatePatient = async (req, res) => {
  try {
    const therapistId = req.user.userId;
    const { id } = req.params;

    const patient = await Patient.findOne({
      where: { id, therapistId }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const updates = req.body;
    await patient.update(updates);
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating patient' });
  }
};

// ✅ ELIMINAR PACIENTE
exports.deletePatient = async (req, res) => {
  try {
    const therapistId = req.user.userId;
    const { id } = req.params;

    const patient = await Patient.findOne({
      where: { id, therapistId }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.destroy();
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting patient' });
  }
};