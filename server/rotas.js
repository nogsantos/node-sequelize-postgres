/**
 * Definição das rotas do sistema.
 */
(function(){
    "use strict";
    module.exports = function(app){
        // index
        var index = require('./routes/index.js'); app.use('/', index);
        // home
        var home = require('./routes/home.js'); app.use('/home', home);
        // usuários
        var user = require('./routes/user.js'); app.use('/user', user);
        // erros do sistema
        var error = require('./routes/error.js'); app.use('/error', error);
        // informações do sistema
        var appinf = require('./routes/appinf.js'); app.use('/public', appinf);
        /***************************** TESTES **********************************/
        // todo - formulário para testes
        var todo = require('./routes/todo.js'); app.use('/todo', todo);
        // token - testes
        var token = require('./routes/token.js'); app.use('/token', token);
        // chat - testes socket io
        var chat = require('./routes/chat.js'); app.use('/chat', chat);
        // instagran - testes
        var instagram = require('./routes/instagram.js'); app.use('/instagram', instagram);
    };
}());
