var request = require("request");
var prompt = require("prompt");
var Promise = require("bluebird");

request = Promise.promisifyAll(request);
prompt = Promise.promisifyAll(prompt);

var userLat = 0;
var userLong = 0;

prompt.start();

// Step 1 : Get Location From User
prompt.getAsync("your_location").then(
    function(location) {
// Step 2 : Get User Position from Google API
        return request.getAsync("https://maps.googleapis.com/maps/api/geocode/json?address=" + location.your_location);
    }).then(
// Step 3 : Get the latitude and the longitude of the user
        function(responseGoogleApi) {
            //testing
            //console.log(responseGoogleApi);
            var data = JSON.parse(responseGoogleApi[0].body);
            return data.results[0].geometry.location;
        }).then( 
            function(userPosition) {
                userLat = userPosition.lat;
                userLong = userPosition.lng;
                // Step 4  : Get the ISS position 
                request.getAsync('http://api.open-notify.org/iss-now.json').then(
                    function(responseIss) {
                        var issPosition = JSON.parse(responseIss[0].body);
                        //testing
                        //console.log(issPosition);
                        var issLat = issPosition.iss_position.latitude;
                        var issLong = issPosition.iss_position.longitude;
                        console.log("You are at " + distance(userLat, userLong, issLat, issLong) + " km from the ISS");
                    });
        }).catch(function(err) {
    console.error(err);
        });
 //Step 5 : Calculate the distance between the user latitude and longitude and the Iss latitude and longitud   

function distance(userLat, userLong, issLat, issLong) {
var R = 6371000; // metres
var φ1 = userLat.toRadians();
var φ2 = issLat.toRadians();
var Δφ = (issLat-userLat).toRadians();
var Δλ = (issLong-userLong).toRadians();

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c; 
               
return (d/1000).toFixed(2);
            

}
Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};
   




