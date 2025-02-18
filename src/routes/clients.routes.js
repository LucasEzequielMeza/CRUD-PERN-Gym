import Router from "express-promise-router";
import { 
    getClientById, 
    getAllClients, 
    createClient,  
    updateClientById,
    deleteClientById,
    changePassword
} from "../controllers/clients.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";


const router = Router();

router.get('/users', isAuth(['admin']), getAllClients); // Solo admin puede obtener todos los clientes
router.get('/users/:id', isAuth(['admin']), getClientById); // Solo admin puede obtener un cliente por ID
router.post('/users', isAuth(['admin', 'client']), createClient); // Admin y cliente pueden crear un cliente
router.put('/users/:id', isAuth(['admin', 'client']), updateClientById); // Admin y cliente pueden actualizar un cliente
router.put('/users/:id/change-password', isAuth(['admin', 'client']), changePassword); // Admin y cliente pueden cambiar la contraseña
router.delete('/users/:id', isAuth(['admin']), deleteClientById); // Solo admin puede eliminar un cliente

export default router;