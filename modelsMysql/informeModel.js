import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class InformeModel{
    static async getInformes (){
        const data = await db.query('SELECT * FROM informe INNER JOIN medico ON medico.matricula = informe.matricula') // Agregar inner con paciente y postrar todos los datos
        return data[0]
    }

    static async getInformeById({idInforme}){
        const [data] = await db.query('SELECT * FROM informe where idInforme=?',[idInforme])
        if(data.length==0) return null
        return data[0]
    }

    static async createInforme({input}){
        const {
            idInforme,
            nroAcceso,
            matricula,
            descripcion,
            fechaInicio,
            fechaFirmado = null,
            estado
        } = input
        console.log(idInforme) //Visualización en consola de idInforme
        try{ 
            //Modificar Consultas
            const newMedico = await db.query('INSERT INTO informe(idInforme,nroAcceso,matricula,descripcion,fechaInicio,fechaFirmado,estado) VALUES(?,?,?,?,?,?,?)',[
                idInforme,
                nroAcceso,
                matricula,
                descripcion,
                fechaInicio,
                fechaFirmado,
                estado
            ])
            return newMedico[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateInforme ({input}){
        const {
            idInforme,
            nroAcceso,
            matricula,
            descripcion,
            fechaInicio,
            fechaFirmado = null,
            estado
        } = input
        try{
            const data = await db.query('UPDATE informe SET nroAcceso = ? , matricula = ? , descripcion = ? , fechaInicio = ? , fechaFirmado = ? , estado = ? WHERE idInforme=?',[
                nroAcceso,
                matricula,
                descripcion,
                fechaInicio,
                fechaFirmado,
                estado,
                idInforme
            ])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteInforme({idInforme}){
        try{
            const data = await db.query('DELETE FROM informe WHERE idInforme=?',[idInforme])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
