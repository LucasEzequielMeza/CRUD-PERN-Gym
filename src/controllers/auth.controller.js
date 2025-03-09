import bcrypt from 'bcrypt';
import md5 from 'md5';
import { pool } from "../db.js";
import { createAccessToken } from '../libs/jwt.js';

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rowCount === 0) {
            return res.status(400).json({ message: 'El correo electrónico no existe' });
        }

        const validPassword = await bcrypt.compare(password, result.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = await createAccessToken({ id: result.rows[0].id });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({
            user: result.rows[0],
            token: token           
        });

    } catch (error) {
        console.error("Error en signin:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};



export const signup = async (req, res, next) => {
    const { first_name, last_name, address, birth_date, email, phone_number, password, membership_expiry_date, membership_start_date } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const gravatar = `https://wwww.gravatar.com/avatar/${md5(email)}`
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, address, birth_date, email, phone_number, password, membership_expiry_date, membership_start_date, gravatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [first_name, last_name, address, birth_date, email, phone_number, hashPassword, membership_expiry_date, membership_start_date, gravatar]
        );

        const token = createAccessToken({ id: result.rows[0].id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({ message: "El usuario ya existe" });
        }
        next(error);
    }
};

export const signout = (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
};

export const profile = async  (req, res) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId])

    return res.json(result.rows[0]);
}