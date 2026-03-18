import React, { useState } from "react";
import devImage from "./codewithjaivy image.jpeg";

const CONTACTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    platform: "LinkedIn",
    handle: "sanjeet-kumar-1a2b3c",
    href: "https://www.linkedin.com/in/sanjeet-kumar-1a2b3c",
    color: "#0077b5",
    bg: "rgba(0,119,181,0.1)",
    border: "rgba(0,119,181,0.25)",
    desc: "Connect professionally",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    platform: "GitHub",
    handle: "CODEWITH-JAIVY",
    href: "https://github.com/CODEWITH-JAIVY",
    color: "#f0f6fc",
    bg: "rgba(240,246,252,0.06)",
    border: "rgba(240,246,252,0.15)",
    desc: "Check out my projects",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    platform: "Instagram",
    handle: "@codewithjaivy",
    href: "https://www.instagram.com/codewithjaivy?igsh=MWJtY3hleGo5NWxkNg==",
    color: "#e1306c",
    bg: "rgba(225,48,108,0.1)",
    border: "rgba(225,48,108,0.25)",
    desc: "Follow for coding content",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    platform: "Email",
    handle: "skkarmasi421@gmail.com",
    href: "mailto:skkarmasi421@gmail.com",
    color: "#ea4335",
    bg: "rgba(234,67,53,0.1)",
    border: "rgba(234,67,53,0.25)",
    desc: "Drop me a mail",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
      </svg>
    ),
    platform: "Phone / WhatsApp",
    handle: "+91 7261075889",
    href: "tel:+917261075889",
    color: "#25d366",
    bg: "rgba(37,211,102,0.1)",
    border: "rgba(37,211,102,0.25)",
    desc: "Call or WhatsApp me",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="container">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-card {
          animation: fadeUp 0.3s ease both;
        }
        .contact-card:nth-child(1) { animation-delay: 0.05s; }
        .contact-card:nth-child(2) { animation-delay: 0.10s; }
        .contact-card:nth-child(3) { animation-delay: 0.15s; }
        .contact-card:nth-child(4) { animation-delay: 0.20s; }
        .contact-card:nth-child(5) { animation-delay: 0.25s; }
        .contact-link-btn {
          transition: all 0.2s ease;
        }
        .contact-link-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      `}</style>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "2.5rem 0 2rem",
          animation: "fadeUp 0.3s ease",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            margin: "0 auto 1rem",
            boxShadow:
              "0 0 0 4px rgba(229,9,20,0.3), 0 0 0 8px rgba(229,9,20,0.1)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={devImage}
            alt="Sanjeet Kumar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>

        <h1
          style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 0.25rem" }}
        >
          Sanjeet Kumar
        </h1>
        <p
          style={{
            color: "var(--text-muted, #888)",
            margin: "0 0 0.5rem",
            fontSize: "1rem",
          }}
        >
          Full Stack Developer · Spring Boot + React
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {["Java", "Spring Boot", "React", "MySQL"].map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(229,9,20,0.1)",
                border: "1px solid rgba(229,9,20,0.25)",
                color: "#e50914",
                borderRadius: "20px",
                padding: "3px 12px",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          maxWidth: 800,
          margin: "0 auto 3rem",
        }}
      >
        {CONTACTS.map((c, i) => (
          <div
            key={c.platform}
            className="contact-card"
            style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: "14px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {/* Top row */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.color,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {c.platform}
                </div>
                <div
                  style={{
                    color: "var(--text-muted, #888)",
                    fontSize: "0.78rem",
                  }}
                >
                  {c.desc}
                </div>
              </div>
            </div>

            {/* Handle */}
            <div
              style={{
                background: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
                padding: "0.5rem 0.75rem",
                fontSize: "0.85rem",
                color: c.color,
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              {c.handle}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="contact-link-btn"
                style={{
                  flex: 1,
                  padding: "0.55rem",
                  background: c.color,
                  color: "#fff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textAlign: "center",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  display: "block",
                }}
              >
                {c.platform === "Email"
                  ? "Send Mail"
                  : c.platform === "Phone / WhatsApp"
                    ? "Call Now"
                    : "Open →"}
              </a>

              <button
                onClick={() =>
                  copyToClipboard(c.handle.replace(/^@/, ""), c.platform)
                }
                style={{
                  padding: "0.55rem 0.75rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  transition: "all 0.15s",
                }}
              >
                {copied === c.platform ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p
        style={{
          textAlign: "center",
          color: "var(--text-muted, #666)",
          fontSize: "0.85rem",
          paddingBottom: "2rem",
        }}
      >
        Built with ❤️ as a learning project · BookMyShow Clone
      </p>
    </div>
  );
}
