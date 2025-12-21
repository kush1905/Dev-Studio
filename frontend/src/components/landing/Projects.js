import ScrollReveal from '../ScrollReveal';
import './Projects.css';

function Projects({ projects, loading }) {
  console.log('Projects Data:', projects);

  // Duplicate x4 for seamless infinite scroll and robust buffering
  const displayProjects = [...projects, ...projects, ...projects, ...projects];

  return (
    <section className="projects-section" id="projects">
      <ScrollReveal className="container">
        <h2 className="section-title">Our Projects</h2>
        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="empty-state">No projects available yet.</div>
        ) : (
          <div className="scroll-container">
            <div className="scroll-track">
              {displayProjects.map((project, index) => (
                <div key={`${project._id}-${index}`} className="project-card">
                  <div className="project-image-container">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="project-image"
                    />
                  </div>
                  <div className="project-content">
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    <button className="read-more-btn">Read More</button>
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

export default Projects;



