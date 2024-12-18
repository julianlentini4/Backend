import { Router } from 'express'
import {MedicoController } from '../controllers/medicoController.js'


//routes
export const createMedicoRoutes = ({ medicoModel }) => {
    //express router
    const medicoRouter = Router()

    const medicoController = new MedicoController({ medicoModel })

    //GET ALL MEDICOS
    medicoRouter.get('/', medicoController.getMedicos)
    //GET MEDICO BY ID
    medicoRouter.get('/:matricula', medicoController.getMedicoByMatricula)
    //CREATE NEW MEDICO
    medicoRouter.post('/', medicoController.createMedico)
    //UPDATE MEDICO
    medicoRouter.put('/', medicoController.updateMedico)
    //DELETE MEDICO
    medicoRouter.delete('/:matricula', medicoController.deleteMedico)

    return medicoRouter 
}


