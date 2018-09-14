/**
 * Configurações Passport
 */
(function(){
    "use strict";
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require('bcrypt');
    var jwt = require('jsonwebtoken');
    var Model = require('../models/db_helper.js');

    module.exports = function (app) {
        app.use(passport.initialize());
        app.use(passport.session());
        /*
        * Definição da estratégia local de autenticação
        */
        passport.use(new LocalStrategy(
            function doAuth(username, password, done) {
                Model.User.findOne({
                    where: {
                        'username': username
                    }
                }).then(function (user) {
                    if (user === null) {
                        return done(null, false, {message: locale.__('txt_auth_error')});
                    }

                    var hashedPassword = bcrypt.hashSync(password, user.salt);

                    if (user.password === hashedPassword) {
                        return done(null, user);
                    }

                    return done(null, false, {message: locale.__('txt_auth_error')});
                });
            }
        ));
        /*
        * Serialização
        */
        passport.serializeUser(function doSerialize(user, done) {
            done(null, user.id);
        });
        /*
        * Desserialização
        */
        passport.deserializeUser(function doDeserialize(id, done) {
            Model.User.findOne({
                where: {
                    'id': id
                }
            }).then(function (user) {
                if (user === null) {
                    done(new Error(locale.__('txt_auth_id_error')));
                }
                // Com o usuário autenticado, um token de segurança é gerado
                // com duração de 1 hora.
                user.token = jwt.sign({
                    user: user.username,
                    salt : user.salt
                },'964376075edd25309d0dcfb6cb18be70661b3680',{
                    expiresIn: 3600
                });
                done(null, user);
            });
        });
    };

}());
