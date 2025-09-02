import { createSlice } from "@reduxjs/toolkit";

// src/features/userSlice.js

const initialState = {
  user: {
    id: null,
    username: '',
    email: ''
  },
  isLoggedIn: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = {
        id: Date.now(),
        username: action.payload.username,
        email: action.payload.email
      };
      state.error = null;
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
    },
    
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        id: null,
        username: '',
        email: ''
      };
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
  logout,
  clearError 
} = userSlice.actions;

// Async thunks for login and register
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate credentials (mock validation)
    if (credentials.email === 'error@example.com') {
      throw new Error('Invalid email or password');
    }
    
    dispatch(loginSuccess(credentials));
    return credentials;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(registerStart());
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists (mock validation)
    if (userData.email === 'existing@example.com') {
      throw new Error('Email already exists');
    }
    
    dispatch(registerSuccess(userData));
    return userData;
  } catch (error) {
    dispatch(registerFailure(error.message));
    throw error;
  }
};

export default userSlice.reducer;