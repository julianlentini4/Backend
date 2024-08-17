const db = require("../config/db");

//GET ALL MEDICOS LIST
const getPacientes = async (_req,res) => {
    try{
        const data = await db.query('SELECT * FROM paciente')
        if(!data){
            return res.status(404).send({
                success:false,
                message:'No se encontraron pacientes'
            })
        }
        else{
            return res.status(200).send({
                success: true,
                message: 'Todos los pacientes',
                data: data[0],
            });
        }
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all medico api',
            error
        });
    }
}
const getPacienteById = async(req,res) => {
    try{
        const idPaciente = req.params.id
        if(!idPaciente){
            return res.status(404).send({
                success:false,
                message:'id en url invalida'
            })
        } 
        const data = await db.query('SELECT * FROM paciente WHERE idPaciente=?',[idPaciente])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'No se encontraron medicos'
            })
        }
        else{
            return res.status(200).send({
                success: true,
                message: 'Paciente por id',
                data: data[0],
            });
        }
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error en encontrar Paciente',
            error
        });
    }
}

const postPaciente = async(req,res) => {
    try{
        const {dni,nombre,apellido,mail,obraSocial} = req.body
        if(!dni || !nombre || !apellido || !mail || !obraSocial){
            return res.status(500).send({
                success:false,
                message: 'ERROR: Rellenar todos los atributos'
            })
        }

        const data = await db.query('INSERT INTO paciente (dni,nombre,apellido,mail,obraSocial) VALUES (? , ? , ? , ? , ? )',[dni,nombre,apellido,mail,obraSocial])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'ERROR en INSERT QUERY'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'Nuevo Paciente creado'
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error en crear Paciente',
            error
        })

    }
}

const updatePaciente = async (req,res) => {
    try{
        const idPaciente = req.params.id
        if(!idPaciente){
            return res.status(404).send({
            success:false,
            message:'id en url invalida'    
            })
        }

        const {dni,nombre,apellido,mail,obraSocial} = req.body
        const data = await db.query('UPDATE paciente SET dni = ?, nombre = ?, apellido = ?, mail = ?, obraSocial = ? WHERE id = ?',[dni,nombre,apellido,mail,obraSocial,idPaciente])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'ERROR en UPDATE data'
            })
        }
        else{
            res.status(200).send({
                success:true,
                message:'Paciente actualizado'
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error en actualizar Paciente',
            error
        })

    }   
}

const deletePaciente = async (req,res) => {
    try{
        const idPaciente = req.params.id
        if(!idPaciente){
            return res.status(404).send({
            success:false,
            message:'id en url invalida'    
            })
        }

        await db.query('DELETE FROM paciente WHERE id = ?',[idPaciente])
        res.status(200).send({
            success:true,
            message:'Paciente eliminado'
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error en eliminar Paciente',
            error
        })

    }   
}

module.exports = {getPacientes,getPacienteById,postPaciente,updatePaciente,deletePaciente};