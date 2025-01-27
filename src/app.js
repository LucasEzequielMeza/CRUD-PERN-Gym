import express from 'express';
import morgan from 'morgan';
import clientRouters from './routes/clients.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express(); 

//Middleware
app.use(morgan('dev')); //Utilizamos Morgan para ver mensajes cortos por consola respecto a los errores del back
app.use(express.json()); //Convertimos cualquier dato que llegue a un objeto de js
app.use(express.urlencoded({ extended: false }));

//Rutas

app.get('/', (req, res) => {
  res.json({message: "Bienvenido a mi API"})
});
app.use(clientRouters); // Utilizamos las rutas que vamos a usar en el back
app.use(authRoutes); //Utilizamos las rutas de autenticación

//Manejador de errores
app.use((err, req, res, next) => { //Creamos un manejador de errores con express para todas las rutas
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

export default app; //exportamos app para utilizarlo en index.js