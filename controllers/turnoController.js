import { TurnoModel } from "../models/turnoModel.js";

export class TurnoController{
    constructor({ turnoModel }) {
        this.turnoModel = turnoModel
    }

    static async getTurnos(req, res) {
        const turnos = await TurnoModel.getTurnos();
        res.status(200).json(turnos);
    }
    
    static async getTurnosByPaciente(req, res) {
        const { idPaciente } = req.params;
        const turnos = await TurnoModel.getTurnosByPaciente(idPaciente);
        res.status(200).json(turnos);
    }


    static async createTurno(req, res) {
        const { dni, nombreApellido, idMedico, idEspecialidad, fechaHoraTurno } = req.body;
    
        let paciente = await TurnoModel.findPacienteById(dni);
    
        if (!paciente) {
            const newPacienteId = await TurnoModel.createPaciente(dni, nombreApellido);
            paciente = { idPaciente: newPacienteId };
        }
    
        let disponibilidad;
        if (idMedico) {
            disponibilidad = await TurnoModel.findDisponibilidadByMedico(idMedico);
        } else if (idEspecialidad) {
            disponibilidad = await TurnoModel.findDisponibilidadByEspecialidad(idEspecialidad);
        }
    
        if (disponibilidad.length === 0) {
            return res.status(404).json({ message: 'No hay disponibilidad.' });
        }
    
        const selectedDisponibilidad = disponibilidad.find(d => d.fechaHoraDisponible === fechaHoraTurno);
        
        if (!selectedDisponibilidad) {
            return res.status(400).json({ message: 'Fecha y hora no disponible.' });
        }
    
        const idTurno = await TurnoModel.createTurno(fechaHoraTurno, 'Pendiente', selectedDisponibilidad.idMedico, selectedDisponibilidad.fechaHoraDisponible, paciente.idPaciente);
    
        res.status(201).json({ idTurno });
    }

    static async updateTurnoFechaHora(req, res) {
        const { idTurno } = req.params;
        const { fechaHoraTurno } = req.body; 
        await TurnoModel.updateTurnoFechaHora(idTurno, fechaHoraTurno);
        res.status(200).json({ message: 'Turno actualizado con éxito.' });
    }
    
    static async updateTurnoEstado(req, res) {
        const { idTurno } = req.params;
        const { estado } = req.body;
        await TurnoModel.updateTurnoEstado(idTurno, estado);
        res.status(200).json({ message: 'Estado del turno actualizado con éxito.' });
    }

    static async deleteTurno(req, res) {
        const { idTurno } = req.params;
        await TurnoModel.deleteTurno(idTurno);
        res.status(200).json({ message: 'Turno eliminado con éxito.' });    
    }
}
