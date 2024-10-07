import mySqlPool  from "../config/db.js";
const db = mySqlPool

export class EspecialidadModel{
    static async getEspecialidad (){
        const [especialidades] = await db.query('SELECT * FROM especialidad')
        return especialidades
    }

    static async getEspecialidadById ({idEspecialidad}){
        const [especialidades] = await db.query('SELECT * FROM especialidad WHERE idEspecialidad = ?',[idEspecialidad])
        if(especialidades.length === 0) return null
        return especialidades[0]
    }

    static async createEspecialidad ({input}){
        const{
            nombre
        } = input

        try{
            const data = await db.query('INSERT INTO especialidad (nombre) VALUES (?)',[nombre])
            return data[0]
        }catch(error){
            console.log(error)
        }
    }

    static async deleteEspecialidad ({idEspecialidad}){
        try{
            //const [especialidades] = await db.query('SELECT * FROM especialidad WHERE idEspecialidad = ?',[idEspecialidad])
            //if(especialidades.length === 0) return false
            const data = await db.query('DELETE FROM especialidad WHERE idEspecialidad = ?',[idEspecialidad])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }

    static async updateEspecialidad ({input}){
        const{
            idEspecialidad,
            nombre,
        } = input
        try{
            const data = await db.query('UPDATE especialidad SET nombre = ? WHERE idEspecialidad = ?',[nombre,idEspecialidad])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }

}