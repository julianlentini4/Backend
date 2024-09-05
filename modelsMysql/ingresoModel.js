import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class IngresoModel{
    static async getIngresos (){
        const data = await db.query('SELECT * FROM ingreso INNER JOIN medico ON medico.matricula = ingreso.matricula') // Agregar inner con paciente y postrar todos los datos
        return data[0]
    }

    static async getIngresoByAccessNumber({nroAcceso}){
        const [data] = await db.query('SELECT * FROM ingreso where nroAcceso=?',[nroAcceso])
        if(data.length==0) return null
        return data[0]
    }

    static async createIngreso({input}){
        const {
            nroAcceso,
            matricula,
            descripcion,
            fechaRecepcion,
            horaRecepcion,
        } = input
        console.log(nroAcceso) //Visualización en consola de nroAcceso
        try{ 
            //Modificar Consultas
            const newIngreso = await db.query('INSERT INTO ingreso(nroAcceso,matricula,descripcion,fechaRecepcion,horaRecepcion) VALUES(?,?,?,?,?)',[
                nroAcceso,
                matricula,
                descripcion,
                fechaRecepcion,
                horaRecepcion
            ])
            return newIngreso[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateIngreso ({input}){
        const {
            nroAcceso,
            matricula,
            descripcion,
            fechaRecepcion,
            horaRecepcion,
        } = input
        try{
            const data = await db.query('UPDATE ingreso SET matricula = ? , descripcion = ? , fechaRecepcion = ? , horaRecepcion = ? WHERE nroAcceso=?',[
                matricula,
                descripcion,
                fechaRecepcion,
                horaRecepcion,
                nroAcceso
            ])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteIngreso({nroAcceso}){
        try{
            const data = await db.query('DELETE FROM ingreso WHERE nroAcceso=?',[nroAcceso])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
