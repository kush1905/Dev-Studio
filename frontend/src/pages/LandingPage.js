import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import Navbar from '../components/Navbar';
import Hero from '../components/landing/Hero';
import Projects from '../components/landing/Projects';
import Clients from '../components/landing/Clients';
import ContactForm from '../components/landing/ContactForm';
import Newsletter from '../components/landing/Newsletter';
import Footer from '../components/landing/Footer';
import AboutUs from '../components/landing/AboutUs';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import AuroraBackground from '../components/AuroraBackground';
import './LandingPage.css';

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, clientsRes] = await Promise.all([
          api.get('/public/projects'),
          api.get('/public/clients'),
        ]);
        setProjects(projectsRes.data.data || []);
        setClients(clientsRes.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landing-page">
      <AuroraBackground />
      <Navbar />
      <Hero />
      <AboutUs />
      <WhyChooseUs />
      <Projects projects={projects} loading={loading} />
      <Clients clients={clients} loading={loading} />
      <ContactForm />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default LandingPage;



