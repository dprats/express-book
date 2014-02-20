
/**
 * Module dependencies.
 */
var http = require('http');
var express = require('express');
var namespace = require('express-namespace');
var app = express();
var fs = require('fs');


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.bodyParser());

app.use(require('stylus').middleware('./public'));
app.use(express.static('./public'));
app.use(express.bodyParser({keepExtensions: true}));
app.use(express.bodyParser({uploadDir: './uploads'}));


app.use(app.router);
app.locals.pretty = true;

app.get('/', function(req, res) {
     res.render('index', {
       title: 'Search',
	}); 
});

app.get('/signup', function(req, res) {
     res.render('signup', {
       title: 'Sign Up',
	}); 
});


app.post('/signup', function(req,res){
	var name = req.body.name;
	var email = req.body.email;

	  // Reference to the profile_image object
	  var profile_image = req.files.profile_image;

	  // Temporary location of the uploaded file
	  var tmp_path = profile_image.path;

	  // New location of the file
	  var target_path = './public/images/' + profile_image.name;

	  // Move the file from the new location
	  fs.rename(tmp_path, target_path, function(err){
	  	 // If an error is encountered, pass it to the next handler
	  	 if (err){ next(err);} 
	  	 // Delete the temporary file
	  	 fs.unlink(tmp_path, function(){
	  	 	 // If an error is encountered, pass it to the next handler
	  	 	 if (err){ next(err);}
	  	 	 console.log('File uploaded to: ' + target_path +' - ' +
	  	 	 	profile_image.size + 'bytes');
	  	 	 res.redirect('/images/' + profile_image.name);
	  	 });
	  });
});

// app.get('/skills-search-result', function(req, res) {
//      var skills = req.query.skills;
//      console.log('Skills: ');
//      skills.forEach(function(skill, i) {
//        console.log((i+1) +'. '+ skill);
//      });
//      res.json(req.query.skills);
// });

http.createServer(app).listen(3000, function() {
     console.log('App started');
});
