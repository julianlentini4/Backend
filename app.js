import express, {json} from 'express';
import  mySqlPool  from './config/db.js';
import {createMedicoRoutes} from './routes/medicoRoutes.js';


export const createApp = ({ medicoModel }) => {
  const app = express()
  const port = process.env.PORT ?? 3000 //Es para que tome el puerto de algun posible hosting y en caso de no tenerlo que tome el 3000 por defecto
  app.use(json());
  app.use('/medico', createMedicoRoutes({ medicoModel }));

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


