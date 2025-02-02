import Router from 'express-promise-router';
import { 
    getAllRoutines,
    getRoutineById,
    createRoutine,
    updateRoutineById,
    deleteRoutineById,
 } from '../controllers/routine.controller.js';

import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/routine', isAuth(['client']), getAllRoutines); 
router.get('/routine/:id', isAuth(['client']), getRoutineById); 
router.post('/routine', isAuth(['client']), createRoutine); 
router.put('/routine/:id', isAuth(['client']), updateRoutineById); 
router.delete('/routine/:id', isAuth(['client']), deleteRoutineById);

export default router;
