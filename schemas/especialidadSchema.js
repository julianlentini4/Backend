import z from 'zod'

const especialidadSchema = z.object({
    idEspecialidad: z.number().int(),
    nombre: z.string()
})

export function validateEspecialidad(input){
    return especialidadSchema.safeParseAsync(input)
}

export function validatePartialEspecialidad(input){
    return especialidadSchema.partial({idEspecialidad: true}).safeParseAsync(input)
}