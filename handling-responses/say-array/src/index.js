// 1. Text strings
const myRequest = ['apples', 'oranges', 'strawberries'];


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
    this.emit(':tell',
            'the list contains ' + sayArray(myRequest, 'and')
            +
            '. please choose either ' + sayArray(myRequest, 'or')
    );
  }
};


// 3. Helper Function
function sayArray(myData, andor) {
  let listString = '';

  if (myData.length == 1) {
    listString = myData[0];
  } else {
    if (myData.length == 2) {
      listString = myData[0] + ' ' + andor + ' ' + myData[1];
    } else {

      for (let i = 0; i < myData.length; i++) {
        if (i < myData.length - 2) {
          listString = listString + myData[i] + ', ';
          if (i = myData.length - 2) {
            listString = listString + myData[i] + ', ' + andor + ' ';
          }

        } else {
          listString = listString + myData[i];
        }

      }
    }

  }

  return(listString);
}
