import React, { useEffect, useState } from "react";
import {
  getUserInfo,
  userFollow,
  userProfile,
} from "../redux/asyncActions/UserAsync";
import { useDispatch, useSelector } from "react-redux";
import Second from "../components/Second";
import Moment from "moment";
import useUserInfo from "../hooks/useUserInfo";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import Viewer from "react-viewer";
import ClipLoader from "react-spinners/ClipLoader";
import { tweet_specific_user } from "../redux/asyncActions/TweetAsync";
import TweetPostCard from "../components/TweetComponents/TweetPostCard";
import { removeMesage } from "../redux/slices/tweetSlice";
import AlertMessage from "../components/SmallComponent/alertMessage";
import UserEditModal from "../components/UserRelated/UserEditModal";
import { FollowInfo } from "../components/SmallComponent/FollowInfo";

//new
import MomentUtils from "@date-io/moment";
// Material UI Imports
//// Core
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LinkIcon from "@material-ui/icons/Link";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CloseIcon from "@material-ui/icons/Close";
import "../styles/components/Profile.css";
import ProfileCard from "../components/profile/ProfileCard";
import TweetPost from "../components/profile/TweetPost";
import axios from "axios";

const Profile = () => {
  // console.log("running 456");
  const { username } = useParams();
  const { user: authUser } = useUserInfo();
  const [showUserModal, setShowUserModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [covervisible, setCoverVisible] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  const tweets = tweetsInfo.tweets;
  const message = tweetsInfo.message;
  const userprofile = userIn.profileUser;

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const getUserData = async (e) => {
    const res = await axiosInstance.get(`user/${username}/shovo123/`);

    console.log("hlki   asssss");
    console.log(username);
    console.log(res.data);

    console.log("hlki   asssss");
    setCurrentUser(res.data);
    // console.log(currentUser.cover_pic +"aertt")
  };

  useEffect(() => {
    getUserData();
  }, []);
  // const history = useHistory()

  // message &&
  //   setTimeout(() => {
  //     dispatch(removeMesage());
  //   }, 3000);
  // useEffect(() => {
  //   if(isAuthenticated){
  //     dispatch(userProfile(username));
  //     dispatch(tweet_specific_user(username));
  //   }

  //   // if(!isAuthenticated){
  //   //   history.push('/login')
  //   // }

  // }, [dispatch,username,isAuthenticated]);
  const jsonData = localStorage.getItem("userData");
  const dataObject = JSON.parse(jsonData);
  return (
    <div>
      <Second>
        {message && (
          <AlertMessage
            removeMesage={removeMesage}
            dispatch={dispatch}
            message={message}
          />
        )}

        {userIn.isLoading ? (
          <span className="d-flex justify-content-center mt-4">
            <ClipLoader color="#f44" loading={true} size={23} />
          </span>
        ) : (
          <>
            <TweetHeader headerName="profile" />
            <div style={{ position: "relative" }}>
              <img
                onClick={() => setCoverVisible(true)}
                src={currentUser.cover_pic}
                alt="cover background"
                className="cover-image"
              />

              <img
                onClick={() => setVisible(true)}
                src={currentUser.profile_pic}
                alt="profile background"
                className="rounded-circle profile-image"
              />
              {showUserModal && (
                <UserEditModal
                  user={authUser}
                  setShowUserModal={setShowUserModal}
                />
              )}
              <Viewer
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
                images={[{ src: currentUser?.avatar, alt: "background" }]}
              />

              <Viewer
                visible={covervisible}
                onClose={() => {
                  setCoverVisible(false);
                }}
                images={[{ src: currentUser?.cover_image, alt: "background" }]}
              />
              {/* editprofile or follow button section depending on the user */}
              {authUser?.email === currentUser.email ? (
                <div className="follow-or-edit">
                  <button
                    className="link-tweet"
                    type="button"
                    data-toggle="modal"
                    data-target="#userModal"
                    onClick={isModalOpen ? closeModal : openModal}
                  >
                    Edit Profile
                  </button>
                  {isModalOpen && (
                    <UserEditModal
                      user={userprofile}
                      modalId="userModal"
                      onClose={closeModal}
                    />
                  )}
                </div>
              ) : (
                <div className="follow-or-edit">
                  <Link to={`/messages/w/${currentUser?.username}`}>
                    <i className="largeicon mx-3 ">
                      <BiSend />
                    </i>
                  </Link>

                  <div style={{ margin: "15px" }}>
                    {console.log(currentUser.i_follow + "aaaaa")}
                    {currentUser?.i_follow ? (
                      <button
                        onClick={() =>
                          dispatch(userFollow(dataObject.data.username))
                        }
                        className="link-tweet "
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(userFollow(dataObject.data.username))
                        }
                        className="link-tweet"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-info">
              <p>
                {currentUser?.first_name + " " + currentUser?.last_name} <br />
                <span className="side-name">@{currentUser?.username}</span>
              </p>
              <p>
                {dataObject.data.bio}
                <span className="side-name">
                  <i className="tweetIcons">
                    <AiOutlineSchedule />
                  </i>

                  <span className="mx-2">
                    joined{" "}
                    {Moment(currentUser.date_joined).format("MMMM Do YYYY")}
                  </span>
                </span>
              </p>
              <div className="FollowInfo d-flex">
                {console.log("currentUser.followers: " + currentUser.followers)}
                <FollowInfo
                  number={currentUser.followers}
                  followinfo="followers"
                />
                <div style={{ margin: "0 10px" }}></div>

                <FollowInfo
                  number={currentUser.following}
                  followinfo="following"
                />
              </div>
            </div>
          </>
        )}

        {tweets.map((tweet) => {
          // console.log(username +"kilo")
          const condition = tweet.username === username;

          return condition ? (
            <TweetPostCard
              user={authUser}
              dispatch={dispatch}
              tweet={tweet}
              key={tweet.uuid}
            />
          ) : null;
        })}
      </Second>
      <div></div>
    </div>
  );
};

export default Profile;
