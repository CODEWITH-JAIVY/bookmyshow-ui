import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bookingService from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

// ─── STATUS BADGE ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    CONFIRMED: {
      background: "rgba(34,197,94,0.15)",
      color: "#22c55e",
      border: "1px solid rgba(34,197,94,0.3)",
    },
    CANCELLED: {
      background: "rgba(239,68,68,0.15)",
      color: "#ef4444",
      border: "1px solid rgba(239,68,68,0.3)",
    },
    PENDING: {
      background: "rgba(234,179,8,0.15)",
      color: "#eab308",
      border: "1px solid rgba(234,179,8,0.3)",
    },
  };
  return (
    <span
      style={{
        ...(styles[status] || styles.PENDING),
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {status === "CONFIRMED" ? "✓ " : status === "CANCELLED" ? "✕ " : "⏳ "}
      {status}
    </span>
  );
}

// ─── FULL CANCEL MODAL ─────────────────────────────────────────────────────────
function FullCancelModal({ booking, onConfirm, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--bg-card, #1a1a2e)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "420px",
          width: "90%",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          animation: "slideUp 0.2s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              fontSize: "1.5rem",
            }}
          >
            ⚠️
          </div>
        </div>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "0.5rem",
            fontSize: "1.2rem",
          }}
        >
          Cancel Full Booking?
        </h3>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted, #888)",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
          }}
        >
          <strong style={{ color: "var(--text, #fff)" }}>
            {booking.movieTitle}
          </strong>
          <br />
          All {booking.seats?.length} seat(s) will be cancelled.
          <br />
          This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "10px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "var(--text, #fff)",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Keep Booking
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PARTIAL CANCEL MODAL ──────────────────────────────────────────────────────
function CancelSeatsModal({ booking, onConfirm, onClose }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggle = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId],
    );
  };

  const allSelected = selectedSeats.length === booking.seats?.length;
  const toggleAll = () => {
    if (allSelected) setSelectedSeats([]);
    else setSelectedSeats(booking.seats.map((s) => s.id));
  };

  const pricePerSeat = booking.totalPrice / (booking.seats?.length || 1);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--bg-card, #1a1a2e)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "480px",
          width: "90%",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          animation: "slideUp 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Cancel Seats</h3>
            <p
              style={{
                margin: "4px 0 0",
                color: "var(--text-muted, #888)",
                fontSize: "0.85rem",
              }}
            >
              {booking.movieTitle} · {booking.screenName}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              color: "var(--text, #fff)",
              cursor: "pointer",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Select All */}
        <div
          onClick={toggleAll}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.65rem 1rem",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "8px",
            marginBottom: "0.75rem",
            cursor: "pointer",
            userSelect: "none",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              flexShrink: 0,
              border: `2px solid ${allSelected ? "#e50914" : "rgba(255,255,255,0.3)"}`,
              background: allSelected ? "#e50914" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              color: "#fff",
            }}
          >
            {allSelected ? "✓" : ""}
          </div>
          <span
            style={{ fontSize: "0.9rem", color: "var(--text-muted, #aaa)" }}
          >
            Select All Seats
          </span>
        </div>

        {/* Seat List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {booking.seats?.map((seat) => {
            const isSelected = selectedSeats.includes(seat.id);
            return (
              <div
                key={seat.id}
                onClick={() => toggle(seat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  background: isSelected
                    ? "rgba(229,9,20,0.12)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected ? "rgba(229,9,20,0.4)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    flexShrink: 0,
                    border: `2px solid ${isSelected ? "#e50914" : "rgba(255,255,255,0.3)"}`,
                    background: isSelected ? "#e50914" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    color: "#fff",
                  }}
                >
                  {isSelected ? "✓" : ""}
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: isSelected
                      ? "rgba(229,9,20,0.2)"
                      : "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  🪑
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    Seat {seat.seatNumber}
                  </div>
                </div>
                <div
                  style={{
                    color: isSelected ? "#ef4444" : "var(--text-muted, #888)",
                    fontSize: "0.85rem",
                  }}
                >
                  ₹{pricePerSeat.toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {selectedSeats.length > 0 && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "var(--text-muted, #aaa)" }}>
              {selectedSeats.length} seat(s) to cancel
            </span>
            <span style={{ color: "#ef4444", fontWeight: 600 }}>
              −₹{(pricePerSeat * selectedSeats.length).toFixed(0)}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "10px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "var(--text, #fff)",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Back
          </button>
          <button
            onClick={() => onConfirm(selectedSeats)}
            disabled={selectedSeats.length === 0}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "10px",
              background:
                selectedSeats.length === 0
                  ? "rgba(239,68,68,0.3)"
                  : "linear-gradient(135deg, #ef4444, #dc2626)",
              border: "none",
              color: "#fff",
              cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
              fontSize: "0.95rem",
              fontWeight: 600,
              opacity: selectedSeats.length === 0 ? 0.5 : 1,
            }}
          >
            Cancel{" "}
            {selectedSeats.length > 0
              ? `${selectedSeats.length} Seat${selectedSeats.length > 1 ? "s" : ""}`
              : "Seats"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN BOOKINGS PAGE ────────────────────────────────────────────────────────
export default function Bookings() {
  const { user } = useAuth();
  const showToast = useToast();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullCancelTarget, setFullCancelTarget] = useState(null);
  const [partialCancelTarget, setPartialCancelTarget] = useState(null);

  const load = () => {
    if (!user) {
      setLoading(false);
      return;
    }
    bookingService
      .getByUser(user.id)
      .then(setBookings)
      .catch(() => showToast("Error loading bookings", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []); // ← empty array — sirf ek baar

  const handleFullCancel = async () => {
    try {
      await bookingService.cancel(fullCancelTarget.bookingId);
      showToast("Booking cancelled successfully", "success");
      setFullCancelTarget(null);
      load();
    } catch {
      showToast("Could not cancel booking", "error");
    }
  };

  const handlePartialCancel = async (seatIds) => {
    try {
      await bookingService.partialCancel(
        partialCancelTarget.bookingId,
        seatIds,
      );
      showToast(`${seatIds.length} seat(s) cancelled`, "success");
      setPartialCancelTarget(null);
      load();
    } catch {
      showToast("Could not cancel seats", "error");
    }
  };

  if (!user)
    return (
      <div className="container">
        <div className="empty-state">
          <div className="icon">🔐</div>
          <p>
            Please{" "}
            <Link
              to="/login"
              style={{ color: "var(--primary)", fontWeight: 700 }}
            >
              login
            </Link>{" "}
            to view your bookings.
          </p>
        </div>
      </div>
    );

  return (
    <div className="container">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .booking-card { animation: slideUp 0.25s ease both; }
        .booking-card:nth-child(1) { animation-delay: 0.05s; }
        .booking-card:nth-child(2) { animation-delay: 0.10s; }
        .booking-card:nth-child(3) { animation-delay: 0.15s; }
        .booking-card:nth-child(4) { animation-delay: 0.20s; }
      `}</style>

      <h2 className="section-title">My Bookings</h2>

      {loading ? (
        <div className="loading-center">
          <div className="spinner"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🎟️</div>
          <p>
            No bookings yet.{" "}
            <Link to="/movies" style={{ color: "var(--primary)" }}>
              Book some movies!
            </Link>
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {bookings.map((b) => (
            <div
              key={b.bookingId}
              className="card booking-card"
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border:
                  b.bookingStatus === "CANCELLED"
                    ? "1px solid rgba(239,68,68,0.2)"
                    : "1px solid rgba(255,255,255,0.08)",
                opacity: b.bookingStatus === "CANCELLED" ? 0.65 : 1,
              }}
            >
              {/* Top color bar */}
              <div
                style={{
                  height: "3px",
                  background:
                    b.bookingStatus === "CONFIRMED"
                      ? "linear-gradient(90deg, #22c55e, #16a34a)"
                      : "linear-gradient(90deg, #ef4444, #dc2626)",
                }}
              />

              <div className="card-body" style={{ padding: "1.25rem" }}>
                {/* Movie + Status */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                    🎬 {b.movieTitle}
                  </h3>
                  <StatusBadge status={b.bookingStatus} />
                </div>

                {/* Theater */}
                <p
                  style={{
                    margin: "0 0 0.4rem",
                    color: "var(--text-muted, #888)",
                    fontSize: "0.9rem",
                  }}
                >
                  🏛️ {b.theaterName} — {b.screenName}
                </p>

                {/* Seats */}
                <div
                  style={{
                    margin: "0.5rem 0",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                  }}
                >
                  {b.seats?.map((s) => (
                    <span
                      key={s.id}
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "6px",
                        padding: "3px 10px",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      🪑 {s.seatNumber}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  💰 ₹{b.totalPrice}
                </p>

                {/* Booked At */}
                {b.bookedAt && (
                  <p
                    style={{
                      margin: "0.3rem 0 0",
                      fontSize: "0.8rem",
                      color: "var(--text-muted, #888)",
                    }}
                  >
                    🕑 {new Date(b.bookedAt).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {b.bookingStatus === "CONFIRMED" && (
                <div
                  style={{
                    padding: "0.75rem 1.25rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    gap: "0.75rem",
                    background: "rgba(0,0,0,0.15)",
                  }}
                >
                  <button
                    onClick={() => setFullCancelTarget(b)}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: "8px",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    ✕ Cancel Full
                  </button>

                  <button
                    onClick={() => setPartialCancelTarget(b)}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: "8px",
                      background: "rgba(234,179,8,0.1)",
                      border: "1px solid rgba(234,179,8,0.3)",
                      color: "#eab308",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    🪑 Cancel Seats
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {fullCancelTarget && (
        <FullCancelModal
          booking={fullCancelTarget}
          onConfirm={handleFullCancel}
          onClose={() => setFullCancelTarget(null)}
        />
      )}

      {partialCancelTarget && (
        <CancelSeatsModal
          booking={partialCancelTarget}
          onConfirm={handlePartialCancel}
          onClose={() => setPartialCancelTarget(null)}
        />
      )}
    </div>
  );
}
  