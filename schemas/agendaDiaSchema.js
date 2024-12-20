import z from 'zod'

const agendaSchema = z.object({
  dia: z.number().int().positive({
    message:"Tiene que ser un numero entero"})
  .min(0,{ message: "El numero no puede ser menor a 0 (Domingo)"})
  .max(6,{ message: "El numero no puede ser mayor a 6 (Sabado)"}),
  horaInicio: z.string(),
  horaFin: z.string()
})


export async function validateAgendaDia (objet) {
  return agendaSchema.safeParseAsync(objet)
}

export function validatePartialAgendaDia (objet) {
  return agendaSchema.partial({idAgenda: true,}).safeParseAsync(objet)
}