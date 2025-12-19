import React from 'react';
import './Hero.css';

function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <span className="hero-label">Innovative & Creative</span>

        <h1 className="hero-title">
          Building digital products<br />
          that matter.
        </h1>

        <p className="hero-subtitle">
          We craft premium digital experiences for forward-thinking brands.
          Clean, scalable, and built for the future.
        </p>

        <div className="hero-buttons">
          <button className="hero-btn hero-btn-primary" onClick={scrollToProjects}>
            View Our Work
          </button>
          <button className="hero-btn hero-btn-secondary" onClick={scrollToContact}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
