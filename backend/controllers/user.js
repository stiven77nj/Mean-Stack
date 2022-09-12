const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const User = require('../models/User'); // Modelo de usuarios
const Dog = require('../models/Dog'); // Modelo de mascotas



// Controlador para crear un usuario nuevo
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


// Controlador para el logueo de usuarios
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
            email: user.email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }
}


// Controlador para renovar jwt
const renovarToken = async ( req = request, res = response ) => {

    const { uid} = req;
    //leer la base de datos
    const dbUser = await User.findById(uid);

    // Renovar el JSON WEB TOKEN
    const token = await generateJWT( uid, dbUser.name ); // Recibe como parametro lo que se quiere guardar en el payload


    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token',
        })
    }

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email:dbUser.email,
        token
    })
}


// Controlador para registrar perros por usuarios
const createDog = async ( req = request, res = response ) => {

    try {
        const uid = req.user._id;

        // Crear un nuevo perro por usuario
        const newDog = new Dog( req.body );

        // Buscar el usuario para asignar al perro
        // const user = await User.findById( req.params );
        const user = await User.findById( uid );

        // Asignar al usuario como dueño del perro
        newDog.user = user;

        // Guardar el perro 
        await newDog.save();

        // Asignar el perro dentro del array de perros del usuario
        user.dogs.push( newDog );

        // Guaradar el usuario con su nuevo perro
        await user.save();

        // Respuesta a la solicitud
        res.status(200).json({
            ok:true,
            msg: 'Mascota agregada',
            name:newDog.name,
            age:newDog.age,
            breed:newDog.breed
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }
}


// Controlador para obtener los perros por usuario
const dogsUser = async ( req = request, res = response ) => {

    try {
        const uid = req.user._id;

        const user = await User.findById( uid );

        const dogs = user.dogs;

        let dogsUsers = [];

        for (let index = 0; index < dogs.length; index++) {
            dogsUsers[index] = await Dog.findById( dogs[index]   );
        }

        // Respuesta a la solicitud
        res.json({
            dogsUsers
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
    loginUser,
    renovarToken,
    createDog,
    dogsUser
}