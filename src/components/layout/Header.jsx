import "./Header.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchTerm } from "../../features/movieSlice";

function Header() {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector((state) => state.user);
  const { isDarkMode } = useSelector((state) => state.movies);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    dispatch(setSearchTerm(search));
    navigate("/");
    setSearch("");
    setIsMenuOpen(false); // Close mobile menu after search
  };

  // toggle dark mode
  const toggleDarkMode = () => {
    document.body.classList.toggle("light-mode");
  };

  // logout
  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    navigate("/login");
    setIsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`crazy-header ${isDarkMode ? "" : "light-mode"} ${isScrolled ? "scrolled" : ""}`}>
      <div className="crazy-header-container">
        {/* Left side */}
        <div className="crazy-header-left">
          <Link to="/" className="crazy-logo-ti">
            <h1 className="ti">Crazyflix</h1>
          </Link>

          <nav className="crazy-nav-desktop">
            <Link to="/" className="crazy-nav-link">Home</Link>
            <Link to="/movies" className="crazy-nav-link">Movies</Link>
            <Link to="/series" className="crazy-nav-link">TV Series</Link>
            <Link to="/mylist" className="crazy-nav-link">My List</Link>
          </nav>
        </div>

        {/* Middle - Search */}
        <form className="crazy-search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies, series..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

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
              <span className="crazy-username">Hi, {username}</span>
              <Link to="/profile" className="crazy-nav-link crazy-profile-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 21C20 19.1435 19.2625 17.363 17.9497 16.0503C16.637 14.7375 14.8565 14 13 14H11C9.14348 14 7.36301 14.7375 6.05025 16.0503C4.7375 17.363 4 19.1435 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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

          {/* Mobile menu button */}
          <button 
            className={`crazy-mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`crazy-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <nav className="crazy-nav-mobile">
          <Link to="/" className="crazy-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/movies" className="crazy-nav-link" onClick={() => setIsMenuOpen(false)}>Movies</Link>
          <Link to="/series" className="crazy-nav-link" onClick={() => setIsMenuOpen(false)}>TV Series</Link>
          <Link to="/mylist" className="crazy-nav-link" onClick={() => setIsMenuOpen(false)}>My List</Link>
          
          {!isLoggedIn && (
            <>
              <Link to="/login" className="crazy-nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="crazy-nav-link" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;