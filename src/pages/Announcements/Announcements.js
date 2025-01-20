// src/pages/Announcements/Announcements.js

import React, { useEffect, useState } from 'react';
import AnnouncementsService from '../../services/AnnouncementsService';
import '../../components/styles/Announcements.css';
import { useAuth } from '../../components/Context/AuthContext';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // State for creating a new announcement
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
  });

  // State for handling form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await AnnouncementsService.getAllAnnouncements();
        setAnnouncements(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load announcements.');
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AnnouncementsService.createAnnouncement(newAnnouncement);
      setAnnouncements([newAnnouncement, ...announcements]);
      setNewAnnouncement({ title: '', content: '' });
      setIsFormVisible(false);
    } catch (err) {
      console.error('Error creating announcement:', err);
      alert('Failed to create announcement.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await AnnouncementsService.deleteAnnouncement(id);
      setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
    } catch (err) {
      console.error('Error deleting announcement:', err);
      alert('Failed to delete announcement.');
    }
  };

  const handleEdit = async (id, updatedAnnouncement) => {
    try {
      await AnnouncementsService.updateAnnouncement(id, updatedAnnouncement);
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === id ? updatedAnnouncement : announcement
        )
      );
    } catch (err) {
      console.error('Error updating announcement:', err);
      alert('Failed to update announcement.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="announcements-page">
      <h2>Announcements</h2>

      {/* Admin: Button to toggle the creation form */}
      {isAdmin && (
        <button className="create-announcement-button" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Cancel' : 'Create New Announcement'}
        </button>
      )}

      {/* Admin: Announcement Creation Form */}
      {isAdmin && isFormVisible && (
        <form className="announcement-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newAnnouncement.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={newAnnouncement.content}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}

      {/* Announcements List */}
      <div className="announcements-list">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-item">
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            {isAdmin && (
              <div className="admin-actions">
                {/* Implement edit functionality as needed */}
                {/* <button onClick={() => handleEdit(announcement.id, updatedAnnouncement)}>Edit</button> */}
                <button onClick={() => handleDelete(announcement.id)} className="delete-button">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
