const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const User = require('../models/User'); // Se importa el modelo

// Crear un usuario nuevo
const createUser = async ( req = request, res = response ) => {
    const { name, email, password } = req.body; // Se extrae lo que viene del body
    const user = new User({ name, email, password }); // Se crea una nueva instancia del usuario

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // Nivel de encriptacion. 10 por defecto
    user.password = bcryptjs.hashSync( password, salt ); // Se encripta la contraseña

    // Guardar en la BD
    await user.save();

    return res.status(201).json({
        ok: true,
        msg: 'Usuario creado',
        uid: user.id,
        name,
        email
    });
}

// Login de usuario
const loginUser = async ( req = request, res = response ) => {
    const { email, password } = req.body; // Se extrae lo que viene del body

    try {
        // Verificar si el correo existe
        const user = await User.findOne({ email }); // Buscamos si el correo esta registrado
        if ( !user ) { 
            return res.status(400).json({
                msg: 'Email / Password no son correctos - correo'
            });
        }
        // Verificar si el usuario esta activo
        if ( !user.state ) { // Si el estado es falso
            return res.status(400).json({
                msg: 'Email / Password no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) { // Si las contraseñas no hacen match
            return res.status(400).json({
                msg: 'Email / Password no son correctos - password'
            });
        }

        // Generar el JSON WEB TOKEN
        const token = await generateJWT( user.id, user.name ); // Recibe como parametro lo que se quiere guardar en el payload

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }
}

// Exportacion de los controladores
module.exports = {
    createUser,
    loginUser
}