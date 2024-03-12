const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        //Todo esto retorna una promesa
        await mongoose.connect(
            //Este env.DB_CNN viene de mis variables de entorno
            process.env.DB_CNN,
        );

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la BD')
    }
}

module.exports = {
    dbConnection
}