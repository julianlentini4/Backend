import { validatePaciente, validatePartialPaciente } from "../schemas/pacienteSchema.js";
import { PacienteModel } from "../models/pacienteModel.js";

export class PacienteController{
    constructor({ pacienteModel }) {
        this.pacienteModel = pacienteModel
    }

    getPacientes = async  (_req,res) => {
        const pacientes = await this.pacienteModel.getPacientes()
        res.json(pacientes)
    }

    getPacienteById = async (req,res) => { 
        const {dni} = req.params
        const paciente = await  this.pacienteModel.getPacienteById({dni})
        if (paciente) return res.json(paciente)
        res.status(404).json({message: 'Paciente not found'})
    }

    createPaciente = async (req,res) => {
        const result = validatePaciente(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const dniExists = await this.pacienteModel.checkDniExists({ dni: result.data.dni });
        if (dniExists) return res.status(400).json({ error: 'El DNI ya existe en el sistema' });
        const newPaciente = await this.pacienteModel.createPaciente({input:result.data})
        res.status(201).json(newPaciente)
    }

    deletePaciente = async (req, res) => {
        const {dni} = req.params
        const result = await this.pacienteModel.deletePaciente({dni})
        if(result == false) return res.status(404).json({ message: 'Paciente not found' })
        return res.json({ message: 'Paciente deleted' })
    }

    updatePaciente = async (req,res) =>{
        const result = validatePartialPaciente(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const updatepaciente = await this.pacienteModel.updatePaciente({ input: result.data})
        return res.json(updatepaciente)
    }
}
