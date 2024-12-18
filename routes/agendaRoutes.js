import { Router } from 'express'
import { AgendaController } from '../controllers/agendaController.js'

//routes
export const createAgendaRoutes = ({ agendaModel }) => {
    //express router
    const agendaRouter = Router()

    const agendaController = new AgendaController({ agendaModel })

    //GET ALL MEDICOS
    agendaRouter.get('/', agendaController.getAgenda)
    //GET MEDICO BY ID
    agendaRouter.get('/:idAgenda', agendaController.getAgendaById)
    //CREATE NEW MEDICO
    agendaRouter.post('/', agendaController.createAgenda)
    //UPDATE MEDICO
    agendaRouter.put('/', agendaController.updateAgenda)
    //DELETE MEDICO
    agendaRouter.delete('/:idAgenda', agendaController.deleteAgenda)

    return agendaRouter 
}


