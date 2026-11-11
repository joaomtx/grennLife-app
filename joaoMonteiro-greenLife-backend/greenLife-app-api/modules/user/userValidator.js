const { body, validationResult } = require('express-validator');
const { VALIDATION } = require('../../config/constants');

const validate = exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const firstError = errors.array()[0].msg;
    const error = new Error(firstError);
    error.status = 400;
    error.errors = errors.array();
    throw error;
};

exports.registerValidator = [
    body('username')
    .trim()
    .isLength({ min: VALIDATION.USERNAME_MIN, max: VALIDATION.USERNAME_MAX })
    .withMessage(`O nome de usuário deve ter entre ${VALIDATION.USERNAME_MIN} e ${VALIDATION.USERNAME_MAX} caracteres.`),
    body('email')
    .isEmail()
    .withMessage('Por favor, insira um e-mail válido.')
    .normalizeEmail(),
    body('password')
    .isLength({ min: VALIDATION.PASSWORD_MIN })
    .withMessage(`A senha deve ter pelo menos ${VALIDATION.PASSWORD_MIN} caracteres.`),
    body('confirmPassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não coincidem.');
        }
        return true;
    }),
    body('fullName')
    .trim()
    .notEmpty()
    .withMessage('O nome completo é obrigatório.'),
    validate
];

exports.loginValidator = [
    body('email')
    .isEmail()
    .withMessage('Por favor, insira um e-mail válido.')
    .normalizeEmail(),
    body('password')
    .notEmpty()
    .withMessage('A senha é obrigatória.'),
    validate
];

exports.profileUpdateValidator = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('O nome completo não pode ser vazio.'),
    body('bio')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: VALIDATION.BIO_MAX })
        .withMessage(`A bio deve ter no máximo ${VALIDATION.BIO_MAX} caracteres.`),
    validate
];

exports.productUpdateValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('O título do produto é obrigatório.'),
    body('description')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: VALIDATION.DESCRIPTION_MAX })
        .withMessage(`A descrição deve ter no máximo ${VALIDATION.DESCRIPTION_MAX} caracteres.`),
    validate
];

// Upload de produto: mesma regra do PUT (trim antes do notEmpty).
exports.productUploadValidator = exports.productUpdateValidator;
