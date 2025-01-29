import Router from "express-promise-router";
import { 
    getClientById, 
    getAllClients, 
    createClient,  
    updateClientById,
    deleteClientById
} from "../controllers/clients.controller.js";
import { auth } from "../middlewares/auth.js";


const router = Router();

//router.get('/clients', getAllClients)

//router.get('/clients/:id', getClientById)

//router.post('/clients', createClient)

//router.put('/clients/:id', updateClientById)

//router.delete('/clients/:id', deleteClientById) 

// Rutas con restricciones
router.get('/clients', auth(['admin']), getAllClients); // Solo admin puede obtener todos los clientes
router.post('/clients', auth(['admin', 'client']), createClient); // Admin y cliente pueden crear un cliente
router.get('/clients/:id', auth(['admin']), getClientById); // Solo admin puede obtener un cliente por ID
router.put('/clients/:id', auth(['admin', 'client']), updateClientById); // Admin y cliente pueden actualizar un cliente
router.delete('/clients/:id', auth(['admin']), deleteClientById); // Solo admin puede eliminar un cliente

export default router;