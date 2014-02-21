
/**
 * Module dependencies.
 */
var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

app.locals.pretty = true;

app.get('/', function(req, res) {
     res.render('index', {
       title: 'Search',
	}); 
});



http.createServer(app).listen(3000, function() {
     console.log('App started');
});
