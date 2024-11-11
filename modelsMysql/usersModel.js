import mySqlPool  from "../config/db.js";
const db = mySqlPool
//GET ALL MEDICOS LIST

export class UsersModel{
    static async getUsers (){
        const data = await db.query('SELECT * FROM Users')
        return data[0]
    }

    static async getUsersByUsername({username}){
        const [data] = await db.query('SELECT * FROM Users where username = ? ',[username]) //corregir cuando realicemos la producción del token
        if(data.length==0) return null
        return data[0]
    }

    static async createUsers({input}){
        const {
            username,
            clave,
            tipo,
            sector,
            descripcion
        } = input
        console.log(input)
        try{ 
            const newUsers = await db.query('INSERT INTO Users(username,clave,tipo,sector,descripcion) VALUES(?,?,?,?,?)',[
                username,
                clave,
                tipo,
                sector,
                descripcion
            ])
            return newUsers[0]
        }catch(error){
             console.log(error) //Agregar Manejo de errores 
        }
        return null
    }

    static async updateUsers ({input}){
        const {
            username,
            clave,
            tipo,
            sector,
            descripcion
        } = input
        console.log(input)
        try{
            const data = await db.query('UPDATE Users SET clave = ? ,tipo = ?, sector = ?, descripcion = ? WHERE username = ?',[                
                clave,
                tipo,
                sector,
                descripcion,
                username
            ])
            //console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteUsers({username}){
        try{
            const data = await db.query('DELETE FROM Users WHERE username = ?',[username])
            return data[0]
        }catch(error){
            console.log(error) // agregar manejo de errores
        }
        return null
    }

    static async getUsersLogin({username}){
        const data = await db.query('SELECT clave,username,tipo,sector,descripcion FROM Users where username=?',[username])
        if(data.length==0) return null
        return data[0]
    }
}
