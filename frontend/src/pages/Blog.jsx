import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); 
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [creatingBlog, setCreatingBlog] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/blogs");
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleCreateBlog = async () => {
    try {
      const response = await axiosInstance.post("/create-blog", newBlog);
      setBlogs([response.data.blog, ...blogs]);
      setCreatingBlog(false);
      setNewBlog({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const backgroundStyle = {
    backgroundImage: "url('http://localhost:8000/uploads/1736008206650.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div className="blog-page-container">
      <h1 className="blog-page-title">Our Blog</h1>
      <button
        className="add-blog-button"
        onClick={() => setCreatingBlog(true)}
      >
        Add Blog
      </button>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="blog-list">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-card"
              onClick={() => handleBlogClick(blog)}
            >
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-content">
                {blog.content.slice(0, 150)}... <span>Read more</span>
              </p>
              <p className="blog-author">By {blog.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available at the moment.</p>
      )}

      {/* Blog Modal */}
      {showModal && selectedBlog && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.content}</p>
            <p className="blog-author">By {selectedBlog.author}</p>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Blog Modal */}
      {creatingBlog && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Blog</h2>
            <input
              type="text"
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
            />
            <textarea
              placeholder="Blog Content"
              value={newBlog.content}
              onChange={(e) =>
                setNewBlog({ ...newBlog, content: e.target.value })
              }
            />
            <button className="submit-button" onClick={handleCreateBlog}>
              Submit
            </button>
            <button
              className="close-button"
              onClick={() => setCreatingBlog(false)}
            >
              Close
            </button>
          </div>
        </div>
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
    background-image: url("http://localhost:8000/uploads/1736008206650.jpg"); 
    background-size: cover; 
    background-position: center; 
    background-attachment: fixed; 
    color: #fff; 
    box-shadow: 10% focus...
    overflow hidden.
  }


  .blog-page-title {
    font-size: 2rem;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .add-blog-button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .add-blog-button:hover {
    background-color: #2980b9;
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
    cursor: pointer;
  }

  .blog-card:hover {
    background-color: #f0f0f0;
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

  .modal {
  background: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  max-height: 80vh; 
  overflow-y: auto; 
}

.modal h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  position: static;
}

.modal p {
  font-size: 1rem;
  margin-bottom: 15px;
  line-height: 1.5;
}

/* Optional: Style the scrollbar for a better look */
.modal::-webkit-scrollbar {
  width: 8px;
}

.modal::-webkit-scrollbar-thumb {
  background-color: #3498db;
  border-radius: 4px;
}

.modal::-webkit-scrollbar-thumb:hover {
  background-color: #2980b9;
}


  .close-button {
    background-color: #e74c3c;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }

  .close-button:hover {
    background-color: #c0392b;
  }

  .submit-button {
    background-color: #2ecc71;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
  }

  .submit-button:hover {
    background-color: #27ae60;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const blogStyleSheet = document.createElement("style");
blogStyleSheet.type = "text/css";
blogStyleSheet.innerText = blogStyles;
document.head.appendChild(blogStyleSheet);
