import {validateDia} from "../schemas/diaSchema.js";

export class DiaController{
    constructor({ diaModel }) {
        this.diaModel = diaModel
    }

    getDia = async (_req,res) => {
        const data = await this.diaModel.getDia()
        return res.json(data)
    }

    getDiaById = async (req,res) => {
        const {idDia} = req.params
        const data = await this.diaModel.getDiaById({ idDia })
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Dia not found'})        
    }

    createDia = async (req,res) => {
        const resultValidate = await validateDia(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate)// objet retornado de la validacion 
        const newDia = await this.diaModel.createDia({input: resultValidate.data})
        if(newDia) return res.status(201).json(newDia)        
        return res.status(404).json('Error al crear Dia') 
    }

    updateDia = async (req,res) => {
        const resultValidate = await validateDia(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const diaUpdated = await this.diaModel.updateDia({input: resultValidate.data})
        if(diaUpdated) return res.status(201).json(diaUpdated)        
        return res.status(404).json('Error al actualizar Dia')  
    }

    deleteDia = async (req,res) => {
        const {idDia} = req.params
        const diaDeleted = await this.diaModel.deleteDia({idDia: idDia})
        if(diaDeleted) return res.status(201).json(diaDeleted)        
        return res.status(404).json('Error al eliminar Dia')
    }
}
