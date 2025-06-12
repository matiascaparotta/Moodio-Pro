const db = require('../models');
const User = db.User;

exports.getPublicTherapistProfile = async (req, res) => {
  try {
    const therapist = await User.findByPk(req.params.id, {
      attributes: ['id', 'fullName', 'specialty', 'bio', 'profileImage']
    });

    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    res.json(therapist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching therapist profile' });
  }
};