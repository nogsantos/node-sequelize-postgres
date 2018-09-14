/**
 * Testes chat
 */
(function (){
    "use strict";
    function Chat(){}
    /*
     *
     */
    Chat.prototype.index = function (req, res, next) {
        try{
            res.render('chat/', {title: locale.__('tit_login')});
        }catch(E){
            res.status(500).json(E.toString()); // bar
        }
    };
    
    Chat.prototype.somar = function(a, b){
        return a + b;
    };

    module.exports = new Chat();

}());
