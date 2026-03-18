import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const poster = movie.posterUrl
    ? `https://wsrv.nl/?url=${encodeURIComponent(movie.posterUrl)}&w=300&h=420&fit=cover&output=jpg`
    : null;

  return (
    <Link to={`/movies/${movie.id}`} className="card">
      <div
        className="card-img"
        style={{
          width: "100%",
          height: "320px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;
                  justify-content:center;width:100%;height:100%;padding:1rem;">
                  <span style="font-size:3.5rem">🎬</span>
                  <span style="color:#a0a0b0;font-size:0.8rem;margin-top:0.5rem;text-align:center;">
                    ${movie.title}
                  </span>
                </div>`;
            }}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "3.5rem" }}>🎬</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <h3>{movie.title}</h3>
        <p>{movie.description || ""}</p>
        <div className="badges">
          {movie.genre && (
            <span className="badge badge-genre">{movie.genre}</span>
          )}
          {movie.language && (
            <span className="badge badge-lang">{movie.language}</span>
          )}
          {movie.rating && (
            <span className="badge badge-rating">⭐ {movie.rating}</span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <span className="duration">
          {movie.durationInMinutes ? `${movie.durationInMinutes} min` : ""}
        </span>
        <span className="btn btn-sm btn-primary">Book Now</span>
      </div>
    </Link>
  );
}
