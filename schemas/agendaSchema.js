import z from 'zod'
//Validación de datos 
const agendaSchema = z.object({
  idAgenda: z.number().int({
    message: "El id de agenda debe ser un numero entero"
  }),
  matricula: z.number().int().positive().refine(value => value.toString().length <=5,{
    message: "La matricula no pude ser superior a 5 digitos"
  }),
  tipo: z.string({
    message: "El Tipo debe ser string y debe ser correcto"
  })
})

export async function validateAgenda (objet) {
  return agendaSchema.safeParseAsync(objet)
}

export function validatePartialAgenda (objet) {
  return agendaSchema.partial({idAgenda: true,}).safeParseAsync(objet)
}