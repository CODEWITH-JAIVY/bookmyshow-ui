import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatMap from "../components/SeatMap";
import movieService from "../services/movieService";
import showService from "../services/showService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const BASE = "http://localhost:8080/api";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const showToast = useToast();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);
  const [allSeats, setAllSeats] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [seatsLoading, setSeatsLoading] = useState(false);

  const proxyUrl = (url) =>
    url
      ? `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=300&h=420&fit=cover&output=jpg`
      : null;

  useEffect(() => {
    if (!id || id === "undefined") {
      navigate("/movies");
      return;
    }

    setLoading(true);

    Promise.all([movieService.getById(id), showService.getByMovie(id)])
      .then(([m, s]) => {
        setMovie(m);
        setShows(Array.isArray(s) ? s : []);
      })
      .catch((e) => {
        console.error(e);
        showToast("Could not load movie", "error");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ FIXED FUNCTION
  const openSeatModal = async (show) => {
    if (!user) {
      showToast("Please login to book tickets", "error");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    setAllSeats([]);
    setAvailableIds([]);
    setSelectedIds([]);
    setCurrentShow(show);
    setModalOpen(true);
    setSeatsLoading(true);

    try {
      console.log("ShowId:", show.id);

      const res = await fetch(`${BASE}/seats/show/${show.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch seats");
      }

      const seats = await res.json();
      const seatsArr = Array.isArray(seats) ? seats : [];

      console.log("All seats:", seatsArr);

      // available ids
      const availIds = seatsArr
        .filter((s) => s.status === "AVAILABLE")
        .map((s) => s.id);

      console.log("Available:", availIds.length);

      // normalize row/col
      const normalized = seatsArr.map((s) => ({
        ...s,
        row: s.seatRow || s.row || s.seatNumber?.charAt(0),
        col: s.seatCol || s.col || parseInt(s.seatNumber?.slice(1)),
      }));

      setAllSeats(normalized);
      setAvailableIds(availIds);
    } catch (e) {
      console.error("Seats error:", e);
      showToast("Could not load seats", "error");
    } finally {
      setSeatsLoading(false);
    }
  };

  const toggleSeat = (seat) => {
    if (!availableIds.includes(seat.id)) return;

    setSelectedIds((prev) =>
      prev.includes(seat.id)
        ? prev.filter((i) => i !== seat.id)
        : [...prev, seat.id],
    );
  };

  const confirmBooking = async () => {
    if (!user) {
      showToast("Please login", "error");
      return;
    }
    if (selectedIds.length === 0) {
      showToast("Select at least one seat", "error");
      return;
    }

    try {
      const res = await fetch(`${BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          showId: currentShow.id,
          seatIds: selectedIds,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Booking failed");
      }

      showToast("🎉 Booking confirmed!", "success");
      setModalOpen(false);
      setTimeout(() => navigate("/bookings"), 1200);
    } catch (e) {
      showToast(e.message || "Booking failed", "error");
    }
  };

  if (loading)
    return (
      <div className="loading-center">
        <div className="spinner"></div>
      </div>
    );

  if (!movie)
    return (
      <div className="container">
        <div className="empty-state">
          <div className="icon">🎬</div>
          <p>Movie not found</p>
        </div>
      </div>
    );

  const totalPrice = selectedIds.length * (currentShow?.ticketPrice || 0);

  return (
    <div className="container">
      {/* Movie Info */}
      <div className="movie-detail-hero">
        <div className="movie-poster">
          <img
            src={proxyUrl(movie.posterUrl)}
            alt={movie.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML =
                '<span style="font-size:6rem">🎬</span>';
            }}
          />
        </div>

        <div className="movie-info">
          <h1>{movie.title}</h1>

          <div className="badges" style={{ marginBottom: "1rem" }}>
            {movie.genre && (
              <span className="badge badge-genre">{movie.genre}</span>
            )}
            {movie.language && (
              <span className="badge badge-lang">{movie.language}</span>
            )}
            {movie.rating && (
              <span className="badge badge-rating">⭐ {movie.rating}</span>
            )}
            {movie.durationInMinutes && (
              <span className="badge badge-dur">
                ⏱ {movie.durationInMinutes} min
              </span>
            )}
          </div>

          <p className="movie-desc">
            {movie.description || "No description available."}
          </p>

          {movie.realeseDate && (
            <p className="release-date">📅 Release: {movie.realeseDate}</p>
          )}
        </div>
      </div>

      {/* Shows */}
      <h2 className="section-title">Available Shows</h2>

      {shows.length === 0 ? (
        <div className="empty-state">
          <p>No shows available for this movie</p>
        </div>
      ) : (
        <div className="shows-list">
          {shows.map((s) => (
            <div className="show-card" key={s.id}>
              <div className="show-info">
                <h4>
                  🎥 {s.screen?.theater?.name || "Theater"} —{" "}
                  {s.screen?.name || "Screen"}
                </h4>
                <p>
                  📅 {s.showDate} &nbsp; 🕐 {s.startTime}
                  {s.endTime ? ` - ${s.endTime}` : ""}
                </p>
                <p className="city-name">
                  {s.screen?.theater?.city?.name || ""}
                </p>
              </div>

              <div className="show-meta">
                <div className="price">₹{s.ticketPrice || 0}</div>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => openSeatModal(s)}
                >
                  Select Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Seat Modal */}
      {modalOpen && (
        <div
          className="modal-overlay active"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="modal" style={{ maxWidth: "680px" }}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              ×
            </button>

            <h2>
              {currentShow?.screen?.name || "Screen"} — {currentShow?.showDate}{" "}
              {currentShow?.startTime}
            </h2>

            {seatsLoading ? (
              <div className="loading-center">
                <div className="spinner"></div>
              </div>
            ) : allSeats.length === 0 ? (
              <div className="empty-state">
                <p>No seats found</p>
              </div>
            ) : (
              <SeatMap
                allSeats={allSeats}
                availableIds={availableIds}
                selectedIds={selectedIds}
                onToggle={toggleSeat}
              />
            )}

            {selectedIds.length > 0 && (
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <div className="summary-row">
                  <span>Seats Selected</span>
                  <span>{selectedIds.length}</span>
                </div>
                <div className="summary-row">
                  <span>Price per ticket</span>
                  <span>₹{currentShow?.ticketPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            )}

            <button
              className="btn btn-primary btn-block"
              style={{ marginTop: "1rem" }}
              disabled={selectedIds.length === 0}
              onClick={confirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
