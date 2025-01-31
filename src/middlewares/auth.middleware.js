import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const isAuth = (roles = []) => async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No estás autorizado' });
    }

    jwt.verify(token, 'xyz123321zyx', async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'No estás autorizado' });

        req.userId = decoded.id;

        const result = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId]);
        if (result.rowCount === 0) return res.status(401).json({ message: 'No estás autorizado' });

        const userRole = result.rows[0].role;

        if (roles.length && !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        next();
    });
};

