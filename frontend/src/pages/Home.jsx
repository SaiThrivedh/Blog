import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../images/logo3.png"

export default function Home() {
  return (
    <div className="home-container">
      <nav>
      <div className="logo"> {/* This is the new container */}
      <img src={logo} alt="iBlog Logo" className="logo" />
      </div>
        <div className="nav-right">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>




      <div className="hero">
  <h1>Empowering Student Voices</h1>
  <p>
    Create, share, and shine through your blogs. Whether it's projects, journals, or ideas — iBlog is your digital portfolio.
  </p>
  <button className="cta-btn">Get Started</button>
</div>



      <section className="features">
        <div className="feature-box">
          <span className="icon">📚</span>
          <h3>Academic Blogging</h3>
          <p>
            Easily document subject insights, assignments, or research work.
          </p>
        </div>
        <div className="feature-box">
          <span className="icon">🤝</span>
          <h3>Collaboration</h3>
          <p>
            Connect with peers, share doubts, and learn together with real-time
            engagement.
          </p>
        </div>
        <div className="feature-box">
          <span className="icon">🗂️</span>
          <h3>Portfolio Builder</h3>
          <p>
            Publish your achievements and projects to build an interview-ready
            profile.
          </p>
        </div>
        <div className="feature-box">
          <span className="icon">🔔</span>
          <h3>Smart Alerts</h3>
          <p>
            Stay updated with replies, trending posts, and study group
            notifications.
          </p>
        </div>
        <div className="feature-box">
          <span className="icon">🔐</span>
          <h3>Secure & Friendly</h3>
          <p>
            Your content is protected with easy-to-use authentication and
            student-first policies.
          </p>
        </div>
      </section>

      
    </div>
  );
}
