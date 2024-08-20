import { Router } from 'express'
import { SalaController } from '../controllers/salaController.js'

export const salasRouter = Router()

salasRouter.get('/',SalaController.getAll)
salasRouter.get('/:id',SalaController.getById)
salasRouter.patch('/:id',SalaController.update)



