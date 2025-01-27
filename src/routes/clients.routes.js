import { Router } from "express";

const router = Router();

router.get('/clients', (req, res) => {
    res.send("Obteniendo clientes")
})

router.get('/clients/:id', (req, res) => {
    res.send(`Obteniendo cliente con ID: ${req.params.id}`)
})

router.post('/clients', (req, res) => {
    res.send("Creando cliente")
})

router.put('/clients/:id', (req, res) => {
    res.send(`Actualizando cliente con ID: ${req.params.id}`)
})

router.delete('/clients/:id', (req, res) => {
    res.send(`Eliminando cliente con ID: ${req.params.id}`)
}) 

export default router;