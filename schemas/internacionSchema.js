import z from 'zod'
import { SalaModel } from '../models/salaModel.js'
import { PacienteModel } from '../models/pacienteModel.js'

const nroSalaValidation = z.number().refine(async (nroSala) => {
    const sala = await SalaModel.getSalaById({ nro: nroSala });
    return !!sala;
}, {
    message: "No existe sala con ese numero"
});

const dniValidation = z.number().refine(async (dni) => {
    const paciente = await PacienteModel.getPacienteById({ dni });
    return !!paciente;
}, {
    message: "No existe paciente con ese dni"
});

const internacionSchema = z.object({
    nroSala: nroSalaValidation,
    dni: dniValidation,
    fechaInternacion: z.string().refine(val => !isNaN(Date.parse(val)), { message: "fechaInternacion no valida" }),
    fechaAlta: z.string().optional().refine(val => !val || !isNaN(Date.parse(val)), { message: "fechaAlta no valida" }),
});

export function validateInternacion(input) {
    return internacionSchema.safeParseAsync(input);
}

export function validatePartialInternacion(input) {
    return internacionSchema.partial().safeParseAsync(input);
}
