import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const createPost = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    const updatedPosts = [...posts, newPost];

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setTitle("");
    setContent("");

    alert("Post Created Successfully!");
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Admin Dashboard</h1>

        <hr />

        <h2>Create New Post</h2>

        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />

        <br />
        <br />

        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          cols="40"
        ></textarea>

        <br />
        <br />

        <button onClick={createPost}>Create Post</button>

        <hr />

        <h2>All Posts</h2>

        {posts.length === 0 ? (
          <p>No Posts Available</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <button onClick={() => deletePost(post.id)}>
                Delete
              </button>
            </div>
          ))
        )}

        <br />

        <button
          onClick={logout}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Admin;
