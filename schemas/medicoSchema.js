import z from 'zod'
//Validación de datos 
const medicoSchema = z.object({
  matricula: z.number().int().positive().refine(value => value.toString().length <=5,{
    message: "La matricula no pude ser superior a 5 digitos"
  }),
  apellido: z.string({
    invalid_type_error: 'El nombre del medico debe ser string',
    required_error: 'El nombre del medico es requerido'
  }),
  nombre: z.string({
    invalid_type_error: 'El nombre del medico debe ser string',
    required_error: 'El nombre del medico es requerido'
  }),
  dni: z.number().int()
})

export async function validateMedico (objet) {
  return medicoSchema.safeParseAsync(objet)
}
/*
export function validatePartialMedico (objet) {
  return medicoSchema.partial().safeParse(objet)
}*/