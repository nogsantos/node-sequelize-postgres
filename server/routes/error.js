/**
* Rota erros do sistema
*/
(function(){
    "use strict";
    var express = require('express');
    var error = express.Router();
    var auth = require('../middleware/authenticator');
    var errorController = require('../controllers/errorController');

    error.get('/access/:level', auth, errorController.access);

    module.exports = error;
    
}());
