// src/components/Teaching/Teaching.js

import React from 'react';
import '../styles/Teaching.css';

/**
 * Teaching.js
 *
 * This component represents the "TA AI" specifically for the SDG activities.
 * It displays the TA AI’s data, resources, and visualizations relevant to
 * whichever SDG the user has assigned or selected in Professor.
 *
 * Usage:
 * <Teaching selectedSDGId={someId} />
 * If `selectedSDGId` is 0 or null, we prompt the user to choose an SDG.
 * Otherwise, we display data/resources for that ID.
 */

// TA's data/resources for each of the 17 SDGs:
const teachingSdgData = [
  {
    id: 1,
    name: 'SDG 1: No Poverty',
    resources: [
      'Here is the latest data on poverty rates across various countries.',
      'Access this visualization showing the correlation between education levels and poverty reduction.',
      'Here are reports on successful poverty alleviation programs implemented in different regions.',
    ],
  },
  {
    id: 2,
    name: 'SDG 2: Zero Hunger',
    resources: [
      'Here is data on global food distribution and hunger statistics.',
      'Access this map showing regions most affected by hunger.',
      'Here are case studies of successful initiatives aimed at achieving zero hunger.',
    ],
  },
  {
    id: 3,
    name: 'SDG 3: Good Health and Well-being',
    resources: [
      'Here is the latest global health data and statistics.',
      'Access this infographic on the impact of preventive healthcare measures.',
      'Here are reports on innovative healthcare solutions and their effectiveness.',
    ],
  },
  {
    id: 4,
    name: 'SDG 4: Quality Education',
    resources: [
      'Here is data on global literacy rates and educational attainment.',
      'Access this visualization showing disparities in education across different regions.',
      'Here are case studies of successful educational programs enhancing quality and accessibility.',
    ],
  },
  {
    id: 5,
    name: 'SDG 5: Gender Equality',
    resources: [
      'Here is the latest data on gender disparities in education and employment.',
      'Access this infographic on the impact of gender equality on societal growth.',
      'Here are reports on initiatives and policies that have successfully advanced gender equality.',
    ],
  },
  {
    id: 6,
    name: 'SDG 6: Clean Water and Sanitation',
    resources: [
      'Here is data on global access to clean water and sanitation facilities.',
      'Access this map showing regions facing water scarcity.',
      'Here are case studies of effective water management and sanitation projects.',
    ],
  },
  {
    id: 7,
    name: 'SDG 7: Affordable and Clean Energy',
    resources: [
      'Here is the latest data on global energy access and renewable energy adoption.',
      'Access this infographic on the environmental benefits of clean energy sources.',
      'Here are reports on successful clean energy initiatives and technologies.',
    ],
  },
  {
    id: 8,
    name: 'SDG 8: Decent Work and Economic Growth',
    resources: [
      'Here is data on global employment rates and economic growth indicators.',
      'Access this visualization showing the relationship between GDP growth and employment quality.',
      'Here are case studies of economic policies that have successfully promoted decent work and growth.',
    ],
  },
  {
    id: 9,
    name: 'SDG 9: Industry, Innovation, and Infrastructure',
    resources: [
      'Here is the latest data on global industrial growth and infrastructure development.',
      'Access this infographic on the impact of innovation on industry sustainability.',
      'Here are reports on successful infrastructure and innovation projects worldwide.',
    ],
  },
  {
    id: 10,
    name: 'SDG 10: Reduced Inequalities',
    resources: [
      'Here is data on income distribution and social inequality metrics across various countries.',
      'Access this visualization showing the impact of anti-discrimination policies.',
      'Here are case studies of successful initiatives aimed at reducing inequalities.',
    ],
  },
  {
    id: 11,
    name: 'SDG 11: Sustainable Cities and Communities',
    resources: [
      'Here is the latest data on urbanization trends and sustainability indicators.',
      'Access this infographic on the benefits of sustainable urban planning.',
      'Here are reports on innovative solutions for creating resilient cities.',
    ],
  },
  {
    id: 12,
    name: 'SDG 12: Responsible Consumption and Production',
    resources: [
      'Here is data on resource usage and waste generation across industries.',
      'Access this visualization showing the lifecycle of products from production to consumption.',
      'Here are case studies of companies that have successfully implemented sustainable practices.',
    ],
  },
  {
    id: 13,
    name: 'SDG 13: Climate Action',
    resources: [
      'Here is the latest data on greenhouse gas emissions and climate indicators.',
      'Access this infographic on the effects of climate change on global weather patterns.',
      'Here are reports on successful climate action initiatives and policies.',
    ],
  },
  {
    id: 14,
    name: 'SDG 14: Life Below Water',
    resources: [
      'Here is data on marine biodiversity and ocean health indicators.',
      'Access this visualization showing the impact of pollution on marine environments.',
      'Here are case studies of successful marine conservation projects.',
    ],
  },
  {
    id: 15,
    name: 'SDG 15: Life on Land',
    resources: [
      'Here is the latest data on deforestation rates and land degradation.',
      'Access this infographic on the importance of biodiversity for ecosystem health.',
      'Here are reports on successful land restoration and conservation initiatives.',
    ],
  },
  {
    id: 16,
    name: 'SDG 16: Peace, Justice, and Strong Institutions',
    resources: [
      'Here is data on governance indicators and access to justice metrics.',
      'Access this visualization showing the relationship between institutional strength and societal peace.',
      'Here are case studies of institutions that have successfully promoted peace and justice.',
    ],
  },
  {
    id: 17,
    name: 'SDG 17: Partnerships for the Goals',
    resources: [
      'Here is data on international collaborations and their impact on SDG achievement.',
      'Access this infographic on the benefits of multi-stakeholder partnerships.',
      'Here are reports on successful global partnerships driving sustainable development.',
    ],
  },
];

const Teaching = ({ selectedSDGId }) => {
  // Find the relevant TA resources for the chosen SDG
  const chosenResources = teachingSdgData.find((sdg) => sdg.id === selectedSDGId) || null;

  return (
    <div className="teaching-container">
      <h2 className="teaching-title">Teaching Assistance AI: Data and Resources</h2>
      <p className="teaching-intro">
        I am Teaching Assistance AI (TA AI). I provide data, resources, and visualizations
        to help you dive deeper into your chosen SDG.
      </p>

      {/* If no SDG is chosen or found, show a prompt */}
      {!selectedSDGId || !chosenResources ? (
        <p className="ta-placeholder">
          Please select (or randomly assign) an SDG in Professor AI first, so I can display relevant data and resources.
        </p>
      ) : (
        <div className="teaching-sdg-display">
          <h3 className="teaching-sdg-name">{chosenResources.name}</h3>
          <p className="ta-resources-intro">
            Below are some data, resources, and potential visualizations for deeper exploration:
          </p>
          <ul className="ta-resources-list">
            {chosenResources.resources.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Teaching;
