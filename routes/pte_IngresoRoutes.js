import { Router } from 'express'
import { Pte_IngresoController } from '../controllers/pte_IngresoController.js'

//routes
export const createPte_IngresoRoutes = ({ pte_IngresoModel }) => {
    //express router
    const pte_IngresoRouter = Router()

    const pte_IngresoController = new Pte_IngresoController({ pte_IngresoModel })

    //GET ALL MEDICOS
    pte_IngresoRouter.get('/', pte_IngresoController.getPte_Ingresos)
    //GET MEDICO BY ID
    pte_IngresoRouter.get('/:nroAcceso', pte_IngresoController.getPte_IngresoByAccesNumber)
    //CREATE NEW MEDICO
    pte_IngresoRouter.post('/', pte_IngresoController.createPte_Ingreso)
    //UPDATE MEDICO
    pte_IngresoRouter.put('/', pte_IngresoController.updatePte_Ingreso)
    //DELETE MEDICO
    pte_IngresoRouter.delete('/:nroAcceso', pte_IngresoController.deletePte_Ingreso)

    return pte_IngresoRouter 
}

