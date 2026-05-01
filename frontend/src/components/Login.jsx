import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import "./styles.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/user/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleSignup = async () => {
    try {
      await API.post("/user/signup", form);
      alert("Account created! Please login.");
      setIsSignup(false);
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {isSignup && (
          <input
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {isSignup ? (
          <button className="auth-btn btn-signup" onClick={handleSignup}>
            Create Account
          </button>
        ) : (
          <button className="auth-btn btn-login" onClick={handleLogin}>
            Login
          </button>
        )}

        <div className="divider">or</div>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Create Account"}
          </span>
        </p>
      </div>
    </div>
  );
}