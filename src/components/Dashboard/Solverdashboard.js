// src/components/Solverdashboard.js
import React from 'react';
import '../styles/Solverdashboard.css';
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faChartLine,
  faBookmark,
  faUsers,
  faNewspaper,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

/********************************************
 *  LeftSidebar Component
 ********************************************/
const LeftSidebar = ({ user }) => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080';
  const profilePictureUrl = user?.profile_picture?.startsWith('http')
    ? user.profile_picture
    : `${baseUrl}${user?.profile_picture || ''}`;

  return (
    <aside className="left-sidebar">
      {/* Container 1: User Info */}
      <div className="sidebar-section user-info">
        <div className="background-image"></div>
        <div className="profile-section">
          <img
            src={profilePictureUrl || '/default-profile.png'}
            alt={`${user?.first_name || 'User'}'s Profile`}
            className="profile-picture"
          />
          <h2 className="user-name">
            {user?.first_name || 'First Name'} {user?.last_name || 'Last Name'}
          </h2>
        </div>
      </div>

      {/* Container 2: Profile Views and Impressions */}
      <div className="sidebar-section profile-stats">
        <div className="stat-item">
          <FontAwesomeIcon icon={faUserFriends} className="stat-icon" />
          <div>
            <span className="stat-number">150</span>
            <span className="stat-label">Profile Views</span>
          </div>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faChartLine} className="stat-icon" />
          <div>
            <span className="stat-number">75</span>
            <span className="stat-label">Impressions</span>
          </div>
        </div>
      </div>

      {/* Container 3: My Startups */}
      <div className="sidebar-section my-startups">
        <h3 className="section-title">My Startups</h3>
        <ul className="startup-list">
          <li className="startup-item">
            <span className="startup-name">Startup Alpha</span>
          </li>
          <li className="startup-item">
            <span className="startup-name">Beta Innovations</span>
          </li>
        </ul>
        <a href="/startups" className="see-more-link">
          See More
        </a>
      </div>

      {/* Container 4: My Submitted Problems */}
      <div className="sidebar-section my-submitted-problems">
        <h3 className="section-title">My Submitted Problems</h3>
        <ul className="submitted-problems-list">
          <li className="submitted-problem-item">
            <span className="submitted-problem-name">Water Scarcity in City X</span>
          </li>
          <li className="submitted-problem-item">
            <span className="submitted-problem-name">Air Pollution in City Y</span>
          </li>
        </ul>
        <a href="/my-submitted-problems" className="see-more-link">
          See More
        </a>
      </div>

      {/* Container 5: Saved Items, Groups, Newsletters, Events */}
      <div className="sidebar-section additional-links">
        <h3 className="section-title">Saved Items</h3>
        <ul className="links-list">
          <li className="link-item">
            <FontAwesomeIcon icon={faBookmark} className="link-icon" />
            <span>Articles</span>
          </li>
          <li className="link-item">
            <FontAwesomeIcon icon={faUsers} className="link-icon" />
            <span>Groups</span>
          </li>
          <li className="link-item">
            <FontAwesomeIcon icon={faNewspaper} className="link-icon" />
            <span>Newsletters</span>
          </li>
          <li className="link-item">
            <FontAwesomeIcon icon={faCalendarAlt} className="link-icon" />
            <span>Events</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/********************************************
 *  MissionProgress - Timeline
 ********************************************/
