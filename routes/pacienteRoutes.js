import { Router } from 'express'
import { PacienteController } from '../controladores/pacienteController.js'

export const pacientesRouter = Router()

pacientesRouter.get('/',PacienteController.getAll)
pacientesRouter.get('/:id',PacienteController.getById)
pacientesRouter.post('/', PacienteController.create)
pacientesRouter.patch('/:id',PacienteController.update)
pacientesRouter.delete('/:id',PacienteController.delete)



