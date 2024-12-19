import z from 'zod'

const agendaSchema = z.object({
  idAgenda: z.number().int({
    message: "El id de agenda debe ser un numero entero"
  }),
  matricula: z.number().int().positive().refine(value => value.toString().length <=5,{
    message: "La matricula no pude ser superior a 5 digitos"
  }),
  tipo: z.string({}),
})


export async function validateAgenda (objet) {
  return agendaSchema.safeParseAsync(objet)
}

export function validatePartialAgenda (objet) {
  return agendaSchema.partial({idAgenda: true,}).safeParseAsync(objet)
}