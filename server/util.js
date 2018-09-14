(function (){
    "use strict";

    function testArray(){}

    testArray.prototype.arraySum = function(arr){
        var sum = 0;
        return sum;
    };

    testArray.prototype.t = function(){
        console.log('function');
        return true;
    };

    module.exports = new testArray();

}());
