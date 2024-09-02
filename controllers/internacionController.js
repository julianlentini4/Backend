import { validateInternacion, validatePartialInternacion } from "../schemas/internacionSchema.js";
import { InternacionModel } from "../models/internacionModel.js";

export class InternacionController {

    static async getAll(_req, res) {
        const internaciones = await InternacionModel.getInternaciones()
        res.json(internaciones);
    }

    static async getById(req, res) {
        const { nroSala, dni } = req.params
        const internacion = await InternacionModel.getInternacionById({ nroSala, dni })
        if (internacion) return res.json(internacion)
        res.status(404).json({ message: 'Internacion not found' })
    }

    static async create(req, res) {
        const result = await validateInternacion(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const newInternacion = await InternacionModel.createInternacion(result.data)
        return res.status(201).json(newInternacion)
    }

    static async update(req, res) {
        const { nroSala, dni } = req.params
        const result = await validatePartialInternacion(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const updatedInternacion = await InternacionModel.updateInternacion({ nroSala, dni, ...result.data })
        if (updatedInternacion) return res.json(updatedInternacion)
        res.status(404).json({ message: 'Internacion not found' })
    }

    static async delete(req, res) {
        const { nroSala, dni } = req.params
        const deletedInternacion = await InternacionModel.deleteInternacion({ nroSala, dni })
        if (deletedInternacion) return res.status(204).send()
        res.status(404).json({ message: 'Internacion not found' })

    }
}
