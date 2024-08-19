import { Router } from 'express'
import {MedicoController } from '../controllers/medicoController.js'
//express router
export const medicoRouter = Router()

//routes

//GET ALL MEDICOS
medicoRouter.get('/getall', MedicoController.getMedicos)
//GET MEDICO BY ID
medicoRouter.get('/getMedico/:matricula', MedicoController.getMedicoByMatricula)
//CREATE NEW MEDICO
medicoRouter.post('/create', MedicoController.createMedico)
//UPDATE MEDICO
medicoRouter.put('/update', MedicoController.updateMedico)
//DELETE MEDICO
medicoRouter.delete('/delete/:matricula', MedicoController.deleteMedico)

