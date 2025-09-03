import "./Carousel.css";
import MovieCard from "./MovieCard";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Carousel({ title, movies }) {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to enable/disable buttons
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Set up event listeners and initial check
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      checkScrollPosition();
      carousel.addEventListener("scroll", checkScrollPosition);
      
      // Clean up
      return () => {
        carousel.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [movies]); // Re-run when movies change

  // Re-check scroll position when movies change
  useEffect(() => {
    // Timeout to allow DOM to update
    setTimeout(checkScrollPosition, 100);
  }, [movies]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleWatchNow = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div 
      className="carousel-section"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="carousel-header">
        <h2>{title}</h2>
        <div className={`carousel-controls ${showControls ? 'visible' : ''}`}>
          <button 
            onClick={scrollLeft} 
            className="carousel-btn left"
            disabled={!canScrollLeft}
          >
            ←
          </button>
          <button 
            onClick={scrollRight} 
            className="carousel-btn right"
            disabled={!canScrollRight}
          >
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