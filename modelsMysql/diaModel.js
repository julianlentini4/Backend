import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class DiaModel{
    static async getDia (){
        const data = await db.query('SELECT * FROM dia')
        return data[0]
    }

    static async getDiaById({nroDia}){
        const [data] = await db.query('SELECT * FROM dia where nroDia=?',[nroDia])
        if(data.length==0) return null
        return data[0]
    }

    static async createDia({input}){
        const {
            nroDia,
            nombre
        } = input
        console.log(nroDia) //Visualización en consola de nroDia
        try{ 
            //Modificar Consultas
            const newDia = await db.query('INSERT INTO dia(nroDia,nombre) VALUES(?,?)',[
                nroDia,
                nombre
            ])
            return newDia[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateDia ({input}){
        const {
            nroDia,
            nombre
        } = input
        try{
            const data = await db.query('UPDATE dia SET nombre = ? WHERE nroDia = ?',[
                nombre,
                nroDia
            ])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteDia({nroDia}){
        try{
            const data = await db.query('DELETE FROM dia WHERE nroDia = ?',[nroDia])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
