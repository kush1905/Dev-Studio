import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    DevStudio<span className="logo-accent"></span>
                </div>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => scrollToSection('projects')}>Projects</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => scrollToSection('clients')}>Clients</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => scrollToSection('contact')}>Contact</span>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/login" className="nav-link admin-nav-link">Admin</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
