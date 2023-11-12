import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRegisterEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export default slice.reducer;

// register user function
export const registerUser = (formValue) => {
  // formValue = {firstName, lastName, email, password}
  return async (dispatch) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const { data } = await axios.post("/v1/auth/register", formValue);
      dispatch(slice.actions.login({ isLoggedIn: true, token: data.token }));
      dispatch(slice.actions.setRegisterEmail(formValue.email));
      toast.success(data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  };
};

// login user function
export const loginUser = (formValue) => {
  // formValue = {email, password}
  return async (dispatch) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const { data } = await axios.post("/v1/auth/login", formValue);
      dispatch(slice.actions.login({ isLoggedIn: true, token: data.token }));
      dispatch(slice.actions.setRegisterEmail(formValue.email));
      toast.success(data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  };
};

export const LogoutUser = () => {
  return async (dispatch) => {
    dispatch(slice.actions.logout());
  };
};

export const forgotPassword = (formValue) => {
  // formValue = {email}
  return async (dispatch) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const { data } = await axios.post("/v1/auth/forgot-password", formValue);
      toast.success(data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  };
};

export const resetPassword = (formValue) => {
  // formValue = {password, token, passwordConfirm}
  return async (dispatch) => {
    try {
      dispatch(slice.actions.setLoading(true));
      const { data } = await axios.post("/v1/auth/reset-password", formValue);
      dispatch(slice.actions.login({ isLoggedIn: true, token: data.token }));
      window.location.href = "/auth/verify-otp";
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      dispatch(slice.actions.setLoading(false));
    }
  };
};

export const verifyEmail = (formValue) => {
  // formValue = {email, otp}
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/v1/auth/verify-otp", formValue);
      dispatch(slice.actions.login({ isLoggedIn: true, token: data.token }));
      toast.success(data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    }
  };
};
