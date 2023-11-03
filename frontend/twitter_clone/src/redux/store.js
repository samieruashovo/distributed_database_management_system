import { configureStore } from "@reduxjs/toolkit";
import changeClass from "./slices/simpleState";

import userRegister from "./slices/userSlice";
import tweetReducer from "./slices/tweetSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/CommentSlice";
import notificationReducer from "./slices/NotificationSlice";
import chatReducer from "./slices/ChatSlice";
import  postCommentReducer from "./slices/PostCommentSlice";

const store = configureStore({
  reducer: {
    changeClass: changeClass,
    userReducer: userRegister,
    tweetReducer: tweetReducer,
    commentReducer: commentReducer,
    notificationReducer: notificationReducer,
    chatReducer: chatReducer,
    postReducer: postReducer,
    postCommentReducer:postCommentReducer,
  },
});

export default store;
