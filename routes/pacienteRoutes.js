import { Router } from 'express'
import { PacienteController } from '../controladores/pacienteController.js'

export const createPacienteRouter = ({ pacienteModel }) => {
    const pacientesRouter = Router()

    const pacienteController = new PacienteController({ pacienteModel })

    pacientesRout.get('/',PacienteController.getAll)
    pacientesRout.get('/:id',PacienteController.getById)
    pacientesRout.post('/', PacienteController.create)
    pacientesRout.patch('/:id',PacienteController.update)
    pacientesRout.delete('/:id',PacienteController.delete)

    return pacientesRouter
}


