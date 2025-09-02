import moviesData from "../api/movies.json";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: moviesData,
  filteredMovies: moviesData,
  loading: false,
  error: null,
  searchTerm: '',
  isDarkMode: true
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      const term = action.payload.toLowerCase();

      if (!term) {
        state.filteredMovies = state.movies;
      } else {
        state.filteredMovies = state.movies.filter(movie => 
          movie.title.toLowerCase().includes(term) ||
          movie.genre.some(genre => genre.toLowerCase().includes(term))
        );
      }
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setSearchTerm, setDarkMode, setLoading, setError, clearError } = moviesSlice.actions;

export default moviesSlice.reducer;
