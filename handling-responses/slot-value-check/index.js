// 1. Text strings
const slotName = 'Item';


// 2. Skill Code
const Alexa = require('alexa-sdk');

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);

  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit(':ask', 'try saying an utterance with a slot value to test this.');
  },
  'Unhandled': function() {
    let speechOutput;
    const intent = this.event.request.intent.name;

    const slotValue = isSlotValid(this.event.request, slotName);
    if (slotValue) {
      speechOutput = 'Intent ' + intent + ', slot ' + slotName + ', is ' + slotValue;
    } else {
      speechOutput = 'Intent ' + intent + ', did not get a value for ' + slotName;
    }
    this.emit(':tell', speechOutput);

  }
};

// 3. Helper Function
function isSlotValid(request, slotName) {
  const slot = request.intent.slots[slotName];
  let slotValue;

  if (slot && slot.value) {
    slotValue = slot.value.toLowerCase();
    return slotValue;
  } else {
    return false;
  }
}
