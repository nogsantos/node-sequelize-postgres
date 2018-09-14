/**
* Verifica o nível de acesso do usuário.
*/
(function(){
    "use strict";
    function levelAccess(nivelUsuario, nivelFuncao) {
        for(var key in nivelFuncao){
            if(nivelUsuario >= nivelFuncao[key]){
                return true;
            }
        }
        return false;
    }

    module.exports.levelAccess = levelAccess;
}());
