// src/components/Context/ModalContext.js

import React, { createContext, useState } from 'react';

// Create the ModalContext
export const ModalContext = createContext();

// Create the ModalProvider component
export const ModalProvider = ({ children }) => {
  const [isSubmitProblemOpen, setIsSubmitProblemOpen] = useState(false);

  // Function to open the SubmitProblem modal
  const openSubmitProblem = () => setIsSubmitProblemOpen(true);

  // Function to close the SubmitProblem modal
  const closeSubmitProblem = () => setIsSubmitProblemOpen(false);

  return (
    <ModalContext.Provider value={{ isSubmitProblemOpen, openSubmitProblem, closeSubmitProblem }}>
      {children}
    </ModalContext.Provider>
  );
};
