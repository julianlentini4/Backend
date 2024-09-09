import { Router } from 'express'
import { DiaController } from '../controllers/diaController.js'

//routes
export const createDiaRoutes = ({ diaModel }) => {
    //express router
    const diaRouter = Router()

    const diaController = new DiaController({ diaModel })

    //GET ALL MEDICOS
    diaRouter.get('/', diaController.getDia)
    //GET MEDICO BY ID
    diaRouter.get('/:idDia', diaController.getDiaById)
    //CREATE NEW MEDICO
    diaRouter.post('/', diaController.createDia)
    //UPDATE MEDICO
    diaRouter.put('/', diaController.updateDia)
    //DELETE MEDICO
    diaRouter.delete('/:idDia', diaController.deleteDia)

    return diaRouter 
}

