import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        { username, email, password },
        { withCredentials: true }
      );

      if (res.data.user) {
        login(res.data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-box">
        <div className="signup-container">
          <h2>Signup</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <button type="submit">Signup</button>
          </form>
          <p className="switch-login">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

        <div className="signup-info">
          <h3>Why Sign Up?</h3>
          <ul>
            <li>Connect with other users.</li>
            <li>Share your thoughts and ideas.</li>
            <li>Access personalized content.</li>
            <li>Stay updated with the latest news.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
