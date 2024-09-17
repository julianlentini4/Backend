import { validateEspecialidad, validatePartialEspecialidad } from "../schemas/especialidadSchema.js"
import { EspecialidadModel } from "../modelsMysql/especialidadModel.js"
export class EspecialidadController{
    constructor({ especialidadModel }) {
        this.especialidadModel = especialidadModel
    }

    getEspecialidad = async (_req,res) => {
        const especialidades = await EspecialidadModel.getEspecialidad()
        res.json(especialidades)
    }

    getEspecialidadById = async (req,res) => { 
        const {idEspecialidad} = req.params
        const especialidad = await  EspecialidadModel.getEspecialidadById({idEspecialidad})
        if (especialidad) return res.json(especialidad)
        res.status(404).json({message: 'especialidad not found'})
    }

    createEspecialidad = async (req,res) => {
        const result = validateEspecialidad(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newespecialidad = await EspecialidadModel.createEspecialidad({input:result.data})
        res.status(201).json(newespecialidad)
    }

    deleteEspecialidad = async (req, res) => {
        const {id} = req.params
        const result = await EspecialidadModel.deleteEspecialidad({id})
        if(result == false) return res.status(404).json({ message: 'especialidad not found' })
        return res.json({ message: 'especialidad deleted' })
    }

    updateEspecialidad = async (req,res) => {
        const result = validatePartialEspecialidad(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const updateespecialidad = await EspecialidadModel.updateEspecialidad({ input: result.data})
        return res.json(updateespecialidad)
    }
}
