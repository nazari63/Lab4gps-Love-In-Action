// src/pages/DecisionPage/DecisionPage.js

import React from 'react';
import styles from './DecisionPage.module.css';
import NavigationBar from '../../../components/Decision/NavigationBar';
import DashboardStats from '../../../components/Decision/DashboardStats';
import SearchFilter from '../../../components/Decision/SearchFilter';
import DecisionList from '../../../components/Decision/DecisionList';

// Mock data for decisions
const decisions = [
  {
    id: 1,
    title: 'Implementation of New Project Management Tool',
    proposedBy: 'John Smith',
    daysAgo: 2,
    status: 'In Voting',
    description:
      'Proposal to implement a new project management tool to improve team collaboration and task tracking...',
    votes: 24,
    comments: 12,
  },
  {
    id: 2,
    title: 'Research Budget Allocation for Q2 2025',
    proposedBy: 'Sarah Johnson',
    daysAgo: 5,
    status: 'Approved',
    description:
      'Proposal for the allocation of research budget for the second quarter of 2025...',
    votes: 45,
    comments: 8,
  },
  // ... more decision objects
];

const DecisionPage = () => {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <main className={styles.mainContent}>
        <DashboardStats />
        <SearchFilter />
        <DecisionList decisions={decisions} />
      </main>
    </div>
  );
};

export default DecisionPage;
