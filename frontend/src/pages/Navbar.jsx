import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/Navbar.css"; // You'll style this separately
import logo from "../images/logo3.png"

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
      <img src={logo} alt="iBlog Logo" className="logo" />
    </div>
  
    <div className="navbar-right">
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/create">Create Blog</Link></li>
        <li><Link to="/blog">All Blogs</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
      <div className="navbar-user" title={user?.username}>
        👋 {user?.username}
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
