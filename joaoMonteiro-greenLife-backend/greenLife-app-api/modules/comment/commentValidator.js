const { body } = require('express-validator');
const { VALIDATION } = require('../../config/constants');
const { validate } = require('../user/userValidator');

// trim() PRIMEIRO: assim "   " vira "" antes do notEmpty() e é recusado.
exports.commentValidator = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('O comentário não pode ficar vazio.')
        .isLength({ max: VALIDATION.COMMENT_MAX })
        .withMessage(`O comentário deve ter no máximo ${VALIDATION.COMMENT_MAX} caracteres.`),
    validate
];
