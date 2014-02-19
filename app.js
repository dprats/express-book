
/**
 * Module dependencies.
 */
var http = require('http');
var express = require('express');
var namespace = require('express-namespace');
var app = express();

app.use(app.router);




// Pass the Express instance to the routes module

var routes = require('./routes')(app);

app.namespace('/articles', function(){

	app.get('/', function(req,res){
		res.send('index of articles');
	});
	
	app.get('/new', function(req,res){
		res.send('new article');
	});

	app.get('/edit/:id', function(req,res){
		res.send('edit article ' + req.params.id);
	});

	
	app.get('/delete/:id', function(req,res){
		res.send('delete article ' + req.params.id);
	});
	
	app.get('/2013', function(req,res){
		res.send('articles from 2013');
	});
	
	app.namespace('/2013/jan', function(){

		app.get('/', function(req,res){
			res.send('articles from jan 2013');
		});

		app.get('/nodejs', function(req,res){
			res.send('articles about nodejs from jan 2013');
		});

	});
});



http.createServer(app).listen(3000, function() {
     console.log('App started');
});
