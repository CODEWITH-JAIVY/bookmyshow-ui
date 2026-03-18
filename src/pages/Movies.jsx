import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import movieService from "../services/movieService";
import { useToast } from "../components/Toast";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [lang, setLang] = useState("");
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
  }, []);

  const applyFilters = (s, g, l) => {
    let f = movies;
    if (s)
      f = f.filter((m) => m.title?.toLowerCase().includes(s.toLowerCase()));
    if (g) f = f.filter((m) => m.genre === g);
    if (l) f = f.filter((m) => m.language === l);
    setFiltered(f);
  };

  const genres = [...new Set(movies.map((m) => m.genre).filter(Boolean))];
  const langs = [...new Set(movies.map((m) => m.language).filter(Boolean))];

  return (
    <div className="container">
      <h2 className="section-title">All Movies</h2>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          className="filter-input"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            applyFilters(e.target.value, genre, lang);
          }}
        />
        <select
          className="filter-select"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            applyFilters(search, e.target.value, lang);
          }}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            applyFilters(search, genre, e.target.value);
          }}
        >
          <option value="">All Languages</option>
          {langs.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="loading-center">
          <div className="spinner"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🎬</div>
          <p>No movies found</p>
        </div>
      ) : (
        <div className="grid grid-4">
          {filtered.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
