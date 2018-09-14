/*
 * Home
 */
(function(){
    "use strict";
    var userLevel  = require('../middleware/levelCheck');
    /*
    */
    function Home(){}
    /*
    */
    Home.prototype.dashboard = function (req, res, next) {
        // define o nível de acesso permitido
        var usuario = req.user;
        var nivelDeAcesso = [5,7,10];
        if(userLevel.levelAccess(usuario.access_level, nivelDeAcesso)){
            res.render('home/dashboard', {
                title: 'Dashboard',
                user : usuario
            }
        );
    }else{
        res.redirect('../error/access/'+nivelDeAcesso);
    }
};

module.exports = new Home();

}());
