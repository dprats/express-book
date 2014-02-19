
/**
 * Module dependencies.
 */
var http = require('http');
var express = require('express');
var app = express();

//include route middleware
app.use(app.router);

app.all('/', function(req, res, next) {
     res.set('X-Catch-All', 'true');
     next();
});

//load the route handlers

var routes = require('./routes');
var user = require('./routes/user');

//add route middleware explicitly

app.use(app.router);

//routes

app.get('/', routes.index); 
app.get('/user', routes.user);


http.createServer(app).listen(3000, function() {
     console.log('App started');
});
