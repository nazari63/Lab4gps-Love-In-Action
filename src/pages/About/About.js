import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Purpose from './Purpose';
import Mission from './Mission';
import Vision from './Vision';
import CoreValues from './CoreValues';
import WhoWeAre from './WhoWeAre';
import { useLang } from '../../components/Context/LangContext';

const About = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  React.useEffect(() => {
    if (window.location.pathname === '/about') {
      navigate('/about/purpose', { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t("about.pageTitle")}</h1>
      <Routes>
        <Route path="/" element={<Navigate to="purpose" replace />} />
        <Route path="purpose" element={<Purpose />} />
        <Route path="mission" element={<Mission />} />
        <Route path="vision" element={<Vision />} />
        <Route path="corevalues" element={<CoreValues />} />
        <Route path="whoweare" element={<WhoWeAre />} />
        {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
      </Routes>
    </div>
  );
};

export default About;