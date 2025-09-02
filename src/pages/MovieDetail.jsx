import "./MovieDetail.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// src/pages/MovieDetail.jsx

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, loading } = useSelector((state) => state.movies);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const movie = movies.find((m) => m.id === parseInt(id, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  if (loading) {
    return (
      <div className="movie-detail loading">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail not-found">
        <div className="error-message">
          <h2>Movie Not Found</h2>
          <p>We couldn't find the movie you're looking for.</p>
          <button onClick={() => navigate("/")} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formattedRating = movie.rating
    ? parseFloat(movie.rating).toFixed(1)
    : "0.0";

  const getYear = () => {
    if (!movie.releaseDate) return "N/A";
    return movie.releaseDate.split("-")[0];
  };

  const imageSrc = imageError
    ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMyODI4MjgiLz48cGF0aCBkPSJNODEgMTIwQzgxIDEzMy4yNTUgOTEuNzQ1IDE0NCAxMDYgMTRDMTIwLjI1NSAxNDQgMTMxIDEzMy4yNTUgMTMxIDEyMEMxMzEgMTA2Ljc0NSAxMjAuMjU1IDk2IDEwNiA5NkM5MS43NDUgOTYgODEgMTA2Ljc0NSA4MSAxMjBaTTE0MSAyMTBWNjFINzFWMjEwSDE0MVoiIGZpbGw9IiM1RTVFNUUiLz48L3N2Zz4="
    : movie.poster;

  // Ensure trailer is in correct YouTube embed format
  const trailerUrl =
    movie.trailer && movie.trailer.includes("youtube.com/watch")
      ? movie.trailer.replace("watch?v=", "embed/")
      : movie.trailer;

  return (
    <div className="movie-detail">
      {/* Backdrop + Back button */}
      <div className="movie-backdrop">
        <div
          className="backdrop-image"
          style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
        ></div>
        <div className="backdrop-overlay"></div>

        <div className="movie-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="movie-content">
        <div className="movie-poster-section">
          <div className="poster-container">
            <img
              src={imageSrc}
              alt={`${movie.title} Poster`}
              className={`movie-poster-large ${imageLoaded ? "loaded" : ""}`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {!imageLoaded && !imageError && (
              <div className="poster-skeleton"></div>
            )}
            {movie.isPremium && (
              <div className="premium-badge">Premium</div>
            )}
          </div>
        </div>

        <div className="movie-info-section">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="movie-meta">
            <span className="movie-year">{getYear()}</span>
            <span className="movie-rating">
              <span className="star">⭐</span> {formattedRating}/5
            </span>
            {movie.duration && (
              <span className="movie-duration">{movie.duration}</span>
            )}
            {movie.contentRating && (
              <span className="content-rating">{movie.contentRating}</span>
            )}
          </div>

          {movie.genre?.length > 0 && (
            <div className="movie-genres">
              {movie.genre.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          )}

          <p className="movie-description">{movie.description}</p>

          <div className="cast-crew">
            {movie.director && (
              <div className="crew-item">
                <span className="crew-role">Director</span>
                <span className="crew-name">{movie.director}</span>
              </div>
            )}
            {movie.cast &&
              movie.cast.slice(0, 3).map((actor, index) => (
                <div key={index} className="crew-item">
                  <span className="crew-role">{index === 0 ? "Cast" : ""}</span>
                  <span className="crew-name">{actor}</span>
                </div>
              ))}
          </div>

          <div className="movie-actions">
            <button className="watch-btn primary">
              <span className="play-icon">▶</span>
              Watch Now
            </button>
            <div className="action-buttons">
              <button className="action-btn" aria-label="Add to watchlist">
                <span className="btn-icon">+</span>
                <span className="btn-text">My List</span>
              </button>
              <button className="action-btn" aria-label="Like this movie">
                <span className="btn-icon">♥</span>
                <span className="btn-text">Like</span>
              </button>
              <button className="action-btn" aria-label="Share this movie">
                <span className="btn-icon">↗</span>
                <span className="btn-text">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {trailerUrl && (
        <div className="trailer-section">
          <h3 className="section-title">Trailer</h3>
          <div className="trailer-container">
            <iframe
              src={trailerUrl}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}

      {/* Similar Movies */}
      {movie.similar && movie.similar.length > 0 && (
        <div className="similar-section">
          <h3 className="section-title">More Like This</h3>
          <div className="similar-movies">
            {movie.similar.slice(0, 4).map((similarMovie) => (
              <div key={similarMovie.id} className="similar-movie">
                <img src={similarMovie.poster} alt={similarMovie.title} />
                <p>{similarMovie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
