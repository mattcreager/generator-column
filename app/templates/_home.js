

exports.setup = function(app) {
  var home = new HomeController();

  app.get('/', home.index);
};

function HomeController() {
  console.log('home controller initialized');
}

HomeController.prototype.index = function (req, res) {
  res.render('home');
};