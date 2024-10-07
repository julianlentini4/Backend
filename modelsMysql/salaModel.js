import mySqlPool  from "../config/db.js";
const db = mySqlPool

export class SalaModel{
    static async getSalas (){
        const [salas] = await db.query('SELECT * FROM sala')
        return salas
    }

    static async getSalaById ({nroSala}){
        const [salas] = await db.query('SELECT * FROM sala WHERE nroSala = ?',[nroSala])
        if(salas.length === 0) return null
        return salas[0]
    }

    static async createSala({input}){
        const {
            nroSala,
            estado
        } = input
        try{ 
            const newSala = await db.query('INSERT INTO sala(nroSala,estado) VALUES(?,?)',[
                nroSala,
                estado
            ])
            return newSala[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateSala ({input}){
        const{
            nroSala,
            estado
        } = input

        try{
            const data = await db.query('UPDATE sala SET estado = ? where nroSala = ?',[estado,nroSala])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }

    static async deleteSala({nroSala}){
        try{
            const data = await db.query('DELETE FROM sala WHERE nroSala = ?',[nroSala])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }

}