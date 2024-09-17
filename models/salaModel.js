import mySqlPool  from "../config/db.js";
const db = mySqlPool

export class SalaModel{
    static async getSalas (){
        const [salas] = await db.query('SELECT * FROM sala')
        return salas
    }

    static async getSalaById ({nro}){
        const [salas] = await db.query('SELECT * FROM sala WHERE nro = ?',[nro])
        if(salas.length === 0) return null
        return salas[0]
    }
    static async updateSala ({input}){
        const{
            nro,
            descripcion,
        } = input

        try{
            const data = await db.query('UPDATE sala SET nro = ?, descripcion = ?',[nro,descripcion])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }

}