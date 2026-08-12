import { useNavigate } from "react-router-dom";

function Viewer() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Viewer Dashboard</h1>

      <hr />

      <h3>Welcome Viewer 👋</h3>

      <button>View Articles</button>

      <br /><br />

      <button>View Profile</button>

      <br /><br />

      <button>Download Files</button>

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

export default Viewer;