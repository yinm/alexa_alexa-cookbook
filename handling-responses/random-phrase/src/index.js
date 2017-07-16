// 1. Text Strings
const myRequest = ['hello', 'howdy', 'hi', 'good day'];


// 2. Skill Code
const Alexa = require('alexa-sdk');
exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);

  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('MyIntent');
  },

  'MyIntent': function() {
    this.emit(':tell', 'the welcome message is, ' + randomPhrase(myRequest));
  }
};


// 3. Helper Function

/**
 * @param myData array
 * @returns string
 */
function randomPhrase(myData) {
  let i = Math.floor(Math.random() * myData.length);

  return(myData[i]);
}
