import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const auth = (roles) => async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'secretkey');
        const { rows } = await pool.query('SELECT role FROM client WHERE id = $1', [decoded.id]);
        if (rows.length === 0) return res.status(403).send('Access denied.');

        const userRole = rows[0].role;
        if (!roles.includes(userRole)) return res.status(403).send('Access denied.');

        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};
