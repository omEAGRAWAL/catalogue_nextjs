import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status in the client side
    const token = localStorage.getItem("x-auth-token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px 0 30px",
        }}
      >
        {/* Logo and Navigation Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            style={{
              height: "50px",
              width: "200px",
            }}
            src="/QuckCatlogue.svg"
            alt="Quick Catalogue Logo"
          />
          <nav
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Link href="/home/home">Home</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>

        {/* Authentication Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {isAuthenticated ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src="/profile-pic.jpg"
                alt="User Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
              <div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li>Name</li>
                  <li>Email ID</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link href="/login/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
