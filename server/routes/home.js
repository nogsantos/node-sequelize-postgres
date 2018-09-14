/**
 * Rota Home
 */
(function(){
    "use strict";
    var express = require('express');
    var home = express.Router();
    var auth  = require('../middleware/authenticator');
    var homeController = require('../controllers/homeController');

    home.get('/', auth, homeController.dashboard);

    module.exports = home;

}());
