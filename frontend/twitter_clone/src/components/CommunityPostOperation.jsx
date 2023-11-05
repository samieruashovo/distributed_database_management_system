import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Heart from "../GooberStyled/TwitterHeart";
// import Heart from "react-heart"
import {
  bookmarkPost,
  deletePost,
  rePost,
} from "../redux/asyncActions/PostAsync";
import { addPostComment } from "../redux/asyncActions/CommentAsync";
import AddPicker from "./SmallComponent/AddPicker";
import { colors } from "@material-ui/core";
import axios from "axios";

export const CommunityPostOperation = ({
  username,
  liked,
  id,
  oriId = null,
  rePost = false,
  likePostD,
  like_count,
  comid = null,
  reply,
  comment_count = null,
  NoRePostMark = false,
}) => {
  const [isclicked, setClick] = useState(null);
  const dispatch = useDispatch();
  const [comId, setComId] = useState(null);
  const [bookmarked, setBookmarked] = useState(null);
  const [commentInput, setCommentInput] = useState();
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;

  useEffect(() => {
    setClick(liked);

    // setBookmarked(bookmark);
  }, [liked]);

  const setId = (ia) => {
    setComId(ia);
  };

  const commentAdd = (ia) => {
    // console.log("post running commentAdd");
    dispatch(addPostComment(ia, commentInput, comid, reply));
    setCommentInput("");
    setComId(null);
  };
  const sendRePost = (ia) => {
    dispatch(rePost(ia));
  };
  const alertToLog = () => {
    alert("You have to be logged in for this !");
  };
  if (isAuthenticated) {
    return (
      <div className="tweet-bottom-active">
        <i
          data-toggle="tooltip"
          title="Add Reply"
          className="tweetIcons d-flex justify-content-center align-items-center"
          onClick={() => setId(id)}
        >
          <AiOutlineComment data-toggle="modal" data-target="#what" />

          {/* <span className="side-name mx-1">{comment_count}</span> */}
        </i>

        {comId && (
          <div
            className="modal fade"
            id="what"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="what"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content modal-custom-css">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Add Comment
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    type="text"
                    name="text"
                    placeholder="add Comment"
                    className="inputTag"
                    autoFocus
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <AddPicker
                    classNem="picker-comment"
                    setInput={setCommentInput}
                  />

                  <button
                    onClick={() => commentAdd(comId)}
                    type="button"
                    className="link-tweet outline"
                    data-dismiss="modal"
                  >
                    Add Reply
                  </button>
                  <button
                    onClick={() => setComId(null)}
                    type="button"
                    className="link-tweet"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {NoRepostMark ? null : repost ? (
          <i
            data-toggle="tooltip"
            title="Remove reTweet"
            className="tweetIcons"
          >
            <AiOutlineRetweet
              color="lightgreen"
              onClick={() => dispatch(deleteTweet(oriId, true))}
            />
          </i>
        ) : <div></div>
        // (
        //   <i data-toggle="tooltip" title="Re- Tweet" className="tweetIcons">
        //     <AiOutlineRetweet onClick={() => sendReTweet(id)} />
        //   </i>
        // )
        } */}
        <i className="tweetIcons heart-parent">
          <AiOutlineLike
            isclicked={isclicked ? 1 : 0}
            onClick={() => {
              setClick(!isclicked);
              likePostD(id);
            }}
            style={{ color: liked ? "red" : "" }}
          />
          <span className="side-name mx-1">Like disabled</span>

          {/* {oriId ? "" : <span className="count">{like_count}</span>} */}
          {/* <span className="count">{like_count}</span> */}
        </i>
        {/* {NoRepostMark ? null : bookmarked ? (
          <i
            data-html="true"
            data-toggle="tooltip"
            title="Bookmark"
            data-placement="up"
            className="tweetIcons pointer"
          >
            <FiShare color="lightgreen" onClick={() => onBookmark(id)} />
          </i>
        ) : (
          <i
            data-toggle="tooltip"
            title="Bookmark!"
            className="tweetIcons pointer"
          >
            <FiShare onClick={() => onBookmark(id)} />
          </i>
        )} */}
      </div>
    );
  } else {
    return (
      <div className="tweet-bottom-active">
        <i data-toggle="tooltip" title="Add Reply" className="tweetIcons">
          <AiOutlineComment onClick={alertToLog} />
        </i>
        {/* <i data-toggle="tooltip" title=" reTweet" className="tweetIcons">
          <AiOutlineReTweet onClick={alertToLog} />
        </i> */}
        <i className="tweetIcons heart-parent">
          <Heart onClick={alertToLog} />

          <span className="count">{like_count}</span>
        </i>
        <i
          data-html="true"
          data-toggle="tooltip"
          title="Bookmark"
          data-placement="up"
          className="tweetIcons pointer"
        >
          <FiShare onClick={alertToLog} />
        </i>
      </div>
    );
  }
};
CommunityPostOperation.propTypes = {
  liked: PropTypes.bool,
  id: PropTypes.number,
  likePostD: PropTypes.func,
  like_count: PropTypes.number,
};
