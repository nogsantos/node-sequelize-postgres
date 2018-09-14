/**
 * Testes para tokes
 */
(function(){
    "use strict";
    var jwt = require('jsonwebtoken');

    function Token(){}

    Token.prototype.index = function (req, res, next) {
        try{
            var token = jwt.sign({foo: 'fabricio'}, 'test');
            var decoded = jwt.verify(token, 'test');
            res.status(200).json(token+decoded.foo); // bar
        }catch(E){
            res.status(500).json(E.toString()); // bar
        }
    };

    module.exports = new Token();

}());
