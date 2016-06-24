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
	console.log("I received a getTenantInfo request");
	dbConnectorInstance.findTenantDB(function(docs){
		docs = clearSensetiveInfo(docs);
    	res.json(docs);
    });
});

function clearSensetiveInfo(docs){
	for(var i in docs){
		delete docs[i]["_id"];
		delete docs[i]["address"];
		delete docs[i]["datatype"];
	}
	return docs;
}

app.get('/findHouse',function(req,res){
    console.log("I received a findHouse request");
    dbConnectorInstance.findAllHouse(function(docs){
    	docs = clearSensetiveInfo(docs);
    	res.json(docs);
    });
});

app.post('/postHouseInfo', function(req,res){
	console.log("I received a postHouseInfo request");
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
    	// console.log("debug");
    	// console.log(result.length);
     //    console.log(result.results[0]);
     //    console.log(result.results[1]);
        var house = req.body;
        house.location = result.results[0].geometry.location;
		//console.log("debug end");
        dbConnectorInstance.insertUnverify(req.body,"HouseDB",function(doc){
	    	// console.log(doc._id);
	    	// console.log(doc.email);
	    	emailSender.sendMail(emailSender.createMailOptions(config.from,doc.email,config.successSubject,null, emailSender.createVerifyMessage(doc._id,"delHouseInfo")));
			//emailSender.sendMail(emailSender.createMailOptions(config.from,doc.email,config.successSubject,null, config.successMessage));
			res.json("please check your email to verified");
	    });
    });
});

app.post('/postTenantInfo', function(req,res){
	console.log('/postTenantInfo');
    //console.log(req.body);
    dbConnectorInstance.insertUnverify(req.body,"tenantDB",function(doc){
    	console.log(doc._id);
    	console.log(doc.email);
    	emailSender.sendMail(emailSender.createMailOptions(config.from,doc.email,config.successSubject,null, emailSender.createVerifyMessage(doc._id,"delTenantInfo")));
		//emailSender.sendMail(emailSender.createMailOptions(config.from,doc.email,config.successSubject,null, config.successMessage));
		// console.log('/postTenantInfo');
		// console.log(doc);
		res.json("please check your email to verified");
    });
});

app.get('/delTenantInfo', function(req,res){
	console.log("inside delTenantInfo");
	
	console.log(req.query.verificationCode);
	dbConnectorInstance.deleteTenantDB(req.query.verificationCode, function(docs){
		console.log("finished deleteTenantDB");
		console.log(docs.n);
		if (docs.n){
			res.json("deletion success");
		}else{
			res.json("not in db or already deleted");
		}
		
	});
});

app.get('/delHouseInfo', function(req,res){
	console.log("inside delHouseInfo");
	console.log(req.query.verificationCode);
	dbConnectorInstance.deleteHouseDB(req.query.verificationCode, function(docs){
		console.log("finished deleteTenantDB");
		if (docs.n){
			res.json("deletion success");
		}else{
			res.json("not in db or already deleted");
		}
	});
});

app.get('/verifyInfo',function(req,res){
	console.log(req.query.verificationCode);
    console.log("I received a verifyInfo GET request");
    dbConnectorInstance.findUnverify(req.query.verificationCode,function(docs){
		console.log("finished findUnverify");
		console.log(docs);
		if (docs == null){
			console.log("empty");
			//req.session['success'] = 'User added successfully';
			//res.redirect('/');
			res.json("You are already verified, if this is an error message please contact us");
			return;
		}else{
			console.log("not empty");
			dbConnectorInstance.insertDB(docs, function(docs){
				console.log("finished insertDB");
			});
    	
			dbConnectorInstance.insertDataMining(docs, function(docs){
				console.log("finished insertDataMining");
			});
			dbConnectorInstance.deleteUnverify(req.query.verificationCode, function(docs){
				console.log("finished deleteUnverify");
			});
			
			res.json("You are verified");
		}
    	
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
