import { Router } from "express";

const router = Router();

router.post('/signin', (req, res) => {
    res.send('Ingresando')
})

router.post('/signup', (req, res) => {
    res.send('Registrando')
})

router.post('/signout', (req, res) => {
    res.send('Saliendo')
})

router.get('/profile', (req, res) => {
    res.send('Perfil')
})

export default router;