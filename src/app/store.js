import moviesReducer from "../features/movieSlice";
import userReducer from "../features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});

export default store; // ✅ default export
