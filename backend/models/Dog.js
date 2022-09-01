const { Schema, model } = require('mongoose');

// Modelo de perros
const DogSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    breed : {
        type: String,
        required: [true, 'La raza es obligatorio']
    },
    vaccines: {
        type: String
    },
    preferences: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Exportacion del modelo
module.exports = model('Dog', DogSchema);