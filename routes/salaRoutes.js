import { Router } from 'express'
import { SalaController } from '../controllers/salaController.js'

export const createSalaRoutes = ({ salaModel }) => {
    const salaRouter = Router()

    const salaController = new SalaController({ salaModel })

    salaRouter.get('/',salaController.getSalas)
    salaRouter.get('/:nroSala',salaController.getSalaById)
    salaRouter.post('/',salaController.createSala)
    salaRouter.put('/',salaController.updateSala)
    salaRouter.delete('/:nroSala',salaController.deleteSala)

    return salaRouter 
}

