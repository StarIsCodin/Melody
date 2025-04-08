import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Page from "./components/Page";
import Header from "./components/Header";
import Player from "./components/Player";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import SidebarToggle from "./components/SidebarToggle";

function App() {
  if (process.env.NODE_ENV === "production") disableReactDevTools();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter basename="/">
      <MusicPlayerProvider>
        <div className="app-container">
          <SidebarToggle isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <div className="content-container">
            <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
              <Sidebar />
            </div>

            <div
              className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            ></div>

            <div className="main-content col">
              <Header />
              <Page />
            </div>
          </div>

          <div className="player">
            <Player />
          </div>
        </div>
      </MusicPlayerProvider>
    </BrowserRouter>
  );
}

export default App;

