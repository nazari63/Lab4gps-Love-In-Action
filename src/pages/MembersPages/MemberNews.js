import React, { useState, useEffect } from 'react';
import './MemberNews.css';
import {
  faHeart,
  faCommentAlt,
  faShareAlt,
  faSearch,
  faFilter,
  faCalendarAlt,
  faCheck,
  faClock,
  faArrowRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Mock data for demonstration */
const featuredNewsData = [
  {
    id: 101,
    title: 'GPSLab Ranked in Top 10 Innovative Hubs',
    imageUrl: 'https://picsum.photos/900/300?random=1',
    summary: 'A major milestone for GPSLab—discover how we made it!',
    date: '2025-01-10',
    category: 'Achievements'
  },
  {
    id: 102,
    title: 'Upcoming AI Webinar: Join Our Expert Panel',
    imageUrl: 'https://picsum.photos/900/300?random=2',
    summary: 'Mark your calendar for the next big webinar event.',
    date: '2025-01-15',
    category: 'Events'
  },
  {
    id: 103,
    title: 'New Collaboration with CloudSolve',
    imageUrl: 'https://picsum.photos/900/300?random=3',
    summary: 'Integrating new cloud solutions for faster workflows.',
    date: '2025-01-20',
    category: 'Integrations'
  }
];

const allNewsData = [
  {
    id: 1,
    title: 'GPSLab Celebrates 5th Anniversary',
    summary: 'We’re thrilled to celebrate five years of innovation...',
    date: '2025-01-05',
    category: 'Achievements',
    thumbnail: 'https://picsum.photos/200/140?random=1',
    likes: 42,
    comments: 5
  },
  {
    id: 2,
    title: 'Design Thinking Workshop Announced',
    summary: 'Learn design thinking fundamentals in our next workshop...',
    date: '2025-01-06',
    category: 'Events',
    thumbnail: 'https://picsum.photos/200/140?random=2',
    likes: 10,
    comments: 2
  },
  {
    id: 3,
    title: 'Introducing GPSLab Chatbot 2.0',
    summary: 'A brand-new chatbot experience for members—faster, smarter...',
    date: '2025-01-04',
    category: 'Features',
    thumbnail: 'https://picsum.photos/200/140?random=3',
    likes: 25,
    comments: 7
  },
  {
    id: 4,
    title: 'Spotlight: Jane Doe’s Success Story',
    summary: 'Read how Jane pioneered a new workflow, boosting collaboration...',
    date: '2025-01-02',
    category: 'Spotlights',
    thumbnail: 'https://picsum.photos/200/140?random=4',
    likes: 17,
    comments: 3
  },
  // ... add more items to illustrate each category
];

/* Optional: mock events for the pinned event highlight or countdown */
const upcomingEvents = [
  {
    id: 201,
    title: 'Cybersecurity Awareness Week',
    date: '2025-02-10T10:00:00', // can store in ISO format
    description: 'A week-long focus on building a secure culture...',
    isFeatured: true
  },
  {
    id: 202,
    title: 'Monthly Hackathon',
    date: '2025-02-25T09:00:00',
    description: 'Join us in tackling creative challenges across teams...'
  }
];

const MemberNews = () => {
  // State for featured news slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // State for news items
  const [newsItems, setNewsItems] = useState(allNewsData);

  // State for search & filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // State for sorting or advanced filtering can be added here
  // e.g., const [sortBy, setSortBy] = useState('date');

  // State for upcoming events highlight
  const [highlightedEvent, setHighlightedEvent] = useState(upcomingEvents[0]);

  // Slider next/prev
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNewsData.length);
  };
  const goToPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredNewsData.length - 1 : prev - 1
    );
  };

  // Countdown logic (simple example)
  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      if (!highlightedEvent) return;
      const now = new Date().getTime();
      const eventTime = new Date(highlightedEvent.date).getTime();
      const distance = eventTime - now;
      if (distance < 0) {
        setCountdown('Event is live or has ended.');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        setCountdown(`${days}d ${hours}h ${minutes}m left`);
      }
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, [highlightedEvent]);

  // Filtered News Items
  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle Like, Comment, Share
  const handleLike = (id) => {
    setNewsItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };
  const handleComment = (id) => {
    alert(`Comment on news item #${id} (not implemented).`);
  };
  const handleShare = (id) => {
    alert(`Share news item #${id} (not implemented).`);
  };

  // Handle Submit Your News
  const handleSubmitNews = () => {
    alert('Open “Submit Your News” form/modal (not implemented).');
  };

  return (
    <div className="member-news-container">
      {/* ---------------- Hero Section ---------------- */}
      <div className="member-news-hero">
        <div className="hero-content">
          <h1 className="hero-title">Member News</h1>
          <p className="hero-subtitle">Stay Informed, Stay Engaged</p>
        </div>
        {/* Optional: abstract or animated background shapes */}
        <div className="hero-background-abstract" />
      </div>

      {/* ---------------- Featured News Slider (Optional) ---------------- */}
      <div className="featured-news-slider">
        <button className="slider-btn prev" onClick={goToPrevSlide}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="featured-slide">
          <img
            src={featuredNewsData[currentSlide].imageUrl}
            alt={`Featured ${featuredNewsData[currentSlide].title}`}
            className="slide-image"
          />
          <div className="slide-overlay">
            <h2>{featuredNewsData[currentSlide].title}</h2>
            <p>{featuredNewsData[currentSlide].summary}</p>
            <span className="slide-date">{featuredNewsData[currentSlide].date}</span>
          </div>
        </div>
        <button className="slider-btn next" onClick={goToNextSlide}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      {/* ---------------- Event Promotion & Countdown ---------------- */}
      {highlightedEvent && (
        <div className="event-promotion">
          <FontAwesomeIcon icon={faCalendarAlt} className="event-icon" />
          <div className="event-info">
            <h3>Upcoming Event: {highlightedEvent.title}</h3>
            {countdown ? (
              <p className="event-countdown">
                <FontAwesomeIcon icon={faClock} className="countdown-icon" />
                {countdown}
              </p>
            ) : null}
            <button
              className="event-register-btn"
              onClick={() => alert('Register/RSVP flow not implemented')}
            >
              RSVP Now
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Search & Filter Controls ---------------- */}
      <div className="news-filters">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Achievements">Achievements & Milestones</option>
            <option value="Events">Upcoming Events & Webinars</option>
            <option value="Features">New Features & Integrations</option>
            <option value="Spotlights">Member Spotlights & Success Stories</option>
          </select>
        </div>

        <button className="submit-news-btn" onClick={handleSubmitNews}>
          Submit Your News
        </button>
      </div>

      {/* ---------------- News Feed Cards ---------------- */}
      <div className="news-feed">
        {filteredNews.map((news) => (
          <div key={news.id} className="news-card">
            <div className="card-thumbnail">
              <img src={news.thumbnail} alt={news.title} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{news.title}</h3>
              <small className="card-date">{news.date}</small>
              <p className="card-summary">{news.summary}</p>
              <div className="card-actions">
                <button className="action-btn" onClick={() => handleLike(news.id)}>
                  <FontAwesomeIcon icon={faHeart} className="action-icon" />
                  <span>{news.likes}</span>
                </button>
                <button className="action-btn" onClick={() => handleComment(news.id)}>
                  <FontAwesomeIcon icon={faCommentAlt} className="action-icon" />
                  <span>{news.comments}</span>
                </button>
                <button className="action-btn" onClick={() => handleShare(news.id)}>
                  <FontAwesomeIcon icon={faShareAlt} className="action-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Closing Note & CTA ---------------- */}
      <div className="news-closing-cta">
        <p>
          Keep the momentum going—share your latest achievements, upcoming events, and success
          stories. Let’s celebrate each other and keep our community informed!
        </p>
        <button className="cta-btn" onClick={handleSubmitNews}>
          Share a Success Story
        </button>
      </div>
    </div>
  );
};

export default MemberNews;
