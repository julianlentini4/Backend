import { Router } from 'express'
import {MedicoController } from './medicoController.js'
//express router
export const router = Router()

//routes

//GET ALL MEDICOS
router.get('/getall', MedicoController.getMedicos)
//GET MEDICO BY ID
router.get('/getMedico/:matricula', MedicoController.getMedicoByMatricula)
//CREATE NEW MEDICO
router.post('/create', MedicoController.createMedico)
//UPDATE MEDICO
router.put('/update', MedicoController.updateMedico)
//DELETE MEDICO
router.delete('/delete', MedicoController.deleteMedico)

