import {validateIngreso, validatePartialIngreso} from "../schemas/ingresoSchema.js";

export class IngresoController{
    constructor({ ingresoModel }) {
        this.ingresoModel = ingresoModel
    }

    getIngreso = async (_req,res) => {
        const data = await this.ingresoModel.getIngreso()
        return res.json(data)
    }

    getIngresoById = async (req,res) => {
        const {idIngreso} = req.params
        const data = await this.ingresoModel.getIngresoById({ idIngreso })
        console.log(data)
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message:'No existe Ingreso'})        
    }

    createIngreso = async (req,res) => {
        const resultValidate = await validatePartialIngreso(req.body)
        if(!resultValidate.success) return res.status(400).json({message: 'Error de datos'})
        const newIngreso = await this.ingresoModel.createIngreso({input: resultValidate.data})
        if(newIngreso) return res.status(201).json({message:'Ingreso Creado correctamente'})        
        return res.status(404).json({message:'Error al crear Ingreso'}) 
    }

    updateIngreso = async (req,res) => {
        const resultValidate = await validateIngreso(req.body)
        if(!resultValidate.success) return res.status(400).json({message: JSON.parse(resultValidate.error.message)})
        const ingresoUpdated = await this.ingresoModel.updateIngreso({input: resultValidate.data})
        if(ingresoUpdated) return res.status(201).json({message:'Ingreso Actualizado correctamente'})        
        return res.status(404).json({message:'Error al actualizar Ingreso'})  
    }

    deleteIngreso = async (req,res) => {
        const {idIngreso} = req.params
        const ingresoDeleted = await this.ingresoModel.deleteIngreso({idIngreso: idIngreso})
        if(ingresoDeleted) return res.status(201).json({message:'Ingreso Borrado correctamente'})        
        return res.status(404).json({message:'Error al Borrar Ingreso'})
    }
}
