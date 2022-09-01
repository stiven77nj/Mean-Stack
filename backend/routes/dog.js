const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');

const { validateJWT } = require('../middlewares/validateJWT');

const { createDog } = require('../controllers/dog');

const router = Router();

// Crear un nuevo perro
router.post('/register', [
    validateJWT,
    check('name','El nombre es obligatorio').notEmpty(),
    check('age','La edad es obligatoria').notEmpty(),
    check('breed','La raza es obligatoria').notEmpty(),
    validateFields
], createDog);


// Exportacion de las rutas
module.exports = router;