const MissionProgress = () => {
  // Example Missions Data
  const missions = [
    { id: 1, name: 'Mission 1: Research Phase', status: 'Completed' },
    { id: 2, name: 'Mission 2: Prototype Development', status: 'In Progress' },
    { id: 3, name: 'Mission 3: User Testing', status: 'Not Started' }
  ];

  return (
    <div className="progress-visualization-container">
      <h2 className="progress-title">Your Mission Progress</h2>
      <div className="missions-timeline">
        {missions.map((mission) => {
          let statusClass = '';
          if (mission.status === 'Completed') statusClass = 'completed-mission';
          else if (mission.status === 'In Progress') statusClass = 'inprogress-mission';
          else statusClass = 'notstarted-mission';

          return (
            <div key={mission.id} className={`mission-item ${statusClass}`}>
              <div className="mission-status-indicator"></div>
              <div className="mission-content">
                <h3 className="mission-name">{mission.name}</h3>
                <p className="mission-status">{mission.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/********************************************
 *  BarChart Component (Original Progress Bars)
 ********************************************/
const BarChart = ({ data }) => {
  // Each data item has label, value
  const maxValue = Math.max(...data.map((d) => d.value));
  return (
    <div className="bar-chart">
      {data.map((item, idx) => (
        <div key={idx} className="bar-container">
          <div
            className="bar"
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: '#0077B5'
            }}
          ></div>
          <span className="bar-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

/********************************************
 *  PieChart Component
 ********************************************/
const PieChart = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativePercent = 0;

  const slices = data.map((item, i) => {
    const [startX, startY] = polarToCartesian(cumulativePercent / total);
    cumulativePercent += item.value;
    const [endX, endY] = polarToCartesian(cumulativePercent / total);

    const largeArcFlag = item.value / total > 0.5 ? 1 : 0;

    return (
      <path
        key={i}
        d={`
          M 0 0
          L ${startX} ${startY}
          A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z
        `}
        fill={getRandomColor(i)}
      />
    );
  });

  function polarToCartesian(fraction) {
    const angle = 2 * Math.PI * fraction;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return [x, y];
  }

  function getRandomColor(index) {
    const colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722'];
    return colors[index % colors.length];
  }

  return (
    <svg viewBox="-1 -1 2 2" className="pie-chart">
      {slices}
    </svg>
  );
};

/********************************************
 *  DonutChart Component
 ********************************************/
const DonutChart = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativePercent = 0;

  const slices = data.map((item, i) => {
    const [startX, startY] = polarToCartesian(cumulativePercent / total);
    cumulativePercent += item.value;
    const [endX, endY] = polarToCartesian(cumulativePercent / total);

    const largeArcFlag = item.value / total > 0.5 ? 1 : 0;

    return (
      <path
        key={i}
        d={`
          M 0 0
          L ${startX} ${startY}
          A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z
        `}
        fill={getRandomColor(i)}
        stroke="#fff"
        strokeWidth="0.02"
      />
    );
  });

  function polarToCartesian(fraction) {
    const angle = 2 * Math.PI * fraction;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return [x, y];
  }

  function getRandomColor(index) {
    const colors = ['#e53935','#d81b60','#8e24aa','#5e35b1','#3949ab','#1e88e5','#039be5','#00acc1','#00897b','#43a047','#7cb342','#c0ca33','#fdd835','#ffb300','#fb8c00','#f4511e'];
    return colors[index % colors.length];
  }

  return (
    <svg viewBox="-1 -1 2 2" className="donut-chart">
      {slices}
      {/* Donut Hole */}
      <circle cx="0" cy="0" r="0.5" fill="#ffffff" />
    </svg>
  );
};

/********************************************
 *  LineChart Component
 ********************************************/
const LineChart = ({ data }) => {
  const width = 300;
  const height = 150;
  const padding = 20;

  const maxX = Math.max(...data.map((p) => p.x));
  const maxY = Math.max(...data.map((p) => p.y));

  const points = data.map((p) => ({
    x: padding + (p.x / maxX) * (width - 2 * padding),
    y: height - padding - (p.y / maxY) * (height - 2 * padding)
  }));

  const pathD = points.reduce((acc, point, idx) => {
    if (idx === 0) return `M ${point.x},${point.y}`;
    return acc + ` L ${point.x},${point.y}`;
  }, '');

  return (
    <svg width={width} height={height} className="line-chart">
      {/* Axes */}
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#000" />
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#000" />

      {/* Line Path */}
      <path d={pathD} fill="none" stroke="#0077B5" strokeWidth="2" />

      {/* Points */}
      {points.map((pt, idx) => (
        <circle key={idx} cx={pt.x} cy={pt.y} r="3" fill="#0077B5" />
      ))}
    </svg>
  );
};

/********************************************
 *  DashboardAnalytics Component
 ********************************************/
const DashboardAnalytics = () => {
  // Original Bar Chart Data
  const dataBar = [
    { label: 'Completed', value: 60 },
    { label: 'In Progress', value: 25 },
    { label: 'Not Started', value: 15 }
  ];

  // Additional Charts Data
  const dataPie = [
    { label: 'Completed', value: 50 },
    { label: 'In Progress', value: 30 },
    { label: 'Not Started', value: 20 }
  ];

  const dataDonut = [
    { label: 'Alpha', value: 40 },
    { label: 'Beta', value: 25 },
    { label: 'Gamma', value: 20 },
    { label: 'Others', value: 15 }
  ];

  const dataLine = [
    { x: 0, y: 10 },
    { x: 1, y: 30 },
    { x: 2, y: 25 },
    { x: 3, y: 45 },
    { x: 4, y: 50 },
    { x: 5, y: 60 }
  ];

  return (
    <div className="analytics-section">
      <h2 className="analytics-title">Analytics Overview</h2>

      <div className="analytics-charts-grid">
        {/* Original Bar Chart */}
        <div className="chart-container">
          <h4>Progress Bars</h4>
          <BarChart data={dataBar} />
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <h4>Pie Chart</h4>
          <PieChart data={dataPie} />
        </div>

        {/* Donut Chart */}
        <div className="chart-container">
          <h4>Donut Chart</h4>
          <DonutChart data={dataDonut} />
        </div>

        {/* Line Chart */}
        <div className="chart-container">
          <h4>Line Chart</h4>
          <LineChart data={dataLine} />
        </div>
      </div>
    </div>
  );
};

/********************************************
 *  MiddleArea Component
 ********************************************/
const MiddleArea = () => {
  return (
    <main className="middle-area">
      {/* Missions (Timeline/Tree) */}
      <MissionProgress />
      {/* Multi-Chart Analytics */}
      <DashboardAnalytics />
    </main>
  );
};

/********************************************
 *  RightSidebar Component
 ********************************************/
const RightSidebar = () => {
  const recommendedSolutions = [
    {
      id: 1,
      title: 'Implement Rainwater Harvesting',
      description:
        'Developing systems to collect and store rainwater to alleviate water scarcity.'
    },
    {
      id: 2,
      title: 'Renewable Energy Adoption',
      description:
        'Transitioning to renewable energy sources to reduce air pollution.'
    }
  ];

  const collaborationProjects = [
    {
      id: 1,
      title: 'Clean Air Initiative',
      description:
        'Looking for partners to work on reducing industrial emissions in urban areas.'
    },
    {
      id: 2,
      title: 'Educational Outreach Program',
      description:
        'Seeking volunteers to teach coding and digital skills in underprivileged schools.'
    }
  ];

  return (
    <aside className="right-sidebar">
      <div className="sidebar-section recommended-solutions">
        <h3 className="section-title">Recommended Solutions</h3>
        <ul className="solutions-list">
          {recommendedSolutions.map((solution) => (
            <li key={solution.id} className="solution-item">
              <h4 className="solution-title">{solution.title}</h4>
              <p className="solution-description">{solution.description}</p>
            </li>
          ))}
        </ul>
        <a href="/recommended-solutions" className="see-more-link">
          See More
        </a>
      </div>

      <div className="sidebar-section collaboration-projects">
        <h3 className="section-title">Projects Seeking Collaboration</h3>
        <ul className="projects-list">
          {collaborationProjects.map((project) => (
            <li key={project.id} className="project-item">
              <h4 className="project-title">{project.title}</h4>
              <p className="project-description">{project.description}</p>
            </li>
          ))}
        </ul>
        <a href="/projects-seeking-collaboration" className="see-more-link">
          See More
        </a>
      </div>
    </aside>
  );
};

/********************************************
 *  Solverdashboard (MainDashboard) Component
 ********************************************/
const Solverdashboard = () => {
  const { user } = useAuth(); // user data from auth context

  return (
    <div className="main-dashboard">
      <LeftSidebar user={user} />
      <MiddleArea />
      <RightSidebar />
    </div>
  );
};

export default Solverdashboard;
