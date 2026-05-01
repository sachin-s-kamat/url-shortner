import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo">🔗 URL Shortener</div>
      <button className="btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}