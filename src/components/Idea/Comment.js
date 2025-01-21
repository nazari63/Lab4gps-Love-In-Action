import React, { useState } from 'react';
import styles from './Comment.module.css';
import { FaReply } from 'react-icons/fa';

const Comment = ({ comment, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    if (replyContent.trim() === '') return;
    onReply(comment.id, replyContent);
    setReplyContent('');
    setShowReply(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <span className={styles.author}>{comment.author}</span>
        <button
          className={styles.replyButton}
          onClick={() => setShowReply(!showReply)}
          aria-label="Reply to comment"
        >
          <FaReply className={styles.replyIcon} /> Reply
        </button>
      </div>
      <p className={styles.content}>{comment.content}</p>
      {showReply && (
        <div className={styles.replySection}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className={styles.replyInput}
            aria-label="Write a reply"
          />
          <button onClick={handleReply} className={styles.replyButtonPost}>
            Post Reply
          </button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
