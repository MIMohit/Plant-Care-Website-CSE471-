import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/blogs"); // Replace with your backend blog API endpoint
      setBlogs(response.data); // Ensure your backend returns blogs as an array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="blog-page-container">
      <h1 className="blog-page-title">Our Blog</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="blog-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-content">{blog.content.slice(0, 150)}...</p>
              <p className="blog-author">By {blog.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available at the moment.</p>
      )}
    </div>
  );
};

export default Blog;

/* CSS styles for the Blog page */
const blogStyles = `
  .blog-page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .blog-page-title {
    font-size: 2rem;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .blog-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .blog-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .blog-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  .blog-content {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
  }

  .blog-author {
    font-size: 0.9rem;
    color: #777;
    font-style: italic;
  }
`;

const blogStyleSheet = document.createElement("style");
blogStyleSheet.type = "text/css";
blogStyleSheet.innerText = blogStyles;
document.head.appendChild(blogStyleSheet);
