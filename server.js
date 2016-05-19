require('rootpath')();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config.json');
var Q = require('q');
//var dataService = require('services/data.service');

var mongojs=require('mongojs');
var db = mongojs('HouseDB',['HouseDB']);

var GoogleMapsAPI = require('googlemaps');


var publicConfig = {
  key: 'AIzaSyAcQ5EICDJHpfIs1e4GKFN-VfwbWtzGVB4',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  proxy:              '' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);

// geocode API






app.use(bodyParser.json());

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

app.get('/findHouse',function(req,res){
    console.log("I received a GET request");
    /*
    var geocodeParams = {
	  "address":    "",
	  "components": "",
	  "bounds":     "",
	  "language":   "",
	  "region":     ""
	};



	geocodeParams.address = req.body.address;
	*/

	    db.HouseDB.find(function(err1,docs){



	    	console.log(req.query);
	        console.log(docs);
			
	        res.json(docs);
	    });

});

app.post('/postInfo', function(req,res){
	
	console.log("I received a POST request");
	
	//update(req.body);
	var geocodeParams = {
	  "address":    "",
	  "components": "",
	  "bounds":     "",
	  "language":   "",
	  "region":     ""
	};
    geocodeParams.address = req.body.address;
    gmAPI.geocode(geocodeParams, function(err, result){
        console.log(req.body);
        console.log(result.results[0].geometry.location);
        req.body.location = result.results[0].geometry.location;

        db.HouseDB.insert(req.body,function(err,doc){
            res.json(doc);
        });
    });
    console.log(geocodeParams);
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
