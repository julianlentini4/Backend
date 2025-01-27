import z from 'zod'
//Validación de datos 
const diaSchema = z.object({
  nroDia: z.number().int({
    message: "El id de dia debe ser un numero entero"
  }),
  nombre: z.string({
    invalid_type_error: 'el nombre del dia debe ser string',
  })
})

export async function validateDia (objet) {
  return diaSchema.safeParseAsync(objet)
}

export function validatePartialDia (objet) {
  return diaSchema.partial({nroDia: true}).safeParseAsync(objet)
}