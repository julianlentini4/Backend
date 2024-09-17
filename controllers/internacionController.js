import { validateInternacion, validatePartialInternacion } from "../schemas/internacionSchema.js";
import { InternacionModel } from "../modelsMysql/internacionModel.js";

export class InternacionController {
    constructor({ internacionModel }) {
        this.internacionModel = internacionModel
    }  

    getInternaciones = async(_req, res) => {
        const internaciones = await this.internacionModel.getInternaciones()
        res.json(internaciones);
    }

    getInternacionById = async (req, res) => {
        const { nroSala, dni } = req.params
        const internacion = await this.internacionModel.getInternacionById({ nroSala, dni })
        if (internacion) return res.json(internacion)
        res.status(404).json({ message: 'Internacion not found' })
    }

    createInternacion = async(req, res) => {
        const result = await validateInternacion(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
        const newInternacion = await this.internacionModel.createInternacion({input: result.data})
        return res.status(201).json(newInternacion)
    }

    updateInternacion = async (req, res) => {
        const { nroSala, dni } = req.params
        const result = await validatePartialInternacion(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
        const updatedInternacion = await this.internacionModel.updateInternacion({ nroSala, dni, ...result.data })
        if (updatedInternacion) return res.json(updatedInternacion)
        res.status(404).json({ message: 'Internacion not found' })
    }

    deleteInternacion = async (req, res) =>{
        const { nroSala, dni } = req.params
        const deletedInternacion = await this.internacionModel.deleteInternacion({ nroSala, dni })
        if (deletedInternacion) return res.status(204).send()
        res.status(404).json({ message: 'Internacion not found' })
    }
}
