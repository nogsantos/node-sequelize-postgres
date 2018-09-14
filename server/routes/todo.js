/**
* Rota Todo
*/
(function(){
    "use strict";
    var express = require('express');
    var todo = express.Router();
    var auth = require('../middleware/authenticator');
    var todoController = require('../controllers/todoController');

    todo.get('/', auth, todoController.index);
    todo.get('/all', auth, todoController.getAll);
    todo.get('/q/:id', auth, todoController.getById);
    todo.get('/form', auth, todoController.form);
    todo.post('/p', auth, todoController.cadastrar);
    todo.put('/:id', auth, todoController.editar);
    todo.delete('/:id', auth, todoController.deletar);

    module.exports = todo;

}());
