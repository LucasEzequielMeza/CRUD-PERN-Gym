import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => { //Creamos un token, si funciona bien, nos devuelve el token, si falla, nos indica el error, esto es para la autenticación
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, 
            'xyz123321zyx',
            {
                expiresIn: '1d'
            }, 
        (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    })
}
