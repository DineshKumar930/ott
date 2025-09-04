import { createSlice } from "@reduxjs/toolkit";

// Load user & users list from localStorage
const savedUser = JSON.parse(localStorage.getItem("user")) || {
  id: null,
  username: "",
  email: ""
};
const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

const initialState = {
  user: savedUser,
  users: savedUsers, // all registered users
  isLoggedIn: savedIsLoggedIn,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isLoggedIn", "true");
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;

      // Add new user
      state.users.push(action.payload);

      // Save users list
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordSuccess: (state, action) => {
      const { email, newPassword } = action.payload;

      // Update password in users array
      state.users = state.users.map((u) =>
        u.email === email ? { ...u, password: newPassword } : u
      );

      localStorage.setItem("users", JSON.stringify(state.users));

      // Update current logged-in user’s password too
      if (state.user && state.user.email === email) {
        state.user.password = newPassword;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = { id: null, username: "", email: "" };

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    },

    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  resetPasswordSuccess,
  logout,
  clearError
} = userSlice.actions;

// Async thunk: Login
export const login = (credentials) => async (dispatch, getState) => {
  dispatch(loginStart());
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { users } = getState().user;

    const existingUser = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!existingUser) {
      throw new Error("User not found or incorrect password");
    }

    dispatch(loginSuccess(existingUser));
    return existingUser;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

// Async thunk: Register
export const register = (userData) => async (dispatch, getState) => {
  dispatch(registerStart());
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { users } = getState().user;

    if (users.some((u) => u.email === userData.email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString()
    };

    dispatch(registerSuccess(newUser));

    // Optional: auto login after registration
    dispatch(loginSuccess(newUser));

    return newUser;
  } catch (error) {
    dispatch(registerFailure(error.message));
    throw error;
  }
};

// Async thunk: Reset Password
export const resetPassword =
  ({ email, newPassword }) => async (dispatch, getState) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { users } = getState().user;
      const existingUser = users.find((u) => u.email === email);

      if (!existingUser) {
        throw new Error("Email not found");
      }

      dispatch(resetPasswordSuccess({ email, newPassword }));
      return { email, newPassword };
    } catch (error) {
      throw error;
    }
  };

export default userSlice.reducer;
