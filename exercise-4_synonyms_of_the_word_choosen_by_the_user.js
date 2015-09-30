// need prompt and request libraries
var prompt = require("prompt");
var request = require("request");
var Promise = require("bluebird");


//need to promisify that two libraries
prompt = Promise.promisifyAll(prompt);
request = Promise.promisifyAll(request);

//prompt the user for an english word DON'T FORGET TO START the prompt!!!
prompt.start();
prompt.getAsync('an_english_word').then(
    function(userResponse){
/*use the result of this prompt to request the Big Huge Thesaurus 
for this word 
*/
    return request.getAsync("http://words.bighugelabs.com/api/2/fae5488a3aae2345462928e178ee6a29/"+ userResponse.an_english_word + "/json").then(
        function(dictResponse) {
//with this result, I have to find specifically the synonyms
            var word = dictResponse[0].body;
            var synonyms = JSON.parse(word);
            
//then console.log the result
            if (synonyms.noun && synonyms.noun.syn) {
                console.log("Noun synonyms:");
                console.log(synonyms.noun.syn.join(", "));
            }
            if (synonyms.verb && synonyms.verb.syn) {
                console.log("Verb synonyms:");
                console.log(synonyms.verb.syn.join(", "));
            } 
            if (synonyms.adjective && synonyms.adjective.syn) {
                console.log("Adjective synonyms:");
                console.log(synonyms.adjective.syn.join(", "));
            }
            if (synonyms.adverb && synonyms.adverb.syn) {
                console.log("Adverb synonyms:");
                console.log(synonyms.adverb.syn.join(", "));
            }
            
        });
    });





