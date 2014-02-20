
/**
 * Module dependencies.
 */
var http = require('http');
var express = require('express');
var namespace = require('express-namespace');
var app = express();



app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(app.router);
app.use(express.static('./public'));

app.locals.pretty = true;

app.get('/', function(req, res) {
     res.render('index', {
       title: 'Superheroes',
       heroes: [
		      {name: 'Fooman', role: 'captain', skills: ['dancing',
		   				'invisibility']},  
		   		{name: 'Barman', role: 'entertainer', skills: ['bar tending',
		   			'x-ray vision']},
		         {name: 'Napman', role: 'hacker', skills: ['computer hacking',
		   			'nunchucks']},
		      {name: 'Zipman', role: 'collector', skills: ['zipping',
		   			'flight']}
       ]
	}); 
});

http.createServer(app).listen(3000, function() {
     console.log('App started');
});
