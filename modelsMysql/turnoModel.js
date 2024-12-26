import mySqlPool  from "../config/db.js";

const db = mySqlPool

export class TurnoModel{
    static async getTurnos (){
        const data = await db.query('SELECT * FROM turno')
        return data[0]
    }

    static async getTurnoById({idTurno}){
        const [data] = await db.query('SELECT * FROM turno where idTurno=?',[idTurno])
        if(data.length==0) return null
        return data[0]
    }

    static async getTurnoByPaciente({dni}){
        const [data] = await db.query('SELECT * FROM turno where dni=?',[dni])
        if(data.length==0) return null
        return data[0]
    }

    static async getTurnoByMedico({matricula}){
        const [data] = await db.query('SELECT * FROM turno where matricula=?',[matricula])
        if(data.length==0) return null
        return data[0]
    }

    static async createTurno({input}){
        const {
            idTurno,
            matricula,
            nroAgenda,
            dni,
            fecha,
            hora,
        } = input

        const estado = 'Pendiente'

        try{ 
            const newMedico = await db.query('INSERT INTO informe(idTurno,matricula,dni,fecha,hora,estado) VALUES(?,?,?,?,?,?)',[idTurno,matricula,dni,fecha,hora,estado])
            return newMedico[0]
        }catch(error){
             console.log(error)
        }
        return null
    }

    static async updateInforme ({input}){
        const {
            idTurno,
            fecha,
            hora
        } = input
        try{
            const data = await db.query('UPDATE turno SET fecha = ?, hora = ? WHERE idTurno=?',[fecha,hora,idTurno])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteInforme({idTurno}){
        try{
            const data = await db.query('DELETE FROM turno WHERE idTurno=?',[idTurno])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }
}