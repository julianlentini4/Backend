import z from 'zod'

const salaSchema = z.object({
    nroSala: z.number(),
    estado: z.string(),
})

export function validateSala(input){
    return salaSchema.safeParseAsync(input)
}

/*
export function validatePartialSala(input){
    return salaSchema.partial().safeParse(input)
}*/