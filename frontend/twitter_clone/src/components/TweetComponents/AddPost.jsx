import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import loadingGif from "../../loading.gif"; //
import {
  AiOutlinePicture,
  AiOutlineGif,
  AiOutlineSmile,
  AiOutlineSchedule,
  AiOutlineBarChart,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FaGlobeAfrica, FaLock } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addPost, addTweet } from "../../redux/asyncActions/TweetAsync";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router";

const AddPost = () => {
  const userIn = useSelector((state) => state.userReducer);
  const uploading = useSelector((state) => state.tweetReducer.uploading);
  const [postInput, setPostInput] = useState("");
  const [prevImage, setPrevImage] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const { username } = useParams();
  const dispatch = useDispatch();
  const inputOpenFileRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const { user, isAuthenticated } = userIn;

  useEffect(() => {}, [isAuthenticated]);

  const addEmoji = (emoji) => {
    setPostInput((prev) => prev + emoji.native);
  };

  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };
  const imageChanged = (e) => {
    setPostImage(e.target.files[0]);
    setPrevImage(URL.createObjectURL(e.target.files[0]));
  };

  const postMode = () => {
    // console.log("is private :", isPrivate);
    setIsPrivate(!isPrivate);
  };

  //   const submitTweet = async( event) => {

  //     const jsonData = localStorage.getItem("userData");
  //     const dataObject = JSON.parse(jsonData);
  //     console.log(dataObject);

  // // Step 3: Access the "username" property
  // // const username = dataObject.data.username;
  //     // event.preventDefault();
  //     const uploadData = new FormData();
  //     uploadData.append("username", dataObject.data.username);
  //     uploadData.append("gender", dataObject.data.gender);
  //     console.log("gender"+ dataObject.data.gender)

  //     uploadData.append("title", postInput);
  //     uploadData.append("is_private", isPrivate);
  //     postImage && uploadData.append("image", postImage);
  //     dispatch(addPost(uploadData));
  //     setPrevImage(null);
  //     setPostImage(null);
  //     setPostInput("");
  //     setIsPrivate(false);
  //     // console.log(uploadData)

  //   };

  const submitPost = async (event) => {
    const jsonData = localStorage.getItem("userData");
    const dataObject = JSON.parse(jsonData);
    // console.log(dataObject);
    const uploadData = new FormData();
    uploadData.append("username", dataObject.data.username);
    uploadData.append("gender", dataObject.data.gender);
    // console.log("gender" + dataObject.data.gender);

    uploadData.append("title", postInput);
    uploadData.append("is_private", isPrivate);
    postImage && uploadData.append("image", postImage);
    dispatch(addPost(uploadData));
    setPrevImage(null);
    setPostImage(null);
    setPostInput("");
    setIsPrivate(false);
  };
  const profilePic = async () => {
    const jsonData = localStorage.getItem("userData");
    const dataObject = JSON.parse(jsonData);
    // console.log("profile pic" + dataObject.data.profile_pic);
    setProfilePicture(dataObject.data.profile_pic);
  };
  useEffect(() => {
    profilePic();
  }, []);

  return (
    <div className="add-tweet">
      <>
        <span className="add-tweet-image">
          <Link to={(user && `${user.username}`) || "/"}>
            {profilePicture ? ( // Check if profilePicture has a value
              <img
                className="rounded-circle author-image "
                width="60px"
                height="60px"
                src={profilePicture}
                alt="Profile"
              />
            ) : (
              <img
                className="rounded-circle author-image "
                width="60px"
                height="60px"
                src="https://dp.profilepics.in/profile-pictures-for-facebook-whatsapp/profile-pics/profile-pics-744.jpg"
                alt="Default Profile"
              />
            )}
          </Link>
        </span>
        <div className="add-tweet-input">
          <textarea
            type="text"
            rows="3"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            cols="50"
            className="addTweetTitle"
            placeholder=" Post anonymously"
          ></textarea>

          <div>
            <div>
              {prevImage && (
                <span style={{ position: "relative" }}>
                  <img
                    src={prevImage}
                    alt="img preview"
                    height="160"
                    width="200"
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                  <AiOutlineCloseCircle
                    onClick={() => setPrevImage(null)}
                    style={{
                      position: "absolute",
                      top: -63,
                      right: 6,
                      cursor: "pointer",
                      fontSize: 20,
                      color: "#f44",
                    }}
                  />
                </span>
              )}
            </div>
            <ul className="add-tweet-icon">
              <div className="add-icon">
                <li
                  data-toggle="tooltip"
                  title="Add Image"
                  data-placement="bottom"
                  className="side-icon"
                >
                  <input
                    onChange={imageChanged}
                    ref={inputOpenFileRef}
                    type="file"
                    style={{ display: "none" }}
                  />

                  {/* <AiOutlinePicture
                    data-placement="up"
                    onClick={showOpenFileDlg}
                  /> */}
                </li>
                <li
                  data-toggle="tooltip"
                  title="Add Emoji"
                  data-placement="bottom"
                  className="side-icon"
                >
                  {/* <AiOutlineSmile onClick={() => setShowEmoji(!showEmoji)} /> */}
                </li>
                <li
                  data-toggle="tooltip"
                  title="Add Bar"
                  data-placement="bottom"
                  className={`side-icon ${prevImage && "disabled"}`}
                >
                  {/* <AiOutlineBarChart /> */}
                </li>
                <li
                  data-toggle="tooltip"
                  title="Add Gif"
                  data-placement="bottom"
                  className={`side-icon ${prevImage && "disabled"}`}
                >
                  {/* <AiOutlineGif /> */}
                </li>
                <li
                  data-toggle="tooltip"
                  title="Add Schedule"
                  data-placement="bottom"
                  className={`side-icon ${prevImage && "disabled"}`}
                >
                  {/* <AiOutlineSchedule /> */}
                </li>
              </div>

              <button
                disabled={!postInput}
                onClick={() => submitPost()}
                className="link-tweet"
              >
                {uploading ? (
                  <ClipLoader color="white" loading={true} size={16} />
                ) : (
                  "Tweet"
                )}
              </button>
            </ul>
            {showEmoji && (
              <Picker
                className="dropdown-menu dropdown-menu-right"
                set="twitter"
                showPreview={true}
                onSelect={addEmoji}
                style={{
                  position: "absolute",
                  marginTop: -18,
                  display: `${showEmoji}`,
                  zIndex: 10,
                }}
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default React.memo(AddPost);
