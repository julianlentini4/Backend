import { validateMedico_especialidad } from "../schemas/medico_EspecialidadSchema.js"

export class Medico_EspecialidadController{
    constructor({ medico_EspecialidadModel }) {
        this.medico_EspecialidadModel = medico_EspecialidadModel
    }

    getMedico_Especialidad = async (_req,res) => {
        const data = await this.medico_EspecialidadModel.getMedico_Especialidad()
        return res.json(data)
    }

    getMedico_especialidadByMatricula = async (req,res) => {
        const {matricula} = req.params
        const data = await this.medico_EspecialidadModel.getMedico_EspecialidadByMatricula({ matricula })
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Medico_especialidad not found'})        
    }
    
    getMedico_EspecialidadByIdEspecialidad = async (req,res) => {
        const {idEspecialidad} = req.params
        const data = await this.medico_EspecialidadModel.getMedico_EspecialidadByIdEspecialidad({ idEspecialidad })
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Medico_especialidad not found'})        
    }

    createMedico_Especialidad = async (req,res) => {
        const result = await validateMedico_especialidad(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const newMedico_Especialidad = await this.medico_EspecialidadModel.createMedico_Especialidad({input: result.data})
        if(newMedico_Especialidad) return res.status(201).json(newMedico_Especialidad)        
        return res.status(404).json({Error: 'medico_especialidad not created'}) 
    }
    
    deleteMedico_Especialidad = async (req,res) => {
        const Medico_EspecialidadDeleted = await this.medico_EspecialidadModel.deleteMedico_Especialidad({input: req.query})
        if(Medico_EspecialidadDeleted) return res.status(201).json(Medico_EspecialidadDeleted)        
        return res.status(404).json({Error: 'medico_especialidad not deleted'})
    }
}