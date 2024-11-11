import z from 'zod'

const salaSchema = z.object({
    nroSala: z.number(),
    estado: z.string().refine( value => value =='Disponible' || value == 'Ocupada' || value =='disponible' || value == 'ocupada', {
        message: "El estado de sala tiene que ser Disponible o Ocupada"
      }),
})

export function validateSala(input){
    return salaSchema.safeParseAsync(input)
}

/*
export function validatePartialSala(input){
    return salaSchema.partial().safeParse(input)
}*/