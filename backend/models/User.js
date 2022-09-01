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
    },
    dogs : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Dog'
        }
    ]
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

// Exportacion del modelo
module.exports = model('User', UserSchema);