import mySqlPool  from "../config/db.js";
//import { validateMedico } from "../schemas/medicoSchema.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class MedicoModel{
    static async getMedicos (){
        const data = await db.query('SELECT * FROM medico')
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
            apellido,
            nombre,
            dni
        } = input
        try{ 
            const newMedico = await db.query('INSERT INTO medico(matricula,apellido,nombre,dni) VALUES(?,?,?,?)',
            [
                matricula,
                apellido,
                nombre,
                dni
            ])
            return newMedico[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateMedico ({input}){
        const {
            matricula,
            apellido,
            nombre,
            dni
        } = input
        try{
            const data = await db.query('UPDATE medico SET apellido=? , nombre=? , dni=? WHERE matricula=?',
            [
                apellido,
                nombre,
                dni,
                matricula
            ])
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
