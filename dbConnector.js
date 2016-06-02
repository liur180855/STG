var mongojs=require('mongojs');
var ObjectId = require('mongodb').ObjectID;


function dbConnector(){
	this.HouseDB = mongojs('HouseDB',['HouseDB']);
	this.tenantDB = mongojs('tenantDB',['tenantDB']);
	this.unverify = mongojs('unverify',['unverify']);
	this.dataMining = mongojs('dataMining',['dataMining']);
}

dbConnector.prototype.findAllHouse = function(callback){
	this.HouseDB.HouseDB.find(function(err1,docs){
		if (err1) { console.log(err1); callback(err1); return;}
    	//console.log(req.query);
        console.log(docs);
		callback(docs);
    });
}

dbConnector.prototype.findTenantDB = function(callback){
	this.tenantDB.tenantDB.find(function(err1,docs){
		if (err1) { console.log(err1); callback(err1); return;}
    	//console.log(req.query);
        console.log(docs);
		callback(docs);
    });
}

dbConnector.prototype.insertDB = function(data,callback){
	console.log("inside insertDB");
	console.log(data);
	this.tenantDB.tenantDB.insert(data,function(err1,docs){
		if (err1) { console.log(err1); callback(err1); return;}
		console.log("inside tenantDB");
		callback(docs);
    });
}

dbConnector.prototype.insertUnverify = function(data,datatype,callback){
	data.datatype = datatype;
	console.log(data);
	this.unverify.unverify.insert(data,function(err1,docs){
		if (err1) { console.log(err1); callback(err1); return;}
    	//console.log(req.query);
        //console.log(docs);
		callback(docs);
    });
}
dbConnector.prototype.findUnverify = function(verificationCode,callback){
	//console.log(data);
	this.unverify.unverify.findOne({ "_id": new ObjectId(verificationCode)} ,function(err1,docs){
		console.log("inside findUnverify");
		if (err1) { console.log(err1); callback(err1); return;}
		//if (docs) {
    	//console.log(req.query);
			//console.log(docs);
		callback(docs);
    });
	/*
    this.unverify.unverify.find(function(err1,docs){
    	//console.log(req.query);
        //console.log(docs);
		console.log(docs);
    });
	*/
}
dbConnector.prototype.deleteUnverify = function(verificationCode,callback){
	//console.log(data);
	this.unverify.unverify.remove({ "_id": new ObjectId(verificationCode)},function(err1,docs){
		if (err1) { console.log(err1); callback(err1); return;}
    	//console.log(req.query);
        //console.log(docs);
		callback(docs);
    });
}

dbConnector.prototype.insertDataMining = function(callback){
	this.dataMining.dataMining.insert(function(err1,docs){
		if (err1) { console.log(err1); callback(err1); return;}
		console.log("inside insertDataMining");
    	callback(docs);
    });
}
module.exports =dbConnector;