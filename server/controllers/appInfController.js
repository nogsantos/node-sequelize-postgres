/**
 * Informações sobre o sistema
 */
(function (){
    "use strict";
    var pkg = require('../../package.json');
    function AppInf(){}
    /*
     *
     */
    AppInf.prototype.status = function (req, res, next) {
            res.status(200).json({
                appname : pkg.name,
                appversion : pkg.version
            });
    };

    module.exports = new AppInf();

}());
