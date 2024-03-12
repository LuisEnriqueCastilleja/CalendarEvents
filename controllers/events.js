const { response } = require("express");
const Evento = require("../models/Evento");

const getEVentos = async (req, res = response) => {
    try {
        //Para traernos todos los eventos de la base de datos
        const eventos = await Evento.find()
            //Si necesito rellenar los datos uso el populate
            //Necesitas especificarle la referencia la cual quieres rellenar
            //Y por eso mandamos user para que aparezcan todos sus datos
            .populate("user", "name");
        //El segundo parametro "name", especificamos que solo
        //devuelva el name, el id viene por defcto pero podemos quitarlo

        res.status(200).json({
            ok: true,
            eventos
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor, favor de comunicarse con el administrador'
        })
    }
};

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);

    try {
        //El id del user lo sacamos del req.uid
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor, favor de comunicarse con el administrador'
        });
    }


};

const actualizarEvento = async (req, res = response) => {
    //Para obtener el id que viene en los parametros /192839
    const eventoId = req.params.id;
    //EL id del usuario
    const uid = req.uid;

    try {

        //Buscar el evento por Id
        const evento = await Evento.findById(eventoId);

        //Si el evento no existe
        if (!evento) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un evento con ese id'
            });
        }

        //Si la persona que esta editando el evento no lo creo
        //No lo dejamos editar
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: true,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //Para actualizar el evento, usamos findByIdAndUpdate
        //Para encontrar el evento por id y pasarle el nuevo evento
        const eventoActualizado =
            await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        //Recibe un tercer parametro {new:true} con esto le decimos que 
        //devuelve el objeto actualizado, porque por defecto muestra el
        //antiguo para que lo compares

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor, favor de comunicarse con el administrador'
        })
    }
};

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        //Traemos el evento para eliminar
        const evento = await Evento.findById(eventoId);

        //Si el evento no existe
        if (!evento) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un evento con ese id'
            });
        }

        //Si la persona que esta eliminando el evento no lo creo
        //No lo dejamos eliminar
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: true,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(evento);

        res.status(200).json({
            ok: true,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor, favor de comunicarse con el administrador'
        })
    }
};



module.exports = {
    getEVentos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}