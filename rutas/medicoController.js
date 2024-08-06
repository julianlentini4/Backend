const db = require("../config/db");

//GET ALL MEDICOS LIST
const getMedicos = async (_req,res) => {
    try{
        const data = await db.query('SELECT * FROM medico INNER JOIN especialidad ON medico.idespecialidad = especialidad.idespecialidad')
        if(!data){
            return res.status(404).send({
                success:false,
                message:'No se encontraron medicos'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Todos los medicos',
            data: data[0],
        });

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all medico api',
            error
        });
    }
}
const getMedicoById = async(req,res) => {
    try{
        const idmedico = req.params.id
        if(!idmedico){
            return res.status(404).send({
                success:false,
                message:'id en url invalida'
            })
        } 
        const data = await db.query('SELECT * FROM medico where matricula=?',[idmedico])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'No se encontraron medicos'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'medico por id',
            data: data[0],
        });

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get id medico api',
            error
        });
    }
}

module.exports = {getMedicos,getMedicoById};