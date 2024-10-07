import { Router } from 'express'
import { PacienteController } from '../controllers/pacienteController.js'

export const createPacienteRoutes = ({ pacienteModel }) => {
    const pacientesRouter = Router()

    const pacienteController = new PacienteController({ pacienteModel })

    pacientesRouter.get('/',pacienteController.getPacientes)
    pacientesRouter.get('/:dni',pacienteController.getPacienteById)
    pacientesRouter.post('/', pacienteController.createPaciente)
    pacientesRouter.put('/',pacienteController.updatePaciente)
    pacientesRouter.delete('/:dni',pacienteController.deletePaciente)

    return pacientesRouter
}

