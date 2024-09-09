import {validateAgenda} from "../schemas/agendaSchema.js";

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
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Agenda not found'})        
    }

    createAgenda = async (req,res) => {
        const resultValidate = await validateAgenda(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate)// objet retornado de la validacion 
        const newAgenda = await this.agendaModel.createAgenda({input: resultValidate.data})
        if(newAgenda) return res.status(201).json(newAgenda)        
        return res.status(404).json('Error al crear Agenda') 
    }

    updateAgenda = async (req,res) => {
        const resultValidate = await validateAgenda(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const agendaUpdated = await this.agendaModel.updateAgenda({input: resultValidate.data})
        if(agendaUpdated) return res.status(201).json(agendaUpdated)        
        return res.status(404).json('Error al actualizar Agenda')  
    }

    deleteAgenda = async (req,res) => {
        const {idAgenda} = req.params
        const agendaDeleted = await this.agendaModel.deleteAgenda({idAgenda: idAgenda})
        if(agendaDeleted) return res.status(201).json(agendaDeleted)        
        return res.status(404).json('Error al eliminar Agenda')
    }
}
