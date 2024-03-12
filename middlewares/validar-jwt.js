//Las middleware no son mas que funciones

const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    //Para traerme el toquen del request
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        //Para traernos el payload del token que es donde vienen 
        //uid, name, iat, exp
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        //Para lo que siga despues de mi middleware
        //Tenga acceso a estas propiedades
        req.uid = payload.uid;
        req.name = payload.name


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}