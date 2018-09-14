/**
 * Index Controller
 *
 * Tela inicial do sistema, público. Tela de login.
 */
(function (){
    "use strict";
    function Index(){}
    /*
     * Método Index
     */
    Index.prototype.index = function (req, res, next) {
        req.logout();
        res.render('index', {title: locale.__('tit_login')});
    };
    /*
    * Retorno do objeto.
    */
    module.exports = new Index();
}());
