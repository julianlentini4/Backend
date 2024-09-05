import {validateIngreso} from "../schemas/ingresoSchema.js";

export class IngresoController{
    constructor({ ingresoModel }) {
        this.ingresoModel = ingresoModel
    }

    getIngresos = async (_req,res) => {
        const data = await this.ingresoModel.getIngresos()
        return res.json(data)
    }

    getIngresoByAccesNumber = async (req,res) => {
        const {nroAcceso} = req.params
        const data = await this.ingresoModel.getIngresoByAccessNumber({ nroAcceso })
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Ingreso not found'})        
    }

    createIngreso = async (req,res) => {
        const resultValidate = await validateIngreso(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate)// objet retornado de la validacion 
        const newIngreso = await this.ingresoModel.createIngreso({input: resultValidate.data})
        if(newIngreso) return res.status(201).json(newIngreso)        
        return res.status(404).json('Error al crear Ingreso') 
    }

    updateIngreso = async (req,res) => {
        const resultValidate = await validateIngreso(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const ingresoUpdated = await this.ingresoModel.updateIngreso({input: resultValidate.data})
        if(ingresoUpdated) return res.status(201).json(ingresoUpdated)        
        return res.status(404).json('Error al actualizar Ingreso')  
    }

    deleteIngreso = async (req,res) => {
        const {nroAcceso} = req.params
        const ingresoDeleted = await this.ingresoModel.deleteIngreso({nroAcceso: nroAcceso})
        if(ingresoDeleted) return res.status(201).json(ingresoDeleted)        
        return res.status(404).json('Error al eliminar Ingreso')
    }
}
