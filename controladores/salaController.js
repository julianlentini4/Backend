import mySqlPool, { query } from "../config/db.js"
const db = mySqlPool


export class SalaController{
    static async getSalas(_req,res){
        try{
            const data = await db.query('SELECT * FROM sala')
            if(!data){
                return res.status(404).send({
                    success:false,
                    message: 'No se encontraron salas'
                })
            }else{
                return res.status(200).send({
                    success:true,
                    message:'Todas las salas',
                    data: data[0]
                })
            }
        }catch(error){
            return res.status(500).send({
                success:false,
                message: 'Error in get all Salas'
            })
        }
    }

    static async getSalaById(req,res){
        try{
            const nroSala = req.params.nro
            const data = await db.query('SELECT * FROM sala WHERE sala.nro = ?',[nroSala])
            if(!data){
                return res.status(404).send({
                success:false,
                message: 'No se encontro la sala'
            })
        }else{
            return res.status(200).send({
                success:true,
                message:'Sala por nro:',
                data: data[0]
            })
        }
        }catch(error){
            return res.status(500).send({
            success:false,
            message: 'Error in get all Salas'
            })
        }
    }

    static async postSala(req,res){
        try{
            const {nro,descripcion} = req.params.body
            if(!nro || !descripcion){
                return res.status(500).send({
                    success:false,
                    message: 'Rellenar todos los atributos'
                })
            }

            const data = await db.query('INSERT TO sala (nro,descripcion) VALUES ( ? , ? )',[nro,descripcion])
            if(!data){
                return res.status(404).send({
                    success:false,
                    message:'ERROR en INSERT QUERY'
                })
            }
            else{
                res.status(201).send({
                    success:true,
                    message:'Nueva Sala creada'
                })
            }

        }catch(error){
            return res.status(500).send({
            success:false,
            message: 'Error in get all Salas'
            })
        }
    }
}