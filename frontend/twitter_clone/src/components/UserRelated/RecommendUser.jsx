import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userFollow } from "../../redux/asyncActions/UserAsync";
import { axiosInstance } from "../..";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecommendUser = ({ user }) => {
  // console.log("i_follow");
  // console.log(user);
  // console.log("i_follow end");
  // const { username } = useParams();
  const dispatch = useDispatch();
  // const [currentUser, setCurrentUser] = useState(false);
  // const axiosInstance = axios.create({
  //   baseURL: "http://127.0.0.1:8000/",
  //   timeout: 5000,
  //   headers: {
  //     "Content-Type": "application/json",
  //     accept: "application/json",
  //   },
  // });
  // const getUserData = async (e) => {
  //   const res = await axiosInstance.get(`user/${username}/`);

  //   console.log("hlkissss");
  //   console.log(res.data);
  //   setCurrentUser(res.data);
  //   console.log("hlkissss end");
  //   // console.log(currentUser.cover_pic +"aertt")
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  return (
    <span className="position-relative hover trendlist">
      <Link className="d-flex" to={`/user/${user.username}`}>
        <span>
          <img alt="img" src={user?.profile_pic} className="authorImage" />
        </span>
        <span className="left-20">
          <span className="user-list">{user.username}</span>

          <span className=" side-name follow-line">
            {user.bio || "Anonymous bio"}
          </span>
        </span>{" "}
      </Link>
      {user.i_follow ? (
        <button
          onClick={() => dispatch(userFollow(user.username))}
          className="followbtn border-only-btn"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={() => dispatch(userFollow(user.username))}
          className="link-tweet followbtn"
        >
          Follow
        </button>
      )}
    </span>
  );
};
export default RecommendUser;
