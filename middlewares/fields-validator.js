const { response } = require('express');
//Resultado de la validacion de los campos
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req);

    //Si no esta vacio es que hay errores
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            //Asi los tengo serializados con el mapped
            errors: errors.mapped()
        })
    }

    //Next es una funcion que tengo que llamar si todo lo que esta 
    //dentro del middleware se ejecuta correctamente
    next();
};

module.exports = {
    validarCampos
}