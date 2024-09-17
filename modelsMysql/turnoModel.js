/*import mySqlPool  from "../config/db.js";
import { MedicoModel } from "./medicoModel.js";
import { AgendaModel } from "./agendaModel.js";
import { PacienteModel } from "./pacienteModel.js";

const db = mySqlPool

export class TurnoModel{
    static async getTurnos (){
        const data = await db.query('SELECT * FROM turno')
        return data[0]
    }

    static async getTurnoById({idTurno}){
        const [data] = await db.query('SELECT * FROM turno where idTurno=?',[idTurno])
        if(data.length==0) return null
        return data[0]
    }

    static async getTurnoByPaciente({dni}){
        const [data] = await db.query('SELECT * FROM turno where dni=?',[dni])
        if(data.length==0) return null
        return data[0]
    }

    static async getTurnoByMedico({matricula}){
        const [data] = await db.query('SELECT * FROM turno where matricula=?',[matricula])
        if(data.length==0) return null
        return data[0]
    }

    static async createTurno({input}){
        const {
            idTurno,
            matricula,
            nroAgenda,
            dni,
            fechaHoraTurno,
        } = input

        const estado = 'Pendiente'

        const paciente = await PacienteModel.getPacienteById({ dni });
        const medico = await MedicoModel.getMedicoByMatricula({ matricula});
        const agenda = await AgendaModel.getAgendaById({ nroAgenda });
    
        if (!paciente || !medico || !agenda) {
            throw new Error('Paciente, Médico o Agenda no válidos.');
        }
    
        try{ 
            const newMedico = await db.query('INSERT INTO informe(idTurno,matricula,dni,fechaHoraTurno,estado) VALUES(?,?,?,?,?)',[idTurno,matricula,dni,fechaHoraTurno,estado])
            return newMedico[0]
        }catch(error){
             console.log(error)
        }
        return null
    }

    static async updateInforme ({input}){
        const {
            idTurno,
            fechaHoraTurno
        } = input
        try{
            const data = await db.query('UPDATE turno SET fechaHoraTurno = ? WHERE idTurno=?',[fechaHoraTurno,idTurno])
            console.log(data)
            return data[0]
        }
        catch(error){
            console.log(error)
        }
        return null       
    }

    static async deleteInforme({idTurno}){
        try{
            const data = await db.query('DELETE FROM turno WHERE idTurno=?',[idTurno])
            return data[0]
        }catch(error){
            console.log(error)
        }
        return null
    }
}
    */