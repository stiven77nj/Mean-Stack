const jwt = require('jsonwebtoken'); // Paquete "jwt"

// Funcion para generar el "jsonwebtoken"
const generateJWT = ( uid, name ) => {
    // Se crea una promesa
    return new Promise( ( resolve, reject ) => {
        const payload = { uid, name }; // Se crea el "payload" del jwt, en este caso, con el id
        // payload, firma del token, opciones (tiempo de duracion), callback, 
        jwt.sign( payload,  process.env.SECRETORPRIVATEKEY, { expiresIn: '4h' }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        });
    });
}

// Se exporta la funcion
module.exports = {
    generateJWT
}