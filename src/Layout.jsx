import React from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import "./App.css";
import { CashProvider } from "../stratcomponents/CashContext";

const Layout = () => {
  return (
    <CashProvider>
    <div className="layout">
      <Sidebar />
      <div className="content">
       <MainContent />
      </div>
    </div>
  </CashProvider>
   
  );
};

export default Layout;
