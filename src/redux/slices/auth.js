import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  userId: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.email = "";
      state.userId = "";
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
      dispatch(slice.actions.setRegisterEmail(formValue.email));
      toast.success(data.message);
      window.location.href = "/auth/verify-otp";
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
      dispatch(
        slice.actions.login({
          isLoggedIn: true,
          token: data.token,
          userId: data.userId,
        })
      );
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
      dispatch(
        slice.actions.login({
          isLoggedIn: true,
          token: data.token,
          userId: data.userId,
        })
      );
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
      dispatch(
        slice.actions.login({
          isLoggedIn: true,
          token: data.token,
          userId: data.userId,
        })
      );
      toast.success(data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    }
  };
};

export const refreshToken = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios("/v1/auth/refresh-token", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
      dispatch(
        slice.actions.login({
          isLoggedIn: true,
          token: data,
          userId: data.userId,
        })
      );
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      if (message === "Invalid token!") {
        dispatch(slice.actions.logout());
      }
    }
  };
};
