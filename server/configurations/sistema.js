/*
 * Parametros globais do sistema.
 */
(function(){
    'use strict';
    module.exports = function (app) {
        var moment = require('moment');
        moment.locale('pt_BR');
        global.sisname = locale.__('sis_name');
        global.footerMessage = locale.__('txt_wellcome')+"! "+locale.__('txt_today')+", " + moment().format("dddd, D [de] MMMM [de] YYYY");
        global.title = locale.__('sis_title');
    };
}());
