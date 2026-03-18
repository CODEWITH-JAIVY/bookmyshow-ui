import React from "react";
import devImage from "../pages/codewithjaivy image.jpeg";

const LINKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sanjeet-kumar-1a2b3c",
    color: "#0077b5",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    label: "GitHub",
    href: "https://github.com/CODEWITH-JAIVY",
    color: "#f0f6fc",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    label: "Instagram",
    href: "https://www.instagram.com/codewithjaivy?igsh=MWJtY3hleGo5NWxkNg==",
    color: "#e1306c",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "skkarmasi421@gmail.com",
    href: "mailto:skkarmasi421@gmail.com",
    color: "#ea4335",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
      </svg>
    ),
    label: "+91 7261075889",
    href: "tel:+917261075889",
    color: "#25d366",
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "auto",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "2.5rem 0 1.5rem",
      }}
    >
      <style>{`
        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted, #888);
          text-decoration: none;
          font-size: 0.875rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .footer-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }
        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 1.5rem auto;
          max-width: 1200px;
          padding: 0 1.5rem;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Top: Brand + tagline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          {/* Left: Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>🎬</span>
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                Book<span style={{ color: "#e50914" }}>My</span>Show
              </span>
            </div>
            <p
              style={{
                color: "var(--text-muted, #666)",
                fontSize: "0.8rem",
                margin: 0,
                maxWidth: 220,
              }}
            >
              Your go-to platform for booking movie tickets online. Fast,
              simple, reliable.
            </p>
          </div>

          {/* Right: Developer Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px",
              padding: "1.25rem 1.5rem",
              minWidth: 260,
            }}
          >
            {/* Dev Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 0 0 2px rgba(229,9,20,0.5)",
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
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  Sanjeet Kumar
                </div>
                <div
                  style={{
                    color: "var(--text-muted, #888)",
                    fontSize: "0.75rem",
                  }}
                >
                  Full Stack Developer
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span style={{ color: link.color, flexShrink: 0 }}>
                    {link.icon}
                  </span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            margin: "1.5rem 0",
          }}
        />

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              color: "var(--text-muted, #555)",
              fontSize: "0.78rem",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} BookMyShow Clone. Built with ❤️ by
            Sanjeet Kumar.
          </p>
          <p
            style={{
              color: "var(--text-muted, #555)",
              fontSize: "0.78rem",
              margin: 0,
            }}
          >
            🎓 Learning Project · Spring Boot + React
          </p>
        </div>
      </div>
    </footer>
  );
}
