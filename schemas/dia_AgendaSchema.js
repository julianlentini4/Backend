import z from 'zod'
//Validación de datos 
const dia_AgendaSchema = z.object({
  idAgenda: z.number().int({
    message: "El id de agenda debe ser un numero entero"
  }),
  idDia: z.number().int({
    message: "El id de Dia debe ser un numero entero"
  }),
  hora: z.string().time({
    message: "La hora no esta en el formato correcto"
  })
})

export async function validateDia_Agenda (objet) {
  return dia_AgendaSchema.safeParseAsync(objet)
}

export function validatePartialDia_Agenda (objet) {
  return dia_AgendaSchema.partial().safeParse(objet)
}