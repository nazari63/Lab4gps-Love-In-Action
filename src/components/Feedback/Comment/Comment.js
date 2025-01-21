// src/components/Feedback/Comment/Comment.js

import React from 'react';
import styles from './Comment.module.css';
import { FaUserCircle } from 'react-icons/fa';

const Comment = ({ comment }) => {
  const formattedDate = new Date(comment.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.comment}>
      <FaUserCircle className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.author}>{comment.author}</div>
        <div className={styles.text}>{comment.content}</div>
        <div className={styles.date}>{formattedDate}</div>
      </div>
    </div>
  );
};

export default Comment;
