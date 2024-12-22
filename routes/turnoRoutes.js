import { Router } from 'express'
import { TurnoController } from '../controllers/turnoController.js'

export const createTurnoRoutes = ({ turnoModel }) => {
    const turnoRouter = Router()

    const turnoController = new TurnoController({ turnoModel })

    
    turnoRouter.get('/', turnoController.getTurnos)
    //turnoRouter.get('/:idTurnos', turnoController.getTurnoById)
    turnoRouter.get('/:dni', turnoController.getTurnosByPaciente)
    turnoRouter.post('/', turnoController.createTurno)
    turnoRouter.put('/', turnoController.updateTurnoFechaHora)
    turnoRouter.delete('/:idTurno', turnoController.deleteTurno)

    return turnoRouter 
}

