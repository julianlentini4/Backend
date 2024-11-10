import {validatePartialUsers, validateUsers} from "../schemas/usersSchema.js";
import bcrypt from 'bcrypt' //HASH PASSWORD 
import  jwt  from "jsonwebtoken";


export class UsersController{
    constructor({ usersModel }) {
        this.usersModel = usersModel
    }

    getUsers = async (_req,res) => {
        const data = await this.usersModel.getUsers()
        return res.json(data)
    }

    getUsersByUsername= async (req,res) => {
        const {username} = req.query
        const data = await this.usersModel.getUsersByUsername({ username })
        if(data) return res.status(200).json(data)        
        return res.status(404).json({message: 'Users not found'})        
    }

    createUsers = async (req,res) => {
        const resultValidate = await validateUsers(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        console.log(resultValidate.data)
        if(await this.usersModel.getUsersByUsername({username: resultValidate.data.username})) return res.status(404).json('El usuario ya existe')
        const {clave, ...data} = resultValidate.data
        const hashPassword = await bcrypt.hash(clave,10)
        const newUser = await this.usersModel.createUsers({input: {clave:hashPassword, ...data}})
        if(newUser) return res.status(201).json(newUser)        
        return res.status(404).json('Error al crear Users') 
    }

    updateUsers = async (req,res) => {
        const resultValidate = await validateUsers(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        if(!await this.usersModel.getUsersByUsername({username: resultValidate.data.username})) return res.status(404).json('El usuario no existe')
        const userUpdated = await this.usersModel.updateUsers({input: resultValidate.data})
        if(userUpdated) return res.status(201).json(userUpdated)        
        return res.status(404).json('Error al actualizar Users')  
    }

    deleteUsers = async (req,res) => {
        const {username} = req.query
        if(!await this.usersModel.getUsersByUsername({username: username})) return res.status(404).json('El usuario no existe')
        const userDeleted = await this.usersModel.deleteUsers({username: username})
        if(userDeleted) return res.status(201).json(userDeleted)        
        return res.status(404).json('Error al eliminar Users')
    }

    getLogin = async (req,res) => {
        console.log("entre 2")
        const resultValidate = await validatePartialUsers(req.body)
        if(!resultValidate.success) return res.status(400).json({error: JSON.parse(resultValidate.error.message)})
        const userValidate = await this.usersModel.getUsersLogin({username:resultValidate.data.username})
        if(!userValidate) return res.status(404).json('Usuario no registrado')
        const match = await bcrypt.compare(resultValidate.data.clave, userValidate[0].clave); //Comparar contraseña plana con contraseña hasheada
        if (!match) return res.status(404).json('Contraseña Errónea')
        console.log("Salí")
        res.clearCookie('access_token')
        console.log(userValidate[0].username)
        const token = jwt.sign({username:userValidate[0].username, tipo: userValidate[0].tipo, sector: userValidate[0].sector, descripcion: userValidate[0].descripcion},'secret-key',{expiresIn:'1h'})
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: null
        })
        return res.status(200).json('Acepted')
    }
}
