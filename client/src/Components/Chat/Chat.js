import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import TextContainer from '../TextContainer/TextContainer';


import './Chat.css';

let socket;



// location comes from react router
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState(''); // for every single message
  const [messages, setMessages] = useState([]); // for all messages 

  const ENDPOINT = 'https://mfsiat-rchat.herokuapp.com/';
  // it will run when the component renders
  // first retrive the data while joining
  // we are passing in our location search data
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    // passing a data to server or backend 
    // we are calling join event which is specified on server io connection
    socket.emit('join', {name, room}, () => {

    });

    return () => {
      socket.emit('disconnect'); // calling the event which was specified on server side

      socket.off();
    }
    
  }, [ENDPOINT, location.search]);

  // creating another useEffect for handling messages 
  // whenever an emit event message triggers then for every message send by the admin 
  // every single message will be pushed inside the setMessages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]); 
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })


  }, [messages]);

  // function for sending messages 
  // firing up this function calls for the emit listener 'sendMessage' 
  const sendMessage = (event) => {
    event.preventDefault(); // preventing full browser refresh 

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users ={users} />
    </div>
  );
};

export default Chat;
