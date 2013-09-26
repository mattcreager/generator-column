'use strict';

var express = require('express');
var path = require('path');
var url = require('url');
var swig = require('swig');

var config = exports; exports.constructor = function() {};

config.load = function(app) {
  var appRoot = path.resolve('.') + '/';

  swig.setDefaults({ cache: false });

  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname,'views'));
  app.set('view cache', false);
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('Mr Awesome'));
  app.use(express.session());
  app.use(function(req, res, next) {
    res.locals.location = url.parse(req.url).pathname.replace('/', '');
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(appRoot, 'public')));

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
};