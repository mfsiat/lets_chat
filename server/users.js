// manages users ( add, delete, track, sing in, sing out )
// will create helper functions 

// array of users 
const users = [];

// takes 3 paremeters
const addUser = ({ id, name, room }) => {
  // we need to trim the white space and etc and make them all lower case 
  // we will be adding them in rooms which will have all lower case name
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // checks for existing user with same username
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name, room };
  // push the user on the array
  users.push(user);

  return { user };
}
// only one parameter
const removeUser = (id) => {
  // try to find user id 
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// exporting all functions 
module.exports = { addUser, removeUser, getUser, getUsersInRoom };

