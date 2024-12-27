import { TurnoModel } from "../modelsMysql/turnoModel.js";

export class TurnoController{
    constructor({ turnoModel }) {
        this.turnoModel = turnoModel
    }

    getTurnos = async (_req, res) => {
        const turnos = await this.turnoModel.getTurnos();
        res.status(200).json(turnos);
    }

    createTurno = async (req, res) => {
        const { dni, nombreApellido, idMedico, idEspecialidad, fechaHoraTurno } = req.body;
        const idTurno = await this.turnoModel.createTurno(fechaHoraTurno, 'Pendiente', selectedDisponibilidad.idMedico, selectedDisponibilidad.fechaHoraDisponible, paciente.idPaciente);
        res.status(201).json({ idTurno });
    }

    updateTurnoFechaHora = async (req, res) => {
        const { idTurno } = req.params;
        const { fechaHoraTurno } = req.body; 
        await this.turnoModel.updateTurnoFechaHora(idTurno, fechaHoraTurno);
        res.status(200).json({ message: 'Turno actualizado con éxito.' });
    }
    

    deleteTurno = async (req, res) => {
        const { idTurno } = req.params;
        await this.turnoModel.deleteTurno(idTurno);
        res.status(200).json({ message: 'Turno eliminado con éxito.' });    
    }
}
