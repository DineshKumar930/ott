import "./Profile.css";
import MovieCard from "../components/MovieCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { movies } = useSelector((state) => state.movies);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Mock favorite and watched movies
  const favoriteMovies = movies.filter((movie) =>
    ["tt0111161", "tt0068646", "tt1375666"].includes(movie.imdbID)
  );

  const watchedMovies = movies.filter((movie) =>
    ["tt0468569", "tt0108052", "tt0167260"].includes(movie.imdbID)
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="profile-info">
        <div className="user-details">
          <div className="avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h2>{user.username}</h2>
            <p className="user-email">{user.email}</p>
            <p className="member-since">
              Member since{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        {favoriteMovies.length > 0 && (
          <section className="favorites-section">
            <h3 className="section-title">Favorite Movies</h3>
            <div className="movies-grid">
              {favoriteMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {watchedMovies.length > 0 && (
          <section className="watched-section">
            <h3 className="section-title">Recently Watched</h3>
            <div className="movies-grid">
              {watchedMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Profile;
