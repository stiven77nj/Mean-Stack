const { Schema, model } = require('mongoose');

// Modelo de usuario
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true // No permite correos duplicados
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true
    },
    img: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
});

// Exportacion del modelo
module.exports = model('User', UserSchema);