const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/therapistController');

router.get('/:id', therapistController.getPublicTherapistProfile);

module.exports = router;