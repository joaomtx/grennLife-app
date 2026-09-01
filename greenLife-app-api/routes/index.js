var express = require('express');
var router = express.Router();
const { success } = require('../middlewares/apiResponse');

router.get('/', (req, res) => {
  return success(res, {
    name: 'greenLife API',
    version: '1.0.0',
    status: 'online'
  }, 'Bem-vindo à API do greenLife.');
});

module.exports = router;
