import React from 'react';

import './InfoBar.css';

const InfoBar = () => {
  <div className="inforBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online image" />
      <h3></h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close image" /></a>
    </div>
  </div>
}

export default InfoBar;