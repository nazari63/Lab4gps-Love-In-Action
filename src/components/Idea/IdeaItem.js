import React, { useState } from 'react';
import styles from './IdeaItem.module.css';
import { FaDownload, FaSave, FaShare, FaCommentDots } from 'react-icons/fa';
import Comment from './Comment';

const IdeaItem = ({ idea, onDownload, onSave, onShare, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(idea.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const comment = {
      id: Date.now(),
      author: 'Current User',
      content: newComment,
      replies: [],
    };
    setComments([...comments, comment]);
    setNewComment('');
    onAddComment(idea.id, newComment); // Notify parent to update state if needed
  };

  const handleReply = (parentId, replyContent) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              author: 'Current User',
              content: replyContent,
              replies: [],
            },
          ],
        };
      }
      return comment;
    });
    setComments(updatedComments);
    onAddComment(idea.id, replyContent); // Notify parent to update state if needed
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{idea.title}</h3>
        <span className={`${styles.status} ${styles[idea.status.toLowerCase().replace(' ', '-')]}`}>
          {idea.status}
        </span>
      </header>
      <p className={styles.author}>
        Posted by {idea.author} • {new Date(idea.date).toLocaleDateString()}
      </p>
      <p className={styles.description}>{idea.description}</p>
      <div className={styles.tags}>
        {idea.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={() => onDownload(idea.id)} aria-label="Download Idea">
          <FaDownload /> Download
        </button>
        <button className={styles.actionButton} onClick={() => onSave(idea.id)} aria-label="Save Idea">
          <FaSave /> Save
        </button>
        <button className={styles.actionButton} onClick={() => onShare(idea.id)} aria-label="Share Idea">
          <FaShare /> Share
        </button>
        <button
          className={styles.actionButton}
          onClick={() => setShowComments(!showComments)}
          aria-expanded={showComments}
          aria-controls={`comments-${idea.id}`}
        >
          <FaCommentDots /> {comments.length} Comments
        </button>
      </div>
      {showComments && (
        <section id={`comments-${idea.id}`} className={styles.commentsSection}>
          <div className={styles.addComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className={styles.commentInput}
              aria-label="Add a comment"
            />
            <button onClick={handleAddComment} className={styles.commentButton}>
              Post
            </button>
          </div>
          <div className={styles.commentsList}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default IdeaItem;
