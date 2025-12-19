import React from 'react';
import ScrollReveal from '../ScrollReveal';
import './WhyChooseUs.css';

function WhyChooseUs() {
    const features = [
        {
            title: 'Expert Team',
            description: 'Our team comprises industry veterans with proven track records in delivering high-impact solutions.',
            icon: '🏆'
        },
        {
            title: 'Modern Tech Stack',
            description: 'We leverage the latest frameworks and tools like React, Node.js, and Cloud Native technologies.',
            icon: '⚡'
        },
        {
            title: 'Design First',
            description: 'We prioritize user experience and aesthetic excellence in every pixel we craft.',
            icon: '🎨'
        }
    ];

    return (
        <section className="why-section" id="why-us">
            <ScrollReveal className="container">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}

export default WhyChooseUs;
