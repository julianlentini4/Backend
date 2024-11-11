import z from 'zod'
//Validación de datos 
const ingresoSchema = z.object({
  idIngreso: z.number().int({
    message: "El id de ingreso debe ser un numero entero"
  }),
  tipo: z.string({
    message: "El Tipo debe ser string"
  }),
  descripcion: z.string({
    invalid_type_error: 'la descripcion del ingreso debe ser string',
  })
})

export async function validateIngreso (objet) {
  return ingresoSchema.safeParseAsync(objet)
}

export function validatePartialIngreso (objet) {
  return ingresoSchema.partial({idIngreso: true}).safeParseAsync(objet)
}