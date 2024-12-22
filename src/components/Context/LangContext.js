// Example: src/components/Context/LangContext.js

import React, { createContext, useContext, useState } from 'react';
import enData from '../../locales/en/translation.json';
import koData from '../../locales/ko/translation.json';

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // You can load as many languages as needed
  const translations = {
    en: enData,
    ko: koData
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // A simple helper function to retrieve the correct translation string
  const t = (path) => {
    // path could be something like 'navbar.home' or 'homePage.introParagraph'
    const keys = path.split('.');
    let result = translations[language];

    // Recursively access nested keys
    for (const key of keys) {
      result = result[key];
      if (!result) break;
    }

    return result || path; // fallback if key not found
  };

  return (
    <LangContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LangContext.Provider>
  );
};
