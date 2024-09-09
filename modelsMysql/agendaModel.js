import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

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
        const {
            idAgenda,
            matricula,
            tipo,
        } = input
        console.log(idAgenda) //Visualización en consola de idAgenda
        try{ 
            //Modificar Consultas
            const newAgenda = await db.query('INSERT INTO agenda(idAgenda,matricula,tipo) VALUES(?,?,?)',[
                idAgenda,
                matricula,
                tipo
            ])
            return newAgenda[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateAgenda ({input}){
        const {
            idAgenda,
            matricula,
            tipo
        } = input
        try{
            const data = await db.query('UPDATE agenda SET matricula = ? , tipo = ? WHERE idAgenda = ?',[
                matricula,
                tipo,
                idAgenda
            ])
            console.log(data)
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
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
