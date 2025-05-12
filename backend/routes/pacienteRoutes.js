const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/solicitar-turno', pacienteController.solicitarTurno);

module.exports = router;
