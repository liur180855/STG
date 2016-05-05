require('rootpath')();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config.json');
//var dataService = require('services/data.service');

var mongojs=require('mongojs');
var db = mongojs('HouseDB',['HouseDB']);
/*
// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
*/
app.use('/app', require('./controllers/app.controller'));
//app.use('/api/data', require('./controllers/api/data.controller'));
// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});


app.get('/getAllHousing',function(req,res){
	console.log("I received a GET request");
	db.HouseDB.find(function(err1,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/postInfo',function(req,res){
	console.log("I received a POST request");
	console.log(req.body);
	db.HouseDB.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});