import express, {json} from 'express';
import  mySqlPool  from './config/db.js';
import cors from 'cors';
import { createTurnoRoutes } from './routes/turnoRoutes.js';
import { createSalaRoutes } from './routes/salaRoutes.js';
import { createPacienteRoutes } from './routes/pacienteRoutes.js';
import { createInternacionRoutes } from './routes/internacionRoutes.js';
import { createEspecialidadRoutes } from './routes/especialidadRoutes.js';

export const createApp = ({ turnoModel, salaModel, pacienteModel, internacionModel, especialidadModel }) => {
  const app = express()
  const port = process.env.PORT ?? 3000 //Es para que tome el puerto de algun posible hosting y en caso de no tenerlo que tome el 3000 por defecto
  app.use(json());
  app.use(cors());
  app.use('/turno', createTurnoRoutes({ turnoModel }));
  app.use('/sala', createSalaRoutes({ salaModel }));
  app.use('/paciente', createPacienteRoutes({ pacienteModel }));
  app.use('/internacion', createInternacionRoutes({ internacionModel }));
  app.use('/especialidad', createEspecialidadRoutes({ especialidadModel }));

  app.get('/', (_req, res) => {
    res.send('<h1>Hello World!')
  })


  mySqlPool.query("SELECT 1").then(() => {
      
      //MYSQL 
      console.log('CONNECTED TO MYSQL :)')
      //listen
      app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
      })
  }).catch((error) => {
      console.log(error);
  })
}

