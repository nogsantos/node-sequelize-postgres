/**
 * Integração Instagram
 */
(function(){
    "use strict";
    var ig = require('instagram-node').instagram({});
    /*
    * Instagram -testes
    */
    ig.use({
        client_id: 'e0e51c60672c4f09abe28c46c71a3a7a',
        client_secret: 'db11c575a8ae4f1aa90a03ba1d1345d8'
    });

    function Instagram(){}

    Instagram.prototype.index = function (req, res, next) {
        res.render('instagram/', {
            title: locale.__('tit_instagram')
        });
    };
    /**
     * Retorna as imagens populares no momento (Mundial)
     */
    Instagram.prototype.popularesMundial = function(req, res, next){
        ig.media_popular(function(err, medias, remaining, limit) {
            res.status(201).json(medias);
        });
    };
    /**
     * Retorna as imagens populares no momento (Mundial)
     */
    Instagram.prototype.consultaTag = function(req, res, next){
        ig.tag_search('#boatarde', function(err, result, remaining, limit) {
            if(err){
                res.status(500).json(err.message);
            }
            res.status(201).json(result);
        });
    };


    module.exports = new Instagram();

}());
