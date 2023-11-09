import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput";
import SideTop from "../SideTop";
import { useSelector } from "react-redux";
import RecommendUser from "../UserRelated/RecommendUser";
import Community from "./Community";
const TrendBar = () => {
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;
  const showSearch = useSelector((state) => state.tweetReducer.searchBar);
  const recommendusers = useSelector(
    (state) => state.userReducer.recommendedUser
  );
  return (
    <div className="second-trend">
      {/* <SideTop /> */}
      {showSearch !== "no" && <SearchInput />}
      {isAuthenticated ? (
        <>
          <div className="follow ">
            <h4 className="h4-title">Who to Follow ?</h4>
            {recommendusers?.map((user) => (
              <RecommendUser key={user.username} user={user} />
            ))}
            <Link to="/follow-users">
              <span className="side-name">More Users</span>
            </Link>
          </div>
        </>
      ) : (
        <div className="follow">
          <h4 className="h4-title">Please Login</h4>
        </div>
      )}
      <div className="community-class">
        <Community />
      </div>
    </div>
  );
};

export default TrendBar;
