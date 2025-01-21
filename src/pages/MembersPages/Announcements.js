import React, { useState } from 'react';
import './Announcements.css';
import {
  faBullhorn,
  faShieldAlt,
  faCalendarAlt,
  faRocket,
  faStar as faStarSolid,
  faEnvelopeOpenText,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Announcements = () => {
  // Hard-coded announcements for demo
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Welcome to Our New Portal',
      category: 'company',
      date: '2025-01-10',
      content: 'We are excited to unveil our new GPSLab Portal...',
      isImportant: false,
      isRead: false
    },
    {
      id: 2,
      title: 'Updated Privacy Policy',
      category: 'policy',
      date: '2025-01-08',
      content: 'We have made changes to our Privacy Policy...',
      isImportant: true,
      isRead: false
    },
    {
      id: 3,
      title: 'January Meetup Reminder',
      category: 'events',
      date: '2025-01-05',
      content: 'Don’t forget our January Meetup is around the corner...',
      isImportant: false,
      isRead: false
    },
    {
      id: 4,
      title: 'New Task Management Feature',
      category: 'features',
      date: '2025-01-02',
      content: 'Introducing our brand-new Task Management module...',
      isImportant: false,
      isRead: true
    }
  ]);

  // For filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mark an announcement as read/unread or toggle important
  const handleMarkReadToggle = (id) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === id ? { ...ann, isRead: !ann.isRead } : ann
      )
    );
  };

  const handleToggleImportant = (id) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === id ? { ...ann, isImportant: !ann.isImportant } : ann
      )
    );
  };

  // Filter logic
  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesCategory =
      selectedCategory === 'all' || ann.category === selectedCategory;
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="announcements-container">
      {/* ================================
          HEADER SECTION
       ================================ */}
      <div className="announcements-header">
        <h1 className="title">Announcements</h1>
        <p className="tagline">Stay Updated, Stay Connected.</p>
      </div>

      {/* ================================
          INTRO / DESCRIPTION
       ================================ */}
      <div className="announcements-description">
        <p>
          Welcome to the GPSLab Announcements page! Here, you can receive and
          manage all important notices related to our operations, updates, and
          member activities. Stay informed and ensure you're always up-to-date
          with the latest information.
        </p>
        <p>
          Use the tools below to sort, filter, or search. Mark announcements
          as read or important, and subscribe for email or push notifications
          if you want to be instantly alerted to updates.
        </p>
      </div>

      {/* ================================
          FILTERS / SEARCH
       ================================ */}
      <div className="announcements-filters">
        <input
          type="text"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="company">Company-Wide</option>
          <option value="policy">Policy</option>
          <option value="events">Events</option>
          <option value="features">Features</option>
        </select>

        <button
          className="subscribe-button"
          onClick={() => alert('Subscription settings not yet implemented!')}
        >
          Subscribe / Manage Notifications
        </button>
      </div>

      {/* ================================
          ANNOUNCEMENT LIST
       ================================ */}
      <div className="announcements-list">
        {filteredAnnouncements.map((ann) => {
          let icon;
          switch (ann.category) {
            case 'policy':
              icon = faShieldAlt;
              break;
            case 'events':
              icon = faCalendarAlt;
              break;
            case 'features':
              icon = faRocket;
              break;
            default:
              icon = faBullhorn; // default icon for company / unknown
          }

          return (
            <div
              className={`announcement-card ${ann.isRead ? 'read' : 'unread'}`}
              key={ann.id}
            >
              <div className="card-header">
                <FontAwesomeIcon icon={icon} className="category-icon" />
                <span className="announcement-title">{ann.title}</span>
                {ann.isImportant && (
                  <FontAwesomeIcon icon={faStarSolid} className="important-star" />
                )}
              </div>
              <div className="card-body">
                <p className="announcement-content">{ann.content}</p>
              </div>
              <div className="card-footer">
                <div className="footer-left">
                  <small className="date">Posted on {ann.date}</small>
                </div>
                <div className="footer-actions">
                  <button
                    className="mark-read-btn"
                    onClick={() => handleMarkReadToggle(ann.id)}
                  >
                    {ann.isRead ? 'Mark Unread' : 'Mark Read'}
                    <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ marginLeft: '5px' }} />
                  </button>
                  <button
                    className="mark-important-btn"
                    onClick={() => handleToggleImportant(ann.id)}
                  >
                    {ann.isImportant ? 'Unmark Important' : 'Mark Important'}
                    <FontAwesomeIcon icon={faStarSolid} style={{ marginLeft: '5px' }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================
          CLOSING CTA
       ================================ */}
      <div className="announcements-footer">
        <p>
          Ready to explore past updates? Visit the{' '}
          <button
            className="archive-link"
            onClick={() => alert('Archive page not yet implemented!')}
          >
            Announcements Archive
          </button>
          .
        </p>
        <p>
          Stay informed and engaged with GPSLab. We look forward to sharing more
          updates with you soon!
        </p>
        <button
          className="manage-notifications-cta"
          onClick={() => alert('Manage Notifications not yet implemented!')}
        >
          Manage Notifications
        </button>
      </div>
    </div>
  );
};

export default Announcements;
