import mySqlPool from "../config/db.js";
const db = mySqlPool;

export class InternacionModel {
    static async getInternaciones() {
        const [internaciones] = await db.query('SELECT * FROM internacion');
        return internaciones;
    }

    static async getInternacionById({ nroSala, dni }) {
        const [internaciones] = await db.query('SELECT * FROM internacion WHERE nroSala = ? AND dni = ?', [nroSala, dni]);
        if (internaciones.length == 0) return null;
        return internaciones[0];
    }

    static async createInternacion({input}) {
        const{
            dni,
            nroSala,
            fechaInternacion,
            fechaAlta
        } = input
        try {
            if (fechaAlta && new Date(fechaAlta) < new Date(fechaInternacion)) throw new Error('La fecha de alta no puede ser anterior a la fecha de internación.')
            const data = await db.query('INSERT INTO internacion (nroSala, dni, fechaInternacion, fechaAlta) VALUES (?, ?, ?, ?)',
            [
                nroSala, 
                dni, 
                fechaInternacion, 
                fechaAlta
            ]
            );
            return data[0];
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    static async updateInternacion({ input }) {
        const{
            nroSala,
            dni,
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

    static async deleteInternacion({input}) {
        const{
            nroSala,
            dni
        } = input
        try {
            const data = await db.query('DELETE FROM internacion WHERE nroSala = ? AND dni = ?',[nroSala, dni]);
            return data[0];
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}
