import { Router } from 'express';
import { InternacionController } from '../controllers/internacionController.js';

export const internacionesRouter = Router();

internacionesRouter.get('/', InternacionController.getAll);
internacionesRouter.get('/:nroSala/:dni', InternacionController.getById);
internacionesRouter.post('/', InternacionController.create);
internacionesRouter.patch('/:nroSala/:dni', InternacionController.update);
internacionesRouter.delete('/:nroSala/:dni', InternacionController.delete);
