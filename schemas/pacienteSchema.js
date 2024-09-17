import z from 'zod'

const pacienteSchema = z.object({
    dni: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    mail: z.string(),
    obraSocial: z.string()

})

export function validatePaciente(input){
    return pacienteSchema.safeParse(input)
}

export function validatePartialPaciente(input){
    return pacienteSchema.partial().safeParse(input)
}