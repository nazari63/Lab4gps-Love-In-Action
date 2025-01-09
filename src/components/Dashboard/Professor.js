// src/components/Professor/Professor.js

import React, { useState } from 'react';
import '../styles/Professor.css';

/**
 * Professor.js
 *
 * 1. Manages the selection (random/manual) of an SDG goal.
 * 2. Displays only Professor AI’s philosophical questions for that SDG.
 * 3. Calls onSDGChange(selectedId) whenever a new SDG is chosen, so Teaching.js
 *    can react and display its own data/resources.
 *
 * NOTE: No reference to TA AI data provisioning is in this file.
 *       We keep that in Teaching.js.
 */

// Professor's question data for each of the 17 SDGs:
const professorSdgData = [
  {
    id: 1,
    name: 'SDG 1: No Poverty',
    questions: [
      'What are the underlying causes of poverty in different regions?',
      'How does poverty impact communities beyond just economic factors?',
      'In what ways can sustainable development initiatives alleviate poverty?',
    ],
  },
  {
    id: 2,
    name: 'SDG 2: Zero Hunger',
    questions: [
      'What are the primary factors contributing to food insecurity globally?',
      'How does climate change affect food production and availability?',
      'What innovative solutions can be implemented to achieve zero hunger?',
    ],
  },
  {
    id: 3,
    name: 'SDG 3: Good Health and Well-being',
    questions: [
      'What are the major challenges in achieving universal health coverage?',
      'How do social determinants of health influence well-being?',
      'What role does technology play in advancing global health?',
    ],
  },
  {
    id: 4,
    name: 'SDG 4: Quality Education',
    questions: [
      'What barriers prevent equitable access to quality education?',
      'How does education contribute to economic and social development?',
      'What innovative educational models can bridge the education gap?',
    ],
  },
  {
    id: 5,
    name: 'SDG 5: Gender Equality',
    questions: [
      'What are the primary obstacles to achieving gender equality globally?',
      'How does gender inequality impact economic and social development?',
      'What strategies can effectively promote gender equality in various sectors?',
    ],
  },
  {
    id: 6,
    name: 'SDG 6: Clean Water and Sanitation',
    questions: [
      'What are the major challenges in providing clean water to underserved communities?',
      'How does access to clean water and sanitation affect public health?',
      'What sustainable practices can improve water management and sanitation services?',
    ],
  },
  {
    id: 7,
    name: 'SDG 7: Affordable and Clean Energy',
    questions: [
      'What are the barriers to achieving universal access to clean energy?',
      'How does clean energy contribute to environmental sustainability?',
      'What innovative technologies can enhance the affordability and reliability of clean energy?',
    ],
  },
  {
    id: 8,
    name: 'SDG 8: Decent Work and Economic Growth',
    questions: [
      'What factors contribute to sustainable economic growth in different economies?',
      'How does the quality of employment affect societal well-being?',
      'What policies can ensure inclusive and equitable economic growth?',
    ],
  },
  {
    id: 9,
    name: 'SDG 9: Industry, Innovation, and Infrastructure',
    questions: [
      'What role does innovation play in sustainable industrial development?',
      'How can infrastructure development be both resilient and inclusive?',
      'What are the challenges and opportunities in fostering technological innovation?',
    ],
  },
  {
    id: 10,
    name: 'SDG 10: Reduced Inequalities',
    questions: [
      'What are the main drivers of income and social inequalities in different societies?',
      'How does reducing inequality contribute to overall societal well-being?',
      'What strategies can effectively address discrimination and promote equal opportunities?',
    ],
  },
  {
    id: 11,
    name: 'SDG 11: Sustainable Cities and Communities',
    questions: [
      'What challenges do rapidly growing cities face in achieving sustainability?',
      'How can urban planning contribute to safer and more inclusive communities?',
      'What role does technology play in enhancing urban resilience and sustainability?',
    ],
  },
  {
    id: 12,
    name: 'SDG 12: Responsible Consumption and Production',
    questions: [
      'What are the environmental impacts of current consumption and production practices?',
      'How can businesses adopt more sustainable production methods?',
      'What role do consumers play in promoting responsible consumption?',
    ],
  },
  {
    id: 13,
    name: 'SDG 13: Climate Action',
    questions: [
      'What are the most significant contributors to climate change globally?',
      'How does climate change affect different ecosystems and communities?',
      'What strategies can effectively mitigate the impacts of climate change?',
    ],
  },
  {
    id: 14,
    name: 'SDG 14: Life Below Water',
    questions: [
      'What are the primary threats to marine ecosystems?',
      'How does marine biodiversity contribute to global environmental health?',
      'What sustainable practices can protect and preserve marine life?',
    ],
  },
  {
    id: 15,
    name: 'SDG 15: Life on Land',
    questions: [
      'What are the main drivers of biodiversity loss on land?',
      'How do deforestation and habitat destruction impact ecosystems?',
      'What strategies can effectively restore and protect terrestrial ecosystems?',
    ],
  },
  {
    id: 16,
    name: 'SDG 16: Peace, Justice, and Strong Institutions',
    questions: [
      'What factors contribute to the stability and effectiveness of institutions?',
      'How does access to justice impact societal well-being?',
      'What measures can promote peace and reduce conflict in communities?',
    ],
  },
  {
    id: 17,
    name: 'SDG 17: Partnerships for the Goals',
    questions: [
      'What role do partnerships play in achieving sustainable development?',
      'How can different stakeholders collaborate effectively to reach common goals?',
      'What challenges do global partnerships face, and how can they be overcome?',
    ],
  },
];

const Professor = ({ onSDGChange }) => {
  const [selectedSDG, setSelectedSDG] = useState(null);

  // Handler to assign a random SDG
  const handleRandomAssign = () => {
    const randomIndex = Math.floor(Math.random() * professorSdgData.length);
    const chosen = professorSdgData[randomIndex];
    setSelectedSDG(chosen);
    if (onSDGChange) onSDGChange(chosen.id);
  };

  // Handler to set the SDG manually via a dropdown
  const handleSelectSDG = (e) => {
    const chosenId = parseInt(e.target.value, 10);
    const found = professorSdgData.find((sdg) => sdg.id === chosenId) || null;
    setSelectedSDG(found);
    if (onSDGChange && found) onSDGChange(found.id);
  };

  return (
    <div className="professor-container">
      <h2 className="professor-title">Professor AI: SDG Guidance</h2>
      <p className="professor-intro">
        I am Professor AI, here to ask fundamental and philosophical questions to guide your exploration of the 17 Sustainable Development Goals (SDGs).
      </p>

      {/* Controls for choosing an SDG */}
      <div className="professor-controls">
        <button className="random-assign-button" onClick={handleRandomAssign}>
          Randomly Assign an SDG
        </button>
        <span className="or-label">OR</span>
        <select className="sdg-select" onChange={handleSelectSDG}>
          <option value="0">-- Select an SDG --</option>
          {professorSdgData.map((sdg) => (
            <option key={sdg.id} value={sdg.id}>
              {sdg.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display the selected or assigned SDG */}
      <div className="professor-sdg-display">
        {selectedSDG ? (
          <>
            <h3 className="selected-sdg">{selectedSDG.name}</h3>
            <p className="sdg-questions-intro">
              Below are philosophical questions to guide your deep exploration of this SDG:
            </p>
            <ul className="sdg-questions-list">
              {selectedSDG.questions.map((question, idx) => (
                <li key={idx}>{question}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="professor-placeholder">
            Please either randomly assign an SDG or select one from the dropdown above to see guiding questions.
          </p>
        )}
      </div>
    </div>
  );
};

export default Professor;
