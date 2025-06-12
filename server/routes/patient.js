const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Todas las rutas están protegidas por el token ✅

router.post('/', verifyToken, patientController.createPatient);
router.get('/', verifyToken, patientController.getPatients);
router.put('/:id', verifyToken, patientController.updatePatient);
router.delete('/:id', verifyToken, patientController.deletePatient);

module.exports = router;