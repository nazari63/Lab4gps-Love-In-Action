// src/pages/MembersPages/Announcements/Announcements.js

import React, { useState } from 'react';
import styles from './Announcements.module.css';
import Header from './Header';
import Filters from './Filters';
import AnnouncementList from './AnnouncementList';
import Pagination from './Pagination';

const Announcements = () => {
  // Sample Data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      tag: 'Important',
      date: 'Posted on March 15, 2025',
      title: 'Platform Maintenance Schedule',
      description:
        'The platform will undergo scheduled maintenance this weekend. Expected downtime: Saturday, March 18, 2025, from 2 AM to 6 AM EST.',
      comments: 5,
    },
    {
      id: 2,
      tag: 'Event',
      date: 'Posted on March 14, 2025',
      title: 'Upcoming Research Symposium',
      description:
        'Join us for our annual Research Symposium where members will present their latest findings and innovations in global problem-solving.',
      comments: 12,
    },
    {
      id: 3,
      tag: 'Community',
      date: 'Posted on March 13, 2025',
      title: 'New Community Features Released',
      description:
        "We're excited to announce new community features that will enhance collaboration among members. Check out the updated profile settings.",
      comments: 8,
    },
    // Add more announcements as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;
  const totalPages = Math.ceil(announcements.length / announcementsPerPage);



  const handleNewAnnouncement = () => {
    alert('Navigate to New Announcement form');
    // Implement navigation logic here (e.g., open a modal or navigate to a new page)
  };

  const handleReadMore = (id) => {
    alert(`Navigate to announcement details for ID: ${id}`);
    // Implement navigation logic here (e.g., navigate to a detail page)
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Optionally, fetch announcements for the selected page if using pagination from backend
  };

  // Get current announcements
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  return (
    <div className={styles.announcementsContainer}>
      <Header onNewAnnouncement={handleNewAnnouncement} />

      <AnnouncementList announcements={currentAnnouncements} onReadMore={handleReadMore} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Announcements;
