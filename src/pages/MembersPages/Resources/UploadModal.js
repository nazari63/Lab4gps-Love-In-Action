// src/pages/MembersPages/Resources/UploadModal.js

import React, { useState } from 'react';
import styles from './UploadModal.module.css';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileType: 'PDF',
    file: null,
    status: 'Approved',
    tags: '',
    authorName: '',
    avatar: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate file upload and adding new resource
    const newResource = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      fileType: formData.fileType,
      size: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : 'N/A',
      status: formData.status,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      author: {
        name: formData.authorName,
        avatar: formData.avatar || 'https://via.placeholder.com/24',
      },
      date: 'Just now',
    };

    onUpload(newResource);
    onClose();
    setFormData({
      title: '',
      description: '',
      fileType: 'PDF',
      file: null,
      status: 'Approved',
      tags: '',
      authorName: '',
      avatar: '',
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Upload Resource</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <label>
            File Type:
            <select
              name="fileType"
              value={formData.fileType}
              onChange={handleChange}
              required
            >
              <option value="PDF">PDF</option>
              <option value="Word">Word</option>
              <option value="PPTX">PPTX</option>
              <option value="MP4">MP4</option>
            </select>
          </label>
          <label>
            File:
            <input
              type="file"
              name="file"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </label>
          <label>
            Tags (comma separated):
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., Research, Guide"
              required
            />
          </label>
          <label>
            Author Name:
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author Avatar URL:
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Optional"
            />
          </label>
          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              Upload
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
