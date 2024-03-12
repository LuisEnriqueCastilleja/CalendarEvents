const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {

        //payload de mi jwt
        const payload = { uid, name };
        //Sign es para firmar un token, recibe primero mi payload
        //luego el private key para que sepa mi token si es el que
        //yo genere
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            //Opciones de mi JWT
            expiresIn: '2h'
        },
            //callback en caso de que no se pueda generar el JWT
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');

                }
                else {
                    //SI todo hace bien, voy a resolver mi promesa
                    //con el token
                    resolve(token);
                }
            });
    });
}

module.exports = {
    generarJWT
}