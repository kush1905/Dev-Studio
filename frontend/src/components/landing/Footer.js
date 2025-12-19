import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          {/* Brand Column */}
          <div className="footer-col brand-col">
            <h3 className="footer-logo">Dev<span className="logo-accent">Studio</span></h3>
            <p className="footer-desc">
              Building digital experiences that matter. innovative solutions for modern businesses.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col links-col">
            <h4>Quick Links</h4>
            <a href="#projects">Projects</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Socials Column */}
          <div className="footer-col social-col">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DevStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
