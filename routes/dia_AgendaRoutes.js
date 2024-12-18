import { Router } from 'express'
import { Dia_AgendaController } from '../controllers/dia_AgendaController.js'

//routes
export const createDia_AgendaRoutes = ({ dia_AgendaModel }) => {
    //express router
    const dia_AgendaRouter = Router()

    const dia_AgendaController = new Dia_AgendaController({ dia_AgendaModel })

    //GET ALL DIA_AGENDA
    dia_AgendaRouter.get('/', dia_AgendaController.getDia_Agenda)
    //GET DIA_AGENDA BY ID AGENDA
    dia_AgendaRouter.get('/agenda/:idAgenda', dia_AgendaController.getDia_AgendaByIdAgenda)
    //GET DIA_AGENDA BY ID DIA
    dia_AgendaRouter.get('/dia/:idDia', dia_AgendaController.getDia_AgendaByIdDia)
    //CREATE NEW DIA_AGENDA
    dia_AgendaRouter.post('/', dia_AgendaController.createDia_Agenda)
    //DELETE DIA_AGENDA
    dia_AgendaRouter.delete('/items', dia_AgendaController.deleteDia_Agenda)
    
    return dia_AgendaRouter 
}


