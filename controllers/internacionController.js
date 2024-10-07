import { validateInternacion} from "../schemas/internacionSchema.js";

export class InternacionController {
    constructor({ internacionModel }) {
        this.internacionModel = internacionModel
    }  

    getInternaciones = async(_req, res) => {
        const internaciones = await this.internacionModel.getInternaciones()
        res.json(internaciones);
    }

    getInternacionById = async (req, res) => {
        const { nroSala, dni } = req.query
        const internacion = await this.internacionModel.getInternacionById({ nroSala, dni })
        if (internacion) return res.json(internacion)
        res.status(404).json({ message: 'Internacion not found' })
    }

    createInternacion = async(req, res) => {
        const result = await validateInternacion(req.body)
        console.log(result)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
        const newInternacion = await this.internacionModel.createInternacion({input: result.data})
        return res.status(201).json(newInternacion)
    }

    updateInternacion = async (req, res) => {
        const result = await validateInternacion(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
        const updatedInternacion = await this.internacionModel.updateInternacion({input: result.data})
        if (updatedInternacion) return res.json(updatedInternacion)
        res.status(404).json({ message: 'Internacion not found' })
    }

    deleteInternacion = async (req, res) => {
        const deletedInternacion = await this.internacionModel.deleteInternacion({input: req.query})
        if (deletedInternacion) return res.status(200).json(deletedInternacion)
        res.status(404).json({ message: 'Internacion not found' })
    }
}
