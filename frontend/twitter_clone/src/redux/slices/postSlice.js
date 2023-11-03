import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  singlePost: {},
  uploading: false,
  message: null,
  meta: null,
  bookmarksList: [],
};
export const postReducer = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setUploading: (state, action) => {
      state.uploading = action.payload;
      state.error = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    postSuccess: (state, { payload }) => {
      state.posts = payload;
    },
    postMarkSuccess: (state, { payload }) => {
      state.bookmarksList = payload;
    },
    postFail: (state) => {
      state.error = true;
    },
    postUser: (state, { payload }) => {
      const userMan = state.posts.find(
        (i) => i.author.username === payload.username
      );
      userMan.author.i_follow = payload.follow;
    },
    postAdded: (state, { payload }) => {
      state.posts.unshift(payload);
    },
    postDetail: (state, { payload }) => {
      state.singlePost = payload;
    },
    deletedSuccess: (state, { payload }) => {
      state.posts = state.posts.filter((i) => i.id !== payload);
    },
    deletedMarkSuccess: (state, { payload }) => {
      state.bookmarksList = state.bookmarksList.filter((i) => i.id !== payload);
    },
    setMeta: (state, { payload }) => {
      state.meta = payload;
    },
    loadedMore: (state, { payload }) => {
      state.posts.push(...payload);
    },
    removeMesage: (state, action) => {
      state.message = null;
    },
    showSearchBar: (state, { payload }) => {
      state.searchBar = payload;
    },
    likeUnlikepost: (state, { payload }) => {
      const post = state.posts.find((i) => i.id === payload.id);
      if (post) post.like_count = payload.count;
      state.singlepost.like_count = payload.count;
    },
  },
});

export const {
  setLoading,
  setMeta,
  postSuccess,
  postAdded,
  showSearchBar,
  postFail,
  loadedMore,
  deletedSuccess,
  deletedMarkSuccess,
  postDetail,
  setUploading,
  setMessage,
  removeMesage,
  postMarkSuccess,
  postUser,
  likeUnlikepost,
} = postReducer.actions;
export default postReducer.reducer;
