// creating the server 
// declaring the const variables 
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// declare the port
const PORT = process.env.PORT || 5000;

const app = express();

// init server 
const server = http.createServer(app);
const io = socketio(server);

// run the server 
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
