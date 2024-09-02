import { validatePaciente, validatePartialPaciente } from "../schemas/pacienteSchema.js";
import { PacienteModel } from "../models/pacienteModel.js";

export class PacienteController{

    static async getPacientes  (_req,res) {
        const pacientes = await PacienteModel.getPacientes()
        res.json(pacientes)
    }

    static async getPacienteById (req,res) { 
        const {dni} = req.params
        const paciente = await  PacienteModel.getPacienteById({dni})
        if (paciente) return res.json(paciente)
        res.status(404).json({message: 'Paciente not found'})
    }

    static async createPaciente (req,res) {
        const result = validatePaciente(req.body)

        if(!result.succes) return res.status(400).json({error: JSON.parse(result.error.message)})

        const newPaciente = await PacienteModel.createPaciente({input:result.data})
        res.status(201).json(newPaciente)
    }

    static async deletePaciente(req, res) {
        const {id} = req.params
        const result = await PacienteModel.deletePaciente({id})
        if(result == false) return res.status(404).json({ message: 'Paciente not found' })
        return res.json({ message: 'Paciente deleted' })
    }

    static async updatePaciente (req,res) {
        const result = validatePartialPaciente(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const updatepaciente = await PacienteModel.updatePaciente({ input: result.data})
        return res.json(updatepaciente)
    }
}
