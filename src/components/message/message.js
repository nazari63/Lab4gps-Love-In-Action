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
} from '@fortawesome/free-solid-svg-icons';

/**
 * Message.js
 *
 * Key Changes:
 * - Added top margin (or padding) in CSS to ensure the container isn't hidden by LoginHeader.
 * - Edit/Delete icons are hidden behind a three-dots button per message.
 * - Clicking the button opens a small dropdown menu with Edit / Delete options.
 * - Placeholder logic for group creation, message settings, read receipts, etc.
 * - UI remains responsive and modern.
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
      avatar: '/default-profile.png',
      lastMessage: 'Hey there! How are you?',
      unreadCount: 2,
      timestamp: '10:45 AM',
      isGroup: false,
    },
    {
      id: 'conv2',
      name: 'Project Team A',
      avatar: '', // Group icon or custom image
      lastMessage: 'Meeting at 2 PM?',
      unreadCount: 0,
      timestamp: '09:15 AM',
      isGroup: true,
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState('conv1');

  // Messages for active conversation
  const [messages, setMessages] = useState([
    {
      id: 'msg1',
      sender: 'John Doe',
      senderAvatar: '/default-profile.png',
      content: 'Hello! Can we discuss the water shortage project?',
      timestamp: '09:00 AM',
      isOwnMessage: false,
    },
    {
      id: 'msg2',
      sender: 'Me',
      senderAvatar: '/default-profile.png',
      content: 'Sure, what do you have in mind?',
      timestamp: '09:05 AM',
      isOwnMessage: true,
    },
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
  };

  // ------------------------------
  // Handlers: Sending Messages
  // ------------------------------
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Me',
      senderAvatar: '/default-profile.png',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwnMessage: true,
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
    const newContent = prompt('Edit your message:', '');
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
            />
          </div>
        </div>

        <button className="create-group-btn" onClick={openCreateGroupModal}>
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
            >
              <div className="conversation-avatar">
                {conv.isGroup ? (
                  <FontAwesomeIcon icon={faUserFriends} className="group-icon" />
                ) : (
                  <img src={conv.avatar || '/default-profile.png'} alt={conv.name} />
                )}
              </div>
              <div className="conversation-info">
                <div className="conversation-name">{conv.name}</div>
                <div className="conversation-last-message">{conv.lastMessage}</div>
              </div>
              <div className="conversation-meta">
                <span className="conversation-time">{conv.timestamp}</span>
                {conv.unreadCount > 0 && (
                  <span className="conversation-unread">{conv.unreadCount}</span>
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
              filteredConversations.find((c) => c.id === activeConversationId)?.name ||
              'Unknown'
            }
          </h2>
          <div className="chat-actions">
            <button className="chat-action-btn" onClick={toggleChatSettings}>
              <FontAwesomeIcon icon={faCog} />
            </button>
            <button className="chat-action-btn">
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
                  alt={msg.sender}
                  className="message-avatar"
                />
              )}
              <div className="message-bubble">
                <div className="message-content">{msg.content}</div>
                <div className="message-time">{msg.timestamp}</div>

                {/* Three-dot button for message menu */}
                <button
                  className="message-options-btn"
                  onClick={() => handleToggleMessageMenu(msg.id)}
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
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Edit</span>
                      </button>
                    )}

                    <button
                      className="message-dropdown-item"
                      onClick={() => handleDeleteMessageForMe(msg.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete for Me</span>
                    </button>

                    {msg.isOwnMessage && (
                      <button
                        className="message-dropdown-item"
                        onClick={() => handleDeleteMessageForEveryone(msg.id)}
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
              {['😀', '😂', '😍', '👍', '🎉'].map((emoji) => (
                <span
                  key={emoji}
                  className="emoji"
                  onClick={() => handleAddEmoji(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}

          <button className="footer-btn" onClick={handleEmojiPickerToggle}>
            <FontAwesomeIcon icon={faSmile} />
          </button>
          <button className="footer-btn">
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
          />
          <button className="footer-btn send-btn" onClick={handleSendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>

      {/* ----------------------------------------
          Create Group Modal
      ----------------------------------------- */}
      {isCreateGroupModalOpen && (
        <div className="group-modal-overlay">
          <div className="group-modal-content">
            <h2>Create New Group</h2>
            <label htmlFor="group-name-input">Group Name</label>
            <input
              id="group-name-input"
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name..."
            />

            <p className="participants-placeholder">
              <strong>Participant Selection:</strong> (Placeholder for searching/selecting)
            </p>

            <div className="group-modal-actions">
              <button className="group-modal-btn" onClick={handleCreateGroup}>
                Create
              </button>
              <button className="group-modal-btn" onClick={closeCreateGroupModal}>
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
