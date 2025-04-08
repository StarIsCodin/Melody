import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import Page from "./components/Page";
import Header from "./components/Header";
import Player from "./components/Player";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import SidebarToggle from "./components/SidebarToggle";

function App() {
  if (process.env.NODE_ENV === "production") disableReactDevTools();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter basename="/">
      <MusicPlayerProvider>
        <div className="app-container">
          {/* Only show toggle on mobile when sidebar is closed */}
          {isMobile && !sidebarOpen && (
            <SidebarToggle toggleSidebar={() => setSidebarOpen(true)} />
          )}

          <div className="content-container">
            {/* Desktop Sidebar (always visible on desktop) */}
            {!isMobile && (
              <div className="sidebar">
                <Sidebar />
              </div>
            )}

            {/* Mobile Sidebar (visible only when toggled) */}
            {isMobile && (
              <div className={`sidebar mobile ${sidebarOpen ? "active" : ""}`}>
                <MobileSidebar onClose={() => setSidebarOpen(false)} />
              </div>
            )}

            {/* Overlay to close mobile sidebar */}
            {isMobile && (
              <div
                className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}

            <div className="main-content col">
              <Header />
              <Page />
            </div>
          </div>

          <div className="player fixed-bottom">
            <Player />
          </div>
        </div>
      </MusicPlayerProvider>
    </BrowserRouter>
  );
}

export default App;
