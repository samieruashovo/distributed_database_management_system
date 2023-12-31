import { axiosInstance } from "../../index";
import axios from "axios";
import {
  tweetSuccess,
  setLoading,
  tweetAdded,
  tweetFail,
  deletedMarkSuccess,
  deletedSuccess,
  tweetDetail,
  setUploading,
  likeUnlikeTweet,
  setMeta,
  setMessage,
  tweetMarkSuccess,
  loadedMore,
} from "../slices/tweetSlice";
import {
  postSuccess,
  postAdded,
  postFail,
  postDetail,
  likeUnlikePost,
  postMarkSuccess,
} from "../slices/postSlice";
import { setSearch } from "../slices/NotificationSlice";
// check is localstorage for access is present or not
const url = "http://localhost:8000/";
export const load_tweet = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let res;
    if (localStorage.getItem("access")) {
      res = await axiosInstance.get(`tweets/`);
    } else {
      res = await axios.get(`${url}tweets/`);
    }

    // console.table('res is ',res.data)
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const load_post = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let res;
    if (localStorage.getItem("access")) {
      res = await axiosInstance.get(`community/`);
    } else {
      res = await axios.get(`${url}community/`);
    }

    // console.table('res is ',res.data)
    dispatch(setLoading(false));
    dispatch(postSuccess(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const explore_tweet = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let res;
    if (localStorage.getItem("access")) {
      res = await axiosInstance.get(`tweets/explore/global/`);
    } else {
      res = await axios.get(`${url}tweets/explore/global/`);
    }

    // console.table('res is ',res.data)
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const load_more = (pageLink) => async (dispatch) => {
  try {
    const res = await axios.get(`${pageLink}`);
    dispatch(loadedMore(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    console.log(err);
  }
};

export const tweet_detail = (uuid) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    if (localStorage.getItem("access")) {
      const res = await axiosInstance.get(`${url}tweets/tweet-detail/${uuid}`);
      dispatch(setLoading(false));
      console.log(res.data)
      console.log("asdfdsfd")
      dispatch(tweetDetail(res.data));
    }
    await axios.get(`${url}tweets/tweet-detail/${uuid}`);
  } catch (err) {
    console.log(err+"asdf");
  }
};

export const bookmark_list = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`tweets/love/bookmarkList/`);
    dispatch(setLoading(false));

    dispatch(tweetMarkSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};
// tweets of specific users
export const tweet_specific_user = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`tweets/specific/${username}/`);
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data));
  } catch (err) {
    // dispatch(userFail());
    console.log(err);
  }
};

export const addTweet = (uploadData) => async (dispatch) => {
  
  dispatch(setUploading(true));
  try {
    // 'title','username', 'body', 'image', 'is_private', 'gender', 'is_parent', 'liked'
    // const uploadDat = {
    //   title: 'Your Tweet Title', // Include the "title" field with a valid value
    //   username: 'testusername', // Include other fields as needed
    //   body: 'Tweet body content',
    //   image:'',
    //   is_private: false,
    //   gender: 'female',
    //   liked: false,

    // }
    const res = await axiosInstance.post(`create/`, uploadData);

    console.log(uploadData);
    // const res = await axios.post(`${url}tweets/`, uploadData);
    dispatch(setUploading(false));
    dispatch(tweetAdded(res.data));
    dispatch(setMessage(`Tweet Added !`));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err.response.data);
    dispatch(setMessage(`Something went Wrong !`));
  }
};
export const addPost = (uploadData) => async (dispatch) => {
  
  dispatch(setUploading(true));
  try {

    const res = await axiosInstance.post(`community/`, uploadData);

    console.log(uploadData);
    // const res = await axios.post(`${url}tweets/`, uploadData);
    dispatch(setUploading(false));
    dispatch(tweetAdded(res.data));
    dispatch(setMessage(`Post Added !`));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err.response.data);
    dispatch(setMessage(`Something went Wrong !`));
  }
};

export const reTweet = (tweetId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/post/retweet/`, {
      tweetId: tweetId,
    });

    dispatch(tweetAdded(res.data));
    dispatch(setMessage(`Re Tweeted !`));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err.response.data);
    dispatch(setMessage(err.response.data.detail));
  }
};

export const deleteTweet =
  (pk, DelRetweet = false) =>
  async (dispatch) => {
    try {
      await axiosInstance.delete(`tweets/${pk}/`);
      dispatch(deletedSuccess(pk));
      if (DelRetweet) {
        dispatch(setMessage(`Retweet Removed !`));
      } else {
        dispatch(setMessage(`Tweet Deleted !`));
      }
    } catch (err) {
      dispatch(tweetFail());
      console.log(err);
      dispatch(setMessage(`Something went Wrong !`));
    }
  };
export const editTweet = (id, title, isChecked) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.put(`tweets/${id}/`, {
      title,
      is_private: isChecked,
      isEdited: true,
    });
    dispatch(setLoading(false));
    dispatch(tweetDetail(res.data));
    dispatch(setMessage(`Tweet Updated !`));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
    dispatch(setMessage(`Something went Wrong !`));
  }
};
// {
//   "uuid": "fff4a097dba1472c9d0ed81e1d8a3b10",
//   "username": "shovo"
//   }
  
export const likeTweet = (uuid) => async (dispatch) => {
  try {
    const jsonData = localStorage.getItem("userData");
    const dataObject = JSON.parse(jsonData);
    console.log(dataObject);
    const res = await axiosInstance.post(`tweets/love/like-unlike/`, {
      uuid: uuid,
       username: dataObject.data.username
    
      
    });
    console.log(uuid +" xxx");

    dispatch(likeUnlikeTweet({ ...res.data, uuid: uuid }));
  } catch (err) {
    console.log(err);
    dispatch(setMessage(`Something went Wrong !`));
  }
};

export const bookmarkTweet = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/love/bookmark/`, {
      pk: id,
    });

    if (res.data.bookmarked) {
      dispatch(setMessage(`Saved to Bookmark !`));
    } else {
      dispatch(setMessage(`Removed from Bookmark !`));
      dispatch(deletedMarkSuccess(id));
    }
  } catch (err) {
    console.log(err);
    dispatch(setMessage(`Something went Wrong !`));
  }
};

export const searchTweet = (query, isAuthenticated) => async (dispatch) => {
  try {
    if (query.length > 0) {
      if (isAuthenticated) {
        const res = await axiosInstance.get(
          `tweets/search/custom/?search=${query}`
        );
        dispatch(setSearch(res.data));
      } else {
        const res = await axios.get(`tweets/search/custom/?search=${query}`);
        dispatch(setSearch(res.data));
      }
    } else {
      dispatch(setSearch([]));
    }
  } catch (err) {
    console.log(err);

    dispatch(setMessage(`Something went Wrong !`));
  }
};
