// src/components/CommunityNews/NewsCard.js

import React from 'react';
import styles from './NewsCard.module.css';
import { FaComments, FaShareAlt } from 'react-icons/fa';

const NewsCard = ({ article }) => {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{article.category}</span>
        <span className={styles.date}>{article.date}</span>
      </div>
      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.footer}>
        <div className={styles.author}>
          <img
            src={article.authorAvatar}
            alt={`${article.author}'s avatar`}
            className={styles.avatar}
          />
          <span className={styles.authorName}>{article.author}</span>
        </div>
        <div className={styles.interactions}>
          <div className={styles.comment}>
            <FaComments className={styles.icon} />
            <span>{article.comments}</span>
          </div>
          <div className={styles.share}>
            <FaShareAlt className={styles.icon} />
            <span>{article.shares}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
