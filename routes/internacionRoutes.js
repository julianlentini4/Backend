import { Router } from 'express';
import { InternacionController } from '../controllers/internacionController.js';

export const createInternacionRoutes = ({ internacionModel }) => {
    const internacionesRouter = Router();

    const internacionController = new InternacionController({ internacionModel })

    internacionesRouter.get('/', internacionController.getInternaciones);
    internacionesRouter.get('/items', internacionController.getInternacionById);
    internacionesRouter.post('/', internacionController.createInternacion);
    internacionesRouter.put('/', internacionController.updateInternacion);
    internacionesRouter.delete('/items', internacionController.deleteInternacion);

    return internacionesRouter
}

