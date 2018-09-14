/**
* Rota Index. A página de autenticação é apresentada ao usuário.
*/
(function(){
    "use strict";
    var express = require('express');
    var index = express.Router();
    var passport = require('passport');
    var indexController = require('../controllers/indexController');

    index.get('/', indexController.index);

    index.post('/login', passport.authenticate('local', {
        successRedirect: 'home/',
        failureRedirect: '/',
        failureFlash: true
    }));

    index.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    module.exports = index;
    
}());
