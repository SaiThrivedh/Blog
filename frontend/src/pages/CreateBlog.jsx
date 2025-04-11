import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/CreateBlog.css";
import Navbar from "../pages/Navbar";

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    category: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const blogData = {
        title: formData.title,
        imageUrl: formData.imageUrl,
        category: formData.category,
        content: formData.content,
        author: user.username,
        userId: user.id,
      };

      await axios.post("http://localhost:5000/blogs", blogData);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="create-blog-fullpage">
        <form className="create-blog-form" onSubmit={handleSubmit}>
          <h2>Create a New Blog</h2>

          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Paste image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Tech, Food, Travel"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <label>Content</label>
          <textarea
            name="content"
            rows="8"
            placeholder="Write your blog here..."
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
