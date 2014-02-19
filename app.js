
/**
 * Module dependencies.
 */
var http = require('http');
var express = require('express');
var namespace = require('express-namespace');
var app = express();

app.use(app.router);
app.use(express.static('./public'));
app.use(express.static('./files'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

//HTML pretiffied

app.locals.pretty = true;

app.get('/', function(req,res){
	res.format({
		'text/plain': function(){
			res.send('Welcome');
		},
		'text/html': function() {
         res.send('<b>welcome</b>');
		},
    'application/json': function() {
         res.json({ message: 'welcome' });
		},
    'default': function() {
         res.send(406, 'Not Acceptable');
		}
	});
});

http.createServer(app).listen(3000, function() {
     console.log('App started');
});
