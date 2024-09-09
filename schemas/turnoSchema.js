import z from 'zod';

const turnoSchema = z.object({
  fechaHoraTurno: z.string(), // Asegúrate de que sea un formato de fecha válido
  estado: z.enum(['Pendiente', 'Confirmado', 'Finalizado', 'Cancelado']),
  dni: z.number().int().positive(),
  matricula: z.number().int().positive(),
  nroAgenda: z.number().int().positive(),
});

export async function validateTurno(objet) {
  return turnoSchema.safeParseAsync(objet);
}

export function validatePartialTurno(objet) {
  return turnoSchema.partial().safeParse(objet);
}
