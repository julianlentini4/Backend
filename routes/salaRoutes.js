import { Router } from 'express'
import { SalaController } from '../controllers/salaController.js'

export const createSalaRoutes = ({ salaModel }) => {
    const salaRouter = Router()

    const salaController = new SalaController({ salaModel })

    salaRouter.get('/',salaController.getSalas)
    salaRouter.get('/:id',salaController.getSalaById)
    salaRouter.patch('/:id',salaController.updateSala)

    return salaRouter 
}

