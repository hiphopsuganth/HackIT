import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MainContent } from "./MainContent";
import { Footer } from "./Footer";
import "./App.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
