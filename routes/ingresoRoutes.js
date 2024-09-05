import { Router } from 'express'
import { IngresoController } from '../controllers/ingresoController.js'

//routes
export const createIngresoRoutes = ({ ingresoModel }) => {
    //express router
    const ingresoRouter = Router()

    const ingresoController = new IngresoController({ ingresoModel })

    //GET ALL MEDICOS
    ingresoRouter.get('/', ingresoController.getIngresos)
    //GET MEDICO BY ID
    ingresoRouter.get('/:nroAcceso', ingresoController.getIngresoByAccesNumber)
    //CREATE NEW MEDICO
    ingresoRouter.post('/', ingresoController.createIngreso)
    //UPDATE MEDICO
    ingresoRouter.put('/', ingresoController.updateIngreso)
    //DELETE MEDICO
    ingresoRouter.delete('/:nroAcceso', ingresoController.deleteIngreso)

    return ingresoRouter 
}

