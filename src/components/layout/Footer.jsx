import "./Footer.css";
import React from "react";
import { useSelector } from "react-redux";

function Footer() {
  const { isDarkMode } = useSelector((state) => state.movies);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`f-footer ${isDarkMode ? "" : "light-mode"}`}>
      <div className="f-footer-container">
        <div className="f-footer-content">
          <div className="f-footer-main">
            <div className="f-footer-logo">
              <h3>
                Crazy<span>flix</span>
              </h3>
              <p>Your ultimate streaming destination for premium content</p>

              <div className="f-social-links">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <div className="f-footer-links">
              <div className="f-footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#press">Press</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#investor">Investor Relations</a></li>
                </ul>
              </div>

              <div className="f-footer-column">
                <h4>Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#devices">Supported Devices</a></li>
                  <li><a href="#gift">Gift Cards</a></li>
                  <li><a href="#faq">FAQ</a></li>
                </ul>
              </div>

              <div className="f-footer-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#cookies">Cookie Policy</a></li>
                  <li><a href="#copyright">Copyright Notice</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                </ul>
              </div>

              <div className="f-footer-column">
                <h4>Browse</h4>
                <ul>
                  <li><a href="#movies">Movies</a></li>
                  <li><a href="#tv">TV Shows</a></li>
                  <li><a href="#originals">Originals</a></li>
                  <li><a href="#kids">Kids</a></li>
                  <li><a href="#categories">Categories</a></li>
                </ul>
              </div>
            </div>
          </div>

        
        </div>

        <div className="f-footer-bottom">
          <div className="f-footer-bottom-content">
            <p>&copy; {currentYear} Crazyflix. All rights reserved.</p>
            <div className="f-footer-legal">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#cookies">Cookies</a>
            </div>
            <button
              className="f-scroll-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <i className="fas fa-chevron-up"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
