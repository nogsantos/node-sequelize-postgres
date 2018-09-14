/**
 * Erros dos sistema
 */
(function(){
    'use strict';
    function Error(){}
    /*
     *
     */
    Error.prototype.access = function (req, res, next) {
        res.render('error/access', {
            title: locale.__("txt_level_access_error"),
            user : req.user,
            nivel : req.params.level
        });
    };

    module.exports = new Error();

}());
