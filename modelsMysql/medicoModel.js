import mySqlPool  from "../config/db.js";
//import { validateMedico } from "../schemas/medicoSchema.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class MedicoModel{
    static async getMedicos (){
        const data = await db.query('SELECT * FROM medico INNER JOIN especialidad ON medico.idespecialidad = especialidad.idespecialidad')
        return data[0]
    }

    static async getMedicoByMatricula({matricula}){
        const [data] = await db.query('SELECT * FROM medico where matricula=?',[matricula])
        if(data.length==0) return null
        return data[0]
    }

    static async createMedico({input}){
        const {
            matricula,
            nombre,
            idespecialidad
        } = input
        console.log(matricula) //Visualización en consola de matricula
        try{ 
            const newMedico = await db.query('INSERT INTO medico(matricula,nombre,idespecialidad) VALUES(?,?,?)',[matricula,nombre,idespecialidad])
            return newMedico[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateMedico ({input}){
        const {
            matricula,
            nombre,
            idespecialidad
        } = input
        try{
            const data = await db.query('UPDATE medico SET nombre=? , idespecialidad=? WHERE matricula=?',[nombre,idespecialidad,matricula])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteMedico({matricula}){
        try{
            const data = await db.query('DELETE FROM medico WHERE matricula=?',[matricula])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
