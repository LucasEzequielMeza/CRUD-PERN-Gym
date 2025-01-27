import { Router } from "express";
import { 
    getClientById, 
    getAllClients, 
    createClient,  
    updateClientById,
    deleteClientById
} from "../controllers/clients.controller.js";


const router = Router();

router.get('/clients', getAllClients)

router.get('/clients/:id', getClientById)

router.post('/clients', createClient)

router.put('/clients/:id', updateClientById)

router.delete('/clients/:id', deleteClientById) 

export default router;