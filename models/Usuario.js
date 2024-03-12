const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        //La informacion que guardo es un String
        type: String,
        //Y quiero que sea requerido
        required: true,
    },
    email: {
        type: String,
        required: true,
        //Para indicar que sera unico, para que no haya
        //Correos electronicos duplicados
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});

//Model se llamaria Usuario y el schema es el UsuarioSchema que cree
module.exports = model('Usuario', UsuarioSchema);