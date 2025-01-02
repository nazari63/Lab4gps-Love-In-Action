// src/components/Chatbot/Chatbot.js

import React, { useState, useEffect, useRef } from 'react';
import {
  FaRobot,
  FaUserFriends,
  FaTimes,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi'; // Send icon

import { useLang } from '../Context/LangContext'; // Import the useLang hook
import faqs from './faqs'; // Adjust the path based on your project structure
import '../styles/Chatbot.css'; // Ensure this path is correct

/**
 * Chatbot.js
 *
 * New Features/Changes:
 * 1. Sets a default unread bot message count (e.g., 2) when the page loads.
 * 2. Displays a red badge on the toggle button if the chatbot is closed and unreadBotCount > 0.
 * 3. Clears the unread count when the chatbot opens.
 * 4. Retains your existing code for proactive assistance, event reminders, FAQ mode, resizing, etc.
 */

const Chatbot = () => {
  // Access language from LangContext via useLang hook
  const { language } = useLang();

  // Local translation dictionary for the Chatbot
  const translations = {
    en: {
      chatbot: {
        greeting: 'Hello! How can I assist you today?',
        proactive_assistance: 'Need help finding something? I’m here to assist!',
        switch_to_human: 'Switched to Human Support. How can we assist you?',
        switch_to_ai: 'Switched to AI Support. How can I assist you today?',
        navigation_assistance:
          'Sure! I can help you navigate. Here are some sections you might be interested in:\n- Introduction to Lab4GPS\n- Collaboration Hub\n- Sponsorship Opportunities\n- Contact Us\nPlease type the name of the section you\'d like to visit.',
        faq_intro:
          'Here are some frequently asked questions. Please select a question by clicking on it below.',
        invalid_faq: 'Invalid question number. Please try again.',
        unknown_response:
          'I\'m not sure how to respond to that. Would you like to connect with a human support agent?',
        back_to_chat: 'Back to Chat',
      },
    },
    ko: {
      chatbot: {
        greeting: '안녕하세요! 오늘 무엇을 도와드릴까요?',
        proactive_assistance:
          '무언가 찾는 데 도움이 필요하신가요? 도와드릴게요!',
        switch_to_human: '인간 지원으로 전환되었습니다. 어떻게 도와드릴까요?',
        switch_to_ai: 'AI 지원으로 전환되었습니다. 오늘 무엇을 도와드릴까요?',
        navigation_assistance:
          '물론이죠! 네비게이션을 도와드릴 수 있습니다. 관심 있는 섹션은 다음과 같습니다:\n- Lab4GPS 소개\n- 협업 허브\n- 후원 기회\n- 연락처\n방문하고 싶은 섹션의 이름을 입력해주세요.',
        faq_intro:
          '여기 자주 묻는 질문들이 있습니다. 아래에서 클릭하여 질문을 선택해주세요.',
        invalid_faq: '잘못된 질문 번호입니다. 다시 시도해주세요.',
        unknown_response:
          '그에 어떻게 응답해야 할지 모르겠습니다. 인간 지원 담당자와 연결하시겠습니까?',
        back_to_chat: '챗으로 돌아가기',
      },
    },
  };

  // Helper function to retrieve translation strings
  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];

    for (const key of keys) {
      if (result[key] === undefined) {
        return path; // Fallback to the key path if translation is missing
      }
      result = result[key];
    }

    return result;
  };

  // ------------------------------
  // State Management
  // ------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isAI, setIsAI] = useState(true);

  // The initial messages from the bot
  const [messages, setMessages] = useState([
    { text: t('chatbot.greeting'), isBot: true }
  ]);

  const [userInput, setUserInput] = useState('');
  const [chatbotSize, setChatbotSize] = useState({ width: 350, height: 500 });

  const [isFAQMode, setIsFAQMode] = useState(false); // New state for FAQ mode
  const [openFAQs, setOpenFAQs] = useState([]); // Tracks which FAQs are open

  // Tracking messages container
  const messageEndRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  // For demonstration, sample event data
  const events = [
    {
      name: 'Lab4GPS Hackathon',
      date: '2024-01-15',
      link: 'https://example.com/register-hackathon',
    },
    {
      name: 'AI Conference',
      date: '2024-01-22',
      link: 'https://example.com/register-ai-conference',
    },
  ];

  // We track the count of unread bot messages
  const [unreadBotCount, setUnreadBotCount] = useState(0);

  // ------------------------------
  // On mount, set default unreadBotCount
  // so each time user visits the site, they see e.g. "2" unread
  // (You can change to 1 or any number you like)
  // ------------------------------
  useEffect(() => {
    setUnreadBotCount(2);
  }, []);

  // If user opens the chatbot, reset the unread count
  useEffect(() => {
    if (isOpen) {
      setUnreadBotCount(0);
    }
  }, [isOpen]);

  // ------------------------------
  // Sending Messages
  // ------------------------------
  // Whenever the bot sends a message AND the chatbot is closed, increment unreadBotCount
  const sendMessage = (text, isBot = false) => {
    if (isBot && !isOpen) {
      setUnreadBotCount((prev) => prev + 1);
    }
    const newMessages = [...messages, { text, isBot }];
    setMessages(newMessages);
    if (!isBot) {
      setUserInput('');
    }
  };

  // ------------------------------
  // Effects: Proactive Assistance, Reminders
  // ------------------------------
  useEffect(() => {
    if (isAI && isOpen && !isFAQMode) {
      scheduleReminders();
      sendEventReminders();
    }
    return () => {
      clearInactivityTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAI, isOpen, language, isFAQMode]);

  // Auto-scroll to bottom of chat upon new messages (when not in FAQ mode)
  useEffect(() => {
    if (!isFAQMode) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isFAQMode]);

  // ------------------------------
  // Inactivity Timer
  // ------------------------------
  const scheduleReminders = () => {
    inactivityTimerRef.current = setTimeout(() => {
      const reminder = t('chatbot.proactive_assistance');
      sendMessage(reminder, true);
    }, 30000); // 30s
  };

  const sendEventReminders = () => {
    setTimeout(() => {
      const eventList = events.map((e) => `${e.name} on ${e.date}`).join(', ');
      const reminder =
        language === 'en'
          ? `Upcoming events: ${eventList}. Would you like to sign up?`
          : `다가오는 이벤트: ${eventList}. 등록하시겠습니까?`;
      sendMessage(reminder, true);
    }, 20000);
  };

  const clearInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  const resetInactivityTimer = () => {
    clearInactivityTimer();
    inactivityTimerRef.current = setTimeout(() => {
      const reminder = t('chatbot.proactive_assistance');
      sendMessage(reminder, true);
    }, 30000);
  };

  // ------------------------------
  // Chat Window Toggle
  // ------------------------------
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Chatbot is opening
      resetInactivityTimer();
    } else {
      // Chatbot is closing
      clearInactivityTimer();
      setIsFAQMode(false);
      setOpenFAQs([]);
    }
  };

  // ------------------------------
  // AI vs Human Toggle
  // ------------------------------
  const toggleSupportType = () => {
    setIsAI(!isAI);
    const message = isAI
      ? t('chatbot.switch_to_human')
      : t('chatbot.switch_to_ai');
    sendMessage(message, true);
  };

  // ------------------------------
  // Handling User Input
  // ------------------------------
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = () => {
    if (!userInput.trim()) return;
    sendMessage(userInput);
    if (isAI) {
      simulateBotResponse(userInput);
    }
    resetInactivityTimer();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // A basic "simulateBotResponse" example
  const simulateBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let response = '';

    if (lowerInput.includes('navigate') || lowerInput.includes('help')) {
      response = t('chatbot.navigation_assistance');
    } else {
      response = t('chatbot.unknown_response');
    }

    if (response) {
      setTimeout(() => {
        sendMessage(response, true);
      }, 1000);
    }
  };

  // ------------------------------
  // FAQ Mode
  // ------------------------------
  const enterFAQMode = () => {
    setIsFAQMode(true);
    setMessages([]); // Clear existing messages
    setOpenFAQs([]);
  };

  const toggleFAQ = (index) => {
    if (openFAQs.includes(index)) {
      setOpenFAQs(openFAQs.filter((i) => i !== index));
    } else {
      setOpenFAQs([...openFAQs, index]);
    }
  };

  const exitFAQMode = () => {
    setIsFAQMode(false);
    sendMessage(t('chatbot.greeting'), true);
    resetInactivityTimer();
  };

  // ------------------------------
  // Expand/Minimize Chatbot
  // ------------------------------
  const expandChatbot = () => {
    setChatbotSize((prev) => ({
      width: Math.min(prev.width + 75, 800),
      height: Math.min(prev.height + 25, 700),
    }));
  };

  const minimizeChatbot = () => {
    setChatbotSize((prev) => ({
      width: Math.max(prev.width - 75, 350),
      height: Math.max(prev.height - 25, 500),
    }));
  };

  // Cleanup effect on unmount
  useEffect(() => {
    return () => {
      clearInactivityTimer();
    };
  }, []);

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <div className="chatbot-container">
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="chatbot-toggle"
        aria-label={
          isOpen
            ? language === 'en'
              ? 'Close Chatbot'
              : '챗봇 닫기'
            : language === 'en'
            ? 'Open Chatbot'
            : '챗봇 열기'
        }
      >
        {isOpen ? (
          <FaTimes size={24} />
        ) : (
          <FaRobot size={30} />
        )}

        {/* If chat is closed and unreadBotCount > 0, show red badge */}
        {!isOpen && unreadBotCount > 0 && (
          <span className="unread-badge">{unreadBotCount}</span>
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div
          className="chatbot-interface"
          style={{ width: `${chatbotSize.width}px`, height: `${chatbotSize.height}px` }}
        >
          {/* Chat Header */}
          <div className="chatbot-header">
            {/* Support Type Toggle */}
            <button
              onClick={toggleSupportType}
              className="support-toggle"
              aria-label={
                isAI
                  ? language === 'en'
                    ? 'Switch to Human Support'
                    : '인간 지원으로 전환'
                  : language === 'en'
                  ? 'Switch to AI Support'
                  : 'AI 지원으로 전환'
              }
            >
              {isAI ? <FaUserFriends size={20} /> : <FaRobot size={20} />}
            </button>

            {/* Resize Buttons */}
            <div className="resize-buttons">
              <button
                onClick={expandChatbot}
                className="resize-button"
                aria-label={language === 'en' ? 'Expand Chatbot' : '챗봇 확장'}
              >
                <FaPlus size={14} />
              </button>
              <button
                onClick={minimizeChatbot}
                className="resize-button"
                aria-label={language === 'en' ? 'Minimize Chatbot' : '챗봇 최소화'}
              >
                <FaMinus size={14} />
              </button>
            </div>
          </div>

          {/* Conditional: Chat vs. FAQ */}
          {!isFAQMode ? (
            <>
              {/* Chat Messages */}
              <div className="chatbot-messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.isBot ? 'bot' : 'user'}`}
                  >
                    {message.text.split('\n').map((str, i) => (
                      <React.Fragment key={i}>
                        {str}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>

              {/* Chat Input */}
              <div className="chatbot-input">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleUserInput}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    language === 'en'
                      ? isAI
                        ? 'Type here to chat with AI...'
                        : 'Type here to chat with support...'
                      : isAI
                      ? 'AI와 채팅하려면 여기에 입력하세요...'
                      : '지원과 채팅하려면 여기에 입력하세요...'
                  }
                  aria-label={language === 'en' ? 'Chat input' : '채팅 입력'}
                />
                <button
                  onClick={handleSend}
                  disabled={!userInput.trim()}
                  aria-label={
                    language === 'en' ? 'Send Message' : '메시지 보내기'
                  }
                >
                  <FiSend size={18} />
                </button>
              </div>

              {/* FAQ Trigger */}
              <div className="faq-trigger">
                <button
                  onClick={enterFAQMode}
                  className="faq-button"
                  aria-label={
                    language === 'en' ? 'View FAQs' : 'FAQ 보기'
                  }
                >
                  {language === 'en' ? 'View FAQs' : 'FAQ 보기'}
                </button>
              </div>
            </>
          ) : (
            /* FAQ Mode */
            <div className="faq-mode">
              <h2>
                {language === 'en' ? 'Frequently Asked Questions' : '자주 묻는 질문'}
              </h2>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(index)}
                      aria-label={faq.question[language]}
                    >
                      {index + 1}. {faq.question[language]}
                    </button>
                    {openFAQs.includes(index) && (
                      <div className="faq-answer">{faq.answer[language]}</div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={exitFAQMode}
                className="back-to-chat-button"
                aria-label={
                  language === 'en' ? 'Back to Chat' : '챗으로 돌아가기'
                }
              >
                {t('chatbot.back_to_chat')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
