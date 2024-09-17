import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class DiaModel{
    static async getDia (){
        const data = await db.query('SELECT * FROM dia')
        return data[0]
    }

    static async getDiaById({idDia}){
        const [data] = await db.query('SELECT * FROM dia where idDia=?',[idDia])
        if(data.length==0) return null
        return data[0]
    }

    static async createDia({input}){
        const {
            idDia,
            nombre
        } = input
        console.log(idDia) //Visualización en consola de idDia
        try{ 
            //Modificar Consultas
            const newDia = await db.query('INSERT INTO dia(idDia,nombre) VALUES(?,?)',[
                idDia,
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
            idDia,
            nombre
        } = input
        try{
            const data = await db.query('UPDATE dia SET nombre = ? WHERE idDia = ?',[
                nombre,
                idDia
            ])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteDia({idDia}){
        try{
            const data = await db.query('DELETE FROM dia WHERE idDia = ?',[idDia])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
