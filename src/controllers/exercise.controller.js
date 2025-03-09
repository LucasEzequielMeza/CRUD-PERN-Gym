import { pool } from '../db.js'

export const getAllExercises = async (req, res) => {
    const { search } = req.query; // Captura el valor de búsqueda

    let query = 'SELECT * FROM exercise';
    let params = [];

    if (search) {
        query += ` WHERE LOWER(name_exercise) LIKE LOWER($1) OR LOWER(body_part) LIKE LOWER($1)`;
        params.push(`%${search}%`);
    }

    try {
        const result = await pool.query(query, params);
        return res.json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los ejercicios", error });
    }
};



export const getExerciseById =  async (req, res) => {
    const result = await pool.query('SELECT * FROM exercise WHERE id = $1' , [req.params.id])

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'Ejercicios no encontrados' })
    }

    return res.json(result.rows[0])
}

export const createExercise = async (req, res, next) => {
    const { name_exercise, description, body_part, link} = req.body

    try {
        const result = await pool.query(
            'INSERT INTO exercise (name_exercise, description, body_part, link) VALUES ($1, $2, $3, $4) RETURNING *', 
            [name_exercise, description, body_part, link])

        res.json(result.rows[0])
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "El ejercicio ya existe"
            })
        }

        next(error)
    }
}

export const updateExerciseById = async (req, res, next) => {
    const id = req.params.id;

    const {description, link} = req.body

    const result = await pool.query('UPDATE exercise SET description = $1, link = $2 WHERE id = $3 RETURNING *', [description, link, id])

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' })
    }

    return res.json(result.rows[0])
}

export const deleteExerciseById = async (req, res) => {
    const result = await pool.query('DELETE FROM exercise WHERE id = $1', [req.params.id])

    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' })
    }

    return res.sendStatus(204)
}