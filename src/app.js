import express from 'express';
import morgan from 'morgan';
import clientRouters from './routes/clients.routes.js'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors'
import clasesRoutes from './routes/clases.routes.js'
import routineRoutes from './routes/routine.routes.js'
import cookieParser from 'cookie-parser';


const app = express(); 

//Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Este front solo puede pedir datos al back
  credentials: true, // Indica que el navegador permitirá el acceso a las cookies
}))
app.use(morgan('dev')); //Utilizamos Morgan para ver mensajes cortos por consola respecto a los errores del back
app.use(express.json()); //Convertimos cualquier dato que llegue a un objeto de js
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

//Rutas

app.get('/', (req, res) => {
  res.json({message: "Bienvenido a mi API"})
});
app.use('/api', clientRouters); // Utilizamos las rutas que vamos a usar en el back
app.use('/api', authRoutes); //Utilizamos las rutas de autenticación
app.use('/api', clasesRoutes); //
app.use('/api', routineRoutes); //Rutas de rutinas

//Manejador de errores
app.use((err, req, res, next) => { //Creamos un manejador de errores con express para todas las rutas
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

export default app; //exportamos app para utilizarlo en index.js