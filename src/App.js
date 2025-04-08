import React, { useState } from "react";
import "./App.css";
// ...existing imports...
import SidebarToggle from "./components/SidebarToggle";

function App() {
  // ...existing state...
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      <SidebarToggle isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="content-container">
        <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
          {/* Sidebar content */}
        </div>

        <div
          className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="main-content col">{/* Main content */}</div>
      </div>

      <div className="player">{/* Player controls */}</div>
    </div>
  );
}

export default App;
