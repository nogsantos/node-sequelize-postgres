(function (){
    "use strict";

    var assert = require('assert');
    var util = require('../server/util');

    suite('Utils:', function(){

        test('should sum the array', function(){
            var sum = util.arraySum([1,2]);
            assert.equal(sum, 6);
        });

        test('should be an function', function(){
            var t = util.t();
            assert.ok(t);
        });

    });

}());
