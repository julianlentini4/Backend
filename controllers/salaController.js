import { validateSala, validatePartialSala } from "../schemas/salaSchema.js";
import { SalaModel } from "../models/salaModel.js";

export class SalaController{

    static async getSalas (_req,res){
        const salas = await SalaModel.getSalas()
        res.json(salas)
    }

    static async getSalaById (req,res){ 
        const {dni} = req.params
        const sala = await SalaModel.getSalaById({nro})
        if (sala) return res.json(sala)
        res.status(404).json({message: 'sala not found'})
    }

    static async updateSala (req,res){
        const result = validatePartialSala(req.body)

        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        
        const updatesala = await SalaModel.updateSala({ input: result.data})

        return res.json(updatesala)
    }
}
