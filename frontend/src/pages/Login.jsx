// pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.user && res.data.token) {
        login(res.data.user, res.data.token); // ✅ pass token too
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form-section">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="switch-link">
            Don’t have an account? <Link to="/signup">Signup here</Link>
          </p>
        </div>

        <div className="login-info-section">
          <h3>Welcome Back!</h3>
          <ul>
            <li>Access your personalized dashboard.</li>
            <li>Stay updated with the latest news.</li>
            <li>Manage your profile and preferences.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
