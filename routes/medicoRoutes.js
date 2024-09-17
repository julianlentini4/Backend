import { Router } from 'express'
import {MedicoController } from '../controllers/medicoController.js'


//routes
export const createMedicoRoutes = ({ medicoModel }) => {
    //express router
    const medicoRouter = Router()

    const medicoController = new MedicoController({ medicoModel })

    //GET ALL MEDICOS
    medicoRouter.get('/getall', medicoController.getMedicos)
    //GET MEDICO BY ID
    medicoRouter.get('/getMedico/:matricula', medicoController.getMedicoByMatricula)
    //CREATE NEW MEDICO
    medicoRouter.post('/create', medicoController.createMedico)
    //UPDATE MEDICO
    medicoRouter.put('/update', medicoController.updateMedico)
    //DELETE MEDICO
    medicoRouter.delete('/delete/:matricula', medicoController.deleteMedico)

    return medicoRouter 
}


