import { validateEspecialidad, validatePartialEspecialidad } from "../schemas/especialidadSchema.js"

export class EspecialidadController{
    constructor({ especialidadModel }) {
        this.especialidadModel = especialidadModel
    }

    getEspecialidad = async (_req,res) => {
        const especialidades = await this.especialidadModel.getEspecialidad()
        return res.json(especialidades)
    }

    getEspecialidadById = async (req,res) => { 
        const {idEspecialidad} = req.params
        console.log(req.params)
        const especialidad = await  this.especialidadModel.getEspecialidadById({idEspecialidad})
        if (especialidad) return res.json(especialidad)
        return res.status(404).json({message: 'especialidad not found'})
    }

    createEspecialidad = async (req,res) => {
        const result = await validatePartialEspecialidad(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newEspecialidad = await this.especialidadModel.createEspecialidad({input:result.data})
        return res.status(201).json(newEspecialidad)
    }

    deleteEspecialidad = async (req, res) => {
        const {idEspecialidad} = req.params
        const result = await this.especialidadModel.deleteEspecialidad({idEspecialidad})
        if(!result) return res.status(404).json({ message: 'especialidad not found' })
        return res.json({ message: 'especialidad deleted' })
    }
 
    updateEspecialidad = async (req,res) => {
        const result = await validateEspecialidad(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const updateEspecialidad = await this.especialidadModel.updateEspecialidad({ input: result.data})
        return res.json(updateEspecialidad)
    }
}
