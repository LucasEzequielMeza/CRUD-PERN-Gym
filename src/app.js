import express from 'express';
import morgan from 'morgan';

const app = express(); 

app.use(morgan('dev')); //Utilizamos Morgan para ver mensajes cortos por consola respecto a los errores del back
app.use(express.json()); //Convertimos cualquier dato que llegue a un objeto de js
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({message: "Bienvenido a mi API"})
});

app.use((err, req, res, next) => { //Creamos un manejador de errores con express para todas las rutas
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

export default app; //exportamos app para utilizarlo en index.js