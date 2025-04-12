import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/Navbar.css";
import logo from "../images/logo3.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="iBlog Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          
          <li><button onClick={handleLogout}>Logout</button></li>

          <li><Link to="/profile">👋 {user.username || "Profile"}</Link></li>
            
          
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
