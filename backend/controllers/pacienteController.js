const db = require('../models/db');

exports.solicitarTurno = (req, res) => {
    const { paciente_id, medico_id, especialidad_id, fecha, hora, detalles } = req.body;

    const verificarSql = `
        SELECT * FROM turnos
        WHERE medico_id = ? AND fecha = ? AND hora = ? AND estado != 'cancelado'
    `;

    db.query(verificarSql, [medico_id, fecha, hora], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al verificar disponibilidad.' });
        }

        if (resultados.length > 0) {
            return res.status(409).json({ mensaje: 'Ese turno ya está reservado.' });
        }

        const insertarSql = `
            INSERT INTO turnos (paciente_id, medico_id, especialidad_id, fecha, hora, detalles)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(insertarSql, [paciente_id, medico_id, especialidad_id, fecha, hora, detalles], (err, resultado) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ mensaje: 'Error al solicitar el turno.' });
            }

            res.status(201).json({ mensaje: 'Turno solicitado correctamente.' });
        });
    });
};
