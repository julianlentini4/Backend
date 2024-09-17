import {validateDia_Agenda} from "../schemas/dia_AgendaSchema.js";

export class Dia_AgendaController{
    constructor({ dia_AgendaModel }) {
        this.dia_AgendaModel = dia_AgendaModel
    }

    getDia_Agenda = async (_req,res) => {
        const data = await this.dia_AgendaModel.getDia_Agenda()
        return res.json(data)
    }

    getDia_AgendaByIdAgenda = async (req,res) => {
        const {idAgenda} = req.params
        const data = await this.dia_AgendaModel.getDia_AgendaByIdAgenda({ idAgenda })
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Dia_Agenda not found'})        
    }
    getDia_AgendaByIdDia = async (req,res) => {
        const {nroDia} = req.params
        const data = await this.dia_AgendaModel.getDia_AgendaByIdDia({ nroDia })
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Dia_Agenda not found'})        
    }

    createDia_Agenda = async (req,res) => {
        const resultValidate = await validateDia_Agenda(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate)// objet retornado de la validacion 
        const newDia_Agenda = await this.dia_AgendaModel.createDia_Agenda({input: resultValidate.data})
        if(newDia_Agenda) return res.status(201).json(newDia_Agenda)        
        return res.status(404).json('Error al crear Agenda') 
    }
    
    deleteDia_Agenda = async (req,res) => {
        const Dia_AgendaDeleted = await this.dia_AgendaModel.deleteDia_Agenda({input: req.query})
        if(Dia_AgendaDeleted) return res.status(201).json(Dia_AgendaDeleted)        
        return res.status(404).json('Error al eliminar Agenda')
    }
}
