import React from "react";

const SidebarToggle = ({ toggleSidebar }) => {
  return (
    <button
      className="nav-toggle"
      onClick={toggleSidebar}
      aria-label="Open menu"
    >
      {">"}
    </button>
  );
};

export default SidebarToggle;
