// creating the server
// declaring the const variables
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

// declare the port
const PORT = process.env.PORT || 5000;

// part 2, we need to require the router that we created 
const router = require('./router');

const app = express();

// init server
const server = http.createServer(app);
const io = socketio(server);


// creating jus a simple connection
io.on('connection', (socket) => {
  console.log('We have a new connection!!');

  socket.on('join', ({name, room}) => {
    console.log(name, room);
  })

  socket.on('disconnect', () => {
    console.log('User had left!!!');
  })
});

// call it as middleware 
app.use(router);

// run the server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// part 1 Done so far  

