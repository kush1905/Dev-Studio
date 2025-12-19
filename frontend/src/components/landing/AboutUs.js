import React from 'react';
import ScrollReveal from '../ScrollReveal';
import './AboutUs.css';

function AboutUs() {
    return (
        <section className="about-section" id="about">
            <ScrollReveal className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="section-title text-left">About Us</h2>
                        <p className="about-description">
                            We are a team of visionary developers and designers dedicated to building digital experiences that matter.
                            Our passion lies in bridging the gap between complex technology and intuitive user interfaces.
                        </p>
                        <p className="about-description">
                            With years of expertise in full-stack development, cloud architecture, and UI/UX design, we transform ideas into
                            robust, scalable, and beautiful software solutions.
                        </p>
                        <div className="about-stats">
                            <div className="stat-item">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Years Exp.</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">Clients</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Team collaboration"
                            className="about-image"
                        />
                        <div className="image-overlay"></div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}

export default AboutUs;
