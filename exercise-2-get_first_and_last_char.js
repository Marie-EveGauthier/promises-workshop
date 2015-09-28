var Promise = require('bluebird');

function delay(milliseconds) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, milliseconds);        
    });    
}


/*  Create a function that takes a string and return the delay promise
* that will be resolved with the first character of the string 
* after 500 milliseconds
*/
function getFirstChar(aString) {
    return delay(500).then(
        function(){
            return aString[0];
        }        
    );
}

//testing function getFirstChar
getFirstChar("hello").then(
    function(firstChar) {
        console.log(firstChar);
    }
);


/*  Create a function that takes a string and return the delay promise
* that will be resolved with the last character of the string 
* after 500 milliseconds
*/
function getLastChar(aString) {
    return delay(500).then(
        function() {
            return aString[aString.length - 1];
        }
    );
}

//testing the function getLastChar
getLastChar("hello").then(
    function(lastChar) {
        console.log(lastChar);
    }    
);

/*Create a function that takes a string and return a Promise 
* that will be resolved with the first and last character of the
* passed string. This function should use getFirstChar and 
* getLastChar in sequence
*/
function getFirstAndLastCharSeq(aString) {
    var firstChar;
    return getFirstChar(aString).then(
        function(_firstChar) {
            firstChar = _firstChar;
            return getLastChar(aString);
        }
    ).then(
        function(lastChar) {
            return firstChar + lastChar;
        }
    );
}

// testing function getFirstAndLastCharSeq
getFirstAndLastCharSeq("hello").then(
    function(firstLast) {
        console.log(firstLast);
    }
);

/* Create a function that takes a string a returns a Promise that will
* be resolved with the first and last character of the passed string.
*This function should use getFirstChar and getLastChar in parallel,
*using the Promise.join functionality of the Bluebird library.
*/
function getFirstAndLastCharParallel(aString) {
    var firstCharPromise = getFirstChar(aString);
    var lastCharPromise = getLastChar(aString);
    return Promise.join(firstCharPromise, lastCharPromise, function(firstChar, lastChar) {
        return firstChar + lastChar;
    });
}

//testing function getFirstAndLastCharParallel
getFirstAndLastCharParallel("hello").then(
    function(firsLast) {
    console.log(firsLast);
    }
);
