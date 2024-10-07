import z from 'zod'
const internacionSchema = z.object({
    nroSala: z.number().int({
        message: "No existe sala con ese numero"
    }),    
    dni: z.number().int({
        message: "No existe paciente con ese dni"
    }),
    fechaInternacion: z.string().date({
        message: "fecha de Internacion no valida"
    }),
    fechaAlta: z.string().date({
        message: "fecha de Alta no valida"
    })
});

export function validateInternacion(input) {
    return internacionSchema.safeParseAsync(input);
}