import React, { useEffect } from "react";
// import "emoji-mart/css/emoji-mart.css";
import { useSelector, useDispatch } from "react-redux";
import { load_post } from "../../redux/asyncActions/TweetAsync";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import TweetPostCard from "./TweetPostCard";
import CommunityPostCard from "./CommunityPostCard";

const PostCard = () => {
  const postInfo = useSelector((state) => state.postReducer);
  const userIn = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { user } = userIn;

  useEffect(() => {
    dispatch(load_post());
  }, [dispatch]);

  return (
    <>
      {!postInfo.isLoading && postInfo.posts.length === 0 && (
        <div className="mt-3 d-flex justify-content-center">
          <span>
            <p className="side-name">Follow User to see their post</p>
            <Link to="/explore">
              {" "}
              <button className="ml-4 link-tweet">Go To Explore</button>
            </Link>
          </span>
        </div>
      )}
      {postInfo && postInfo.isLoading ? (
        <span className="d-flex justify-content-center mt-4">
          <ClipLoader color="#f44" loading={true} size={23} />
        </span>
      ) : (
        postInfo.posts.map((post) => (
          <>
          <CommunityPostCard
            user={user}
            dispatch={dispatch}
            tweet={post}
            key={post.uuid}
          />
          </>
        ))
      )}
    </>
  );
};

export default PostCard;
