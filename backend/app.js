const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); // Lee el archivo de enviroments ".env"

// Crear el servidor de express
const app = express();

// Conexion a la base de datos
dbConnection();

// Cors 
app.use( cors() );
// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/user', require('./routes/user') );

// Metodo listen para correr el servidor
app.listen( process.env.PORT, () => {
    console.log(`aplicacion corriendo en el puerto... ${process.env.PORT}`);
});