// 1. Text strings
const myRequest = 'New Jersey';


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
    httpGet(myRequest, (myResult) => {
      console.log('sent     : ' + myRequest);
      console.log('received : ' + myResult);

      this.emit(':tell', 'The population of ' + myRequest + ' is ' + myResult);
    });
  }
};


// 3. Helper Function
const https = require('https');

function httpGet(myData, callback) {
  const options = {
    host: 'cp6gckjt97.execute-api.us-east-1.amazonaws.com',
    port: 443,
    path: '/prod/stateresource?usstate=' + encodeURIComponent(myData),
    method: 'GET',
  };

  const req = https.request(options, res => {
    res.setEncoding('utf8');
    let returnData = '';

    res.on('data', chunk => {
      returnData = returnData + chunk;
    });

    res.on('end', () => {
      const pop = JSON.parse(returnData).population;
      callback(pop);
    });
  });

  req.end();
}