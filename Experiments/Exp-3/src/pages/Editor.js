import { useNavigate } from "react-router-dom";

function Editor() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Editor Dashboard</h1>

      <hr />

      <h3>Welcome Editor 👋</h3>

      <button>Edit Posts</button>

      <br /><br />

      <button>Upload Images</button>

      <br /><br />

      <button>Manage Comments</button>

      <br /><br />

      <button
        onClick={logout}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Editor;