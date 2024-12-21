// LangContext.js
import React, { createContext, useState, useContext } from 'react';

const LangContext = createContext();

// Provider component
export function LangProvider({ children }) {
  // Manage the current language state (default to English)
  const [language, setLanguage] = useState('en');

  // Toggle or set language
  function changeLanguage(lang) {
    setLanguage(lang);
  }

  // Provide the current language and updater function to consumers
  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}

// Custom hook for easy usage in components
export function useLang() {
  return useContext(LangContext);
}
