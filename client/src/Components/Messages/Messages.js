// this will show the messages
// here we are fetching messages from chat.js 
// it is mapped and comming as a component with an index 
// basically we are lopping through the messages 
// it is lopping through as key
// Message willl come with message and the user who is sending like their name
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom>
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
)

export default Messages;