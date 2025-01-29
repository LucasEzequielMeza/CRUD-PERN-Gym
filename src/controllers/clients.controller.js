import {pool} from '../db.js'

export const getAllClients = async (req, res, next) => {
        const result = await pool.query('SELECT * FROM client') //Obtenemos todos clientes que estan en la tabla client

        return res.json(result.rows)
}

export const getClientById = async (req, res) => {

    const result = await pool.query('SELECT * FROM client WHERE id = $1', [req.params.id])

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    return res.json(result.rows[0]);

}

export const createClient = async (req, res, next) => {

    const { first_name, last_name, address, birth_date, email, phone_number, password, membership_expiry_date, membership_start_date } = req.body; //Obtenemos los datos que envían en el formulario

    try {
    
    const result = await pool.query(
        'INSERT INTO client (first_name, last_name, address, birth_date, email, phone_number, password, membership_expiry_date, membership_start_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [first_name, last_name, address, birth_date, email, phone_number, password, membership_expiry_date, membership_start_date]
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

export const updateClientById = async ( req, res) => {
    const id = req.params.id;
    const {address, phone_number, password } = req.body;

    const result = await pool.query('UPDATE client SET phone_number = $1, address = $2, password = $3 WHERE id = $4 RETURNING *', [phone_number, address, password, id]);

    if (!result.rows[0]) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    return res.json(result.rows[0]);
}

export const deleteClientById = async (req, res) => {

    const result = await pool.query('DELETE FROM client WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    return res.sendStatus(204)

}