import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <nav
        className="navbar"
        style={{
          height: "60px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: "#282c34",
        }}
      >
        <div className="main-logo" style={{ height: "100%" }}>
          <img
            style={{ height: "100%", borderRadius: "30px" }}
            src="favicon.png"
            alt="Logo"
            onClick={handleLogoClick}
          />
        </div>
        <ul
          className="nav-links"
          style={{ listStyle: "none", display: "flex", gap: "20px" }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
