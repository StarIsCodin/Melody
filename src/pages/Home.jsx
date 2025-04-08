import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylecomponent/homestyle.css";
import MusicCard from "../components/MusicCard";
import axios from "axios";
import { FaPlay, FaMusic } from "react-icons/fa";
import "./Home.scss";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";

// Home now without MusicPlayerProvider wrapper
const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playSong } = useMusicPlayer(); // Access context directly

  useEffect(() => {
    // Fetch songs from API
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "https://melody-api-lh84.onrender.com/api/songs"
        );
        setSongs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch songs");
        setLoading(false);
        console.error(err);
      }
    };

    fetchSongs();

    // Check for previously playing song in localStorage
    const savedSong = localStorage.getItem("currentSong");
    if (savedSong) {
      try {
        const parsedSong = JSON.parse(savedSong);
        // We could auto-play the last song here if desired
        // playSong(parsedSong);
      } catch (err) {
        console.error("Error parsing saved song:", err);
      }
    }
  }, []);

  return (
    <div className="melody-app">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="fw-bold mb-3 hero-section-title">Melody</h1>
              <h2 className="h3 mb-4 hero-section-title">
                Thế giới âm nhạc trong tầm tay bạn.
              </h2>
              <p className="mb-4 hero-section-title">
                Âm nhạc mọi lúc, mọi nơi – kết nối cảm xúc của bạn với những
                giai điệu tuyệt vời nhất.
              </p>
              <button
                className="play-button"
                onClick={() => {
                  document
                    .getElementById("songs")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <FaPlay /> START LISTENING
              </button>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="music-icon text-center">
                <FaMusic size={150} color="rgba(255,255,255,0.2)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* All Songs Section */}
        <div className="songs-container rounded " id="songs">
          <h2 className="section-title">All Songs</h2>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading songs...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-md-4 bg-white music-card-container">
              {songs.length > 0 ? (
                songs.map((song) => (
                  <div
                    className="col mb-5 bg-white music-card-item"
                    key={song._id}
                  >
                    <MusicCard
                      id={song._id}
                      title={song.title}
                      description={song.artist}
                      buttonText="Play"
                      imageUrl={song.imagePath}
                      audioUrl={song.audioPath}
                      truncateTitle={true}
                      truncateDescription={true}
                      className="music-card-responsive"
                    />
                  </div>
                ))
              ) : (
                <p className="text-center">No songs available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
