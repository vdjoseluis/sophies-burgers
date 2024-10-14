const {body} = require('express-validator');

const registerValidation = [
    body('email').isEmail().withMessage('Correo electrónico inválido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('firstname').notEmpty().withMessage('El nombre es obligatorio').trim().escape(),
    body('lastname').notEmpty().withMessage('El apellido es obligatorio').trim().escape(),    
    body('address').notEmpty().withMessage('La dirección es obligatoria').trim().escape(),
    body('phone').isMobilePhone('any').withMessage('El número de contacto es obligatorio').trim().escape(),
    body('role').optional().isIn(['admin', 'user']).withMessage('El rol debe ser admin o user'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Correo inválido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

module.exports = {
    registerValidation, 
    loginValidation
}