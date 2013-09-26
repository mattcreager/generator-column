/* jshint node: true */

'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var ColumnGenerator = module.exports = function(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  var packagePath = path.join(__dirname, '../package.json');
  this.pkg = JSON.parse(this.readFileAsString(packagePath));
};

util.inherits(ColumnGenerator, yeoman.generators.Base);

ColumnGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'appName',
      message: 'What should we name our App?',
      require: true
    },
    {
      name: 'giAcct',
      message: 'Which GoInstant account are we going to use?'
    },
    {
      name: 'giApp',
      message: 'ok, awesome and which app?'
    }
  ];

  this.prompt(prompts, function (props) {
    _.extend(this, props);

    cb();
  }.bind(this));
};

ColumnGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/controllers');
  this.mkdir('app/models');
  this.mkdir('app/views');

  this.mkdir('public');
  this.mkdir('public/stylesheets');
  this.mkdir('public/scripts');
  this.mkdir('public/images');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_app.js', 'app.js');
  this.copy('_config.js', 'app/config.js');
  this.copy('_server.js', 'app/server.js');
  this.copy('_home.js', 'app/controllers/home.js');

  this.copy('_main.js', 'public/scripts/main.js');
  this.copy('_gi_status.js', 'public/scripts/gi_status.js');

  this.write('public/stylesheets/main.css', '');

  this.copy('_layout.html', 'app/views/l{ayout.html');
  this.copy('_navigation.html', 'app/views/navigation.html');
  this.copy('_home.html', 'app/views/home.html');
};

ColumnGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
};
