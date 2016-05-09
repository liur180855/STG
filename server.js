require('rootpath')();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config.json');
var Q = require('q');
//var dataService = require('services/data.service');

var mongojs=require('mongojs');
var db = mongojs('HouseDB',['HouseDB']);

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

app.post('/postInfo', function(req,res){
	
	console.log("I received a POST request");
	console.log(req.body);
	//update(req.body);
	
	db.HouseDB.insert(req.body,function(err,doc){
		res.json(doc);
	});
	
	
});

function update( house) {
    var deferred = Q.defer();

    addHouse();

    function addHouse() {
        // fields to update
        var set = {
            address: house.address,
            other: house.other
        };
 
        db.HouseDB.update(
            { _id: ObjectId() },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}
// start server
var server = app.listen(80, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
