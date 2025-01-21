// src/components/Feedback/CommentList/CommentList.js

import React from 'react';
import styles from './CommentList.module.css';
import Comment from '../Comment/Comment';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p className={styles.noComments}>No comments yet.</p>;
  }

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
