import mySqlPool, { query } from "../config/db.js"
const db = mySqlPool

export class PacienteModel{
    static async getPacientes (){
        const [pacientes] = await db.query('SELECT * FROM paciente')
        return pacientes
    }

    static async getById ({dni}){
        const [pacientes] = await db.query('SELECT * FROM paciente WHERE dni = ?',[dni])
        if(pacientes.length === 0) return null
        return pacientes[0]
    }

    static async create({input}){
        const{
            dni,
            nombre,
            apellido,
            mail,
            obraSocial
        } = input

        try{
            await db.query('INSERT INTO paciente (dni,nombre,apellido,mail,obraSocial) VALUES (? , ? , ? , ? , ? )',[dni,nombre,apellido,mail,obraSocial])
        }catch(error){
            console.log(error)
        }
    }

    static async delete ({dni}){
        const [pacientes] = await db.query('SELECT * FROM paciente WHERE dni = ?',[dni])
        if(pacientes.length === 0) return false

        await db.query('DELETE FROM paciente WHERE id = ?',[dni])
    }

    static async update ({input}){
        const{
            dni,
            nombre,
            apellido,
            mail,
            obraSocial
        } = input

        try{
            const data = await db.query('UPDATE paciente SET dni = ?, nombre = ?, apellido = ?, mail = ?, obraSocial = ? WHERE id = ?',[dni,nombre,apellido,mail,obraSocial])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }

}