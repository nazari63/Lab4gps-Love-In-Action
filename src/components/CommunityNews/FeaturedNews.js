// src/components/CommunityNews/FeaturedNews.js

import React from 'react';
import styles from './FeaturedNews.module.css';
import { FaChevronRight } from 'react-icons/fa';
import NewsCard from './NewsCard';

const FeaturedNews = () => {
  const featuredArticles = [
    {
      id: 1,
      category: 'Research',
      date: 'March 15, 2025',
      title: 'Breakthrough in Sustainable Energy Research',
      description: 'Our research team has made significant progress in developing new sustainable energy solutions...',
      author: 'John Smith',
      authorAvatar: 'https://via.placeholder.com/24',
      comments: 24,
      shares: 8,
    },
    {
      id: 2,
      category: 'Event',
      date: 'March 14, 2025',
      title: 'New Community Partners Join GPSLab Network',
      description: "We're excited to welcome five new organizational partners to our growing network...",
      author: 'Sarah Johnson',
      authorAvatar: 'https://via.placeholder.com/24',
      comments: 32,
      shares: 12,
    },
    // Add more featured articles as needed
  ];

  return (
    <section className={styles.featuredNews}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured News</h2>
        <a href="/community-news" className={styles.viewAll}>
          View All <FaChevronRight />
        </a>
      </div>
      <div className={styles.newsList}>
        {featuredArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedNews;
