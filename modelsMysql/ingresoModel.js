import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class IngresoModel{
    static async getIngreso (){
        const data = await db.query('SELECT * FROM ingreso')
        return data[0]
    }

    static async getIngresoById({idIngreso}){
        const [data] = await db.query('SELECT * FROM ingreso where idIngreso=?',[idIngreso])
        if(data.length==0) return null
        return data[0]
    }

    static async createIngreso({input}){
        const {
            idIngreso,
            tipo,
            descripcion,
        } = input
        console.log(idIngreso) //Visualización en consola de idIngreso
        try{ 
            //Modificar Consultas
            const newIngreso = await db.query('INSERT INTO ingreso(idIngreso,tipo,descripcion) VALUES(?,?,?)',[
                idIngreso,
                tipo,
                descripcion
            ])
            return newIngreso[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateIngreso ({input}){
        const {
            idIngreso,
            tipo,
            descripcion
        } = input
        try{
            const data = await db.query('UPDATE ingreso SET tipo = ? , descripcion = ? WHERE idIngreso = ?',[
                tipo,
                descripcion,
                idIngreso
            ])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteIngreso({idIngreso}){
        try{
            const data = await db.query('DELETE FROM ingreso WHERE idIngreso = ?',[idIngreso])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }
}
