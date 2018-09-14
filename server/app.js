/**
 * main dependencies
 */
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var swig = require('swig');
var flash = require('connect-flash');
var session = require('express-session');
var setupPassport = require('../server/middleware/setupPassport');
var sistemaConf = require('../server/configurations/sistema');
var i18n = require("i18n");
var debug = require('debug')('NOG');
var methodOverride = require('method-override');
//var fs = require('fs');
/*
 * express instance
 */
var app = express();
/*
 * server config
 */
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
/*
 * view engine
 */
swig.setDefaults({cache: 'memory'});
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
/*
 * static directory
 */
app.set('views', path.join(__dirname, 'views'));
/*
 * config middleware
 */
app.use(logger('dev'));
app.use(jsonParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(session({secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    next();
});
setupPassport(app);
/*
 * Loading bower componnents
 */
app.use(express.static(__dirname + '../client/lib'));
app.use('../client/lib', express.static(__dirname + '../client/lib'));
/*
 * locale
 */
global.locale = {};
i18n.configure({
    locales:['pt_br'],
    register: locale,
    defaultLocale: 'pt_br',
    directory: __dirname + '/locales',
    logDebugFn: function (msg) {
        debug('debug');
    },
    logErrorFn: function (msg) {
        debug(msg);
    }
});
app.use(i18n.init);
/**
 * CORS (Cross-origins resource sharding)
 */
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-With, Content-type, Accept");
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    next();
});
/*
 * Configurações do sistema.
 */
sistemaConf(app);
/*
 * Rotas
 */
var rotas = require("./rotas");
rotas(app);
/*
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    var err = new Error(locale.__('txt_not_found'));
    err.status = 404;
    next(err);
});
/*
 * error handlers
 */
app.use(function (err, req, res, next) {
    var errorMessage = (app.get('env') === 'development') ? err : {};
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: errorMessage
    });
});
/*
 * Exports
 */
module.exports = app;
