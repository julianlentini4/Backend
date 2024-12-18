import z from 'zod'
//Validación de datos 
const usersSchema = z.object({
  username: z.string({
    message: "El id de agenda debe ser un numero entero"
  }),
  clave: z.string().refine(value => value.length >=6,{
    message: "La contraseña debe ser superior a 5 digitos"
  }),
  tipo: z.string({
    message: "El Tipo debe ser string y debe ser correcto"
  }),
  sector: z.string({
    message: "El sector debe ser string y debe ser correcto"
  }),
  descripcion: z.string({
    message: "La descripcion debe ser string y debe ser correcto"
  })
})

export async function validateUsers (objet) {
  return usersSchema.safeParseAsync(objet)
}

export function validatePartialUsers (objet) {
  return usersSchema.partial({tipo: true, sector: true, descripcion: true}).safeParseAsync(objet)
}