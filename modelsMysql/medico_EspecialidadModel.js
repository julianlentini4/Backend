import mySqlPool  from "../config/db.js";
const db = mySqlPool

export class Medico_EspecialidadModel{
    static async getMedico_Especialidad (){
        const data = await db.query('SELECT * FROM medico_especialidad order by idEspecialidad')
        return data[0]
    }

    static async getMedico_EspecialidadByMatricula({matricula}){
        const data = await db.query('SELECT * FROM medico_especialidad me INNER JOIN especialidad e ON e.idEspecialidad = me.idEspecialidad WHERE matricula=?',[matricula])
        if(data.length==0) return null
        return data[0]
    }

    static async getMedico_EspecialidadByIdEspecialidad({idEspecialidad}){
        const data = await db.query('SELECT * FROM medico_especialidad me INNER JOIN medico m ON m.matricula = me.matricula WHERE idEspecialidad=?',[idEspecialidad])
        if(data.length==0) return null
        return data[0]
    }

    static async createMedico_Especialidad({input}){
        const {
            matricula,
            idEspecialidad
        } = input
        try{ 
            const newAgenda = await db.query('INSERT INTO medico_especialidad(matricula,idEspecialidad) VALUES(?,?)',[matricula,idEspecialidad])
            return newAgenda[0]
        }catch(error){
             console.log(error)
        }
        return null
    }

    static async deleteMedico_Especialidad({input}){
        try{
           const{
            matricula,
            idEspecialidad
            } = input
            const data = await db.query('DELETE FROM medico_especialidad WHERE matricula = ? and idEspecialidad = ?',[matricula,idEspecialidad])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }
}