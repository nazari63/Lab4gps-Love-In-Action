// src/components/MembersPages/Dashboard.js

import React from 'react';
import styles from './Dashboard.module.css';
import StatCard from './StatCard';
import ActivityItem from './ActivityItem';
import AnnouncementItem from './Announcements/AnnouncementItem';
import UpcomingEvent from './UpcomingEvent';
import { 
  FaFolder, 
  FaUsers, 
  FaShareAlt, 
  FaRobot, 
  FaFileAlt, 
  FaCommentAlt, 
  FaLightbulb 
} from 'react-icons/fa';

const Dashboard = () => {

  const handleReadMore = (id) => {
    alert(`Navigate to announcement details for ID: ${id}`);
    // Implement navigation logic here
  };

  return (
    <main className={styles.main}>
      
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.breadcrumb}>
          <FaFolder className={styles.breadcrumbIcon} />
          <span>Dashboard</span>
        </div>
      </header>

      {/* Statistics Section */}
      <section className={styles.statistics}>
        <StatCard
          title="Active Projects"
          icon={FaFolder}
          count="24"
          percentage="12"
        />
        <StatCard
          title="Team Members"
          icon={FaUsers}
          count="156"
          percentage="8"
        />
        <StatCard
          title="Resources Shared"
          icon={FaShareAlt}
          count="1,284"
          percentage="24"
        />
        <StatCard
          title="AI Interactions"
          icon={FaRobot}
          count="3,427"
          percentage="18"
        />
      </section>

      {/* Info Sections: Recent Activities & Latest Announcements */}
      <div className={styles.infoSections}>
        {/* Recent Activities Section */}
        <section className={styles.activities}>
          <div className={styles.activitiesHeader}>
            <h2 className={styles.sectionTitle}>Recent Activities</h2>
            <button className={styles.viewAllButton}>View All</button>
          </div>
          <div className={styles.activitiesList}>
            <ActivityItem
              icon={FaFileAlt}
              description="New research paper uploaded"
              author="by Sarah Johnson"
              time="2 hours ago"
            />
            <ActivityItem
              icon={FaCommentAlt}
              description="New feedback submitted"
              author="by Mike Chen"
              time="4 hours ago"
            />
            <ActivityItem
              icon={FaLightbulb}
              description="New idea proposed"
              author="by David Kim"
              time="6 hours ago"
            />
          </div>
        </section>

        {/* Latest Announcements Section */}
        <section className={styles.announcements}>
          <div className={styles.announcementsHeader}>
            <h2 className={styles.sectionTitle}>Latest Announcements</h2>
            <button className={styles.viewAllButton}>View All</button>
          </div>
          <div className={styles.announcementsList}>
          <AnnouncementItem
            announcement={{
              id: 1,
              tag: 'Important',
              date: 'Posted by Admin',
              title: 'Quarterly Meeting Schedule',
              description: 'Please mark your calendars for the upcoming quarterly meeting on March 15, 2025.',
              comments: 0, // Assuming no comments in dashboard
            }}
            onReadMore={() => handleReadMore(1)}
          />
          <AnnouncementItem
            announcement={{
              id: 2,
              tag: 'Important',
              date: 'Posted by Admin',
              title: 'New Research Grant Opportunity',
              description: 'Applications are now open for the 2025 Research Innovation Grant.',
              comments: 0,
            }}
            onReadMore={() => handleReadMore(2)}
          />
          </div>
        </section>
      </div>

      {/* Upcoming Events Section */}
      <section className={styles.upcomingEventsSection}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <div className={styles.upcomingEventsList}>
          <UpcomingEvent
            day="15"
            month="MAR"
            title="Research Presentation"
            time="10:00 AM - 11:30 AM"
          />
          <UpcomingEvent
            day="18"
            month="MAR"
            title="Team Workshop"
            time="2:00 PM - 4:00 PM"
          />
        </div>
      </section>

    </main>
  );
};

export default Dashboard;
