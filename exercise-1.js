var Promise = require('bluebird');

var delay = function(milliseconds) {
    return new Promise (function(resolve) {
        setTimeout(resolve, milliseconds);
    });    
};

delay(1000).then(
    function() {
        console.log("ONE");
        return delay(1000); 
    }
).then (
    function() {
        console.log("TWO");
        return delay(1000);
    }
).then(
    function() {
        console.log("THREE");
        return delay(1000);
    }
).then(
    function() {
        console.log("...LIFTOFF!");
    }
);
