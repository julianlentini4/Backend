import z from 'zod'

const pacienteSchema = z.object({
    dni: z.number().int({
        message: "El dni debe ser un numero entero"
      }),
    nombre: z.string({
        message: "El nombre debe ser una cadena de texto "
      }),
    apellido: z.string({
        message: "El apellido debe ser una cadena de texto "
      }),
    mail: z.string().email({
        message: "El campo debe ser email"
      }),
    obraSocial: z.string({
        message: "La obra social debe ser una cadena de texto "
      })

})

export function validatePaciente(input){
    return pacienteSchema.safeParse(input)
}

export function validatePartialPaciente(input){
    return pacienteSchema.partial().safeParse(input)
}