import { validateAgendaDia, validatePartialAgendaDia } from "../schemas/agendaDiaSchema.js"

export class AgendaDiaController{
    constructor({ agendaDiaModel }) {
        this.agendaDiaModel = agendaDiaModel
    }

    getAgendaDia = async (_req,res) => {
        console.log("aaaa")
        const data = await this.agendaDiaModel.getAgendaDia()
        return res.json(data)
    }

    getAgendaDiaById = async (req,res) => {
        const {idAgenda, idAgendaDia} = req.query
        const data = await this.agendaDiaModel.getAgendaDiaById({ idAgenda, idAgendaDia })
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Agenda no encontrada'})        
    }

    createAgendaDia = async (req,res) => {
        const resultValidate = await validatePartialAgendaDia(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const newAgendaDia = await this.agendaDiaModel.createAgendaDia({input: resultValidate.data})
        if(newAgendaDia) return res.status(201).json({message:'Agenda_dia creada con exito'})        
        return res.status(404).json({message: 'Error al crear Agenda_dia'}) 
    }

    updateAgendaDia = async (req,res) => {
        const resultValidate = await validateAgendaDia(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const agendaDiaUpdated = await this.agendaDiaModel.updateAgendaDia({input: resultValidate.data})
        if(agendaDiaUpdated) return res.status(201).json({message:'Agenda_dia actualizada con exito'})        
        return res.status(404).json({message: 'Error al actualizar Agenda_dia'})  
    }

    deleteAgendaDia = async (req,res) => {
        const {idAgenda, idAgendaDia} = req.query
        const agendaDiaDeleted = await this.agendaDiaModel.deleteAgendaDia({idAgenda: idAgenda, idAgendaDia: idAgendaDia})
        if(agendaDiaDeleted) return res.status(201).json({message:'Agenda_dia eliminada con exito'})        
        return res.status(404).json({message:'Error al eliminar Agenda_dia'})
    }
}
