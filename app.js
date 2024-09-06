import express, {json} from 'express';
import  mySqlPool  from './config/db.js';
import {createMedicoRoutes} from './routes/medicoRoutes.js';
import { createInformeRoutes } from './routes/informeRoutes.js';
import { createPte_IngresoRoutes } from './routes/pte_IngresoRoutes.js';


export const createApp = ({ medicoModel, informeModel, pte_IngresoModel }) => {
  const app = express()
  const port = process.env.PORT ?? 3000 //Es para que tome el puerto de algun posible hosting y en caso de no tenerlo que tome el 3000 por defecto
  app.use(json());
  app.use('/medico', createMedicoRoutes({ medicoModel }));
  app.use('/informe', createInformeRoutes({ informeModel }));
  app.use('/paciente_ingreso', createPte_IngresoRoutes({ pte_IngresoModel }));

  app.get('/', (req, res) => {
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


