import { Router } from 'express'
import { EspecialidadController } from '../controllers/especialidadController.js'

export const createEspecialidadRoutes = ({ especialidadModel }) => {
    const especialidadesRouter = Router()

    const especialidadController = new EspecialidadController({ especialidadModel })

    especialidadesRouter.get('/',especialidadController.getEspecialidad)
    especialidadesRouter.get('/:idEspecialidad',especialidadController.getEspecialidadById)
    especialidadesRouter.put('/:idEspecialidad',especialidadController.updateEspecialidad)
    especialidadesRouter.post('/', especialidadController.createEspecialidad)
    especialidadesRouter.delete('/:idEspecialidad',especialidadController.deleteEspecialidad)
    return especialidadesRouter
}

