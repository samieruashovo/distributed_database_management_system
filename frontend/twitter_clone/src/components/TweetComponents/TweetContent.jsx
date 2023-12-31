import React, { useState } from "react";
import { AiFillUnlock } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import { editTweet } from "../../redux/asyncActions/TweetAsync";
import Viewer from "react-viewer";
import { FaLock } from "react-icons/fa";
import Moment from "moment";
export const TweetContent = ({
  id,
  dispatch,
  tweet,
  editTitle,
  setEditTitle,
  edit,
  setEdit,
}) => {
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const sendEditPost = () => {
    dispatch(editTweet(id, editTitle, isChecked));
    setEdit(false);
  };
  return (
    <div className="tweet-content">
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
         

          <span className="mx-2 side-name">
            @ {tweet.username} |
           
            <span className="mx-1">{Moment(tweet.created).fromNow(true)}</span>
            {tweet.is_private ? <FaLock /> : <BiGlobe />}
          </span>
        </span>
      </div>
      <p>
        {edit ? (
          <>
            <textarea
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="editArea"
            ></textarea>
            <br />
            <span>
              Private
              <input
                className="mx-1"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span className="mx-4" style={{ color: "gray" }}>
                {isChecked ? (
                  <span>
                    will be private <AiFillUnlock />
                  </span>
                ) : (
                  <span>
                    Will be public <BiGlobe />
                  </span>
                )}
              </span>
            </span>
            <button onClick={sendEditPost} className="btn btn-primary">
              Edit
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <p>
          {tweet.title }
          <br/>
          <br/>

         {tweet.body}
         </p>
        )}
      </p>
      {tweet.profile_pic && (
        <img
          onClick={() => setVisible(true)}
          alt="img"
          src={tweet.profile_pic}
          className="image"
        />
      )}
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={[{ src: tweet.profile_pic, alt: "img" }]}
      />
    </div>
  );
};
