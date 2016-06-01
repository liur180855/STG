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
    	//console.log(req.query);
        console.log(docs);
		callback(docs);
    });
}

dbConnector.prototype.findTenantDB = function(callback){
	this.tenantDB.tenantDB.find(function(err1,docs){
    	//console.log(req.query);
        console.log(docs);
		callback(docs);
    });
}

dbConnector.prototype.insertTenantDB = function(data,callback){
	this.tenantDB.tenantDB.insert(data,function(err1,docs){
		callback(docs);
    });
}

dbConnector.prototype.insertUnverify = function(data,callback){
	//console.log(data);
	this.unverify.unverify.insert(data,function(err1,docs){
    	//console.log(req.query);
        //console.log(docs);
		callback(docs);
    });
}
dbConnector.prototype.findUnverify = function(verificationCode,callback){
	//console.log(data);
	this.unverify.unverify.find({ "_id": new ObjectId(verificationCode)} ,function(err1,docs){
    	//console.log(req.query);
        //console.log(docs);
		callback(docs);
    });
    this.unverify.unverify.find(function(err1,docs){
    	//console.log(req.query);
        //console.log(docs);
		console.log(docs);
    });
}
dbConnector.prototype.deleteUnverify = function(verificationCode,callback){
	//console.log(data);
	this.unverify.unverify.remove({ "_id": new ObjectId(verificationCode)});
}

dbConnector.prototype.insertDataMining = function(callback){
	this.HouseDB.HouseDB.find(function(err1,docs){
    	//console.log(req.query);
        console.log(docs);
		callback(docs);
    });
}
module.exports =dbConnector;