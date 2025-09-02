import "./Header.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchTerm } from "../../features/movieSlice";

// src/components/Header.jsx

function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector((state) => state.user);
  const { isDarkMode } = useSelector((state) => state.movies);

  // search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    dispatch(setSearchTerm(search));
    navigate("/");
    setSearch("");
  };

  // toggle dark mode
  const toggleDarkMode = () => {
    document.body.classList.toggle("light-mode");
  };

  // logout
  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    navigate("/login");
  };

  return (
    <header className={`crazy-header ${isDarkMode ? "" : "light-mode"}`}>
      <div className="crazy-header-container">
        {/* Left side */}
        <div className="crazy-header-left">
          <Link to="/" className="crazy-logo-ti">
            <h1 className="ti">Crazyflix</h1>
          </Link>

          <form className="crazy-search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Right side */}
        <div className="crazy-header-right">
          <button
            className="crazy-theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark/light mode"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          {isLoggedIn ? (
            <div className="crazy-user-menu">
              <span className="crazy-username">Hello, {username}</span>
              <Link to="/profile" className="crazy-nav-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="crazy-logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="crazy-auth-links">
              <Link to="/login" className="crazy-nav-link">
                Login
              </Link>
              <Link to="/signup" className="crazy-nav-link crazy-signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
