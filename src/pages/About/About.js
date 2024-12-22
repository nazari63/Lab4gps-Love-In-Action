// src/pages/About/About.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Purpose from '../../components/About/Purpose';
import Mission from '../../components/About/Mission';
import Vision from '../../components/About/Vision';
import CoreValues from '../../components/About/CoreValues';
import WhoWeAre from '../../components/About/WhoWeAre';

const About = () => {
  return (
    <div>
      {/* Add an <Outlet> or simply define nested routes for each sub-page */}
      <Routes>
        <Route path="purpose" element={<Purpose />} />
        <Route path="mission" element={<Mission />} />
        <Route path="vision" element={<Vision />} />
        <Route path="corevalues" element={<CoreValues />} />
        <Route path="whoweare" element={<WhoWeAre />} />
      </Routes>
    </div>
  );
};

export default About;
