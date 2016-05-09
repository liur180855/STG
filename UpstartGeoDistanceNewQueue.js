/********************************************************************************
 * Overview:   	This file contains functions to get geoLocation, 
 *              calculate distance and create bounding box 
 *				        
 * Created:     Feb.10, 2016
 * Creator:     Stephanie Zeng
 ********************************************************************************/
var UPSTART_INVALID_GEO = 0;  //put costant all together at the begining 
var geocoder = new google.maps.Geocoder();

var UpstartGeoDistance = function () {
	// Assign our variables
	this.newQueue = function(){};
	this.newQueue.prototype = Object.create(UpstartQueue.prototype);
	this.overQueryLimitStatus = false;
	//this.geocoder = function(){};
	//this.geocoder.prototype = Object.create(google.maps.Geocoder.prototype);
}
/**
 * Find the latitudes and longtitudes for the target point.                                                         
 *                                    
 * @param {string}    strStreet Street address input.
 * @param {string}    strCity City input.
 * @param {string}    strState State input. 
 * @param {string}    strAttempt Time to attempt retry.
 * @param {number}    nZipCode Zipcode input.
 * @param {function}  fnCallback Callback function.
 * @param {object}    oRetries Retry times.

 * @return {function} fnCallback Store latitudes and longtitudes for the target point.                                                            
 */
UpstartGeoDistance.prototype.getGeoLocation = function (strStreet,strCity,strState,nZipCode,fnCallback, strAttempt, oRetries) {
	/*
	if (this.overQueryLimitStatus == true){
		this.newQueue.prototype.enqueue({strStreetID,strCityID,strStateID,nZipCodeID,fnCallback, strAttempt, oRetries});
		return false;
	}*/
	if(typeof oRetries == "undefined") oRetries = {n: 10};
	if(strAttempt==null) {}
	//var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': strStreet + strCity + strState + nZipCode}, function(results, status) {  

		if (status === google.maps.GeocoderStatus.OK) {
			
			// Status: ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE.
			// Check if Google map read the right address.
			//var validAddress = checkAddress(results,strCity, strState, nZipCode);			
			
			//if(validAddress){
				var nLatitude  = results[0].geometry.location.lat();
				var nLongitude = results[0].geometry.location.lng();
			//}
			
			fnCallback(nLatitude,nLongitude);
			return true;
		} 
		
		//Indicates that the geocode was successful but returned no results. 
		//This may occur if the geocoder was passed a non-existent address.
		else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
			//console.log("ZERO_RESULTS");
			fnCallback(UPSTART_INVALID_GEO,UPSTART_INVALID_GEO);
		} 
		
		//Indicates that you are over your quota.
		else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
			this.overQueryLimitStatus = true;
			oRetries.n -= 1;
			if(oRetries.n==0) {
				fnCallback(UPSTART_INVALID_GEO,UPSTART_INVALID_GEO);
			}
			else {
				setTimeout( function() {UpstartGeoDistance.prototype.getGeoLocation(strStreet,strCity, strState, nZipCode, fnCallback, null, oRetries);}, 1000);
			}
		} 
		
		//Indicates that your request was denied.
		else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
			fnCallback(UPSTART_INVALID_GEO,UPSTART_INVALID_GEO);
		} 
		
		//Generally indicates that the query (address, components or latlng) is missing.
		else if (status === google.maps.GeocoderStatus.INVALID_REQUEST){
			fnCallback(UPSTART_INVALID_GEO,UPSTART_INVALID_GEO);
		} 
		
		//Indicates that the request could not be processed due to a server error. 
		//The request may succeed if you try again.
		else if (status === google.maps.GeocoderStatus.UNKNOWN_ERROR){
			fnCallback(UPSTART_INVALID_GEO,UPSTART_INVALID_GEO);
		}
	});
}






/**
 * Check if Google Map API return the right address.                                                         
 *   
 * @param {array}    results Address recognized by Google Map.
 * @param {string}   strCity City input.
 * @param {string}   strState State input. 
 * @param {number}   nZipCode Zipcode input.
 *
 * @return {boolean} True for valid address and false for invalid address.                                                 
 */
