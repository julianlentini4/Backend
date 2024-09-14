import { Router } from 'express'
import { EspecialidadController } from '../controllers/especialidadController.js'

export const createEspecialidadRoutes = ({ especialidadModel }) => {
    const especialidadesRouter = Router()

    const especialidadController = new EspecialidadController({ especialidadModel })

    especialidadesRouter.get('/',especialidadController.getEspecialidad)
    especialidadesRouter.get('/:id',especialidadController.getEspecialidadById)
    especialidadesRouter.post('/', especialidadController.createEspecialidad)
    especialidadesRouter.patch('/:id',especialidadController.updateEspecialidad)
    especialidadesRouter.delete('/:id',especialidadController.deleteEspecialidad)
    return especialidadesRouter
}

