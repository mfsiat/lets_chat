// creating the server
// declaring the const variables
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

// declare the port
const PORT = process.env.PORT || 5000;

// part 2, we need to require the router that we created
const router = require("./router");

const app = express();

// init server
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

// creating jus a simple connection
// socket.id will gen auto id and rest will be given by user to addUser()
io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // for admin messages or welcome the user with the room name
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });
    // telling everyone else that someone user.name hase joined
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) } )

    callback();
  });
  // user generated message
  // emit happens on front end and after this sendMessage we are 
  // emitting those front end events
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    // we are emitting message and our payload is the message and username
    io.to(user.room).emit('message', {user: user.name, text: message});
    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

    // for after the message send 
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if(user){
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
    }
  });
});

// call it as middleware
app.use(router);

// run the server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// part 1 Done so far
