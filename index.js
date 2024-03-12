const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


//Crear el servidor de express
const app = express();

//EL metodo para hacer la conexion con la API
dbConnection();

//CORS, para validar muchas cosas, 
//cross-origin resource sharing, cuando no esta habilitado
//Prohibe que se carguen datos de servidores ajenos al acceder
// a una pagina web, todo debe provenir de la misma fuente
app.use(cors());



//Directorio publico
//EL "use" en express es conocido como un middleware que un middleware es una funcion que
//Se ejecuta cuando alguien hace una peticion a mi servidor
app.use(express.static('public'));


//Lectura y parseo del body
//Las peticiones que vengan en formato json las voy a procesar aqui
app.use(express.json());



//Rutas
//Require de lo que tenemos en auth, todo lo que el archivo vaya a exportar
//Lo va a habilitar en la ruta 'api/auth'
app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));


//Escuchar peticiones

//Primer parametro es el puerto
//El segundo es el callback que se ejecutara cuando el servidor de express este arriba
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})