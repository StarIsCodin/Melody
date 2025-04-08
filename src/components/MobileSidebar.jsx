import React, { useState } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import { BsFillMusicPlayerFill, BsMusicNote } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import "./MobileSidebar.scss";

function MobileSidebar({ onClose }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [songData, setSongData] = useState({
    title: "",
    description: "",
    artist: "",
    audioFile: null,
    imageFile: null,
  });

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleItemClick = () => {
    if (onClose) onClose();
  };

  // ...existing code for handleChange, handleFileChange, handleSubmit...

  return (
    <div className="mobile-sidebar">
      <div className="mobile-sidebar-header">
        <h3>Melody</h3>
      </div>

      <div className="mobile-sidebar-section">
        <MobileSidebarItem
          to="/"
          icon={<AiFillHome />}
          text="Trang chủ"
          onClick={handleItemClick}
        />
        <MobileSidebarItem
          to="/SearchPage"
          icon={<FaSearch />}
          text="Tìm kiếm"
          onClick={handleItemClick}
        />
      </div>

      <div className="mobile-sidebar-section">
        <MobileSidebarItem
          icon={<FaMusic />}
          text="Thêm bài hát"
          onClick={() => {
            handleShow();
            handleItemClick();
          }}
        />
        <MobileSidebarItem
          to="/LikedSongsPage"
          icon={<FaHeart />}
          text="Nhạc yêu thích"
          onClick={handleItemClick}
        />
      </div>

      {/* Music Upload Modal - same as in Sidebar.jsx */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="music-upload-modal"
      >
        {/* ...existing Modal content... */}
      </Modal>

      {/* Toast notification - same as in Sidebar.jsx */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 1070 }}
      >
        {/* ...existing Toast content... */}
      </ToastContainer>
    </div>
  );
}

// Helper component for mobile sidebar items
function MobileSidebarItem({ to, icon, text, onClick }) {
  return (
    <div className="mobile-sidebar-item" onClick={onClick}>
      <Link className="mobile-sidebar-link" to={to || "#"}>
        <span className="mobile-sidebar-icon">{icon}</span>
        <span className="mobile-sidebar-text">{text}</span>
      </Link>
    </div>
  );
}

export default MobileSidebar;
