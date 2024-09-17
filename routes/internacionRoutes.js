import { Router } from 'express';
import { InternacionController } from '../controllers/internacionController.js';

export const createInternacionRoutes = ({ internacionModel }) => {
    const internacionesRouter = Router();

    const internacionController = new InternacionController({ internacionModel })

    internacionesRouter.get('/', internacionController.getInternaciones);
    internacionesRouter.get('/:nroSala/:dni', internacionController.getInternacionById);
    internacionesRouter.post('/', internacionController.createInternacion);
    internacionesRouter.patch('/:nroSala/:dni', internacionController.updateInternacion);
    internacionesRouter.delete('/:nroSala/:dni', internacionController.deleteInternacion);

    return internacionesRouter
}

