import mySqlPool from "../config/db.js";
import { SalaModel } from "./salaModel.js";
import { PacienteModel } from "./pacienteModel.js";

const db = mySqlPool;

export class InternacionModel {
    static async getInternaciones() {
        const [internaciones] = await db.query('SELECT * FROM internacion');
        return internaciones;
    }

    static async getInternacionById({ nroSala, dni }) {
        const [internaciones] = await db.query('SELECT * FROM internacion WHERE nroSala = ? AND dni = ?', [nroSala, dni]);
        if (internaciones.length === 0) return null;
        return internaciones[0];
    }

    static async createInternacion({ input}) {
        const{
            dni,
            nroSala,
            fechaInternacion,
            fechaAlta
        } = input

        const sala = await SalaModel.getSalaById({ nro: nroSala });
        if (!sala) throw new Error('La sala especificada no existe.');

        const paciente = await PacienteModel.getPacienteByDni({ dni });
        if (!paciente) throw new Error('El paciente especificado no existe.');

        try {
            const data = await db.query(
                'INSERT INTO internacion (nroSala, dni, fechaInternacion, fechaAlta) VALUES (?, ?, ?, ?)',
                [nroSala, dni, fechaInternacion, fechaAlta]
            );
            return data[0];
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    static async updateInternacion({ input }) {
        const{
            dni,
            nroSala,
            fechaInternacion,
            fechaAlta
        } = input
        
        try {
            const data = await db.query(
                'UPDATE internacion SET fechaInternacion = ?, fechaAlta = ? WHERE nroSala = ? AND dni = ?',
                [fechaInternacion, fechaAlta, nroSala, dni]
            );
            return data[0];
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    static async deleteInternacion({ nroSala, dni }) {
        try {
            const data = await db.query('DELETE FROM internacion WHERE nroSala = ? AND dni = ?', [nroSala, dni]);
            return data[0];
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}
