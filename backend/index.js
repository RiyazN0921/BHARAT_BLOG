const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const { dbConnection } = require('./config/db.config');
const port = process.env.PORT
const app = express();

app.use(bodyParser.json())
app.use('/api/blog', require('./routes/blog'))
app.listen(port, async () => {
    await dbConnection()
    console.log("server listening on port " + port)
})