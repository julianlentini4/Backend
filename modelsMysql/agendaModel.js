import mySqlPool  from "../config/db.js";
const db = mySqlPool

export class AgendaModel{
    static async getAgenda (){
        const data = await db.query('SELECT * FROM Agenda')
        return data[0]
    }

    static async getAgendaById({idAgenda}){
        const [data] = await db.query('SELECT * FROM Agenda where idAgenda=?',[idAgenda])
        if(data.length==0) return null
        return data[0]
    }

    static async createAgenda({input}){
        const{
            matricula, dia, horaInicio, horaFin
        } = input
        try{ 
            const data = await db.query('INSERT INTO agenda(matricula,dia,horaInicio,horaFin) VALUES(?,?,?,?)',[ matricula, dia, horaInicio, horaFin])
            return data
        }catch(error){
             console.log(error) 
        }
        return null
    }

    static async updateAgenda ({idAgenda, matricula, dia, horaInicio, horaFin}){
        try{
            const data = await db.query('UPDATE agenda SET matricula = ?, dia = ?, horaInicio = ?, horaFin = ?  WHERE idAgenda = ?',[matricula, dia, horaInicio, horaFin, idAgenda])
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteAgenda({idAgenda}){
        try{
            const data = await db.query('DELETE FROM agenda WHERE idAgenda = ?',[idAgenda])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }
}
