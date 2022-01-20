'use-strict'
require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const portNumber = process.env.PORT || process.env.PORT_NUMBER || 3000;
const home = require('./routes/home');
const movieList = require('./routes/movieList');
const characterList = require('./routes/characterList');
const comment = require('./routes/comment');

//use and set express middleware
app.use(express.json({ limit: '20kb' }));


//load routes
app.use('', home);
app.use('/api/movies/list', movieList);
app.use('/api/characters/list', characterList)
app.use('/api/comment', comment);

server.listen(portNumber, function () {
    console.log(`server listening on port ${portNumber}`);
});