/**
* Rota Instagram
*/
(function(){
    "use strict";
    var express = require('express');
    var instagram = express.Router();
    var instagramController = require('../controllers/instagramController');

    instagram.get('/',  instagramController.index);
    instagram.get('/pm',  instagramController.popularesMundial);
    instagram.get('/qt',  instagramController.consultaTag);

    module.exports = instagram;

}());
