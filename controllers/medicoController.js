import mySqlPool  from "../config/db.js";
import { validateMedico, validatePartialMedico } from "../schemas/medicoSchema.js";
import { MedicoModel } from "../modelsMysql/medicoModel.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class MedicoController{
    static async getMedicos (_req,res){
        const data = await MedicoModel.getMedicos()
        return res.json(data)
    }

    static async getMedicoByMatricula(req,res){
        const {matricula} = req.params
        const data = await MedicoModel.getMedicoByMatricula({ matricula })
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Medico not found'})        
    }

    static async createMedico(req,res){
        const resultValidate = await validateMedico(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate)// objet retornado de la validacion 
        const newMedico = await MedicoModel.createMedico({input: resultValidate.data})
        if(newMedico) return res.status(201).json(newMedico)        
        return res.status(404).json('Error al crear medico') 
    }

    static async updateMedico (req,res){
        const resultValidate = await validateMedico(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const medicoUpdated = await MedicoModel.updateMedico({input: resultValidate.data})
        if(medicoUpdated) return res.status(201).json(medicoUpdated)        
        return res.status(404).json('Error al actualizar medico')  
    }

    static async deleteMedico(req,res){
        const {matricula} = req.params
        const medicoDeleted = await MedicoModel.deleteMedico({matricula: matricula})
        if(medicoDeleted) return res.status(201).json(medicoDeleted)        
        return res.status(404).json('Error al eliminar medico')
    }
}
