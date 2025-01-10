import mySqlPool  from "../config/db.js";
const db = mySqlPool

export class AgendaModel{
    static async getAgenda (){
        const data = await db.query('SELECT * FROM Agenda a inner join agenda_dia ad ON a.idAgenda = ad.idAgenda')
        return data[0]
    }

    static async getAgendaById({idAgenda}){
        const [data] = await db.query('SELECT * FROM Agenda where idAgenda=?',[idAgenda])
        if(data.length==0) return null
        return data[0]
    }

    static async getAgendaByEspecialidad({especialidad}){
        const [data] = await db.query('SELECT ')
    }

    static async createAgenda({ input }) {
        const { matricula } = input;
        try { 
            const data = await db.query( 'INSERT INTO agenda (matricula) VALUES (?)', [matricula] );
            return data[0]
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    

    static async updateAgenda ({input}){
        const {idAgenda, matricula} = input;
        try{
            const data = await db.query('UPDATE agenda SET matricula = ? WHERE idAgenda = ?',[matricula, idAgenda])
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
