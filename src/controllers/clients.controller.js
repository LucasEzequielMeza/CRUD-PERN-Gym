

export const getAllClients = (req, res) => {res.send("Obteniendo clientes")}

export const getClientById = (req, res) => {res.send(`Obteniendo cliente con ID: ${req.params.id}`)}

export const createClient = (req, res) => {res.send(`Creando cliente: ${req.body}`)}

export const updateClientById = (req, res) => {res.send(`Actualizando cliente con ID: ${req.params.id}`)}

export const deleteClientById = (req, res) => {res.send(`Eliminando cliente con ID: ${req.params.id}`)}