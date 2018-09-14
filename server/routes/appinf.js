/**
 * Informações sobre o app
 */
(function(){
    "use strict";
    var express = require('express');
    var appinf = express.Router();
    var appInfController = require('../controllers/appInfController');

    appinf.get('/status', appInfController.status);

    module.exports = appinf;

}());
