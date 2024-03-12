//SI quiero validar fechas
const moment = require('moment');

const isDate = (value, { req, location, path }) => {
    //Si value no existe para devolver el error
    if (!value) {
        return false
    }

    const fecha = moment(value);
    //Metodo de moment para validar fecha
    if (fecha.isValid()) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    isDate
}