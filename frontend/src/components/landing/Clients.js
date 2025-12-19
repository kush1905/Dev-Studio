import React from 'react';
import ScrollReveal from '../ScrollReveal';
import './Clients.css';


function Clients({ clients, loading }) {
  // Duplicate x4 for robust seamless loop
  const displayClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="clients-section" id="clients">
      <ScrollReveal className="container">
        <h2 className="section-title">Our Clients</h2>
        {loading ? (
          <div className="loading">Loading clients...</div>
        ) : clients.length === 0 ? (
          <div className="empty-state">No clients available yet.</div>
        ) : (
          <div className="scroll-container">
            <div className="scroll-track-reverse">
              {displayClients.map((client, index) => (
                <div key={`${client._id}-${index}`} className="client-card">
                  <div className="client-image-wrapper">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="client-image"
                    />
                  </div>
                  <div className="client-content">
                    <h3 className="client-name">{client.name}</h3>
                    <p className="client-designation">{client.designation}</p>
                    <p className="client-description">{client.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}

export default Clients;


