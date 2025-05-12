const db = require('../models/db');

exports.verTurnos = (req, res) => {
    const doctorId = req.params.doctorId;

    const sql = `
        SELECT t.id, t.fecha, t.hora, t.estado, t.detalles,
               u.nombre AS paciente_nombre, u.apellido AS paciente_apellido, u.obra_social
        FROM turnos t
        JOIN usuarios u ON t.paciente_id = u.id
        WHERE t.medico_id = ?
        ORDER BY t.fecha, t.hora
    `;

    db.query(sql, [doctorId], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al obtener turnos.' });
        }

        res.status(200).json(resultados);
    });
};

exports.actualizarEstadoTurno = (req, res) => {
    const turnoId = req.params.turnoId;
    const { estado } = req.body;

    if (!['en espera', 'confirmado', 'cancelado'].includes(estado)) {
        return res.status(400).json({ mensaje: 'Estado inválido.' });
    }

    const sql = `UPDATE turnos SET estado = ? WHERE id = ?`;

    db.query(sql, [estado, turnoId], (err, resultado) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al actualizar el estado del turno.' });
        }

        res.status(200).json({ mensaje: 'Estado del turno actualizado.' });
    });
};
exports.obtenerHorarios = (req, res) => {
    const doctorId = req.params.doctorId;

    const sql = `
        SELECT * FROM horarios_medicos
        WHERE medico_id = ?
    `;

    db.query(sql, [doctorId], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al obtener horarios.' });
        }

        res.status(200).json(resultados);
    });
};
exports.horasOcupadas = (req, res) => {
    const { medicoId, fecha } = req.params;
  
    const sql = `
      SELECT TIME_FORMAT(hora, '%H:%i') AS hora
      FROM turnos
      WHERE medico_id = ? AND fecha = ? AND estado != 'cancelado'
    `;
  
    db.query(sql, [medicoId, fecha], (err, resultados) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensaje: 'Error al obtener turnos ocupados' });
      }
  
      const horas = resultados.map(r => r.hora);
      res.json(horas);
    });
  };