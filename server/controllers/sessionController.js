const db = require('../models');
const Session = db.Session;

exports.createSession = async (req, res) => {
  try {
    const therapistId = req.user.userId; // obtenemos del token
    const { patientId, date, notes } = req.body;

    const session = await Session.create({
      patientId,
      therapistId,
      date,
      notes
    });

    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating session' });
  }
};

// Obtener sesiones por paciente
exports.getSessionsByPatient = async (req, res) => {
  try {
    const therapistId = req.user.userId;
    const { patientId } = req.params;

    const sessions = await Session.findAll({
      where: {
        patientId,
        therapistId
      }
    });

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
};

// Eliminar sesión
exports.deleteSession = async (req, res) => {
  try {
    const therapistId = req.user.userId;
    const { id } = req.params;

    const session = await Session.findOne({
      where: { id, therapistId }
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    await session.destroy();
    res.json({ message: 'Session deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting session' });
  }
};