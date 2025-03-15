import React from "react";
import TimeSimulation from "./Time";
import { useCash } from "../stratcomponents/CashContext";

export const Sidebar = () => {
  const { pocketCash } = useCash();
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <aside className="sidebar">
      <div className="topsection">
        <TimeSimulation />
        <div className="logo"></div>
        <p>POCKET CASH: {formatCurrency(pocketCash)}</p>
        <br />
        <p>OVERALL NET WORTH</p>
      </div>
      <div className="bottom section">
        <nav className="sidebar-nav">
          <a href="#" className="menu-item">Transcation</a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;