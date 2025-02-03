import { pool } from "../db.js";

export const getAllRoutines  = async (req, res, next) => {
    const result = await pool.query('SELECT * FROM routines WHERE user_id = $1', [req.userId]) 

    return res.json(result.rows)

}

export const getRoutineById  = async (req, res, next) => {
    const result = await pool.query('SELECT * FROM routines WHERE id = $1', [req.params.id])

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'Rutina no encontrada' })
    }

    return res.json(result.rows[0])
 
}

export const createRoutine  = async (req, res, next) => {
    const { title, description, day_of_week, duration, goals, completed} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO routines ( title, description, day_of_week, duration, goals, completed, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [ title, description, day_of_week, duration, goals, completed, req.userId]
        );
        return res.json(result.rows[0])
        
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "La rutina ya existe"
            })
        }
        next(error)
    }
}

export const updateRoutineById = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, day_of_week, duration, goals, completed } = req.body;

    try {
        const result = await pool.query(
            'UPDATE routines SET title = $1, description = $2, day_of_week = $3, duration = $4, goals = $5, completed = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [title, description, day_of_week, duration, goals, completed, id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ message: 'Rutina no encontrada' });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};


export const deleteRoutineById  = async (req, res, next) => {
    const result = await pool.query('DELETE FROM routines WHERE id = $1', [req.params.id])

    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Rutina no encontrada' })
    }

    return res.sendStatus(204)
}
