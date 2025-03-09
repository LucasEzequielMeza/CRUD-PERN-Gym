import bcrypt from 'bcrypt';
import {pool} from '../db.js'

export const getAllClients = async (req, res, next) => { // Solo admin
    const { search } = req.query; // Captura el valor de búsqueda

    let query = 'SELECT * FROM users';
    let params = [];

    if (search) {
        query += ` WHERE LOWER(first_name) LIKE LOWER($1) 
                   OR LOWER(last_name) LIKE LOWER($1) 
                   OR LOWER(email) LIKE LOWER($1) 
                   OR phone_number LIKE $1`;
        params.push(`%${search}%`);
    }

    try {
        const result = await pool.query(query, params);
        return res.json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los clientes", error });
    }
};

export const getClientById = async (req, res) => { //solo admin (Ver si se puede filtrar por nombres y mails)

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id])

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    return res.json(result.rows[0]);

}

export const createClient = async (req, res, next) => { //Admin en caso de querer el crear usuarios desde su usuario

    const { first_name, last_name, address, birth_date, email, phone_number, password, membership_expiry_date, membership_start_date } = req.body; //Obtenemos los datos que envían en el formulario

    try {

     const hashPassword = await bcrypt.hash(password, 10)     
    
    const result = await pool.query(
        'INSERT INTO users (first_name, last_name, address, birth_date, email, phone_number, password, membership_expiry_date, membership_start_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [first_name, last_name, address, birth_date, email, phone_number, hashPassword, membership_expiry_date, membership_start_date]
    ); //Insertamos en la tabla clients los datos que recibimos del formulario
    
    res.json(result.rows[0]) //obtenemos los datos de la tabla clients

    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "El cliente ya existe"
            })
        }
        next(error) //Indicamos que valla al siguiente middleware, por lo que va a ir a nuestro controlador de errores en app.js
    }
}

export const updateClientById = async (req, res) => {
    const id = req.params.id;
    const { address, phone_number } = req.body;

    try {
        const result = await pool.query('UPDATE users SET phone_number = $1, address = $2 WHERE id = $3 RETURNING *', [phone_number, address, id]);
        if (!result.rows[0]) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
}

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;

    try {
        const result = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);
        if (!result.rows[0]) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

        return res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};


export const deleteClientById = async (req, res) => { // Solo admin

    const result = await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    return res.sendStatus(204)

}