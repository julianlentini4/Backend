import { Router } from 'express'
import { InformeController } from '../controllers/informeController.js'

//routes
export const createInformeRoutes = ({ informeModel }) => {
    //express router
    const informeRouter = Router()

    const informeController = new InformeController({ informeModel })

    //GET ALL MEDICOS
    informeRouter.get('/', informeController.getInformes)
    //GET MEDICO BY ID
    informeRouter.get('/:idInforme', informeController.getInformeById)
    //CREATE NEW MEDICO
    informeRouter.post('/', informeController.createInforme)
    //UPDATE MEDICO
    informeRouter.put('/', informeController.updateInforme)
    //DELETE MEDICO
    informeRouter.delete('/:idInforme', informeController.deleteInforme)

    return informeRouter 
}


