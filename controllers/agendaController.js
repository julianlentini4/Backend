import {validateAgenda, validatePartialAgenda} from "../schemas/agendaSchema.js";

export class AgendaController{
    constructor({ agendaModel }) {
        this.agendaModel = agendaModel
    }

    getAgenda = async (_req,res) => {
        const data = await this.agendaModel.getAgenda()
        return res.json(data)
    }

    getAgendaById = async (req,res) => {
        const {idAgenda} = req.params
        const data = await this.agendaModel.getAgendaById({ idAgenda })
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Agenda no encontrada'})        
    }

    createAgenda = async (req, res) => {
        const resultValidate = await validateAgenda(req.body)
        if(!resultValidate.success) return res.status(400).json({message: JSON.parse(resultValidate.error.message)})
        const newAgenda = await this.agendaModel.createAgenda({input: resultValidate.data})
        if(!newAgenda) return res.status(404).json({message:'Error al crear agenda'}) 
        return res.status(201).json({message:'Agenda creada con exito'})    

    }
    

    updateAgenda = async (req,res) => {
        const resultValidate = await validateAgenda(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const agendaUpdated = await this.agendaModel.updateAgenda({input: resultValidate.data})
        if(agendaUpdated) return res.status(201).json({message:'Agenda actualizada con exito'})        
        return res.status(404).json({message: 'Error al actualizar Agenda'})  
    }

    deleteAgenda = async (req,res) => {
        const {idAgenda} = req.params
        const agendaDeleted = await this.agendaModel.deleteAgenda({idAgenda: idAgenda})
        if(agendaDeleted) return res.status(201).json({message:'Agenda eliminada con exito'})        
        return res.status(404).json({message:'Error al eliminar Agenda'})
    }
}
