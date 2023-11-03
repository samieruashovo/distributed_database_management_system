import {
  getMessage,
  addChatRoom,
  moreMessage,
  setLoading,
  setMeta,
} from "../slices/ChatSlice";

import { axiosInstance } from "../../index";

export const getChatMessage = (username) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`chats/create/${username}/`);

    dispatch(getMessage(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {}
};

export const getRooms = (other_user) => async (dispatch) => {
  // dispatch(setLoading(true))
  try {
    other_user = "shovo123"
    if (other_user) {
      console.log("running getrooms if condition")
      const res = await axiosInstance.get(`chats/get_rooms/${other_user}`);
      // , {
      //   other_user: other_user,
      // }
      console.log(res)
      console.log("skljfdskj")

      dispatch(addChatRoom(res.data));
    } else {
      console.log("running getrooms else condition")

      const res = await axiosInstance.get("chats/get_rooms/");

      dispatch(addChatRoom(res.data));
    }

    // console.log(res.data)

    // dispatch(setLoading(false))
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const loadMoreMessage = (nextPage) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(nextPage);
    dispatch(moreMessage(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {}
};
