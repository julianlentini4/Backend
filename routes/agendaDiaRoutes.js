import { Router } from 'express'
import { AgendaDiaController } from '../controllers/agendaDiaController.js'

export const createAgendaDiaRoutes = ({ agendaDiaModel }) => {
    const agendaDiaRouter = Router()

    const agendaDiaController = new AgendaDiaController({ agendaDiaModel })

    agendaDiaRouter.get('/', agendaDiaController.getAgendaDia)
    agendaDiaRouter.get('/items', agendaDiaController.getAgendaDiaById)
    agendaDiaRouter.post('/', agendaDiaController.createAgendaDia)
    agendaDiaRouter.put('/', agendaDiaController.updateAgendaDia)
    agendaDiaRouter.delete('/items', agendaDiaController.deleteAgendaDia)

    return agendaDiaRouter 
}

