import { Router } from 'express'
import { AgendaController } from '../controllers/agendaController.js'

export const createAgendaRoutes = ({ agendaModel }) => {
    const agendaRouter = Router()

    const agendaController = new AgendaController({ agendaModel })

    agendaRouter.get('/', agendaController.getAgenda)
    agendaRouter.get('/:idAgenda', agendaController.getAgendaById)
    agendaRouter.post('/', agendaController.createAgenda)
    agendaRouter.put('/', agendaController.updateAgenda)
    agendaRouter.delete('/:idAgenda', agendaController.deleteAgenda)

    return agendaRouter 
}


