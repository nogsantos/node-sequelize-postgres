/**
* Helper para acesso a dados
*/
(function(){
    "use strict";
    var fs        = require('fs');
    var path      = require('path');
    var Sequelize = require('sequelize');
    var basename  = path.basename(module.filename);
    var env       = process.env.NODE_ENV || 'development';
    var config    = require(__dirname + '/../config/aplication.json')[env];
    var db        = {};
    var sequelize = {};
    var dir       = __dirname+'/entity';
    /*
     * Define o ambiente
     */
    if (config.use_env_variable) {
        sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
        sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    /*
    * Lê o diretório com as entidades
    */
    fs.readdirSync(dir).filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    }).forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(dir, file));
        db[model.name] = model;
    });
    Object.keys(db).forEach(function(modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db.Sequelize = Sequelize;
    module.exports = db;

}());
