const express = require('express')
const path = require('path');
const text = require('./twilio');
const app = express()
const port = 5000
const cors = require("cors");

app.use(cors());



//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/subreddits', require('./routes/api/subreddits'));

//Post Route for Twilio Notifications
app.post("/", function(req, res) {
  text.sendText(req.body.subreddit);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})