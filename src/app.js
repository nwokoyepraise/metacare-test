'use-strict'
require('dotenv').config()
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const portNumber = process.env.PORT || process.env.PORT_NUMBER;
const home = require('./routes/home')

//use and set express middleware
app.use(express.json({ limit: '20kb' }));


//load routes
app.use('', home);

server.listen(portNumber, function () {
    console.log(`server listening on port ${portNumber}`);
});