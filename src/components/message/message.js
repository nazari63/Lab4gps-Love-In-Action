// src/components/Messages/Message.js

import React, { useState, useEffect, useRef } from 'react';
import '../styles/message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperclip,    // For attachments
  faSmile,        // For emoji picker
  faSearch,       // For searching messages
  faPaperPlane,   // For sending messages
  faEllipsisH,    // For conversation settings or more options
  faUserFriends,  // For group icon (optional group messaging)
  faUsers,        // Additional group icon for creation
  faCog,          // For Message Settings in the chat window
  faTrash,        // For Delete message icon
  faEdit,         // For Edit message icon
  faEye,          // For View Details Icon
  faTools,        // For Solve This Problem Icon
  faMapMarkerAlt, // For View on Map Icon
} from '@fortawesome/free-solid-svg-icons';

/**
 * Message.js
 *
 * Key Changes:
 * - Replaced dummy data with real images and videos.
 * - Updated message texts to simulate authentic conversations.
 * - Enhanced media handling with `mediaType` for conditional rendering.
 * - Improved accessibility with descriptive `alt` texts and `aria-labels`.
 * - Implemented lazy loading for media elements.
 */

const Message = () => {
  // ------------------------------
  // State Variables
  // ------------------------------

  // Conversations
  const [conversations, setConversations] = useState([
    {
      id: 'conv1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
      lastMessage: 'Are we still on for the meeting tomorrow?',
      unreadCount: 1,
      timestamp: '10:45 AM',
      isGroup: false,
    },
    {
      id: 'conv2',
      name: 'Design Team',
      avatar: '', // Group icon or custom image
      lastMessage: 'Please review the latest design drafts.',
      unreadCount: 0,
      timestamp: '09:15 AM',
      isGroup: true,
    },
    {
      id: 'conv3',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
      lastMessage: 'Thanks for the update!',
      unreadCount: 2,
      timestamp: 'Yesterday',
      isGroup: false,
    },
    // Add more conversations as needed
  ]);
  const [activeConversationId, setActiveConversationId] = useState('conv1');

  // Messages for active conversation
  const [messages, setMessages] = useState([
    {
      id: 'msg1',
      sender: 'John Doe',
      senderAvatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
      content: 'Hey! Are we still on for the meeting tomorrow?',
      timestamp: '10:30 AM',
      isOwnMessage: false,
      mediaType: null,
      media: null,
    },
    {
      id: 'msg2',
      sender: 'Me',
      senderAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
      content: 'Yes, absolutely! Looking forward to it.',
      timestamp: '10:32 AM',
      isOwnMessage: true,
      mediaType: null,
      media: null,
    },
    {
      id: 'msg3',
      sender: 'John Doe',
      senderAvatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
      content: 'Great! Also, check out the new project diagram.',
      timestamp: '10:35 AM',
      isOwnMessage: false,
      mediaType: 'image',
      media: 'https://images.unsplash.com/photo-1581091870624-7c75c10c2d55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Real image URL
    },
    {
      id: 'msg4',
      sender: 'Me',
      senderAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
      content: 'Looks good! Let me know if you need any changes.',
      timestamp: '10:40 AM',
      isOwnMessage: true,
      mediaType: null,
      media: null,
    },
    {
      id: 'msg5',
      sender: 'Jane Smith',
      senderAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80',
      content: 'Check out this video from our last brainstorming session.',
      timestamp: 'Yesterday',
      isOwnMessage: false,
      mediaType: 'video',
      media: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video URL
    },
    // Add more messages as needed
  ]);

  // Chat input, search, emoji toggles
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  // Toggles for modals/panels
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isChatSettingsOpen, setIsChatSettingsOpen] = useState(false);

  // Group creation fields (placeholder)
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Message settings toggles
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const [typingIndicatorsEnabled, setTypingIndicatorsEnabled] = useState(true);

  // Track which message currently has its "more" menu open
  // We'll store the message ID or null
  const [openMessageMenuId, setOpenMessageMenuId] = useState(null);

  // References
  const messageEndRef = useRef(null);

  // ------------------------------
  // Effects
  // ------------------------------
  // Scroll to bottom whenever the messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ------------------------------
  // Handlers: Conversations
  // ------------------------------
  const handleConversationClick = (conversationId) => {
    setActiveConversationId(conversationId);
    // In a real app, fetch conversation messages from the backend here
    // For simulation, you might update the `messages` state based on `conversationId`
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ------------------------------
  // Handlers: Creating a Group
  // ------------------------------
  const openCreateGroupModal = () => {
    setIsCreateGroupModalOpen(true);
  };

  const closeCreateGroupModal = () => {
    setIsCreateGroupModalOpen(false);
    setNewGroupName('');
    setSelectedParticipants([]);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newConvId = `conv-${Date.now()}`;
    const newGroup = {
      id: newConvId,
      name: newGroupName,
      isGroup: true,
      avatar: '',
      lastMessage: '',
      unreadCount: 0,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setConversations((prev) => [...prev, newGroup]);
    closeCreateGroupModal();
    setActiveConversationId(newConvId);
    // In a real app, you'd also update the backend
  };

  // ------------------------------
  // Handlers: Sending Messages
  // ------------------------------
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Me',
      senderAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80', // Real image URL
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwnMessage: true,
      mediaType: null,
      media: null,
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput('');
  };

  const handleEmojiPickerToggle = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleAddEmoji = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  // ------------------------------
  // Handlers: Message Actions
  // ------------------------------
  const handleToggleMessageMenu = (messageId) => {
    // If the menu is open for this message, close it; otherwise open it
    setOpenMessageMenuId((prevId) => (prevId === messageId ? null : messageId));
  };

  const handleEditMessage = (messageId) => {
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (!messageToEdit) return;
    const newContent = prompt('Edit your message:', messageToEdit.content);
    if (newContent !== null && newContent.trim() !== '') {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: newContent } : msg
        )
      );
    }
    setOpenMessageMenuId(null);
  };

  const handleDeleteMessageForMe = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    setOpenMessageMenuId(null);
  };

  const handleDeleteMessageForEveryone = (messageId) => {
    // In a real app, you'd also remove it for everyone
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    setOpenMessageMenuId(null);
  };

  // Chat Settings
  const toggleChatSettings = () => {
    setIsChatSettingsOpen(!isChatSettingsOpen);
  };

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <div className="message-container">
      {/* ----------------------------------------
          Sidebar: Conversation List + Create Group
      ----------------------------------------- */}
      <div className="conversation-sidebar">
        <div className="conversation-header">
          <h2 className="conversation-title">Messages</h2>
          <div className="conversation-search">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search Conversations"
            />
          </div>
        </div>

        <button className="create-group-btn" onClick={openCreateGroupModal} aria-label="Create Group">
          <FontAwesomeIcon icon={faUsers} style={{ marginRight: '6px' }} />
          Create Group
        </button>

        <div className="conversation-list">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${
                conv.id === activeConversationId ? 'active' : ''
              }`}
              onClick={() => handleConversationClick(conv.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleConversationClick(conv.id);
              }}
              aria-label={`Conversation with ${conv.name}`}
            >
              <div className="conversation-avatar">
                {conv.isGroup ? (
                  <FontAwesomeIcon icon={faUserFriends} className="group-icon" />
                ) : (
                  <img src={conv.avatar || '/default-profile.png'} alt={`${conv.name}'s Avatar`} />
                )}
              </div>
              <div className="conversation-info">
                <div className="conversation-name">{conv.name}</div>
                <div className="conversation-last-message">{conv.lastMessage}</div>
              </div>
              <div className="conversation-meta">
                <span className="conversation-time">{conv.timestamp}</span>
                {conv.unreadCount > 0 && (
                  <span className="conversation-unread" aria-label={`${conv.unreadCount} unread messages`}>
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------------------------------
          Main Chat Window
      ----------------------------------------- */}
      <div className="chat-window">
        {/* Chat Header */}
        <div className="chat-header">
          <h2 className="chat-participant">
            {
              conversations.find((c) => c.id === activeConversationId)?.name ||
              'Select a Conversation'
            }
          </h2>
          <div className="chat-actions">
            <button className="chat-action-btn" onClick={toggleChatSettings} aria-label="Chat Settings">
              <FontAwesomeIcon icon={faCog} />
            </button>
            <button className="chat-action-btn" aria-label="More Options">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>

        {/* Chat Settings Panel */}
        {isChatSettingsOpen && (
          <div className="chat-settings-panel">
            <h3>Message Settings</h3>
            <div className="settings-option">
              <label htmlFor="read-receipts-toggle">Read Receipts</label>
              <input
                id="read-receipts-toggle"
                type="checkbox"
                checked={readReceiptsEnabled}
                onChange={() => setReadReceiptsEnabled(!readReceiptsEnabled)}
              />
            </div>
            <div className="settings-option">
              <label htmlFor="typing-indicators-toggle">Typing Indicators</label>
              <input
                id="typing-indicators-toggle"
                type="checkbox"
                checked={typingIndicatorsEnabled}
                onChange={() => setTypingIndicatorsEnabled(!typingIndicatorsEnabled)}
              />
            </div>
            <div className="settings-option">
              <button className="close-settings-btn" onClick={toggleChatSettings}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Chat Body: Messages */}
        <div className="chat-body">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${msg.isOwnMessage ? 'own-message' : ''}`}
            >
              {!msg.isOwnMessage && (
                <img
                  src={msg.senderAvatar || '/default-profile.png'}
                  alt={`${msg.sender}'s Avatar`}
                  className="message-avatar"
                />
              )}
              <div className="message-bubble">
                <div className="message-content">{msg.content}</div>
                {msg.media && msg.mediaType === 'image' && (
                  <img
                    src={msg.media}
                    alt="Attached Media"
                    className="media-item media-image"
                    loading="lazy"
                  />
                )}
                {msg.media && msg.mediaType === 'video' && (
                  <video
                    src={msg.media}
                    className="media-item media-video"
                    controls
                    muted
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="message-time">{msg.timestamp}</div>

                {/* Three-dot button for message menu */}
                <button
                  className="message-options-btn"
                  onClick={() => handleToggleMessageMenu(msg.id)}
                  aria-label="Message Options"
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>

                {/* Context menu if this message's ID matches openMessageMenuId */}
                {openMessageMenuId === msg.id && (
                  <div className="message-dropdown">
                    {msg.isOwnMessage && (
                      <button
                        className="message-dropdown-item"
                        onClick={() => handleEditMessage(msg.id)}
                        aria-label="Edit Message"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Edit</span>
                      </button>
                    )}

                    <button
                      className="message-dropdown-item"
                      onClick={() => handleDeleteMessageForMe(msg.id)}
                      aria-label="Delete Message for Me"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete for Me</span>
                    </button>

                    {msg.isOwnMessage && (
                      <button
                        className="message-dropdown-item"
                        onClick={() => handleDeleteMessageForEveryone(msg.id)}
                        aria-label="Delete Message for Everyone"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Delete for Everyone</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Chat Footer: Input */}
        <div className="chat-footer">
          {isEmojiPickerOpen && (
            <div className="emoji-picker">
              {['😀', '😂', '😍', '👍', '🎉', '😢', '😎', '🤔'].map((emoji) => (
                <span
                  key={emoji}
                  className="emoji"
                  onClick={() => handleAddEmoji(emoji)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddEmoji(emoji);
                  }}
                  aria-label={`Add emoji ${emoji}`}
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}

          <button className="footer-btn" onClick={handleEmojiPickerToggle} aria-label="Add Emoji">
            <FontAwesomeIcon icon={faSmile} />
          </button>
          <button className="footer-btn" aria-label="Attach File">
            <FontAwesomeIcon icon={faPaperclip} />
          </button>
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            aria-label="Type a message"
          />
          <button className="footer-btn send-btn" onClick={handleSendMessage} aria-label="Send Message">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>

      {/* ----------------------------------------
          Create Group Modal
      ----------------------------------------- */}
      {isCreateGroupModalOpen && (
        <div className="group-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="create-group-title">
          <div className="group-modal-content">
            <h2 id="create-group-title">Create New Group</h2>
            <label htmlFor="group-name-input">Group Name</label>
            <input
              id="group-name-input"
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name..."
              aria-label="Group Name"
            />

            <p className="participants-placeholder">
              <strong>Participant Selection:</strong> (Placeholder for searching/selecting)
            </p>

            <div className="group-modal-actions">
              <button
                className="group-modal-btn"
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim()}
                aria-label="Create Group"
              >
                Create
              </button>
              <button
                className="group-modal-btn"
                onClick={closeCreateGroupModal}
                aria-label="Cancel Group Creation"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
