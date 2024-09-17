import {validateInforme} from "../schemas/informeSchema.js";

export class InformeController{
    constructor({ informeModel }) {
        this.informeModel = informeModel
    }

    getInformes = async (_req,res) => {
        const data = await this.informeModel.getInformes()
        return res.json(data)
    }

    getInformeById = async (req,res) => {
        const {idInforme} = req.params
        const data = await this.informeModel.getInformeById({ idInforme })
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Informe not found'})        
    }

    createInforme = async (req,res) => {
        const resultValidate = await validateInforme(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate)// objet retornado de la validacion 
        const newInforme = await this.informeModel.createInforme({input: resultValidate.data})
        if(newInforme) return res.status(201).json(newInforme)        
        return res.status(404).json('Error al crear Informe') 
    }

    updateInforme = async (req,res) => {
        const resultValidate = await validateInforme(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const informeUpdated = await this.informeModel.updateInforme({input: resultValidate.data})
        if(informeUpdated) return res.status(201).json(informeUpdated)        
        return res.status(404).json('Error al actualizar Informe')  
    }

    deleteInforme = async (req,res) => {
        const {idInforme} = req.params
        const informeDeleted = await this.informeModel.deleteInforme({idInforme: idInforme})
        if(informeDeleted) return res.status(201).json(informeDeleted)        
        return res.status(404).json('Error al eliminar Informe')
    }
}
