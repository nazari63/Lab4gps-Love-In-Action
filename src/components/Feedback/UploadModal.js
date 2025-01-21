// src/components/Feedback/UploadModal.js

import React, { useState, useEffect, useRef } from 'react';
import styles from './UploadModal.module.css';
import { FaTimes } from 'react-icons/fa';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Feature Request');
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.querySelector('input')?.focus();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') return;

    const newFeedback = {
      id: Date.now(),
      title,
      description,
      category,
      status: 'Pending Review',
      daysAgo: 0,
      date: new Date().toISOString(),
      comments: 0,
    };

    onUpload(newFeedback);
    setTitle('');
    setDescription('');
    setCategory('Feature Request');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Modal"
        >
          <FaTimes />
        </button>
        <h2 className={styles.modalTitle}>Submit New Feedback</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              required
            />
          </label>
          <label className={styles.label}>
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="Feature Request">Feature Request</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Enhancement">Enhancement</option>
            </select>
          </label>
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
