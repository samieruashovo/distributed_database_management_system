import React from "react";
import Sidebar from "./Sidebar";
import BottomTab from "./TweetComponents/BottomTab";
import TrendBar from "./TweetComponents/TrendBar";


import { Row, Col } from "react-bootstrap";

const Second = (props) => {
  return (
    <>
      <Sidebar />
      <div className="second" id="second" >
        <div className="second-tweet" >
          {props.children}
        </div>
        
        
          <TrendBar />
       
        
      </div>
    </>
  );
  
  
};

export default React.memo(Second);
