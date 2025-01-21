// src/components/CommunityNews/RecentNews.js

import React from 'react';
import styles from './RecentNews.module.css';
import NewsCard from './NewsCard';

const RecentNews = () => {
  const recentArticles = [
    {
      id: 3,
      category: 'Research',
      date: 'March 15, 2025',
      title: 'Breakthrough in Sustainable Energy Research',
      description: 'Our research team has made significant progress in developing new sustainable energy solutions...',
      author: 'Michael Brown',
      authorAvatar: 'https://via.placeholder.com/24',
      comments: 24,
      shares: 8,
    },
    {
      id: 4,
      category: 'Community',
      date: 'March 14, 2025',
      title: 'New Community Partners Join GPSLab Network',
      description: "We're excited to welcome five new organizational partners to our growing network...",
      author: 'Emily Chen',
      authorAvatar: 'https://via.placeholder.com/24',
      comments: 32,
      shares: 12,
    },
    // Add more recent articles as needed
  ];

  return (
    <section className={styles.recentNews}>
      <h2 className={styles.title}>Recent News</h2>
      <div className={styles.newsList}>
        {recentArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default RecentNews;
