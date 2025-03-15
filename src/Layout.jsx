import React from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import "./App.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <MainContent />
      </div>
    </div>
  );
};

export default Layout;
