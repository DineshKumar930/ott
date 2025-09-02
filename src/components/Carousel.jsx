import "./Carousel.css";
import MovieCard from "./MovieCard";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Carousel({ title, movies }) {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.firstElementChild?.offsetWidth || 300;
      carouselRef.current.scrollBy({
        left: -cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.firstElementChild?.offsetWidth || 300;
      carouselRef.current.scrollBy({
        left: cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  // ✅ Handle "Watch Now"
  const handleWatchNow = (movieId) => {
    navigate(`/movie/${movieId}`); // assumes route like /movie/:id
  };

  return (
    <div className="carousel-section">
      <div className="carousel-header">
        <h2>{title}</h2>
        <div className="carousel-controls">
          <button onClick={scrollLeft} className="carousel-btn left">
            ←
          </button>
          <button onClick={scrollRight} className="carousel-btn right">
            →
          </button>
        </div>
      </div>

      <div className="carousel-container" ref={carouselRef}>
        {movies.map((movie) => (
          <div key={movie.id} className="carousel-item">
            <MovieCard movie={movie} onWatchNow={handleWatchNow} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
