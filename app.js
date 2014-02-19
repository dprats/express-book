
/**
 * Module dependencies.
 */
var http = require('http');
var express = require('express');
var app = express();
var iniparser = require('iniparser');
var config = iniparser.parseSync('./config.ini');

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.responseTime());
app.use(app.router);
   // Setup for production environment
if ('production' == app.get('env')) {
  app.get('/', function(req, res) {
    res.render('index', {title:config.title, message:config.message});
	}); 
}
   // Setup for development environment
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.get('/', function(req, res) {
       res.send('development mode test');
     });
}

  // Common setup for all the environments
 app.get('/test', function(req, res) {
     res.send('works on all environment');
   });
   http.createServer(app).listen(config.port, function() {
     console.log('App started on port ' + config.port);
});
