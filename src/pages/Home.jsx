import "./Home.css";
import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const { movies, filteredMovies, loading, error } = useSelector(
    (state) => state.movies
  );
  const [isScrolled, setIsScrolled] = useState(false);

  // Get trending, popular, and recent movies
  const trendingMovies = movies
    .slice(0, 10)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);
  const popularMovies = movies.filter((movie) => movie.rating >= 4.5);
  const recentMovies = [...movies]
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 8);
  const featuredMovie =
    movies.length > 0
      ? movies[Math.floor(Math.random() * movies.length)]
      : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="home-page loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading your entertainment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      {featuredMovie && (
        <section className="hero-section">
          <div
            className="hero-backdrop"
            style={{
              backgroundImage: `url(${
                featuredMovie.backdrop || featuredMovie.poster
              })`,
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">{featuredMovie.title}</h1>
              <div className="hero-meta">
                <span className="hero-year">
                  {featuredMovie.releaseDate?.split("-")[0]}
                </span>
                <span className="hero-rating">
                  ⭐ {featuredMovie.rating?.toFixed(1)}
                </span>
                {featuredMovie.duration && (
                  <span className="hero-duration">
                    {featuredMovie.duration}
                  </span>
                )}
              </div>
              <p className="hero-description">
                {featuredMovie.description?.length > 150
                  ? `${featuredMovie.description.substring(0, 150)}...`
                  : featuredMovie.description}
              </p>
              <div className="hero-actions">
                <button className="hero-btn primary">
                  <span className="play-icon">▶</span>
                  Watch Now
                </button>
                <button className="hero-btn secondary">+ My List</button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className={`content-wrapper ${isScrolled ? "scrolled" : ""}`}>
        {/* Carousels */}
        <Carousel title="Trending Now" movies={trendingMovies} />
        <Carousel title="Popular Movies" movies={popularMovies} />
        <Carousel title="New Releases" movies={recentMovies} />

        {/* All Movies Grid */}
        <section className="all-movies">
          <div className="section-header">
            <h2 className="section-title">All Movies</h2>
            <span className="movies-count">
              {filteredMovies.length} movies
            </span>
          </div>
          <div className="movies-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🎬</div>
                <h3>No movies found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Quick Navigation */}
      <div className="quick-nav">
        <button className="nav-btn" onClick={scrollToTop}>
          ↑ Top
        </button>
      </div>
    </div>
  );
}

export default Home;
