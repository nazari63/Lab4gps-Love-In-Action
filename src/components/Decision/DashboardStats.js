// src/components/Decision/DashboardStats.js

import React from 'react';
import styles from './DashboardStats.module.css';
import { FaBalanceScale, FaChartLine, FaCheckCircle } from 'react-icons/fa';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: 'Active Decisions',
      value: 12,
      change: '+3 this week',
      icon: <FaBalanceScale className={styles.icon} />,
      color: '#0077b5',
    },
    {
      id: 2,
      title: 'Participation Rate',
      value: '78%',
      change: '+5% from last month',
      icon: <FaChartLine className={styles.icon} />,
      color: '#16a34a',
    },
    {
      id: 3,
      title: 'Implemented',
      value: 45,
      change: 'This year',
      icon: <FaCheckCircle className={styles.icon} />,
      color: '#10b981',
    },
  ];

  return (
    <section className={styles.dashboard}>
      {stats.map((stat) => (
        <div key={stat.id} className={styles.card}>
          <div className={styles.header}>
            {stat.icon}
            <h3 className={styles.title}>{stat.title}</h3>
          </div>
          <p className={styles.value} style={{ color: stat.color }}>
            {stat.value}
          </p>
          <p className={styles.change}>{stat.change}</p>
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;
