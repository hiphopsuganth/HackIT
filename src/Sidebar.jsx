import React from "react";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="topsection">
     <div className="logo"></div>
       <p>POCKET CASH</p>
       <br />
       <p>OVERALL NET WORTH</p>
    </div>
    <div className="bottom section">
    <nav className="sidebar-nav">
        <a href="#" className="menu-item">Item 1</a>
        <a href="#" className="menu-item">Item 2</a>
        <a href="#" className="menu-item">Item 3</a>
        <a href="#" className="menu-item">Item 4</a>
    </nav>
    </div>
</aside>
  );
};
