/**
 * Rota Chat
 */
(function(){
    "use strict";
    var express = require('express');
    var user = express.Router();
    var chatController = require('../controllers/chatController');

    user.get('/', chatController.index);

    module.exports = user;

}());
