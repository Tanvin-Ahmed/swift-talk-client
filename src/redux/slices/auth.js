import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

// login user function
export const loginUser = (formValue) => {
  // formValue = {email, password}
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/v1/auth/login", formValue);
      dispatch(slice.actions.login({ isLoggedIn: true, token: data.token }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const LogoutUser = () => {
  return async (dispatch) => {
    dispatch(slice.actions.logout());
  };
};
