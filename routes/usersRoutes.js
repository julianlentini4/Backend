import { Router } from 'express'
import { UsersController } from '../controllers/usersController.js'

//routes
export const createUsersRoutes = ({ usersModel }) => {
    //express router
    const usersRouter = Router()

    const usersController = new UsersController({ usersModel })

    //GET ALL USERS
    usersRouter.get('/', usersController.getUsers)
    //GET LIKE USER BY ID
    usersRouter.get('/items', usersController.getUsersByUsername)
    //CREATE NEW USER
    usersRouter.post('/', usersController.createUsers)
    //UPDATE USER
    usersRouter.put('/', usersController.updateUsers)
    //DELETE USER
    usersRouter.delete('/items', usersController.deleteUsers)
    //LOGIN + JWT
    usersRouter.post('/access', usersController.getLogin)

    return usersRouter 
}
