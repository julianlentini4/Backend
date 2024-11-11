import { validateSala} from "../schemas/salaSchema.js";

export class SalaController{
    constructor({ salaModel }) {
        this.salaModel = salaModel
    }

    getSalas = async  (_req,res)=>{
        const salas = await this.salaModel.getSalas()
        res.json(salas)
    }

    getSalaById = async  (req,res)=>{ 
        const {nroSala} = req.params
        const sala = await this.salaModel.getSalaById({nroSala})
        if (!sala) return res.status(404).json({message:'Sala no encontrada'}) 
        return res.json(sala)
    }

    createSala = async (req,res) => {
        const resultValidate = await validateSala(req.body)
        if(!resultValidate.success) return res.status(400).json({message: JSON.parse(resultValidate.error.message)})
        const newSala = await this.salaModel.createSala({input: resultValidate.data})
        if(!newSala) return res.status(404).json({message:'Error al crear sala'}) 
        return res.status(201).json({message:'Sala Creada con exito'})        
    }

    updateSala = async  (req,res)=>{
        const result = await validateSala(req.body)
        if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        const updateSala = await this.salaModel.updateSala({ input: result.data})
        if(!updateSala) res.status(404).json({message:'Error al actualizar sala'})
        return res.json({message:'Sala Actualizada con exito'})
    }

    deleteSala = async (req,res) => {
        const {nroSala} = req.params
        const salaDeleted = await this.salaModel.deleteSala({nroSala: nroSala})
        if(salaDeleted) return res.status(201).json({message:'Sala borrada con exito'})        
        return res.status(404).json({message:'Error al borrar sala'})
    }
}
