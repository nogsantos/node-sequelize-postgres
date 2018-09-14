/**
* Rota tokens
*/
(function(){
    "use strict";
    var express = require('express');
    var user = express.Router();
    var tokenController = require('../controllers/tokenController');

    user.get('/',  tokenController.index);

    module.exports = user;

}());
