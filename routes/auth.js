const { Router } = require('express');
//El check es el middleware que se encargara de checar un campo
//en particular, uno a la vez
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fields-validator');
const router = Router();

//Del archivo de auth en la carpeta de controllers desestructuramos para traernos el metodo
//crearUsuario
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

//Ya escuchas peticiones get que se hagan a ese slash
router.get('/', (req, res) => {
    //Siempre debe haber una respuesta
    res.json({
        "ok": true
    });
});


//Para el login
router.post(
    '/',
    //Estos son los middlewares 
    [

        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener minimo 6 caracteres')
            .isLength({ min: 6 }),
        //Este es el middleware
        validarCampos
    ],
    loginUsuario
);

//Para registrar
router.post('/new',
    [
        //EL nombre es obligatorio y no debe estar vacio
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        //Para validar que tenga el @ es el isEmail()
        check('email', 'El email es obligatorio').isEmail(),
        //Para validar que el password tenga 6 caracteres
        check('password', 'El password debe de ser de 6  caracteres')
            .isLength({ min: 6 }),
        //Este es el middleware
        validarCampos
    ],
    crearUsuario
);

//Para renovar el token
router.get('/renew',
    [
        validarJWT
    ],
    revalidarToken);


//Para exportar
module.exports = router;
