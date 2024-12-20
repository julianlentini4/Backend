import express, {json} from 'express';
import  mySqlPool  from './config/db.js';
const db = mySqlPool
import cors from 'cors';
import cookieParser from "cookie-parser";
import  jwt  from "jsonwebtoken";


//Routes
import {createMedicoRoutes} from './routes/medicoRoutes.js';
import { createInformeRoutes } from './routes/informeRoutes.js';
import { createPte_IngresoRoutes } from './routes/pte_IngresoRoutes.js';
import { createIngresoRoutes } from './routes/ingresoRoutes.js';
import { createAgendaRoutes } from './routes/agendaRoutes.js';
//import { createDiaRoutes } from './routes/diaRoutes.js';
import { createAgendaDiaRoutes } from './routes/agendaDiaRoutes.js';
//import { createTurnoRoutes } from './routes/turnoRoutes.js';
import { createSalaRoutes } from './routes/salaRoutes.js';
import { createPacienteRoutes } from './routes/pacienteRoutes.js';
import { createInternacionRoutes } from './routes/internacionRoutes.js';
import { createEspecialidadRoutes } from './routes/especialidadRoutes.js';
import { createMedico_EspecialidadRoutes } from './routes/medico_EspecialidadRoutes.js';
import { createUsersRoutes } from './routes/usersRoutes.js';


//main Function
export const createApp = ({ /*turnoModel,*/ salaModel, pacienteModel, internacionModel, especialidadModel, medicoModel, informeModel, pte_IngresoModel, ingresoModel, agendaModel, /*diaModel*/ agendaDiaModel, medico_EspecialidadModel, usersModel }) => {
  const app = express()
  const port = process.env.PORT ?? 3000 //Es para que tome el puerto de algun posible hosting y en caso de no tenerlo que tome el 3000 por defecto
  app.use(json());
  app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
  app.use(cookieParser())
  const protectedAuth = (req, res, next)=> {
    const token = req.cookies.access_token
    req.session = {user:null}
    if(req.path == '/access'){
      next()
      return
    } 
    try{
      const data = jwt.verify(token,'secret-key')
      console.log(data)
      req.session.user = data
    }catch(error){
      req.session.user = null
      return res.status(404).json('Acceso denegado')
    }
    next()
  }
  const userPermitions = async(req, res, next)=> {
    const {user} = req.session
    if(req.path == '/access' || user.tipo == 'ADMIN'){
      next()
      return
    } 
    const [data] = await db.query('SELECT * FROM Users_access where tipoUsuario = ? and apiUrl = ? and method = ? ',[user.tipo, req.originalUrl, req.method])
    if(!data[0]) return res.status(404).json({message:'Usuario con rol no autorizado'})
    next()
  }  
  
  app.get('/verify',(req,res) =>{
    const token = req.cookies.access_token
    try{
      const data = jwt.verify(token,'secret-key')
      return res.status(200).json({data:data})
    }catch(error){
      return res.status(404).json({data:null, message:'Acceso denegado'})
    }
    
  });
  //---------Rutas Protegidas-----------------------------------------------------------------------------
  //app.use('/turno', createTurnoRoutes({ turnoModel }));
  app.use('/sala', protectedAuth, createSalaRoutes({ salaModel }));
  app.use('/paciente', protectedAuth, userPermitions, createPacienteRoutes({ pacienteModel }));
  app.use('/internacion', protectedAuth, userPermitions, createInternacionRoutes({ internacionModel }));
  app.use('/especialidad', protectedAuth, userPermitions, createEspecialidadRoutes({ especialidadModel }));
  app.use('/medico', protectedAuth, userPermitions, createMedicoRoutes({ medicoModel }));
  app.use('/informe', protectedAuth, createInformeRoutes({ informeModel }));
  app.use('/paciente_ingreso', protectedAuth, userPermitions, createPte_IngresoRoutes({ pte_IngresoModel }));
  app.use('/ingreso', protectedAuth, userPermitions, createIngresoRoutes({ ingresoModel }));
  app.use('/agenda', /*protectedAuth, userPermitions,*/ createAgendaRoutes({ agendaModel }));
  //app.use('/dia', protectedAuth, userPermitions, createDiaRoutes({ diaModel }));
  app.use('/agendaDia', /*protectedAuth, userPermitions,*/ createAgendaDiaRoutes({ agendaDiaModel }));
  app.use('/medico_especialidad', protectedAuth, userPermitions, createMedico_EspecialidadRoutes({ medico_EspecialidadModel }))
  app.use('/users', protectedAuth, userPermitions, createUsersRoutes({ usersModel }))
  //---------Rutas Protegidas------------------------------------------------------------------------

  mySqlPool.query("SELECT 1").then(() => {      
      //MYSQL 
      console.log('CONNECTED TO MYSQL')
      //listen
      app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
      })
  }).catch((error) => {
      console.log(error);
  })
}


