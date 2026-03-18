import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Book<span>My</span>Show
      </Link>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={isActive("/")}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/movies"
          className={isActive("/movies")}
          onClick={() => setMenuOpen(false)}
        >
          Movies
        </Link>
        <Link
          to="/theaters"
          className={isActive("/theaters")}
          onClick={() => setMenuOpen(false)}
        >
          Theaters
        </Link>
        {user && (
          <Link
            to="/bookings"
            className={isActive("/bookings")}
            onClick={() => setMenuOpen(false)}
          >
            My Bookings
          </Link>
        )}
        <Link
          to="/admin"
          className={isActive("/admin")}
          onClick={() => setMenuOpen(false)}
        >
          Admin
        </Link>

        {/* ✅ Contact / Help link */}
        <Link
          to="/contact"
          className={isActive("/contact")}
          onClick={() => setMenuOpen(false)}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ flexShrink: 0 }}
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
          Help
        </Link>
      </div>

      <div className="nav-user">
        {user ? (
          <>
            <span className="nav-username">👤 {user.name}</span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
