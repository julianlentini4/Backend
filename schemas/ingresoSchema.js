import z from 'zod'
//Validación de datos 
const ingresoSchema = z.object({
    nroAcceso: z.string().refine(value => value.length == 7,{
        message: "El numero de acceso debe ser de a 7 digitos"
    }),
    matricula: z.number().int().positive().refine(value => value.toString().length <=5,{
        message: "La matricula no pude ser superior a 5 digitos"
    }),
     descripcion: z.string({
        invalid_type_error: 'El nombre del informe debe ser string',
        required_error: 'El nombre del informe es requerido'
    }),
    fechaRecepcion: z.string().date({
        message: "La fecha de inicio del informe no esta en el formato correcto"
    }),
    horaRecepcion: z.string().time({
        message: "La hora del informe no esta en el formato correcto"
    })
})

export async function validateIngreso (objet) {
  return ingresoSchema.safeParseAsync(objet)
}

export function validatePartialIngreso (objet) {
  return ingresoSchema.partial().safeParse(objet)
}