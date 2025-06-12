const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, sessionController.createSession);
router.get('/:patientId', verifyToken, sessionController.getSessionsByPatient);
router.delete('/:id', verifyToken, sessionController.deleteSession);

module.exports = router;