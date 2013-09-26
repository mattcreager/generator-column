
/** Module dependencies */

var express = require('express');
var _ = require('lodash');

var app = express();

exports.start = function() {
  require('./config').load(app);

  _.map([
    'home'
  //'anotherController'
  ], function (controllerName) {
    var controller = require('./controllers/' + controllerName);
    controller.setup(app);
  });

  require('http')
    .createServer(app)
    .listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
    });
};