function checkAddress (results,strCity, strState, nZipCode){
    var bZipCodeCheck;
    var bCityCheck;
    var bStateCheck;
	for(var i = 0; i < results[0].address_components.length;i++){
		
		if(results[0].address_components[i].short_name == nZipCode){
			bZipCodeCheck = true;  
		}
		if(results[0].address_components[i].short_name == strCity){
			bCityCheck = true; 
		}
		if(results[0].address_components[i].short_name == strState){
			bStateCheck = true; 
		}
		
	}
	
	if (bZipCodeCheck && bCityCheck && bStateCheck) {
		return true;
	} else{
		return false;
	}
}
	   
 var UPSTART_DISTANCE_UNIT_MILES              = 0;        
 var UPSTART_DISTANCE_UNIT_KM                 = 1;
 var UPSTART_DISTANCE_UNIT_STATUTE_MILES      = 2;
 
 var UPSTART_STATUTE_MILES_TO_NAUTICAL_MILE   = 0.8684;
 var UPSTART_STATUTE_MILES_TO_KILOMETERS      = 1.609344;
 
 
/**  
 *    Get the distance for two points.                                                  
 *                                                        
 *    @param {number} nlat1, nlon1 Latitude and Longitude of point 1 (in decimal degrees).  
 *    @param {number} nlat2, nlon2 Latitude and Longitude of point 2 (in decimal degrees).
 *    @param {number} nUnit        The unit you desire for results                             
 *           where: 'M' is statute miles                         
 *                  'K' is kilometers                                  
 *                  'N' is nautical miles.    
 *    Resource:https://www.geodatasource.com/developers/javascript                            
 */
function getDistance(nLon1,nLat1, nLon2, nLat2,  nUnits) {

	if(typeof nUnits == "undefined"){
		nUnits = UPSTART_DISTANCE_UNIT_MILES;
	} 

	var nRadlat1  = Math.PI * nLat1/180;
	var nRradlat2 = Math.PI * nLat2/180;
	
	var nTheta    = nLon1-nLon2;
	var nRadtheta = Math.PI * nTheta/180;
	var nDistance = Math.sin(nRadlat1) * Math.sin(nRradlat2) + Math.cos(nRadlat1) * Math.cos(nRradlat2) * Math.cos(nRadtheta);
	nDistance     = Math.acos(nDistance);
	nDistance     = nDistance * 180/Math.PI;
	nDistance     = nDistance * 60 * 1.1515;

	// Convert to the proper coordinate system.
	switch(nUnits) {
		case UPSTART_DISTANCE_UNIT_MILES:{
			nDistance = nDistance * UPSTART_STATUTE_MILES_TO_NAUTICAL_MILE;
		} break;
		case UPSTART_DISTANCE_UNIT_KM:{
			nDistance = nDistance * UPSTART_STATUTE_MILES_TO_KILOMETERS;
		} break;
		case UPSTART_DISTANCE_UNIT_STATUTE_MILES:{
			nDistance = nDistance;
		}
	}
	
    // Return the distance result.
	return nDistance;
}


var UPSTART_NAUTICAL_MILE_TO_STATUTE_MILES = 1.151;
var UPSTART_KM_TO_STATUTE_MILES = 0.62137;
var UPSTART_DEGREE_TO_RADIUS = 0.0174533;

var UPSTART_EARTH_RADIANS = 3959; //Unit:miles

/**
 *  Converting geographic coordinate system to Catism coordinate system.
 *  Formula from:Gall-Peters projection:https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection
 *                                                
 *  @param {number} nLat Latitude of driver's location.     
 *  @param {number} nLng Longtitude of driver's location.  
 * 
 */
function geoGraphicToCartism(nLat, nLon, fnCallback) {
    var nLonToX = (UPSTART_EARTH_RADIANS * nLon * UPSTART_DEGREE_TO_RADIUS) / Math.sqrt(2);
    var nLatToY = UPSTART_EARTH_RADIANS * Math.sqrt(2) * Math.sin(nLat * UPSTART_DEGREE_TO_RADIUS);
    fnCallback(nLonToX, nLatToY);

}

var nAdjustNum = 1.15;
/**
 *  Creating bounding box for the location.  
 *                                                
 *  @param {number} nLonToX X coordinate for longtitude.     
 *  @param {number} nLatToY Y coordinate of latitude. 
 *  @param {number} nRange Ideal range for two points.           
 *
 *  @return {array} The array contains [nTopLeftLngX, nTopLeftLatY, nBottomRightLngX, nBottomRightLatY].  
 */

function createBoudingBox(nLonToX, nLatToY, nRange) {
    var nHalfSize = nRange * nAdjustNum;
    var nTopLeftLngX     = nLonToX - nHalfSize;
    var nTopLeftLatY     = nLatToY + nHalfSize;
    var nBottomRightLngX = nLonToX + nHalfSize;
    var nBottomRightLatY = nLatToY - nHalfSize;

    return [nTopLeftLngX, nTopLeftLatY, nBottomRightLngX, nBottomRightLatY];
        
}

module.exports = {
  foo: function () {
    // whatever
  },
  bar: function () {
    // whatever
  }
};