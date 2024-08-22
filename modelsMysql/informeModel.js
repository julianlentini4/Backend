import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class InformeModel{
    static async getInformes (){
        const data = await db.query('SELECT * FROM informe INNER JOIN medico ON medico.matricula = informe.matricula')
        return data[0]
    }

    static async getInformeByAccessNumber({nroAcceso}){
        const [data] = await db.query('SELECT * FROM informe where nroAcceso=?',[nroAcceso])
        if(data.length==0) return null
        return data[0]
    }

    static async createInforme({input}){
        const {
            nroAcceso,
            idPaciente,
            matricula,
            descripcion,
            fechaInicio,
            fechaFirmado = null,
            estado
        } = input
        console.log(nroAcceso) //Visualización en consola de matricula
        try{ 
            //Modificar Consultas
            const newMedico = await db.query('INSERT INTO informe(nroAcceso,idPaciente,matricula,descripcion,fechaInicio,fechaFirmad,estado) VALUES(?,?,?,?,?,?,?)',[nroAcceso,idPaciente,matricula,descripcion,fechaInicio,fechaFirmado,estado])
            return newMedico[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateInforme ({input}){
        const {
            nroAcceso,
            idPaciente,
            matricula,
            descripcion,
            fechaInicio,
            fechaFirmado = null,
            estado
        } = input
        try{
            const data = await db.query('UPDATE informe SET idPaciente = ? , matricula = ? , descripcion = ? , fechaInicio = ? , fechaFirmad = ? , estado = ? WHERE nroAcceso=?',[idPaciente,matricula,descripcion,fechaInicio,fechaFirmado,estado,nroAcceso])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteInforme({nroAcceso}){
        try{
            const data = await db.query('DELETE FROM medico WHERE matricula=?',[nroAcceso])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
