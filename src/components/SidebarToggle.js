import React from "react";

const SidebarToggle = ({ isOpen, toggleSidebar }) => {
  return (
    <button
      className="nav-toggle"
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? "✕" : "☰"}
    </button>
  );
};

export default SidebarToggle;
