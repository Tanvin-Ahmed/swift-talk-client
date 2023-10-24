import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can b CONTACT, SHARED, STARRED
  },
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
  },
});

export default slice.reducer;

export const ToggleSidebar = () => {
  return async () => {
    dispatch(slice.actions.toggleSidebar());
  };
};

export const UpdateSidebarType = (type) => {
  return async () => {
    dispatch(slice.actions.updateSidebarType({ type }));
  };
};
