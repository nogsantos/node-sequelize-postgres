(function (){
    "use strict";

    var assert = require('assert');
    var chat = require('../server/controllers/chatController');

    suite('Chat:', function(){
        // Executa antes de todos os testes no bloco
        suiteSetup(function () {
            console.log("suiteSetup");
        });
        // Executa depois dos testes do bloco
        suiteTeardown(function(){
            console.log("suiteTeardown");
        });
        // Executa antes de cada teste do bloco
        setup(function(){
            console.log("setup");
        });
        // Executa depois de cada teste do bloco
        teardown(function(){
            console.log("teardown");
        });

        test('realizar soma', function(){
            var res = chat.somar(1,2);
            assert.equal(res, 3.1);
        });
    });

}());
