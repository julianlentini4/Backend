import { validateSala, validatePartialSala } from "../schemas/salaSchema.js";
import { SalaModel } from "../models/salaModel.js";

export class SalaController{
    constructor({ salaModel }) {
        this.salaModel = salaModel
    }

    getSalas = async  (_req,res)=>{
        const salas = await this.salaModel.getSalas()
        res.json(salas)
    }

    getSalaById = async  (req,res)=>{ 
        const {dni} = req.params
        const sala = await this.salaModel.getSalaById({nro})
        if (sala) return res.json(sala)
        res.status(404).json({message: 'sala not found'})
    }

    updateSala = async  (req,res)=>{
        const result = validatePartialSala(req.body)

        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        
        const updatesala = await this.salaModel.updateSala({ input: result.data})

        return res.json(updatesala)
    }
}
