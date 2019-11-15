// 1. when user join a connection event will fire up
// 2. when user join a disconnection event will fire up
// 3. we are using react hooks
// we can use state and lifeCycle method inside hook at the same time
// on Link we are not transferring data with props or using redux
// we are going to pass data through url or as string

import React, { useState } from "react";
import { Link } from "react-router-dom";

// function based component
const Join = () => {
  // delcaring hooks
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOUterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={event => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
