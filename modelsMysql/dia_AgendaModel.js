import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class Dia_AgendaModel{
    static async getDia_Agenda (){
        const data = await db.query('SELECT * FROM dia_agenda order by nroDia')
        return data[0]
    }

    static async getDia_AgendaByIdAgenda({idAgenda}){
        const [data] = await db.query('SELECT * FROM dia_agenda where idAgenda=?',[idAgenda])
        if(data.length==0) return null
        return data[0]
    }
    static async getDia_AgendaByIdDia({nroDia}){
        const [data] = await db.query('SELECT * FROM dia_agenda where nroDia=?',[nroDia])
        if(data.length==0) return null
        return data[0]
    }

    static async createDia_Agenda({input}){
        const {
            idAgenda,
            nroDia,
            horaAtencion
        } = input
        console.log(idAgenda) //Visualización en consola de idAgenda
        try{ 
            //Modificar Consultas
            const newAgenda = await db.query('INSERT INTO dia_agenda(idAgenda,nroDia,horaAtencion) VALUES(?,?,?)',[
                idAgenda,
                nroDia,
                horaAtencion
            ])
            return newAgenda[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }
    
    static async deleteDia_Agenda({input}){
        try{
           const{
            idAgenda,
            nroDia,
            horaAtencion
        } = input
            const data = await db.query('DELETE FROM dia_agenda WHERE idAgenda = ? and nroDia = ? and horaAtencion = ?',[idAgenda, nroDia, horaAtencion])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
