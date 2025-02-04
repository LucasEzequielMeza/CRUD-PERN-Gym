import Router from 'express-promise-router';
import { 
    getAllRoutines,
    getRoutineById,
    createRoutine,
    updateRoutineById,
    deleteRoutineById,
 } from '../controllers/routine.controller.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { createRutineSchema, updateRutineSchema } from '../schemas/routines.schema.js';

import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/routine', isAuth(['client']), getAllRoutines); 
router.get('/routine/:id', isAuth(['client']), getRoutineById); 
router.post('/routine', isAuth(['client']), validateSchema(createRutineSchema), createRoutine); 
router.put('/routine/:id', isAuth(['client']), validateSchema(updateRutineSchema) ,updateRoutineById); 
router.delete('/routine/:id', isAuth(['client']), deleteRoutineById);

export default router;
