import {validatePartialPte_Ingreso, validatePte_Ingreso} from "../schemas/pte_IngresoSchema.js";

export class Pte_IngresoController{
    constructor({ pte_IngresoModel }) {
        this.pte_IngresoModel = pte_IngresoModel
    }

    getPte_Ingresos = async (_req,res) => {
        const data = await this.pte_IngresoModel.getPte_Ingresos()
        return res.json(data)
    }

    getPte_IngresoByAccesNumber = async (req,res) => {
        const {nroAcceso} = req.params
        const data = await this.pte_IngresoModel.getPte_IngresoByAccessNumber({ nroAcceso })
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Ingreso not found'})        
    }

    createPte_Ingreso = async (req,res) => {
        const resultValidate = await validatePartialPte_Ingreso(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate)// objet retornado de la validacion 
        const newIngreso = await this.pte_IngresoModel.createPte_Ingreso({input: resultValidate.data})
        if(newIngreso) return res.status(201).json(newIngreso)        
        return res.status(404).json('Error al crear Ingreso') 
    }

    updatePte_Ingreso = async (req,res) => {
        const resultValidate = await validatePte_Ingreso(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const ingresoUpdated = await this.pte_IngresoModel.updatePte_Ingreso({input: resultValidate.data})
        if(ingresoUpdated) return res.status(201).json(ingresoUpdated)        
        return res.status(404).json('Error al actualizar Ingreso')  
    }

    deletePte_Ingreso = async (req,res) => {
        const {nroAcceso} = req.params
        const ingresoDeleted = await this.pte_IngresoModel.deletePte_Ingreso({nroAcceso: nroAcceso})
        if(ingresoDeleted) return res.status(201).json(ingresoDeleted)        
        return res.status(404).json('Error al eliminar Ingreso')
    }
}
