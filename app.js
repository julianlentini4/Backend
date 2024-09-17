import express, {json} from 'express';
import  mySqlPool  from './config/db.js';
import cors from 'cors';

//Routes
import {createMedicoRoutes} from './routes/medicoRoutes.js';
import { createInformeRoutes } from './routes/informeRoutes.js';
import { createPte_IngresoRoutes } from './routes/pte_IngresoRoutes.js';
import { createIngresoRoutes } from './routes/ingresoRoutes.js';
import { createAgendaRoutes } from './routes/agendaRoutes.js';
import { createDiaRoutes } from './routes/diaRoutes.js';
import { createDia_AgendaRoutes } from './routes/dia_AgendaRoutes.js';
import { createTurnoRoutes } from './routes/turnoRoutes.js';
import { createSalaRoutes } from './routes/salaRoutes.js';
import { createPacienteRoutes } from './routes/pacienteRoutes.js';
import { createInternacionRoutes } from './routes/internacionRoutes.js';
import { createEspecialidadRoutes } from './routes/especialidadRoutes.js';

//main Function
export const createApp = ({ turnoModel, salaModel, pacienteModel, internacionModel, especialidadModel, medicoModel, informeModel, pte_IngresoModel, ingresoModel, agendaModel, diaModel, dia_AgendaModel }) => {
  const app = express()
  const port = process.env.PORT ?? 3000 //Es para que tome el puerto de algun posible hosting y en caso de no tenerlo que tome el 3000 por defecto
  app.use(json());
  app.use(cors());
  app.use('/turno', createTurnoRoutes({ turnoModel }));
  app.use('/sala', createSalaRoutes({ salaModel }));
  app.use('/paciente', createPacienteRoutes({ pacienteModel }));
  app.use('/internacion', createInternacionRoutes({ internacionModel }));
  app.use('/especialidad', createEspecialidadRoutes({ especialidadModel }));
  app.use('/medico', createMedicoRoutes({ medicoModel }));
  app.use('/informe', createInformeRoutes({ informeModel }));
  app.use('/paciente_ingreso', createPte_IngresoRoutes({ pte_IngresoModel }));
  app.use('/ingreso', createIngresoRoutes({ ingresoModel }));
  app.use('/agenda', createAgendaRoutes({ agendaModel }));
  app.use('/dia', createDiaRoutes({ diaModel }));
  app.use('/dia_agenda', createDia_AgendaRoutes({ dia_AgendaModel }));

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


