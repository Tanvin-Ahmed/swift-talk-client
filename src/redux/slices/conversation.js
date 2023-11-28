import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  directChat: {
    conversations: [],
    currentConversation: null,
    messages: [],
  },
  groupChat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    directConnections(state, action) {
      state.directChat.conversations = action.payload.conversations;
    },
  },
});

export default slice.reducer;

export const storeConversions = (conversions) => {
  return (dispatch, getState) => {
    if (!conversions?.length) {
      slice.actions.directConnections({
        conversations: [],
      });
      return;
    }
    const requiredFormateOfConversions = conversions.map((conversation) => {
      // conversation = {LoggedIn user Info and friend info}
      // we need only friend info to store in redux
      const friendDetails = conversation.find(
        (person) => person._id !== getState().auth.userId
      );
      return {
        id: conversation._id,
        userId: friendDetails._id,
        name: `${friendDetails.firstName} ${friendDetails.lastName}`,
        online: friendDetails.status === "Online",
        //   TODO: need to update this fields
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: false,
      };
    });

    dispatch(
      slice.actions.directConnections({
        conversations: requiredFormateOfConversions,
      })
    );
  };
};
