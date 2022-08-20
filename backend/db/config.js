const mongoose = require("mongoose");

// Funcion para la conexion a la base de datos
const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.BD_CNN );
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de inicializar la base de datos');
    }
}

// Exportacion de la conexion
module.exports = {
    dbConnection
}