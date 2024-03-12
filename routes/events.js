/*
    Event routes
    /api/events
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/fields-validator');
const { getEVentos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

//TOdas las peticiones tienen que pasar por la validacion del jwt
router.use(validarJWT);

router.get('/', getEVentos);

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    //Express validator penso que alguien podria tener necesidades esciales
    //y creo el custom y este espera que le mademos un callback que es mi isDate
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),

    validarCampos
], crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;