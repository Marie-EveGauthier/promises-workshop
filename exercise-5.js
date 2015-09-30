// Get the request library and promisifying it
var request = require("request");
var Promise = require("bluebird");
var colors = require("colors");

request = Promise.promisifyAll(request);
//get a list of 5 random words with wordnik API Documentation 

request.getAsync("http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5").then(
    function (fiveWords) {
        try {
            fiveWords = JSON.parse(fiveWords[0].body);
        } catch (SyntaxError){
            console.log("There is a SyntaxError");
            
        }
        var words = [];
        fiveWords.map(function(OneOfFiveWords) {
            if (OneOfFiveWords.word) {
                words.push(OneOfFiveWords.word);
            }
        });
        
       // console.log(words);
        words.map(function(word) {
            request.getAsync("http://words.bighugelabs.com/api/2/fae5488a3aae2345462928e178ee6a29/"+ word + "/json").then(
                function(synonyms) {
                    
                    //console.log(synonyms[0]);
                    synonyms = synonyms[0].body;

                        try{
                            synonyms=JSON.parse(synonyms);
                            console.log("The synonyms of " + word.bold.cyan + " are: " + synonyms.noun.syn + '\n\n');
                        } catch (SyntaxError) {
                            console.log("Sorry! There are not synonyms for " + word.italic.yellow + '\n\n');
                        }
                     
                });
        });
    })
    