const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        //Esto le dice a mongoose que esto va a ser una referencia
        type: Schema.Types.ObjectId,
        //Referencia a mi otro modelo Usuario
        ref: 'Usuario',
        required: true,
    }
});

EventoSchema.method('toJSON', function () {
    //Aqui tengo la referencia a todo el objeto que se 
    //esta serializando
    //De ahi tomamos _v que es la version y el _id y
    //Todo lo demas lo almacenamos en object
    const { __v, _id, ...object } = this.toObject();
    //Para remplazar para que no se vea como _id sino id
    object.id = _id;
    return object;
});

module.exports = model('Evento', EventoSchema);