import z from 'zod'
//Validación de datos 
const pte_IngresoSchema = z.object({
    nroAcceso: z.string().refine(value => value.length == 7,{
        message: "El numero de acceso debe ser de a 7 digitos"
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
    }),
    matricula: z.number().int().positive().refine(value => value.toString().length <=5,{
        message: "La matricula no pude ser superior a 5 digitos"
    }),
    tipo: z.string().refine(value => value.length == 1,{
        message: "El tipo de ingreso no pude ser superior a 1 caracter"
    }),
    idPaciente: z.number().int().positive().refine(value => value.toString().length <= 6,{
        message: "El id Paciente no pude ser superior a 6 digitos"
    }),
    idIngreso: z.number().int().positive().refine(value => value.toString().length <= 6,{
        message: "El id ingreso no pude ser superior a 6 digitos"
    }),
})

export async function validatePte_Ingreso (objet) {
  return pte_IngresoSchema.safeParseAsync(objet)
}

export function validatePartialIngreso (objet) {
  return pte_IngresoSchema.partial().safeParse(objet)
}