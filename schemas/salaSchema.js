import z from 'zod'

const salaSchema = z.object({
    nro: z.number(),
    estado: z.string(),
})

export function validateSala(input){
    return salaSchema.safeParse(input)
}

export function validatePartialSala(input){
    return salaSchema.partial().safeParse(input)
}