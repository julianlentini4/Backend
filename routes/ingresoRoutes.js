import { Router } from 'express'
import { IngresoController } from '../controllers/ingresoController.js'

//routes
export const createIngresoRoutes = ({ ingresoModel }) => {
    //express router
    const ingresoRouter = Router()

    const ingresoController = new IngresoController({ ingresoModel })

    //GET ALL MEDICOS
    ingresoRouter.get('/', ingresoController.getIngreso)
    //GET MEDICO BY ID
    ingresoRouter.get('/:idIngreso', ingresoController.getIngresoById)
    //CREATE NEW MEDICO
    ingresoRouter.post('/', ingresoController.createIngreso)
    //UPDATE MEDICO
    ingresoRouter.put('/', ingresoController.updateIngreso)
    //DELETE MEDICO
    ingresoRouter.delete('/:idIngreso', ingresoController.deleteIngreso)

    return ingresoRouter 
}


