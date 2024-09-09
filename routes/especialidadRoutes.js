import { Router } from 'express'
import { EspecialidadController } from '../controladores/especialidadController.js'

export const especialidadesRouter = Router()

especialidadesRouter.get('/',EspecialidadController.getAll)
especialidadesRouter.get('/:id',EspecialidadController.getById)
especialidadesRouter.post('/', EspecialidadController.create)
especialidadesRouter.patch('/:id',EspecialidadController.update)
especialidadesRouter.delete('/:id',EspecialidadController.delete)
