const express = require('express')
const path = require('path');
const app = express()
const port = 5000
const cors = require("cors");

app.use(cors());



//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/subreddits', require('./routes/api/subreddits'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})