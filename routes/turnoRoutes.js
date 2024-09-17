import { Router } from 'express'
import { TurnoController } from '../controllers/turnoController.js'

//routes
export const createTurnoRoutes = ({ turnoModel }) => {
    //express router
    const turnoRouter = Router()

    const turnoController = new TurnoController({ turnoModel })

    
    turnoRouter.get('/', turnoController.getTurnos)
    turnoRouter.get('/:idTurnos', turnoController.getTurnoById)
    turnoRouter.get('/:matricula', turnoController.getTurnoByMedico)
    turnoRouter.post('/', turnoController.createTurno)
    turnoRouter.put('/', turnoController.updateTurno)
    turnoRouter.delete('/:idTurno', turnoController.deleteTurno)

    return turnoRouter 
}

