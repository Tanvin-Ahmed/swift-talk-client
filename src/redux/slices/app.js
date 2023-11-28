import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can b CONTACT, SHARED, STARRED
  },
  users: {
    list: [],
    hasNext: false,
    loading: false,
  },
  friends: {
    list: [],
    hasNext: false,
    loading: false,
  },
  friendRequests: {
    list: [],
    hasNext: false,
    loading: false,
  },
  friendRequestsISent: {
    list: [],
    hasNext: false,
    loading: false,
  },
  chatType: null,
  roomId: null,
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
      state.users.list = action.payload.users;
      state.users.hasNext = action.payload.hasNext;
    },
    updateFriends(state, action) {
      state.friends.list = action.payload.friends;
      state.friends.hasNext = action.payload.hasNext;
    },
    updateFriendRequests(state, action) {
      state.friendRequests.list = action.payload.friendRequests;
      state.friendRequests.hasNext = action.payload.hasNext;
    },
    updateFriendRequestsISent(state, action) {
      state.friendRequestsISent.list = action.payload.friendRequests;
      state.friendRequestsISent.hasNext = action.payload.hasNext;
    },
    selectConversation(state, action) {
      state.chatType = "individual";
      state.roomId = action.payload.roomId;
    },
    setUserLoading(state, action) {
      state.users.loading = action.payload;
    },
    setFriendLoading(state, action) {
      state.friends.loading = action.payload;
    },
    setFriendRequestLoading(state, action) {
      state.friendRequests.loading = action.payload;
    },
    setFriendRequestISentLoading(state, action) {
      state.friendRequestsISent.loading = action.payload;
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

export const fetchUsers = (search, limit, page) => {
  return async (dispatch, getState) => {
    try {
      dispatch(slice.actions.setUserLoading(true));
      const { data } = await axios(
        `/v1/user/get-users?search=${search}&limit=${limit}&page=${page}`,
        {
          headers: { Authorization: "Bearer " + getState().auth.token },
        }
      );
      dispatch(
        slice.actions.updateUsers({ users: data.data, hasNext: data.hasNext })
      );
    } catch (error) {
      // const message = error?.response?.data?.message || error.message;
      // toast.error(message);
    } finally {
      dispatch(slice.actions.setUserLoading(false));
    }
  };
};

export const fetchFriends = (search, limit, page) => {
  return async (dispatch, getState) => {
    try {
      dispatch(slice.actions.setFriendLoading(true));
      const { data } = await axios(
        `/v1/user/get-friends?search=${search}&limit=${limit}&page=${page}`,
        {
          headers: { Authorization: "Bearer " + getState().auth.token },
        }
      );
      dispatch(
        slice.actions.updateFriends({
          friends: data.data,
          hasNext: data.hasNext,
        })
      );
    } catch (error) {
      // const message = error?.response?.data?.message || error.message;
      // toast.error(message);
    } finally {
      dispatch(slice.actions.setFriendLoading(false));
    }
  };
};

export const fetchFriendRequests = (search, limit, page) => {
  return async (dispatch, getState) => {
    try {
      dispatch(slice.actions.setFriendRequestLoading(true));
      const { data } = await axios(
        `/v1/user/get-friend-request?search=${search}&limit=${limit}&page=${page}`,
        {
          headers: { Authorization: "Bearer " + getState().auth.token },
        }
      );
      dispatch(
        slice.actions.updateFriendRequests({
          friendRequests: data.data,
          hasNext: data.hasNext,
        })
      );
    } catch (error) {
      // const message = error?.response?.data?.message || error.message;
      // toast.error(message);
    } finally {
      dispatch(slice.actions.setFriendRequestLoading(false));
    }
  };
};

export const fetchFriendRequestsISent = (search, limit, page) => {
  return async (dispatch, getState) => {
    try {
      dispatch(slice.actions.setFriendRequestISentLoading(true));
      const { data } = await axios(
        `/v1/user/get-friend-request-that-i-sent?search=${search}&limit=${limit}&page=${page}`,
        {
          headers: { Authorization: "Bearer " + getState().auth.token },
        }
      );
      dispatch(
        slice.actions.updateFriendRequestsISent({
          friendRequests: data.data,
          hasNext: data.hasNext,
        })
      );
    } catch (error) {
      // const message = error?.response?.data?.message || error.message;
      // toast.error(message);
    } finally {
      dispatch(slice.actions.setFriendRequestISentLoading(false));
    }
  };
};

export const userListAfterSendFriendRequest = (userId) => {
  // userId is the id of the user that I send friend requests
  return (dispatch, getState) => {
    dispatch(
      slice.actions.updateUsers({
        users: getState().app.users.list.filter((user) => user._id !== userId),
        hasNext: getState().app.users.hasNext,
      })
    );
  };
};

export const updateFriedRequestList = (requestId) => {
  return (dispatch, getState) => {
    dispatch(
      slice.actions.updateFriendRequests({
        friendRequests: getState().app.friendRequests.list.filter(
          (req) => req._id !== requestId
        ),
        hasNext: getState().app.friendRequests.hasNext,
      })
    );
    dispatch(
      slice.actions.updateFriendRequestsISent({
        friendRequests: getState().app.friendRequestsISent.list.filter(
          (req) => req._id !== requestId
        ),
        hasNext: getState().app.friendRequestsISent.hasNext,
      })
    );
  };
};

export const updateUserList = (userId) => {
  return (dispatch, getState) => {
    dispatch(
      slice.actions.updateUsers({
        users: getState().app.users.list.filter((user) => user._id !== userId),
        hasNext: getState().app.users.hasNext,
      })
    );
  };
};

export const clearAllSearchDataFromStorage = () => {
  return (dispatch) => {
    dispatch(slice.actions.updateUsers({ users: [], hasNext: false }));
    dispatch(slice.actions.updateFriends({ friends: [], hasNext: false }));
    dispatch(
      slice.actions.updateFriendRequests({ friendRequests: [], hasNext: false })
    );
    dispatch(
      slice.actions.updateFriendRequestsISent({
        friendRequests: [],
        hasNext: false,
      })
    );
    dispatch(slice.actions.setUserLoading(false));
    dispatch(slice.actions.setFriendLoading(false));
    dispatch(slice.actions.setFriendRequestLoading(false));
    dispatch(slice.actions.setFriendRequestISentLoading(false));
  };
};

// select conversation
export const selectConversation = (roomId) => {
  return (dispatch) => {
    dispatch(slice.actions.selectConversation({ roomId }));
  };
};
