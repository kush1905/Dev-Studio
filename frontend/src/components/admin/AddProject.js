import React, { useState, useEffect, useCallback } from 'react';
import api from '../../utils/axios';
import ImageCropper from './ImageCropper';
import './AddProject.css';

function AddProject() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await api.get('/admin/projects?limit=100'); // Fetch all for now
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
      e.target.value = null; // Reset input
    }
  };

  const onCropComplete = (croppedBlob) => {
    setFormData({ ...formData, image: croppedBlob });
    setPreviewUrl(URL.createObjectURL(croppedBlob));
    setShowCropper(false);
  };

  const onCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      description: project.description,
      image: null // Keep existing unless changed
    });
    setPreviewUrl(project.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
      setMessage('Project deleted successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete project.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', image: null });
    setPreviewUrl('');
    setImageSrc(null);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.name || !formData.description) {
      setMessage('Please fill all required fields.');
      return;
    }

    if (!editingId && !formData.image) {
      setMessage('Please upload an image for new projects.');
      return;
    }

    setLoading(true);
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('description', formData.description);
    if (formData.image) {
      // Append with a filename so Multer detects it as a file
      payload.append('image', formData.image, 'image.jpg');
    }

    try {
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Project updated successfully!');
      } else {
        await api.post('/admin/projects', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Project added successfully!');
      }

      setEditingId(null);
      setFormData({ name: '', description: '', image: null });
      setPreviewUrl('');
      setImageSrc(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'Error saving project.');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:')) return url; // Handle full URLs and blob URLs
    return `http://localhost:5001${url}`; // Prepend base URL for relative paths
  };

  return (
    <div className="add-project-container">
      <h2 className="section-title">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
      {message && <div className={`form-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="form-input-file"
          />
          {previewUrl && (
            <div className="image-preview">
              <img src={getImageUrl(previewUrl)} alt="Preview" />
              {(!editingId || formData.image) && <p className="preview-note">Ready to upload</p>}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Add Project')}
          </button>
          {editingId && (
            <button type="button" className="cancel-button" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="projects-list">
        <h3 className="list-title">Existing Projects</h3>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project._id} className="project-card">
              <img src={getImageUrl(project.image)} alt={project.name} className="project-card-image" />
              <div className="project-card-content">
                <h4>{project.name}</h4>
                <p>{project.description.substring(0, 60)}...</p>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(project._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCropper && (
        <ImageCropper
          imageSrc={imageSrc}
          onCropComplete={onCropComplete}
          onCancel={onCropCancel}
          aspect={450 / 350}
        />
      )}
    </div>
  );
}

export default AddProject;
