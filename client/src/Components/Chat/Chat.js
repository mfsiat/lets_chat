import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

// location comes from react router
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';
  // it will run when the component renders
  // first retrive the data while joining
  // we are passing in our location search data
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // passing a data to server or backend 
    socket.emit('join', {name, room});
    
  }, [ENDPOINT, location.search]);
  return (
    <h1>Chat</h1>
  );
};

export default Chat;
