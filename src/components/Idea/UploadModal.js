import React, { useState, useEffect, useRef } from 'react';
import styles from './UploadModal.module.css';
import { FaTimes } from 'react-icons/fa';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
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

    const newIdea = {
      id: Date.now(),
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      author: 'Current User',
      date: new Date().toISOString(),
      status: 'Proposed',
      comments: [],
    };

    onUpload(newIdea);
    setTitle('');
    setDescription('');
    setTags('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close Modal">
          <FaTimes />
        </button>
        <h2 className={styles.modalTitle}>Upload New Idea</h2>
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
            Tags (comma separated)
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.submitButton}>Submit Idea</button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
