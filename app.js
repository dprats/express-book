
/**
 * Module dependencies.
 */
// var http = require('http');
// var express = require('express');
// var app = express();
var cluster = require('cluster');

// //master process -- starts the cluster

if (cluster.isMaster){
	var cpu_count = require('os').cpus().length;

	//create worker process for each core

	require('os').cpus().forEach(function(){

		//start the worker process

		cluster.fork();

	});

//in case a worker dies, a new one should be started
	cluster.on('exit', function(worker, code, signal){
		cluster.fork;
	});

}

//code for the worker process to execute

else{

	var worker_id = 'Worker #' + cluster.worker.id;

	var http = require('http');
	var express =require('express');
	var app = express();

	app.locals.pretty = true;

	app.get('/', function(req, res) {
  
		var a =[];
		for (var i = 0; i < 100000; i++){
			a.push(i);
		}

		res.send(a.toString());


	});

	http.createServer(app).listen(3000, function() {
     console.log('App started by %s', worker_id);
	});


}






