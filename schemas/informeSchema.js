import z from 'zod'
//Validación de datos 
const informeSchema = z.object({
  idInforme: z.number().int({
    message: "El id de informe debe ser un numero entero"
  }),
  nroAcceso: z.number().int().positive(),/*.refine(value => value.length == 7,{
    message: "El numero de acceso debe ser de a 7 digitos"
  }),*/
  matricula: z.number().int().positive().refine(value => value.toString().length <=5,{
    message: "La matricula no pude ser superior a 5 digitos"
  }),
  descripcion: z.string({
    invalid_type_error: 'El nombre del informe debe ser string',
    required_error: 'El nombre del informe es requerido'
  }),
  fechaInicio: z.string({
    message: "La fecha de inicio del informe no esta en el formato correcto"
  }),
  fechaFirmado: z.string({
    message: "La fecha de firmado del informe no esta en el formato correcto"
  }),
  estado: z.string().refine( value => value =='P' || value == 'I' || value == 'F' , {
    message: "El estado debe ser string y debe ser correcto"
  })
})

export async function validateInforme (objet) {
  return informeSchema.safeParseAsync(objet)
}

export function validatePartialinforme (objet) {
  return informeSchema.partial({idInforme: true,}).safeParseAsync(objet)
}