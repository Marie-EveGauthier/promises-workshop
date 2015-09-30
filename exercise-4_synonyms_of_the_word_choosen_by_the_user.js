// need prompt and request libraries
var prompt = require("prompt");
var request = require("request");
var Promise = require("bluebird");
var colors = require("colors");

//need to promisify that two libraries
prompt = Promise.promisifyAll(prompt);
request = Promise.promisifyAll(request);

//prompt the user for an english word and DON'T FORGET TO START the prompt!!!
prompt.start();

prompt.getAsync("an_english_word").then(
    function(userResponse){
//Using English Word, Query the Dictionary
        request.getAsync("http://words.bighugelabs.com/api/2/fae5488a3aae2345462928e178ee6a29/"+ userResponse.an_english_word + "/json").then(
            function(dictResponse) {
//Catch the error if it's not a valid word
                try {
                    var synonyms = JSON.parse(dictResponse[0].body);
    //then console.log the result
                    if (synonyms.noun && synonyms.noun.syn) {
                        console.log("Noun synonyms:".underline.bold.bgMagenta);
                        console.log(synonyms.noun.syn.join(", ").magenta);
                    }
                    if (synonyms.verb && synonyms.verb.syn) {
                        console.log("Verb synonyms:".underline.bold.bgBlue);
                        console.log(synonyms.verb.syn.join(", ").blue);
                    } 
                    if (synonyms.adjective && synonyms.adjective.syn) {
                        console.log("Adjective synonyms:".underline.bold.bgGreen);
                        console.log(synonyms.adjective.syn.join(", ").green);
                    }
                    if (synonyms.adverb && synonyms.adverb.syn) {
                        console.log("Adverb synonyms:".underline.bold.bgCyan);
                        console.log(synonyms.adverb.syn.join(", ").cyan);
                    }                    
                        
                } catch (SyntaxError) {
                    console.log("Please re-run this program because: " + SyntaxError.message);
                }
            });
      
        });






