const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middlewares/validar-jwt');

//Igualamos res = response para tener el tipado
const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    //Lo que le mando a mi model es lo del body 
    //Que tiene todas las propidades, name, email, password
    const usuario = new Usuario(req.body);

    try {
        //Es una promesa
        //Si no encuentra ninguno devuelve un null
        let usuario = await Usuario.findOne({ email });

        //SI el usuario existe devolvemos el error
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya un usuario existente con ese correo'
            })
        }

        //EL usuario no existia asi que puede registrarlo
        usuario = new Usuario(req.body);

        //Para encriptar la contraseña
        //Aqui tiene simbolos, letras, numeros, etc
        const salt = bcrypt.genSaltSync();
        //Recibe la contraseña original y el salt
        usuario.password = bcrypt.hashSync(password, salt);


        //Esto es para guardarlo en la base de datos
        //Regresa una promesa
        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);

        //Siempre debe haber una respuesta
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }


    //SOLO PUEDO HACER UN res.json(), debo agregar return si 
    //tengo mas de uno
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'EL usuario no existe con ese email'
            })
        }

        //Para comparar las conteseñas, la que me mandaron con la de la bd
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);


        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req;

    console.log(uid);
    console.log(name);


    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};

//Para exportar varios
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};