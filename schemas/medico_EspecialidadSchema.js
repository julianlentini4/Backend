import z from 'zod'
//Validación de datos 
const medico_especialidadSchema = z.object({
  matricula: z.number().int({message: "La matricula tiene que ser un numero entero"}),
  idEspecialidad: z.number().int({message: "El id de especialidad tiene que ser un numero entero"}),
})

export async function validateMedico_especialidad (objet) {
  return medico_especialidadSchema.safeParseAsync(objet)
}