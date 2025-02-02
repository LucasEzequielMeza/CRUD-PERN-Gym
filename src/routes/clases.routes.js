import Router from 'express-promise-router';

import {
    getAllClass,
    getClassById,
    createClass,
    updateClassById,
    deleteClassById,
} from "../controllers/clases.controller.js"
import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/clases', isAuth(['admin', 'client']), getAllClass)

router.get('/clases/:id', isAuth(['admin', 'client']), getClassById)

router.post('/clases', isAuth(['admin']), createClass)

router.put('/clases/:id', isAuth(['admin']), updateClassById)

router.delete('/clases/:id', isAuth(['admin']), deleteClassById)

export default router;