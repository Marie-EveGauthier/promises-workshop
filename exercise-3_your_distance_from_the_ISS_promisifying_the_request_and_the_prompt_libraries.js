var request = require("request");
var prompt = require("prompt");
var Promise = require("bluebird");

request = Promise.promisifyAll(request);
prompt = Promise.promisifyAll(prompt);

var userLat = 0;
var userLng = 0;

prompt.start();

    // Step 1 : Get Location From User
    prompt.getAsync("your_location").then(
        function(aaa) {
            // Step 2 : Get User Position from Google API
            return request.getAsync('https://maps.googleapis.com/maps/api/geocode/json?address=' + aaa.your_location);
        }).then(
        function(response) {
            // Step 3 : Get the latitude and the longitude of the user
            var data = JSON.parse(response[0].body);
            return data.results[0].geometry.location;
        }).then( 
                
                function(userPosition) {

                   userLat = userPosition.lat;
                   userLng = userPosition.lng;
                 // Step 4  : Get the ISS position 
                    request.getAsync('http://api.open-notify.org/iss-now.json').then(
                    function(responseIss) {
                        var issLatAndLong = JSON.parse(responseIss[0].body);
                        var issLatitude = issLatAndLong.iss_position.latitude;
                        var issLongitude = issLatAndLong.iss_position.longitude;
                        console.log("You are at " + distance(userLat, userLng, issLatitude, issLongitude) + " km from the Iss");
                    });
            }).catch(function(err) {
    console.error(err);
});
            
//Step 5 : Calculate the distance between the user latitude and longitude and the Iss latitude and longitud

function distance(userLatitude, userLongitude, issLat, issLng) {
var R = 6371000; // metres
var φ1 = userLatitude.toRadians();
var φ2 = issLat.toRadians();
var Δφ = (issLat-userLatitude).toRadians();
var Δλ = (issLng-userLongitude).toRadians();

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

