const accountSid = "AC1625662464b58a1b3172a50a5f84f1ae";
const authToken = "75268658d6ff642f68dc0fab8c4e30f9";
const client = require("twilio")(accountSid, authToken);

module.exports = {
  sendMessage
};
function sendMessage() {
  client.messages
    .create({
      body: "Someone has responded to your request for a babysitter!",
      from: "+15162616777",
      to: "+13473304700"
    })
    .then(message => console.log(message.sid));
}
