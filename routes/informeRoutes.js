import { Router } from 'express'
import { InformeController } from '../controllers/informeController.js'

//routes
export const createInformeRoutes = ({ informeModel }) => {
    //express router
    const informeRouter = Router()

    const informeController = new InformeController({ informeModel })

    //GET ALL MEDICOS
    informeRouter.get('/getall', informeController.getInformes)
    //GET MEDICO BY ID
    informeRouter.get('/getInforme/:nroAcceso', informeController.getInformeByAccesNumber)
    //CREATE NEW MEDICO
    informeRouter.post('/create', informeController.createInforme)
    //UPDATE MEDICO
    informeRouter.put('/update', informeController.updateInforme)
    //DELETE MEDICO
    informeRouter.delete('/delete/:nroAcceso', informeController.deleteInforme)

    return informeRouter 
}


