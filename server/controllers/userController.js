/**
 * User Controller
 */
(function(){
    "use strict";
    var bcrypt = require('bcrypt');
    var models = require('../models/db_helper');
    var business = require('../models/business/userBusiness');
    /*
    * Objeto
    */
    function User(){}
    /*
    * Index
    */
    User.prototype.index = function (req, res, next) {
        try{
            models.User.findAll({}).then(function (users) {
                res.status(200).json(users);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error(e.toString());
        }
    };
    /*
    * Cadastrar usuário
    */
    User.prototype.cadastrar = function (req, res, next) {
        try{
            var password = req.body.password;
            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync(password, salt);
            models.User.create({
                username: req.body.username,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                salt: salt,
                password: hashedPassword,
                access_level: req.body.access_level
            }).then(function (user) {
                res.status(200).json(user);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error(e.toString());
        }
    };
    /*
    * editar
    */
    User.prototype.editar = function (req, res, next) {
        try{
            models.User.find({
                where: {
                    id: req.params.id
                }
            }).then(function (user) {
                if (user) {
                    user.updateAttributes({
                        username: req.body.username,
                        email: req.body.email,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        password: req.body.password,
                        access_level: req.body.access_level
                    }).then(function (user) {
                        res.status(200).send(user);
                    }).catch(function (err) {
                        res.status(500).json(err.message);
                    });
                }
            });
        }catch(e){
            throw new Error(e.toString());
        }
    };
    /*
    * Deletar
    */
    User.prototype.deletar = function (req, res, next) {
        try{
            models.User.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function (user) {
                res.status(200).json(user);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error(e.toString());
        }
    };
    /*
    * Consultar por id
    */
    User.prototype.getById = function (req, res, next) {
        try{
            models.User.find({
                where: {
                    id: req.params.id
                }
            }).then(function (user) {
                res.status(200).json(user);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error(e.toString());
        }
    };
    /*
    * Retorno
    */
    module.exports = new User();

}());
