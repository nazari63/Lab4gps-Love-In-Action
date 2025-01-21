// src/pages/CommunityNewsPage/CommunityNewsPage.js

import React, { useState } from 'react';
import styles from './CommunityNewsPage.module.css';
import NavigationBar from '../../../components/CommunityNews/NavigationBar';
import Header from '../../../components/CommunityNews/Header';
import SearchFilter from '../../../components/CommunityNews/SearchFilter';
import FeaturedNews from '../../../components/CommunityNews/FeaturedNews';
import RecentNews from '../../../components/CommunityNews/RecentNews';
import LoadMoreButton from '../../../components/CommunityNews/LoadMoreButton';

const CommunityNewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([
    // Initial set of news articles
    {
      id: 1,
      category: 'Research',
      date: 'March 15, 2025',
      title: 'Breakthrough in Sustainable Energy Research',
      description:
        'Our research team has made significant progress in developing new sustainable energy solutions...',
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
      description:
        "We're excited to welcome five new organizational partners to our growing network...",
      author: 'Sarah Johnson',
      authorAvatar: 'https://via.placeholder.com/24',
      comments: 32,
      shares: 12,
    },
    // Add more initial articles as needed
  ]);

  const loadMoreNews = () => {
    // Mock function to load more news articles
    const moreArticles = [
      {
        id: 3,
        category: 'Community',
        date: 'March 13, 2025',
        title: 'Community Outreach Program Launches',
        description:
          'Introducing our new community outreach program aimed at fostering local partnerships...',
        author: 'Emily Davis',
        authorAvatar: 'https://via.placeholder.com/24',
        comments: 18,
        shares: 5,
      },
      // Add more articles as needed
    ];
    setNewsArticles((prevArticles) => [...prevArticles, ...moreArticles]);
  };

  return (
    <div className={styles.container}>
      <NavigationBar />
      <main className={styles.mainContent}>
        <Header />
        <SearchFilter />
        <FeaturedNews />
        <RecentNews />
        <LoadMoreButton onClick={loadMoreNews} />
      </main>
    </div>
  );
};

export default CommunityNewsPage;
