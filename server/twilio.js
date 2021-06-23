var twilio = require('twilio');
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var cellPhone = process.env.CELL_PHONE;
var twilioNumber = process.env.TWILIO_NUMBER
const sendText = (subreddit) => {





var client = new twilio(accountSid,authToken);

client.messages.create({
    body: `Subreddit: ${subreddit} - https://www.old.reddit.com/r/${subreddit}/new`,
    to:`${process.env.CELL_PHONE}`,
    from:`${process.env.TWILIO_NUMBER}`
})
.then((message) => console.log(message.sid));

};

exports.sendText = sendText;