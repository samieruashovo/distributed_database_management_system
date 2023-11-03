import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  commentList: [],
  error: false,
  uploading: false,
  meta: null,
};

const getParent = (id, comments) => {
  for (const comment of comments) {
    if (comment.id === id) return comment;
    else {
      const gotParent = getParent(id, comment.children);
      if (gotParent) return gotParent;
    }
  }
  return null;
};
export const postCommentReducer = createSlice({
  name: "postCommentReducer",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setMeta: (state, { payload }) => {
      state.meta = payload;
    },
    postCommentSuccess: (state, { payload }) => {
      state.commentList = payload;
      
      console.log(state.commentList);
      console.log("comment list payload")
    },
    postCommentAdded: (state, { payload }) => {
      state.commentList.unshift(payload);
    },
    postLoadedMoreComment: (state, { payload }) => {
      state.commentList.push(...payload);
    },
    postReplyAdded: (state, { payload }) => {
      const parent = getParent(payload.parentId, state.commentList);
      parent.children.unshift(payload);
    },
    postCommentEdit: (state, { payload }) => {
      const parent = getParent(payload.id, state.commentList);
      parent.body = payload.body;
    },
    postCommentDeleted: (state, { payload }) => {
      const parent = getParent(payload, state.commentList);
      state.commentList = state.commentList.filter((i) => i.id !== parent.id);
    },
    postCommentUploading: (state, { payload }) => {
      state.uploading = payload;
    },
    postLikeUnlikeComment: (state, { payload }) => {
      const parent = getParent(payload.id, state.commentList);
      parent.like_count = payload.count;
    },
  },
});
export const {
  setLoading,
  postLoadedMoreComment,
  postCommentSuccess,
  postCommentAdded,
  postCommentUploading,
  postCommentDeleted,
  postReplyAdded,
  setMeta,
  postCommentEdit,
  postLikeUnlikeComment,
} = postCommentReducer.actions;

export default postCommentReducer.reducer;
