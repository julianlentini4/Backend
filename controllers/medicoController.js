import { validateMedico} from "../schemas/medicoSchema.js";

export class MedicoController{
    constructor({ medicoModel }) {
        this.medicoModel = medicoModel
    }

    getMedicos = async (_req,res) => {
        const data = await this.medicoModel.getMedicos()
        return res.json(data)
    }

    getMedicoByMatricula = async (req,res) => {
        const {matricula} = req.params
        const data = await this.medicoModel.getMedicoByMatricula({ matricula })
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Error al obtener Medico'})        
    }

    createMedico = async (req,res) => {
        const resultValidate = await validateMedico(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        //console.log(resultValidate)// objet retornado de la validacion 
        const newMedico = await this.medicoModel.createMedico({input: resultValidate.data})
        if(newMedico) return res.status(201).json({message: 'Medico creado con exito'})        
        return res.status(404).json({message: 'Error al crear Medico'}) 
    }

    updateMedico = async (req,res) => {
        const resultValidate = await validateMedico(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const medicoUpdated = await this.medicoModel.updateMedico({input: resultValidate.data})
        if(medicoUpdated) return res.status(201).json({message: 'Medico actualizado con exito'})        
        return res.status(404).json({message: 'Error al actualizar Medico'})  
    }

    deleteMedico = async (req,res) => {
        const {matricula} = req.params
        const medicoDeleted = await this.medicoModel.deleteMedico({matricula: matricula})
        if(medicoDeleted) return res.status(201).json({message: 'Medico borrado con exito'})        
        return res.status(404).json({message: 'Error al borrar Medico'})
    }
}
