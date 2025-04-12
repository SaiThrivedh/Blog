import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error("Profile fetch error:", data.message);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">User not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-4">👤 My Profile</h1>
      <div className="space-y-2 mb-6">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-3">📝 My Blogs</h2>
      {user.blogs && user.blogs.length > 0 ? (
        <ul className="space-y-2">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="border p-3 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                Created: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You haven't posted any blogs yet.</p>
      )}
    </div>
  );
};

export default Profile;
