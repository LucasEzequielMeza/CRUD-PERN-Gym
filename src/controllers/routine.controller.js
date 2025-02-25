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
    const { title, description, day_of_week, duration, goals, completed, started_at, completed_at } = req.body;

    try {
        const result = await pool.query(
            `UPDATE routines 
             SET 
                 title = COALESCE($1, title), 
                 description = COALESCE($2, description), 
                 day_of_week = COALESCE($3, day_of_week), 
                 duration = COALESCE($4, duration), 
                 goals = COALESCE($5, goals), 
                 completed = COALESCE($6, completed), 
                 started_at = COALESCE($7, started_at), 
                 completed_at = COALESCE($8, completed_at), 
                 updated_at = CURRENT_TIMESTAMP 
             WHERE id = $9 RETURNING *`,
            [title, description, day_of_week, duration, goals, completed, started_at, completed_at, id]
        );

        if (!result.rows.length) {
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
