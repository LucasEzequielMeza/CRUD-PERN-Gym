import { pool } from "../db.js";

export const getAllClass = async (req, res, next) => {
    const result = await pool.query('SELECT * FROM clases')

    return res.json(result.rows)
}

export const getClassById = async (req, res, next) => { //Ver de filtrar por tipo de clase en vez de ID
    const result = await pool.query('SELECT * FROM clases WHERE id = $1', [req.params.id])

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'La clase no existe' })
    }

    return res.json(result.rows[0]);
}

export const createClass = async (req, res, next) => {
    const {type_class, title, description, data_time} = req.body

    try {

        const result = await pool.query(
            'INSERT INTO clases (type_class, title, description, data_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [type_class, title, description, data_time]
        )

        res.json(result.rows[0]) //obtenemos los datos de la tabla clases
        
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "La clase ya existe"
            })
        }
        next(error) //Indicamos que valla al siguiente middleware, por lo que va a ir a nuestro controlador de errores en app.js
    }
}

export const updateClassById = async (req, res, next) => {
    const id = req.params.id;

    const {title, description, data_time} = req.body;

    const result = await pool.query('UPDATE clases SET title = $1, description = $2, data_time = $3 WHERE id = $4 RETURNING *',
        [title, description, data_time, id]);

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'La clase no existe' })
    }

    return res.json(result.rows[0]);

}

export const deleteClassById = async (req, res, next) => {
    const result = await pool.query('DELETE FROM clases WHERE id = $1', [req.params.id])

    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'La clase no existe' })
    }

    return res.sendStatus(204)
}