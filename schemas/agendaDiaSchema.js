import z from 'zod'

const agendaSchema = z.object({
  dia: z.string(),
  horaInicio: z.string(),
  horaFin: z.string()
})


export async function validateAgendaDia (objet) {
  return agendaSchema.safeParseAsync(objet)
}

export function validatePartialAgendaDia (objet) {
  return agendaSchema.partial({idAgenda: true,}).safeParseAsync(objet)
}