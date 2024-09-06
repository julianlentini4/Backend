import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class Pte_IngresoModel{
    static async getPte_Ingresos (){
        const data = await db.query('SELECT * FROM paciente_ingreso INNER JOIN medico ON medico.matricula = paciente_ingreso.matricula') // Agregar inner con paciente y postrar todos los datos
        return data[0]
    }

    static async getPte_IngresoByAccessNumber({nroAcceso}){
        const [data] = await db.query('SELECT * FROM paciente_ingreso where nroAcceso=?',[nroAcceso])
        if(data.length==0) return null
        return data[0]
    }

    static async createPte_Ingreso({input}){
        const {
            nroAcceso,
            descripcion,
            fechaRecepcion,
            horaRecepcion,
            matricula,
            tipo,
            idPaciente,
            idIngreso
        } = input
        console.log(nroAcceso) //Visualización en consola de nroAcceso
        try{ 
            //Modificar Consultas
            const newIngreso = await db.query('INSERT INTO paciente_ingreso(nroAcceso,descripcion,fechaRecepcion,horaRecepcion,matricula,tipo,idPaciente,idIngreso) VALUES(?,?,?,?,?,?,?,?)',[
                nroAcceso,
                descripcion,
                fechaRecepcion,
                horaRecepcion,
                matricula,
                tipo,
                idPaciente,
                idIngreso
            ])
            return newIngreso[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updatePte_Ingreso ({input}){
        const {
            nroAcceso,
            descripcion,
            fechaRecepcion,
            horaRecepcion,
            matricula,
            tipo,
            idPaciente,
            idIngreso
        } = input
        try{
            const data = await db.query('UPDATE paciente_ingreso SET descripcion = ?, fechaRecepcion = ?, horaRecepcion = ?, matricula = ?, tipo = ?, idPaciente = ?, idTipo = ? WHERE nroAcceso=?',[
                nroAcceso,
                descripcion,
                fechaRecepcion,
                horaRecepcion,
                matricula,
                tipo,
                idPaciente,
                idIngreso
            ])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deletePte_Ingreso({nroAcceso}){
        try{
            const data = await db.query('DELETE FROM paciente_ingreso WHERE nroAcceso=?',[nroAcceso])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
