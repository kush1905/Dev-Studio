import React, { useState, useEffect, useCallback } from 'react';
import api from '../../utils/axios';
import ImageCropper from './ImageCropper';
import './AddClient.css';

function AddClient() {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: '',
    image: null,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchClients = useCallback(async () => {
    try {
      const res = await api.get('/admin/clients?limit=100');
      setClients(res.data.clients || []);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

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
      e.target.value = null;
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

  const handleEdit = (client) => {
    setEditingId(client._id);
    setFormData({
      name: client.name,
      description: client.description,
      designation: client.designation,
      image: null
    });
    setPreviewUrl(client.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await api.delete(`/admin/clients/${id}`);
      setClients(clients.filter(c => c._id !== id));
      setMessage('Client deleted successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete client.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', designation: '', image: null });
    setPreviewUrl('');
    setImageSrc(null);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.name || !formData.description || !formData.designation) {
      setMessage('Please fill all required fields.');
      return;
    }

    if (!editingId && !formData.image) {
      setMessage('Please upload an image for new clients.');
      return;
    }

    setLoading(true);
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('description', formData.description);
    payload.append('designation', formData.designation);
    if (formData.image) {
      payload.append('image', formData.image, 'image.jpg');
    }

    try {
      if (editingId) {
        await api.put(`/admin/clients/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Client updated successfully!');
      } else {
        await api.post('/admin/clients', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage('Client added successfully!');
      }

      setEditingId(null);
      setFormData({ name: '', description: '', designation: '', image: null });
      setPreviewUrl('');
      setImageSrc(null);
      fetchClients();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'Error saving client.');
    } finally {
      setLoading(false);
    }
  };

  /* Helper to resolve image URL with backend origin */
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  return (
    <div className="add-client-container">
      <h2 className="section-title">{editingId ? 'Edit Client' : 'Add New Client'}</h2>
      {message && <div className={`form-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label>Client Name</label>
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
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description/Feedback</label>
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
          <label>Client Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="form-input-file"
          />
          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
              {(!editingId || formData.image) && <p className="preview-note">Ready to upload</p>}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : (editingId ? 'Update Client' : 'Add Client')}
          </button>
          {editingId && (
            <button type="button" className="cancel-button" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="projects-list">
        <h3 className="list-title">Existing Clients</h3>
        <div className="projects-grid">
          {clients.map(client => (
            <div key={client._id} className="project-card">
              <img src={getImageUrl(client.image)} alt={client.name} className="project-card-image" />
              <div className="project-card-content">
                <h4>{client.name}</h4>
                <p className="designation-text">{client.designation}</p>
                <p>{client.description.substring(0, 60)}...</p>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(client)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(client._id)}>Delete</button>
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
          aspect={1}
        />
      )}
    </div>
  );
}

export default AddClient;
