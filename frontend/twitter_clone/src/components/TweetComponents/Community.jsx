import React from "react";
import PostCard from './PostCard';
import AddPost from "./AddPost";

const Community = () => {

  return (
    <> 
    <div class="rounded-box">
     COMMUNITY
    </div>
    <div className="community-container">
    <AddPost/>
    <PostCard />
  </div></>
   
  );
};

export default Community;
