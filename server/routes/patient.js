const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Verificamos el token para todas las rutas
router.use(verifyToken);

router.post('/', patientController.createPatient);
router.get('/', patientController.getPatients);
router.get('/:id', patientController.getPatientById); // 👉 Agregá esta línea
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;