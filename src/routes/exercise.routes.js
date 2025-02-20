import Router from "express-promise-router";

import {
    getAllExercises,
    getExerciseById,
    createExercise,
    updateExerciseById,
    deleteExerciseById,
} from '../controllers/exercise.controller.js'
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/exercises', isAuth(['admin', 'client']), getAllExercises)

router.get('/exercises/:id', isAuth(['admin', 'client']), getExerciseById)

router.post('/exercises', isAuth(['admin']), createExercise)

router.put('/exercises/:id', isAuth(['admin']), updateExerciseById)

router.delete('/exercises/:id', isAuth(['admin']), deleteExerciseById)

export default router;