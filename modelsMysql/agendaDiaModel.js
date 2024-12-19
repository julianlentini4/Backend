import mySqlPool  from "../config/db.js";
const db = mySqlPool

export class AgendaDiaModel{
    static async getAgendaDia (){
        const data = await db.query('SELECT * FROM agenda_dia')
        return data[0]
    }

    static async getAgendaDiaById({idAgenda,idAgendaDia}){
        const [data] = await db.query('SELECT * FROM agenda_dia where idAgenda=? AND idAgendaDia=?',[idAgenda,idAgendaDia])
        if(data.length==0) return null
        return data[0]
    }

    static async createAgendaDia({input}){
        const{
            idAgenda, dia, horaInicio, horaFin
        } = input
        try{ 
            const data = await db.query('INSERT INTO agenda_dia(idAgenda,dia,horaInicio,horaFin) VALUES(?,?,?,?)',[idAgenda, dia, horaInicio, horaFin])
            return data
        }catch(error){
             console.log(error) 
        }
        return null
    }

    static async updateAgendaDia({idAgenda, idAgendaDia, dia, horaInicio, horaFin}){
        try{
            const data = await db.query('UPDATE agenda_dia SET dia = ?, horaInicio = ?, horaFin = ?  WHERE idAgenda = ? AND idAgendaDia = ?',[dia, horaInicio, horaFin, idAgenda, idAgendaDia])
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteAgendaDia({idAgenda, idAgendaDia}){
        try{
            const data = await db.query('DELETE FROM agenda_dia WHERE idAgenda = ? AND idAgendaDia = ?',[idAgenda, idAgendaDia])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }
}
