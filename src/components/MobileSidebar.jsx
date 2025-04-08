import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import { BsFillMusicPlayerFill, BsMusicNote } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import "./MobileSidebar.scss";

function MobileSidebar({ onClose }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setSongData({ ...songData, [name]: files[0] });
    }
  };

  useEffect(() => {
    let timer;
    if (notification.show) {
      timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [notification.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(10);

    try {
      if (!songData.audioFile || !songData.imageFile) {
        throw new Error("Vui lòng chọn cả file nhạc và ảnh bìa");
      }

      // Create a FormData object for file upload
      const formData = new FormData();
      formData.append("title", songData.title);
      formData.append("description", songData.description);
      formData.append("artist", songData.artist);
      formData.append("audioFile", songData.audioFile);
      formData.append("imageFile", songData.imageFile);

      // Log thông tin để debug
      console.log("File âm thanh:", songData.audioFile);
      console.log("File hình ảnh:", songData.imageFile);

      setUploadProgress(30);

      // Upload the song data along with files to the backend
      const response = await axios.post(
        "https://melody-api-lh84.onrender.com/api/songs/upload-with-files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(30 + percentCompleted * 0.6); // Scale between 30-90%
          },
        }
      );

      setUploadProgress(100);
      handleClose();

      // Show success notification popup
      setNotification({
        show: true,
        message: "Bài hát đã được thêm thành công!",
        type: "success",
      });

      // Reset form
      setSongData({
        title: "",
        description: "",
        artist: "",
        audioFile: null,
        imageFile: null,
      });
    } catch (error) {
      console.error("Lỗi khi thêm bài hát", error);

      // Show error notification popup
      setNotification({
        show: true,
        message: `Có lỗi xảy ra: ${
          error.response?.data?.error || error.message
        }`,
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

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

      {/* Music Upload Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="music-upload-modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>
            <BsFillMusicPlayerFill className="me-2" />
            Thêm bài hát
            <BsFillMusicPlayerFill className="ms-2" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                name="title"
                placeholder="Tên bài hát"
                value={songData.title}
                onChange={handleChange}
                required
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Mô tả"
                value={songData.description}
                rows={3}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                name="artist"
                placeholder="Tác giả"
                value={songData.artist}
                onChange={handleChange}
                required
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="form-label">
                <BsMusicNote className="me-2" />
                Chọn file nhạc
              </Form.Label>
              <Form.Control
                type="file"
                name="audioFile"
                accept="audio/*"
                onChange={handleFileChange}
                required
                className="form-file-input"
              />
              {songData.audioFile && (
                <div className="file-selected mt-2">
                  <small>Đã chọn: {songData.audioFile.name}</small>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="form-label">
                <BiImage className="me-2" />
                Chọn ảnh bìa
              </Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="form-file-input"
              />
              {songData.imageFile && (
                <div className="file-selected mt-2">
                  <small>Đã chọn: {songData.imageFile.name}</small>
                </div>
              )}
            </Form.Group>

            {loading && (
              <div className="progress mb-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {uploadProgress}%
                </div>
              </div>
            )}

            <div className="modal-actions">
              <Button
                variant="outline-light"
                onClick={handleClose}
                className="btn-cancel"
                disabled={loading}
              >
                Hủy
              </Button>
              <Button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Đang tải lên...
                  </>
                ) : (
                  "Thêm bài hát"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Custom notification popup */}
      {notification.show && (
        <div className={`notification-popup ${notification.type}`}>
          <div className="notification-icon">
            {notification.type === "success" ? (
              <FiCheckCircle size={24} />
            ) : (
              <FiXCircle size={24} />
            )}
          </div>
          <div className="notification-message">{notification.message}</div>
        </div>
      )}
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
