import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import movieService from "../services/movieService";
import cityService from "../services/cityService";
import { useToast } from "../components/Toast";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    movieService
      .getAll()
      .then((data) => {
        setMovies(data);
        setFiltered(data);
      })
      .catch(() => showToast("Could not load movies", "error"))
      .finally(() => setLoading(false));

    cityService
      .getAll()
      .then(setCities)
      .catch(() => console.log("Cities load failed"));
  }, []);

  const handleSearch = (val) => {
    setSearch(val);
    const q = val.toLowerCase();
    setFiltered(
      movies.filter(
        (m) =>
          m.title?.toLowerCase().includes(q) ||
          m.genre?.toLowerCase().includes(q) ||
          m.language?.toLowerCase().includes(q),
      ),
    );
  };

  return (
    <>
      {/* City Bar */}
      <div className="city-bar">
        <span className="city-label">📍 City:</span>
        <button
          className={`city-chip ${!activeCity ? "active" : ""}`}
          onClick={() => setActiveCity(null)}
        >
          All
        </button>
        {cities.map((city) => (
          <button
            key={city.id}
            className={`city-chip ${activeCity === city.id ? "active" : ""}`}
            onClick={() => setActiveCity(city.id)}
          >
            {city.name}
          </button>
        ))}
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Your <span>Entertainment</span> Starts Here
          </h1>
          <p>Book movie tickets for the latest shows in your city</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for movies..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </section>

      {/* Movies */}
      <div className="container">
        <h2 className="section-title">Now Showing</h2>
        {loading ? (
          <div className="loading-center">
            <div className="spinner"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🎬</div>
            <p>No movies found. Add some from Admin panel!</p>
          </div>
        ) : (
          <div className="grid grid-4">
            {filtered.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
