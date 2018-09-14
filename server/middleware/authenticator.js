/**
 * Confirma se o usuário está autenticado no sistema.
 *
 * @TODO autenticação via token.
 *
 */
(function(){
    "use strict";
    // var jwt = require('jsonwebtoken');

    module.exports = function (req, res, next) {
        // var hasToken = global.token || req.body.token || req.headers['x-access-token'];

        if (req.isAuthenticated()) { // autenticação passport
            return next();
        }
        // }else if(hasToken){ // autenticação by token para mobile
        //     // console.log(req.user);
        //     jwt.verify(hasToken, '964376075edd25309d0dcfb6cb18be70661b3680', function(err, decoded){
        //         console.log(decoded);
        //         if(err){
        //             authError();
        //         }else{
        //             return next();
        //         }
        //     });
        // }else{
        //     authError();
        // }
        // function authError(){
        req.flash('error', locale.__('txt_auth_access_error'));
        res.redirect('/');
        // }
    };

}());
