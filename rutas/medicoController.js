const db = require("../config/db");

//GET ALL MEDICOS LIST
const getMedicos = async (_req,res) => {
    try{
        const data = await db.query('SELECT * FROM medico INNER JOIN especialidad ON medico.idespecialidad = especialidad.idespecialidad')
        if(data[0].length==0){
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
            message:'Error in get all medico',
            error
        });
    }
}
const getMedicoByMatricula = async(req,res) => {
    try{
        const matriculaMedico= req.params.matricula
        if(!matriculaMedico){
            return res.status(404).send({
                success:false,
                message:'id en url invalida'
            })
        } 
        const data = await db.query('SELECT * FROM medico where matricula=?',[matriculaMedico])
        if(data[0].length==0){
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
            message:'Error in get medico by id',
            error
        });
    }
}

const createMedico = async (req,res) =>{
   try{
        const {matricula,name,idespecialidad} = req.body
        
        if(!matricula || !name || !idespecialidad){
            return res.status(404).send({
                success:false,
                message:'No se pudo agregar al medico, es necesario recibir todos los campos en el body'
            })
        }
        const data = await db.query('INSERT INTO medico(matricula,name,idespecialidad) VALUES(?,?,?)',[matricula,name,idespecialidad])
        if(data[0].length==0){
            return res.status(404).send({
                success:false,
                message:'No se encontraron medicos'
            })
        }
        return res.status(201).send({
            success: true,
            message: 'new medico created',
            data: data[0],
        });
   }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in create medico',
            error
        });
   }
}

const updateMedico = async (req,res) =>{
    try{
        const {matricula,name,idespecialidad}=req.body
        if(!matricula){
            return res.status(404).send({
                success:false,
                message:'Debe ingresar la matricula del medico obligatoriamente'
            })
        }
        //agregar validacion de que encontró la matricula 
        const data= await db.query('UPDATE medico SET name=? , idespecialidad=? WHERE matricula=?',[name,idespecialidad,matricula])
        return res.status(200).send({
            success: true,
            message: 'medico updated',
            data: data[0],
        });
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in update medico',
            error
        });
    }   
}

const deleteMedico = async (req,res) =>{
    try{
        const {matricula} = req.body;
        if(!matricula){
            return res.status(404).send({
                success:false,
                message:'Debe ingresar la matricula del medico obligatoriamente'
            })
        }
        const data = await db.query('DELETE FROM medico WHERE matricula=?',[matricula])
        return res.status(200).send({
            success: true,
            message: 'medico deleted',
            data: data[0],
        });
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error delete medico',
            error
        });
    }
}

module.exports = {getMedicos,getMedicoByMatricula, createMedico, updateMedico, deleteMedico};