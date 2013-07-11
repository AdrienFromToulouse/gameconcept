/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
/**
 * Init the APP variable
 */
var app = express();

/**
 * Config
 */
app.configure(function () {
  app.set('port', process.env.PORT || 3300);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({showStack: true, dumpExceptions: true}));
});

/**
 * Development: export NODE_ENV=development or NODE_ENV=development node app
 */
app.configure('development', function () {

  app.use(express.errorHandler());

  /**
   * General
   */
  app.get('/', function (req, res) {
      res.render('index', { title: 'Gameconcept!' });
  });

/**
 * Create server
 */
var server = http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
