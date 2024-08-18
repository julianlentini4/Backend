import { Router } from 'express'
import { PacienteController } from '../controladores/pacienteController.js'
export const router = Router()

//routes
router.get('/getall',PacienteController.getPacientes)
router.get('/getid/:id',PacienteController.getPacienteById)
router.post('/post', PacienteController.postPaciente)
router.put('/update/:id',PacienteController.updatePaciente)
router.delete('/delete/:id',PacienteController.deletePaciente)

