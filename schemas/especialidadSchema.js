import z from 'zod'

const especialidadSchema = z.object({
    idEspecialdad: z.number(),
    nombre: z.string()
})

export function validateEspecialidad(input){
    return especialidadSchema.safeParse(input)
}

export function validatePartialEspecialidad(input){
    return especialidadSchema.partial().safeParse(input)
}