// src/components/Chatbot/Chatbot.js

import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUserFriends, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi'; // Send icon
// Removed MdLanguage import since language switching is handled externally
import { useLang } from '../Context/LangContext'; // Import the useLang hook
import faqs from './faqs'; // Adjust the path based on your project structure
import '../styles/Chatbot.css'; // Ensure the path is correct

const Chatbot = () => {
    // Access language from LangContext via useLang hook
    const { language } = useLang();

    // Local translation dictionary for the Chatbot
    const translations = {
        en: {
            chatbot: {
                greeting: "Hello! How can I assist you today?",
                proactive_assistance: "Need help finding something? I’m here to assist!",
                switch_to_human: "Switched to Human Support. How can we assist you?",
                switch_to_ai: "Switched to AI Support. How can I assist you today?",
                navigation_assistance: "Sure! I can help you navigate. Here are some sections you might be interested in:\n- Introduction to Lab4GPS\n- Collaboration Hub\n- Sponsorship Opportunities\n- Contact Us\nPlease type the name of the section you'd like to visit.",
                faq_intro: "Here are some frequently asked questions. Please select a question by typing its number:\n1. What is Lab4GPS?\n2. How can I support Lab4GPS initiatives?\n3. What are GPS Projects and Start-ups?"
            }
        },
        ko: {
            chatbot: {
                greeting: "안녕하세요! 오늘 무엇을 도와드릴까요?",
                proactive_assistance: "무언가 찾는 데 도움이 필요하신가요? 도와드릴게요!",
                switch_to_human: "인간 지원으로 전환되었습니다. 어떻게 도와드릴까요?",
                switch_to_ai: "AI 지원으로 전환되었습니다. 오늘 무엇을 도와드릴까요?",
                navigation_assistance: "물론이죠! 네비게이션을 도와드릴 수 있습니다. 관심 있는 섹션은 다음과 같습니다:\n- Lab4GPS 소개\n- 협업 허브\n- 후원 기회\n- 연락처\n방문하고 싶은 섹션의 이름을 입력해주세요.",
                faq_intro: "여기 자주 묻는 질문들이 있습니다. 번호를 입력하여 질문을 선택해주세요:\n1. Lab4GPS는 무엇인가요?\n2. Lab4GPS의 이니셔티브를 어떻게 지원할 수 있나요?\n3. GPS 프로젝트와 스타트업은 무엇인가요?"
            }
        }
    };

    // Helper function to retrieve translation strings
    const t = (path) => {
        const keys = path.split('.');
        let result = translations[language];

        for (const key of keys) {
            result = result[key];
            if (!result) break;
        }

        return result || path;
    };

    // State management
    const [isOpen, setIsOpen] = useState(false);
    const [isAI, setIsAI] = useState(true);
    const [messages, setMessages] = useState([
        { text: t('chatbot.greeting'), isBot: true }
    ]);
    const [userInput, setUserInput] = useState('');
    const [chatbotSize, setChatbotSize] = useState({ width: 350, height: 500 });
    const [showingFAQ, setShowingFAQ] = useState(false);
    const messageEndRef = useRef(null);
    const inactivityTimerRef = useRef(null);

    // Sample event and document data
    const events = [
        { name: "Lab4GPS Hackathon", date: "2024-01-15", link: "https://example.com/register-hackathon" },
        { name: "AI Conference", date: "2024-01-22", link: "https://example.com/register-ai-conference" }
    ];

    const documents = [
        { name: "Climate Change Research", link: "https://example.com/climate-change" },
        { name: "Renewable Energy Whitepaper", link: "https://example.com/renewable-energy" }
    ];

    // Scroll to the bottom of messages container every time messages update
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Proactive assistance and event reminders
    useEffect(() => {
        if (isAI && isOpen) {
            scheduleReminders();
            sendEventReminders();
        }
    }, [isAI, isOpen, language]);

    // Schedule proactive assistance after 30 seconds of inactivity
    const scheduleReminders = () => {
        inactivityTimerRef.current = setTimeout(() => {
            const reminder = t('chatbot.proactive_assistance');
            sendMessage(reminder, true);
        }, 30000); // 30 seconds of inactivity
    };

    // Send event reminders
    const sendEventReminders = () => {
        setTimeout(() => {
            const eventList = events.map(e => `${e.name} on ${e.date}`).join(", ");
            const reminder = language === 'en'
                ? `Upcoming events: ${eventList}. Would you like to sign up?`
                : `다가오는 이벤트: ${eventList}. 등록하시겠습니까?`;
            sendMessage(reminder, true);
        }, 20000); // 20 seconds for demonstration; adjust as needed
    };

    // Toggle chat window
    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            resetInactivityTimer();
        } else {
            clearInactivityTimer();
        }
    };

    // Toggle support type between AI and Human
    const toggleSupportType = () => {
        setIsAI(!isAI);
        const message = isAI
            ? t('chatbot.switch_to_human')
            : t('chatbot.switch_to_ai');
        sendMessage(message, true);
    };

    // Handle user input change
    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };

    // Send message to chat
    const sendMessage = (text, isBot = false) => {
        const newMessages = [...messages, { text, isBot }];
        setMessages(newMessages);
        if (!isBot) setUserInput('');
    };

    // Simulate bot response based on user input
    const simulateBotResponse = (input) => {
        let response = "";
        const lowerInput = input.toLowerCase();

        // Visitor Guidance
        if (lowerInput.includes("navigate") || lowerInput.includes("help")) {
            response = t('chatbot.navigation_assistance');
        }
        // Personalized Recommendations
        else if (lowerInput.includes("interested in")) {
            const interest = input.split("interested in")[1].trim().toLowerCase();
            response = getPersonalizedRecommendations(interest);
        }
        // FAQ Section
        else if (lowerInput.startsWith("what") || lowerInput.startsWith("how") || lowerInput.startsWith("why")) {
            response = getFAQResponse(input);
        }
        // Connection Assistance
        else if (lowerInput.includes("connect with") || lowerInput.includes("contact")) {
            response = getConnectionAssistance(input);
        }
        // Event Registration
        else if (lowerInput.includes("register for") || lowerInput.includes("sign up for")) {
            response = getEventRegistration(input);
        }
        // Show FAQs
        else if (lowerInput === "faq" || lowerInput === "frequently asked questions") {
            response = t('chatbot.faq_intro');
        }
        // Handle FAQ selection
        else if (showingFAQ && !isNaN(parseInt(input))) {
            const faqIndex = parseInt(input) - 1;
            if (faqs[faqIndex]) {
                const answer = faqs[faqIndex].answer[language];
                response = answer;
                setShowingFAQ(false);
            } else {
                response = language === 'en'
                    ? "Invalid question number. Please try again."
                    : "잘못된 질문 번호입니다. 다시 시도해주세요.";
            }
        }
        else {
            response = language === 'en'
                ? `I'm not sure how to respond to that. Would you like to connect with a human support agent?`
                : `그에 어떻게 응답해야 할지 모르겠습니다. 인간 지원 담당자와 연결하시겠습니까?`;
        }

        setTimeout(() => {
            sendMessage(response, true);
        }, 1500); // Simulate a delay for bot response
    };

    // Function to get personalized recommendations based on user interest
    const getPersonalizedRecommendations = (interest) => {
        const recommendations = {
            "education": language === 'en'
                ? "Great! Here are some ongoing education projects:\n- Project EduTech\n- Project Learnify\nClick on any project to learn more."
                : "좋아요! 진행 중인 교육 관련 프로젝트는 다음과 같습니다:\n- 프로젝트 EduTech\n- 프로젝트 Learnify\n자세한 내용을 보려면 프로젝트를 클릭하세요.",
            "environmental sustainability": language === 'en'
                ? "Fantastic! Here are some environmental sustainability projects:\n- Project GreenEarth\n- Project AquaClean\nClick on any project to learn more."
                : "환상적입니다! 환경 지속 가능성 프로젝트는 다음과 같습니다:\n- 프로젝트 GreenEarth\n- 프로젝트 AquaClean\n자세한 내용을 보려면 프로젝트를 클릭하세요.",
            "health innovation": language === 'en'
                ? "Awesome! Here are some health innovation projects:\n- Project HealthPlus\n- Project MediCare\nClick on any project to learn more."
                : "멋집니다! 건강 혁신 프로젝트는 다음과 같습니다:\n- 프로젝트 HealthPlus\n- 프로젝트 MediCare\n자세한 내용을 보려면 프로젝트를 클릭하세요."
            // Add more interests and corresponding projects as needed
        };

        return recommendations[interest] || (language === 'en'
            ? "We have various projects across different fields. Can you specify your area of interest?"
            : "다양한 분야에 걸쳐 다양한 프로젝트가 있습니다. 관심 분야를 지정해 주시겠어요?");
    };

    // Function to get FAQ response
    const getFAQResponse = (question) => {
        const matchedFAQ = faqs.find(faq => faq.question[language].toLowerCase() === question.toLowerCase());
        if (matchedFAQ) {
            return matchedFAQ.answer[language];
        } else {
            return language === 'en'
                ? "I couldn't find an answer to that question. Would you like to ask something else or connect with a human support agent?"
                : "해당 질문에 대한 답변을 찾을 수 없습니다. 다른 질문을 하시거나 인간 지원 담당자와 연결하시겠습니까?";
        }
    };

    // Function to get connection assistance based on user input
    const getConnectionAssistance = (input) => {
        const interests = ["water purification", "renewable energy", "health innovation", "education", "environmental sustainability"];
        const matchedInterest = interests.find(interest => input.toLowerCase().includes(interest));

        if (matchedInterest) {
            const connections = {
                "water purification": {
                    name: language === 'en' ? "Jane Doe" : "제인 도",
                    role: language === 'en' ? "Project AquaClean Leader" : "프로젝트 AquaClean 리더",
                    contact: "jane.doe@lab4gps.org"
                },
                "renewable energy": {
                    name: language === 'en' ? "John Smith" : "존 스미스",
                    role: language === 'en' ? "Project GreenEarth Manager" : "프로젝트 GreenEarth 매니저",
                    contact: "john.smith@lab4gps.org"
                },
                "health innovation": {
                    name: language === 'en' ? "Alice Johnson" : "앨리스 존슨",
                    role: language === 'en' ? "Project HealthPlus Coordinator" : "프로젝트 HealthPlus 코디네이터",
                    contact: "alice.johnson@lab4gps.org"
                },
                "education": {
                    name: language === 'en' ? "Bob Lee" : "밥 리",
                    role: language === 'en' ? "Project EduTech Director" : "프로젝트 EduTech 디렉터",
                    contact: "bob.lee@lab4gps.org"
                },
                "environmental sustainability": {
                    name: language === 'en' ? "Clara Zhang" : "클라라 장",
                    role: language === 'en' ? "Project EcoFuture Head" : "프로젝트 EcoFuture 책임자",
                    contact: "clara.zhang@lab4gps.org"
                }
            };

            const connection = connections[matchedInterest];
            return language === 'en'
                ? `You might want to connect with ${connection.name}, the ${connection.role}. Would you like me to send an introduction email?`
                : `${connection.name}님, ${connection.role}와(과) 연결하고 싶으실까요? 소개 이메일을 보내드릴까요?`;
        } else {
            return language === 'en'
                ? "Could you please specify your area of interest so I can connect you with the right person?"
                : "올바른 사람과 연결할 수 있도록 관심 분야를 지정해 주시겠어요?";
        }
    };

    // Function to handle event registration
    const getEventRegistration = (input) => {
        const eventNames = events.map(e => e.name.toLowerCase());
        const matchedEvent = events.find(e => input.toLowerCase().includes(e.name.toLowerCase()));

        if (matchedEvent) {
            return language === 'en'
                ? `Great choice! You can register for ${matchedEvent.name} here: ${matchedEvent.link}`
                : `${matchedEvent.name}에 등록할 수 있습니다: ${matchedEvent.link}`;
        } else {
            return language === 'en'
                ? "I'm sorry, I couldn't find the event you're referring to. Here are our upcoming events:\n" + events.map(e => `${e.name} on ${e.date}`).join("\n")
                : "죄송합니다, 언급하신 이벤트를 찾을 수 없습니다. 다음은 예정된 이벤트입니다:\n" + events.map(e => `${e.name} on ${e.date}`).join("\n");
        }
    };

    // Removed handleLanguageChange function since language switching is handled externally

    // Handle selecting a FAQ question
    const handleSelectFAQ = (index) => {
        const answer = faqs[index].answer[language];
        sendMessage(faqs[index].question[language], false); // User selects question
        sendMessage(answer, true); // Bot provides answer
        setShowingFAQ(false);
    };

    // Reset inactivity timer
    const resetInactivityTimer = () => {
        clearInactivityTimer();
        inactivityTimerRef.current = setTimeout(() => {
            const reminder = t('chatbot.proactive_assistance');
            sendMessage(reminder, true);
        }, 30000); // 30 seconds of inactivity
    };

    // Clear inactivity timer
    const clearInactivityTimer = () => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = null;
        }
    };

    // Handle pressing Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Handle sending message
    const handleSend = () => {
        if (userInput.trim() === '') return;
        sendMessage(userInput);
        if (isAI) {
            simulateBotResponse(userInput);
        }
        resetInactivityTimer(); // Reset timer on user interaction
    };

    // Expand chatbot size
    const expandChatbot = () => {
        setChatbotSize(prevSize => ({
            width: Math.min(prevSize.width + 75, 800), // Maximum width of 800px
            height: Math.min(prevSize.height + 25, 700) // Maximum height of 700px
        }));
    };

    // Minimize chatbot size
    const minimizeChatbot = () => {
        setChatbotSize(prevSize => ({
            width: Math.max(prevSize.width - 75, 350), // Minimum width of 350px
            height: Math.max(prevSize.height - 25, 500) // Minimum height of 500px
        }));
    };

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            clearInactivityTimer();
        };
    }, []);

    return (
        <div className="chatbot-container">
            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className="chatbot-toggle"
                aria-label={isOpen ? (language === 'en' ? "Close Chatbot" : "챗봇 닫기") : (language === 'en' ? "Open Chatbot" : "챗봇 열기")}
            >
                {isOpen ? <FaTimes size={24} /> : <FaRobot size={30} />}
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
                            aria-label={isAI ? (language === 'en' ? "Switch to Human Support" : "인간 지원으로 전환") : (language === 'en' ? "Switch to AI Support" : "AI 지원으로 전환")}
                        >
                            {isAI ? <FaUserFriends size={20} /> : <FaRobot size={20} />}
                        </button>

                        {/* Resize Buttons */}
                        <div className="resize-buttons">
                            <button
                                onClick={expandChatbot}
                                className="resize-button"
                                aria-label={language === 'en' ? "Expand Chatbot" : "챗봇 확장"}
                            >
                                <FaPlus size={14} />
                            </button>
                            <button
                                onClick={minimizeChatbot}
                                className="resize-button"
                                aria-label={language === 'en' ? "Minimize Chatbot" : "챗봇 최소화"}
                            >
                                <FaMinus size={14} />
                            </button>
                        </div>

                        {/* Removed Language Toggle Button */}
                        {/* 
                        <button
                            onClick={handleLanguageChange}
                            className="language-toggle"
                            aria-label={language === 'en' ? "Change Language to Korean" : "언어를 영어로 변경"}
                        >
                            <MdLanguage size={20} />
                        </button>
                        */}
                    </div>

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

                    {/* Display FAQ Section */}
                    {showingFAQ && (
                        <div className="faq-section">
                            {faqs.map((faq, index) => (
                                <button
                                    key={index}
                                    className="faq-question"
                                    onClick={() => handleSelectFAQ(index)}
                                    aria-label={faq.question[language]}
                                >
                                    {faq.question[language]}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Chat Input */}
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleUserInput}
                            onKeyPress={handleKeyPress}
                            placeholder={
                                language === 'en'
                                    ? isAI ? "Type here to chat with AI..." : "Type here to chat with support..."
                                    : isAI ? "AI와 채팅하려면 여기에 입력하세요..." : "지원과 채팅하려면 여기에 입력하세요..."
                            }
                            aria-label={language === 'en' ? "Chat input" : "채팅 입력"}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!userInput.trim()}
                            aria-label={language === 'en' ? "Send Message" : "메시지 보내기"}
                        >
                            <FiSend size={18} />
                        </button>
                    </div>

                    {/* FAQ Trigger Button */}
                    <div className="faq-trigger">
                        <button
                            onClick={() => setShowingFAQ(true)}
                            className="faq-button"
                            aria-label={language === 'en' ? "View FAQs" : "FAQ 보기"}
                        >
                            {language === 'en' ? "View FAQs" : "FAQ 보기"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
