/**
* Rota Users
*/
(function(){
    "use strict";
    var express = require('express');
    var user = express.Router();
    var userController = require('../controllers/userController');
    var auth  = require('../middleware/authenticator');

    user.get('/',  auth, userController.index);
    user.post('/p', auth, userController.cadastrar);
    user.put('/:id', auth, userController.editar);
    user.get('/:id', auth, userController.getById);
    user.delete('/:id', auth, userController.deletar);

    module.exports = user;

}());
