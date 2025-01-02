// src/components/Notification/Notification.js

import React, { useState } from 'react';
import '../styles/Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCheck,
  faTrash,
  faThumbTack, // Use faThumbTack instead of faThumbt
  faCog,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Notification.js
 *
 * A robust notifications feed that:
 * 1. Shows pinned notifications at the top.
 * 2. Groups notifications by date.
 * 3. Allows marking single/multiple notifications as read.
 * 4. Lets the user dismiss (delete) notifications.
 * 5. Offers a small "Notification Settings" panel to toggle categories on/off.
 * 6. Dummy data & local state for demonstration.
 */

const Notification = () => {
  // ------------------------------------------
  // Dummy Notification Data
  // ------------------------------------------
  const initialNotifications = [
    {
      id: 'n1',
      title: 'New Direct Message',
      message: 'John Doe: "Hey, can we discuss the road infrastructure project?"',
      date: '2025-01-12T10:15:00Z',
      category: 'messages',
      isRead: false,
      isPinned: false,
    },
    {
      id: 'n2',
      title: 'Problem Status Update',
      message: 'Your submitted problem "Water Scarcity in Nairobi" has a new comment.',
      date: '2025-01-12T09:45:00Z',
      category: 'problems',
      isRead: false,
      isPinned: true, // pinned example
    },
    {
      id: 'n3',
      title: 'System Announcement',
      message: 'Platform maintenance scheduled for 2025-01-15 at 2 AM UTC.',
      date: '2025-01-12T08:00:00Z',
      category: 'system',
      isRead: true,
      isPinned: false,
    },
    {
      id: 'n4',
      title: 'Group Collaboration Invite',
      message: 'Beta Innovations invited you to join "Recycling Solutions".',
      date: '2025-01-11T18:30:00Z',
      category: 'collaboration',
      isRead: false,
      isPinned: false,
    },
    {
      id: 'n5',
      title: 'New Reaction',
      message: 'Your solution to "Health Data Management" got 5 new likes!',
      date: '2025-01-11T17:10:00Z',
      category: 'activity',
      isRead: true,
      isPinned: false,
    },
    // Add more if needed...
  ];

  // ------------------------------------------
  // Component States
  // ------------------------------------------
  const [notifications, setNotifications] = useState(initialNotifications);

  // Toggle for the small "Notification Settings" panel
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Example user preferences for categories (messages, problems, system, etc.)
  const [settings, setSettings] = useState({
    messages: true,
    problems: true,
    system: true,
    collaboration: true,
    activity: true,
  });

  // ------------------------------------------
  // Handlers
  // ------------------------------------------
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handlePin = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isPinned: !notif.isPinned } : notif
      )
    );
  };

  const toggleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Toggling categories on/off
  const handleCategoryToggle = (category) => {
    setSettings((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // ------------------------------------------
  // Derived Data & Helper Functions
  // ------------------------------------------
  // Filter out notifications if the user disabled that category
  const filteredNotifications = notifications.filter((notif) =>
    settings[notif.category]
  );

  // Separate pinned from unpinned
  const pinned = filteredNotifications.filter((n) => n.isPinned);
  const unpinned = filteredNotifications.filter((n) => !n.isPinned);

  // Group by date (just a simple "YYYY-MM-DD" grouping)
  const groupByDate = (items) => {
    const groups = {};
    items.forEach((item) => {
      const dateKey = new Date(item.date).toLocaleDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    return groups;
  };

  const pinnedGroups = groupByDate(pinned);
  const unpinnedGroups = groupByDate(unpinned);

  // Get an array of date keys (sorted newest to oldest)
  const getSortedDateKeys = (groups) => {
    return Object.keys(groups).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB - dateA; // descending order
    });
  };

  const pinnedDateKeys = getSortedDateKeys(pinnedGroups);
  const unpinnedDateKeys = getSortedDateKeys(unpinnedGroups);

  // Format a date/time string to "hh:mm a"
  const formatTime = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ------------------------------------------
  // Render
  // ------------------------------------------
  return (
    <main className="notifications-container">
      <header className="notifications-header">
        <div className="notifications-title">
          <FontAwesomeIcon icon={faBell} className="bell-icon" />
          <h2>Notifications</h2>
        </div>
        <div className="notifications-actions">
          <button className="settings-btn" onClick={toggleSettingsPanel}>
            <FontAwesomeIcon icon={faCog} />
            Settings
          </button>
          <button className="mark-all-read-btn" onClick={handleMarkAllAsRead}>
            <FontAwesomeIcon icon={faCheck} />
            Mark all as Read
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div className="notifications-settings-panel">
          <div className="settings-panel-header">
            <h3>Notification Preferences</h3>
            <button className="close-settings" onClick={toggleSettingsPanel}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="settings-section">
            <div className="settings-item">
              <label htmlFor="messages-toggle">Messages</label>
              <input
                id="messages-toggle"
                type="checkbox"
                checked={settings.messages}
                onChange={() => handleCategoryToggle('messages')}
              />
            </div>
            <div className="settings-item">
              <label htmlFor="problems-toggle">Problem Updates</label>
              <input
                id="problems-toggle"
                type="checkbox"
                checked={settings.problems}
                onChange={() => handleCategoryToggle('problems')}
              />
            </div>
            <div className="settings-item">
              <label htmlFor="system-toggle">System</label>
              <input
                id="system-toggle"
                type="checkbox"
                checked={settings.system}
                onChange={() => handleCategoryToggle('system')}
              />
            </div>
            <div className="settings-item">
              <label htmlFor="collab-toggle">Collaboration</label>
              <input
                id="collab-toggle"
                type="checkbox"
                checked={settings.collaboration}
                onChange={() => handleCategoryToggle('collaboration')}
              />
            </div>
            <div className="settings-item">
              <label htmlFor="activity-toggle">Activity</label>
              <input
                id="activity-toggle"
                type="checkbox"
                checked={settings.activity}
                onChange={() => handleCategoryToggle('activity')}
              />
            </div>
            {/* Add more categories if needed */}
          </div>
        </div>
      )}

      <section className="notifications-feed">
        {/* Pinned Section */}
        {pinned.length > 0 && (
          <div className="pinned-section">
            <h3 className="section-heading">
              <FontAwesomeIcon icon={faThumbTack} /> Pinned
            </h3>
            {pinnedDateKeys.map((dateKey) => (
              <div className="notifications-date-group" key={dateKey}>
                <div className="date-label">{dateKey}</div>
                {pinnedGroups[dateKey].map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${
                      notif.isRead ? 'read' : 'unread'
                    }`}
                  >
                    <div className="notification-header">
                      <span className="notification-title">{notif.title}</span>
                      <div className="notification-actions">
                        <button onClick={() => handlePin(notif.id)}>
                          <FontAwesomeIcon
                            icon={faThumbTack}
                            className={
                              notif.isPinned ? 'pin-icon pinned' : 'pin-icon'
                            }
                          />
                        </button>
                        <button onClick={() => handleDismiss(notif.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                    <div className="notification-body">
                      <p className="notification-message">{notif.message}</p>
                      <small className="notification-time">
                        {formatTime(notif.date)}
                      </small>
                    </div>
                    {!notif.isRead && (
                      <div className="notification-footer">
                        <button
                          className="mark-read-btn"
                          onClick={() => handleMarkAsRead(notif.id)}
                        >
                          Mark as Read
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Unpinned Section */}
        {unpinned.length > 0 ? (
          unpinnedDateKeys.map((dateKey) => (
            <div className="notifications-date-group" key={dateKey}>
              <div className="date-label">{dateKey}</div>
              {unpinnedGroups[dateKey].map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item ${
                    notif.isRead ? 'read' : 'unread'
                  }`}
                >
                  <div className="notification-header">
                    <span className="notification-title">{notif.title}</span>
                    <div className="notification-actions">
                      <button onClick={() => handlePin(notif.id)}>
                        <FontAwesomeIcon
                          icon={faThumbTack}
                          className={
                            notif.isPinned ? 'pin-icon pinned' : 'pin-icon'
                          }
                        />
                      </button>
                      <button onClick={() => handleDismiss(notif.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  <div className="notification-body">
                    <p className="notification-message">{notif.message}</p>
                    <small className="notification-time">
                      {formatTime(notif.date)}
                    </small>
                  </div>
                  {!notif.isRead && (
                    <div className="notification-footer">
                      <button
                        className="mark-read-btn"
                        onClick={() => handleMarkAsRead(notif.id)}
                      >
                        Mark as Read
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          // If user disabled all categories or no unpinned notifications
          <div className="no-notifications">You’re all caught up!</div>
        )}
      </section>
    </main>
  );
};

export default Notification;
