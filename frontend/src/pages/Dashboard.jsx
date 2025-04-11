import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/Dashboard.css";
import Navbar from "../pages/Navbar";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) navigate("/");
    fetchBlogs();
  }, [user, navigate]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/blogs"); // Adjust API if needed
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <>
      <div><Navbar/></div>
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
      
      </div>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button className="create-button" onClick={() => navigate("/createblog")}>
          + Create Blog
        </button>
      </div>

      <div className="blog-list">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <p><strong>By:</strong> {blog.User?.username || "Unknown"}</p>
              <button onClick={() => navigate(`/blog/${blog.id}`)}>Read More</button>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
