import "./MovieCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  // Format rating to one decimal place
  const formattedRating = movie.rating
    ? parseFloat(movie.rating).toFixed(1)
    : "0.0";

  // Get year from release date
  const getYear = () => {
    if (!movie.releaseDate) return "N/A";
    return movie.releaseDate.split("-")[0];
  };

  // Fallback image in case of error
  const imageSrc = imageError
    ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik04MCAxMjBDODAgMTMzLjI1NSA5MC43NDUgMTQ0IDEwNSAxNDRDMTE5LjI1NSAxNDQgMTMwIDEzMy4yNTUgMTMwIDEyMEMxMzAgMTA2Ljc0NSAxMTkuMjU1IDk2IDEwNSA5NkM5MC43NDUgOTYgODAgMTA2Ljc0NSA4MCAxMjBaTTE0MCAyMTBWNjBINzBWMjEwSDE0MFoiIGZpbGw9IiM1RTVFNUUiLz4KPC9zdmc+"
    : movie.poster;

  return (
    <div className="crazy-movie-card">
      <Link to={`/movie/${movie.id}`} className="crazy-movie-link">
        <div className="crazy-movie-poster">
          <img
            src={imageSrc}
            alt={movie.title || "Movie Poster"}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={imageLoaded ? "crazy-loaded" : "crazy-loading"}
          />
          {!imageLoaded && !imageError && (
            <div className="crazy-poster-skeleton"></div>
          )}

          <div className="crazy-movie-overlay">
            {/* ✅ Watch Now works as a clickable link */}
            <Link to={`/movie/${movie.id}`} className="crazy-watch-btn">
              <span className="crazy-play-icon">▶</span>
              Watch Now
            </Link>

            <div className="crazy-action-buttons">
              <button
                className="crazy-action-btn crazy-watch-later"
                aria-label="Add to watchlist"
              >
                <span className="crazy-icon">+</span>
              </button>
              <button
                className="crazy-action-btn crazy-like"
                aria-label="Like"
              >
                <span className="crazy-icon">♥</span>
              </button>
            </div>
          </div>

          {movie.isPremium && (
            <div className="crazy-premium-badge">Premium</div>
          )}
        </div>

        <div className="crazy-movie-info">
          <h3 className="crazy-movie-title">{movie.title || "Untitled"}</h3>

          <div className="crazy-movie-meta">
            <span className="crazy-movie-year">{getYear()}</span>
            <span className="crazy-movie-rating">
              <span className="crazy-star">⭐</span> {formattedRating}
            </span>
          </div>

          <div className="crazy-movie-genres">
            {Array.isArray(movie.genre) &&
              movie.genre.slice(0, 2).map((genre) => (
                <span key={genre} className="crazy-genre-tag">
                  {genre}
                </span>
              ))}
            {movie.genre && movie.genre.length > 2 && (
              <span className="crazy-genre-tag">
                +{movie.genre.length - 2}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
