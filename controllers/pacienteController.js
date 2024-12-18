import { validatePaciente} from "../schemas/pacienteSchema.js";

export class PacienteController{
    constructor({ pacienteModel }) {
        this.pacienteModel = pacienteModel
    }

    getPacientes = async  (_req,res) => {
        const pacientes = await this.pacienteModel.getPacientes()
        return res.json(pacientes)
    }

    getPacienteById = async (req,res) => { 
        const {dni} = req.params
        const paciente = await  this.pacienteModel.getPacienteById({dni})
        if (paciente) return res.json(paciente)
        return res.status(404).json({message: 'No se encuentra el paciente'})
    }

    createPaciente = async (req,res) => {
        const result = validatePaciente(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newPaciente = await this.pacienteModel.createPaciente({input:result.data})
        if(!newPaciente) return res.status(404).json({message: 'Error al crear Paciente'})
        return res.status(201).json({ message: 'Paciente creado con exito'})
    }

    deletePaciente = async (req, res) => {
        const {dni} = req.params
        const result = await this.pacienteModel.deletePaciente({dni})
        if(!result) return res.status(404).json({ message: 'Error al borrar Paciente'})
        return res.json({ message: 'Paciente borrado con exito'}) 
    }

    updatePaciente = async (req,res) =>{
        const result = validatePaciente(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const updatePaciente = await this.pacienteModel.updatePaciente({ input: result.data})
        if(!updatePaciente) res.status(404).json({ message: 'Error al actualizar Paciente'})
        return res.json({ message: 'Paciente actualizado con exito'})
    }
}
