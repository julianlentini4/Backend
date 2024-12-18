import { Router } from 'express'
import { Medico_EspecialidadController } from '../controllers/medico_EspecialidadController.js'

export const createMedico_EspecialidadRoutes = ({ medico_EspecialidadModel }) => {
    const medico_especialidadRouter = Router()

    const medico_EspecialidadController = new Medico_EspecialidadController({ medico_EspecialidadModel })

    medico_especialidadRouter.get('/', medico_EspecialidadController.getMedico_Especialidad)
    medico_especialidadRouter.get('/medico/:matricula', medico_EspecialidadController.getMedico_especialidadByMatricula)
    medico_especialidadRouter.get('/especialidad/:idEspecialidad', medico_EspecialidadController.getMedico_EspecialidadByIdEspecialidad)
    medico_especialidadRouter.post('/', medico_EspecialidadController.createMedico_Especialidad)
    medico_especialidadRouter.delete('/items', medico_EspecialidadController.deleteMedico_Especialidad)
    return medico_especialidadRouter 
}