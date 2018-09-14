/**
 * Controller Todo
 */
(function(){
    "use strict";
    var Model = require('../models/db_helper');
    var Sequelize = require('sequelize');
    /*
    * Declaração do objeto
    */
    function Todo(){}
    /*
    * Index todo.
    */
    Todo.prototype.index = function (req, res, next) {
        try{
            res.render('todo/', {
                title: locale.__('tit_todo'),
                user : req.user
            });
        }catch(e){
            res.json(locale.__('txt_render_error')+' '+e.toString());
        }
    };
    /**
    * Recupera todos
    *
    * @return json
    */
    Todo.prototype.getAll = function (req, res, next) {
        try{
            Model.Todo.findAll({
                attributes: ['id','title', 'complete', 'createdAt', 'updatedAt'],
                include: [{
                    model: Model.User,
                    attributes: ['id', 'first_name', 'last_name'],
                    paranoid: false,
                    required: true
                }],
                where: {
                    user_id: req.user.id
                },
                order: 'id DESC'
            }).then(function (todos) {
                res.status(200).json(todos);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error();
        }
    };
    /**
    * Renderiza o formulário
    *
    * @return json
    */
    Todo.prototype.form = function (req, res, next) {
        res.render('todo/form', {
            title: locale.__('tit_todo'),
            user : req.user
        });
    };
    /**
    * Cadastro
    */
    Todo.prototype.cadastrar = function (req, res, next) {
        try{
            Model.Todo.create({
                title: req.body.title,
                user_id: req.body.user_id
            }).then(function (todo) {
                todo.dataValues.message = locale.__('txt_action_success');
                res.status(201).json(todo);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error();
        }
    };
    /**
    * recupera por identificador
    */
    Todo.prototype.getById = function (req, res, next) {
        try{
            Model.Todo.find({
                attributes: ['id','title', 'complete', 'updatedAt'],
                include: [{
                    model: Model.User,
                    attributes: ['id', 'first_name', 'last_name'],
                    paranoid: false,
                    required: true
                }],
                where: {
                    id: req.params.id
                }
            }).then(function (todo) {
                res.status(200).json(todo);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error();
        }
    };
    /**
    * Atualiza um registro único
    */
    Todo.prototype.editar = function (req, res, next) {
        try{
            Model.Todo.find({
                attributes: ['id','title', 'complete', 'updatedAt'],
                where: {
                    id: req.params.id
                }
            }).then(function (todo) {
                if (todo) {
                    if(req.body.title){
                        todo.updateAttributes({
                            title: req.body.title,
                            updatedAt: Date()
                        }).then(function (todo) {
                            res.status(201).send(todo);
                        });
                    }
                    if(req.body.complete){
                        todo.updateAttributes({
                            complete: req.body.complete,
                            updatedAt: Date()
                        }).then(function (todo) {
                            res.status(201).send(todo);
                        });
                    }
                }
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error();
        }
    };
    /**
    * Deletar registros
    */
    Todo.prototype.deletar = function (req, res, next) {
        try{
            Model.Todo.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function (todo) {
                res.status(200).json(todo);
            }).catch(function (err) {
                res.status(500).json(err.message);
            });
        }catch(e){
            throw new Error();
        }
    };
    /*
    * Retorno do objeto
    */
    module.exports = new Todo();

}());
