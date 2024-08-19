import { validatePaciente, validatePartialPaciente } from "../schemas/pacienteSchema.js";



export class PacienteController{
    constructor ({pacienteModel}){
        this.pacienteModel = pacienteModel
    }

    getAll = async (_req,res) => {
        const pacientes = await this.pacienteModel.getAll()
        res.json(pacientes)
    }

    getById = async (req,res) => { 
        const {dni} = req.params
        const paciente = await this.pacienteModel.getById({dni})
        if (paciente) return res.json(paciente)
        res.status(404).json({message: 'Paciente not found'})
    }

    create = async (req,res) => {
        const result = validatePaciente(req.body)

        if(!result.succes) return res.status(400).json({error: JSON.parse(result.error.message)})

        const newPaciente = await this.pacienteModel.create({input:result.data})
        res.status(201).json(newPaciente)
    }

    delete = async (req, res) => {
        const {id} = req.params
        const result = await this.pacienteModel.delete({id})

        if(result == false) return res.status(404).json({ message: 'Paciente not found' })
        
        return res.json({ message: 'Movie deleted' })
    }

    update = async (req,res) => {
        const result = validatePartialPaciente(req.body)

        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

        const {id} = req.params
        
        const updatePaciente = await this.pacienteModel.update({id, input: result.data})

        return res.json(updatePaciente)
    }
}
