const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
router.get('/horarios/:doctorId', doctorController.obtenerHorarios);
router.get('/turnos/:doctorId', doctorController.verTurnos);
router.put('/turnos/:turnoId', doctorController.actualizarEstadoTurno);
router.get('/ocupados/:medicoId/:fecha', doctorController.horasOcupadas);
module.exports = router;
