
// Register module/require aliases
require('module-alias/register');


// Patches
const {inject, errorHandler} = require('express-custom-error');
inject(); // Patch express in order to use async / await syntax

// Require Dependencies

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http').createServer();
const io = require('socket.io')(http);


const logger = require('@util/logger');

// Load .env Enviroment Variables to process.env

require('mandatoryenv').load([
    'DB_URL',
    'PORT',
    'SECRET_KEY'
]);

const { PORT } = process.env;


// Instantiate an Express Application
const app = express();


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Assign Routes

app.use('/', require('@routes/router.js'));


// Handle errors
app.use((err, req, res, next) => { // Print errors (if any)
    if(err)
        console.error("Error: ", err);
    next();
});
app.use(errorHandler()); // Respond to errors

// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
});

// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);

http.listen(3001, function(){
    console.log('listening on *:3001');
});

io.on('connection', socket => {
    console.log('new user');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});
