// src/components/Feedback/CommentForm/CommentForm.js

import React, { useState } from 'react';
import styles from './CommentForm.module.css';
import { FaPaperPlane } from 'react-icons/fa';

const CommentForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author.trim() === '' || content.trim() === '') return;

    const newComment = {
      id: Date.now(),
      author,
      content,
      date: new Date().toISOString(),
    };

    onSubmit(newComment);
    setAuthor('');
    setContent('');
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={styles.input}
        required
        aria-label="Your Name"
      />
      <textarea
        placeholder="Your Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
        required
        aria-label="Your Comment"
      />
      <button type="submit" className={styles.submitButton}>
        <FaPaperPlane className={styles.icon} /> Submit
      </button>
    </form>
  );
};

export default CommentForm;
