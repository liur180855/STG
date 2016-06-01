require('rootpath')();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config.json');
var Q = require('q');
//var dataService = require('services/data.service');

var mongojs=require('mongojs');
var HouseDB = mongojs('HouseDB',['HouseDB']);
var tenantDB = mongojs('tenantDB',['tenantDB']);

var dbConnector = require('dbConnector')
var dbConnectorInstance = new dbConnector();
var GoogleMapsAPI = require('googlemaps');

console.log(config.smtp);

var emailSenderModule = require('emailSender');
var emailSender = new emailSenderModule(config.smtp);


//emailSender.sendMail(emailSender.createMailOptions(config.from,'liur180855@gmail.com',config.successSubject,null, config.successMessage));




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

app.get('/getTenantInfo',function(req,res){
	console.log("I received a GET request");
	dbConnectorInstance.findTenantDB(function(docs){
    	res.json(docs);
    });
});

app.get('/findHouse',function(req,res){
    console.log("I received a GET request");
    dbConnectorInstance.findAllHouse(function(docs){
    	res.json(docs);
    });

});

app.post('/postHouseInfo', function(req,res){
	
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
        var house = req.body;
        house.location = result.results[0].geometry.location;
        console.log(house);
        HouseDB.HouseDB.insert(house,function(err,doc){
            res.json(doc);
        });
    });
    console.log(geocodeParams);
});

app.post('/postTenantInfo', function(req,res){
    //console.log(req.body);
    dbConnectorInstance.insertUnverify(req.body,function(doc){
    	console.log(doc);
        res.json(doc);
    });
});

app.get('/verifyInfo',function(req,res){
	console.log(req.query.verificationCode);
    console.log("I received a GET request");
    dbConnectorInstance.findUnverify(req.query.verificationCode,function(docs){
    	//console.log(docs);
    	//dbConnectorInstance.insertTenantDB(docs);
    	/*
    	dbConnectorInstance.insertDataMining(docs);
    	dbConnectorInstance.deleteUnverify(req.query.verificationCode);
    	*/
    	res.json(docs);
    });
    /*
    dbConnectorInstance.findAllHouse(function(docs){
    	res.json(docs);
    });
    */
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});


String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};