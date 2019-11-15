// 1. when user join a connection event will fire up
// 2. when user join a disconnection event will fire up
// 3. we are using react hooks
// we can use state and lifeCycle method inside hook at the same time

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
          <iinput
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <iinput
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={}
          />
        </div>
        <Link>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
