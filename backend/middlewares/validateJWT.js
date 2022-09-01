const jwt = require('jsonwebtoken'); 
const { request, response } = require('express');

const User = require('../models/User'); // Se importa el modelo

// Funcion para validar el jwt
const validateJWT = async ( req = request , res = response, next ) => {
    const token = req.header('x-token'); // Se obtiene la informacion de los headers
    
    if ( !token ) { // Si no hay token en la peticion...
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }

    try {
        const { uid, name } = jwt.verify( token, process.env.SECRETORPRIVATEKEY ); 
        req.uid = uid;
        req.name = name;

        // leer el usuario que corresponde al uid
        const user = await User.findById( uid );

        // Verificar si el usuario existe
        if ( !user ) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en BD"
            }); 
        }
        console.log(user.state);
        // Verificar si el "uid" tiene estado en "true"
        if ( !user.state ) {
            console.log(user.state);
            return res.status(401).json({
                msg: "Token no valido - usuario con estado: false"
            });
        }
        
        req.user = user;
        next(); 
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        });
    }
}

// Se exporta la funcion
module.exports = {
    validateJWT 
}