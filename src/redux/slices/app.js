import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can b CONTACT, SHARED, STARRED
  },
  users: [],
  friends: [],
  friendRequests: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests;
    },
  },
});

export default slice.reducer;

export const ToggleSidebar = () => {
  return async (dispatch) => {
    dispatch(slice.actions.toggleSidebar());
  };
};

export const UpdateSidebarType = (type) => {
  return async (dispatch) => {
    dispatch(slice.actions.updateSidebarType({ type }));
  };
};

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios("/v1/user/get-users", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
      dispatch(slice.actions.updateUsers({ users: data.data }));
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    }
  };
};

export const fetchFriends = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios("/v1/user/get-friends", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
      dispatch(slice.actions.updateFriends({ friends: data.data }));
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    }
  };
};

export const fetchFriendRequests = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios("/v1/user/get-friend-request", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
      dispatch(
        slice.actions.updateFriendRequests({ friendRequests: data.data })
      );
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    }
  };
};
