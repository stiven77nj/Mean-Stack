const { request, response } = require('express');

const Dog = require('../models/Dog'); // Se importa el modelo

// Crear un perro nuevo
const createDog = async ( req = request, res = response ) => {
    
    const body = req.body;
    const uid = req.user._id;

    try {
        const name = req.body.name.toUpperCase(); // Se obtiene el nombre que viene del body
        // const age = req.body.age.toUpperCase(); // Se obtiene la edad que viene del body
        // const breed = req.body.breed.toUpperCase(); // Se obtiene la raza que viene del body


        // Se valida si el perro ya existe
        const dogDB = await Dog.findOne({ name }); // Se busca el perro en la base de datos
        const user = await Dog.find( { name }, { user: uid  } );

        console.log(user);

        if ( dogDB ) { // Si ya existe el perro existe en la base de datos
            return res.status(400).json({
                msg: `El perro ${dogDB.name} ya existe`
            });
        }

        // Generar la data a guadar
        const data = {
            name,
            age: body.age,
            breed: body.breed,
            preferences: body.preferences,
            vaccines: body.vaccines,
            user: req.user._id,
        }

        // Guardar la categoria en la base de datos
        const dog = new Dog( data );
        await dog.save();

        // Respuesta
        res.status(201).json( dog );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }

}

// Exportacion de los controladores
module.exports = {
    createDog
}