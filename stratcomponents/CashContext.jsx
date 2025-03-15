import React, { createContext, useContext, useState } from 'react';

// Create a context for cash-related values
export const CashContext = createContext();

// Create a provider component
export const CashProvider = ({ children }) => {
  const [pocketCash, setPocketCash] = useState(10000);
  const [simulatedDate, setSimulatedDate] = useState(new Date(2025, 0, 1));
  
  return (
    <CashContext.Provider value={{pocketCash, setPocketCash, simulatedDate, setSimulatedDate }}>
      {children}
    </CashContext.Provider>
  );
};

// Custom hook for easier context usage
export const useCash = () => useContext(CashContext);