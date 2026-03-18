import React, { useState, useEffect } from "react";
import theaterService from "../services/theaterService";
import cityService from "../services/cityService";
import screenService from "../services/screenService";
import { useToast } from "../components/Toast";

// ─── SCREEN MODAL ─────────────────────────────────────────────────────────────
function ScreenModal({ theaterName, screens, onClose }) {
  return (
    <div
      className="modal-overlay active"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" style={{ maxWidth: "500px" }}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {/* Header */}
        <h2 style={{ marginBottom: "0.25rem" }}>🎬 {theaterName}</h2>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Available Screens
        </p>

        {/* Screen Cards */}
        {screens.length === 0 ? (
          <div className="empty-state">
            <p>No screens found for this theater</p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {screens.map((s) => (
              <div
                key={s.id}
                style={{
                  background: "var(--card-bg, #1e1e2e)",
                  border: "1px solid var(--border, #333)",
                  borderRadius: "10px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                    🖥️ {s.name}
                  </div>
                  {s.cityName && (
                    <div
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.8rem",
                        marginTop: "2px",
                      }}
                    >
                      📍 {s.cityName}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    background: "var(--primary, #e50914)",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.totalSeat ?? s.totalSeats ?? "?"} seats
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: "1.5rem" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─── MAIN THEATERS PAGE ───────────────────────────────────────────────────────
export default function Theaters() {
  const [theaters, setTheaters] = useState([]);
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalScreens, setModalScreens] = useState([]);
  const [modalTheaterName, setModalTheaterName] = useState("");
  const [screensLoading, setScreensLoading] = useState(false);

  useEffect(() => {
    Promise.all([theaterService.getAll(), cityService.getAll()])
      .then(([t, c]) => {
        setTheaters(t);
        setCities(c);
      })
      .catch(() => showToast("Could not load data", "error"))
      .finally(() => setLoading(false));
  }, []);

  const loadByCity = async (cityId) => {
    setActiveCity(cityId);
    setLoading(true);
    try {
      const data = cityId
        ? await theaterService.getByCity(cityId)
        : await theaterService.getAll();
      setTheaters(data);
    } catch {
      showToast("Could not load theaters", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ alert() hatao — modal use karo
  const viewScreens = async (theaterId, theaterName) => {
    setModalTheaterName(theaterName);
    setModalScreens([]);
    setModalOpen(true);
    setScreensLoading(true);

    try {
      const screens = await screenService.getByTheater(theaterId);
      setModalScreens(Array.isArray(screens) ? screens : []);
    } catch {
      showToast("Could not load screens", "error");
      setModalOpen(false);
    } finally {
      setScreensLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">Theaters</h2>

      {/* City Filter */}
      <div
        className="city-bar"
        style={{
          background: "transparent",
          padding: "0",
          marginBottom: "1.5rem",
          border: "none",
        }}
      >
        <button
          className={`city-chip ${!activeCity ? "active" : ""}`}
          onClick={() => loadByCity(null)}
        >
          All Cities
        </button>
        {cities.map((c) => (
          <button
            key={c.id}
            className={`city-chip ${activeCity === c.id ? "active" : ""}`}
            onClick={() => loadByCity(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Theater Grid */}
      {loading ? (
        <div className="loading-center">
          <div className="spinner"></div>
        </div>
      ) : theaters.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🏛️</div>
          <p>No theaters found</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {theaters.map((t) => (
            <div className="card" key={t.id}>
              <div className="card-body">
                <h3>🏛️ {t.name}</h3>
                <p>📍 {t.address || "N/A"}</p>
                <p>
                  🌆 {t.city?.name || ""}
                  {t.city?.state ? `, ${t.city.state}` : ""}
                </p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => viewScreens(t.id, t.name)}
                >
                  View Screens
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Screen Modal */}
      {modalOpen &&
        (screensLoading ? (
          <div className="modal-overlay active">
            <div
              className="modal"
              style={{ maxWidth: "400px", textAlign: "center" }}
            >
              <div className="spinner"></div>
              <p style={{ marginTop: "1rem" }}>Loading screens...</p>
            </div>
          </div>
        ) : (
          <ScreenModal
            theaterName={modalTheaterName}
            screens={modalScreens}
            onClose={() => setModalOpen(false)}
          />
        ))}
    </div>
  );
}
