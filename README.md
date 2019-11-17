# Real Time Chat Application

- A chat application where a user can enter a specific chat room using his or her id.

- We are using socket.io and node for backend and for front end we are using react.

- 

## Join instance

- when user join a connection event will fire up
- when user join a disconnection event will fire up
- we are using react hooks
- we can use state and lifeCycle method inside hook at the same timeon Link we are not transferring data with props or using redux we are going to pass data through url or as string


## Chat instance

- we are using hooks, socket and useEffect(life cycle method)

- **useEffect** is a hook it is similar to **componentDidMount** and also **componentDidUpdate**. So using just only useEffect is enough to declare two methods. 

- in our chat first thing will happen 
  - 1. retrive data while joining 
  - 2. we define the endpoints on socket
  - 3. we specify socket connection
  - 4. pass data from front end to back end or server by emiting data 


## Server Side

- specify **express** configuration

- 

- a basic instace for server side socket connection 
```js 
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
```