import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import "./styles.css";

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const navigate = useNavigate();

  const handleSignup = async () => {
  // validate before sending
  if (!form.name || !form.email || !form.password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await API.post("/user/signup", {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    alert("Account created! Please login.");

    // reset form + switch to login
    setForm({ name: "", email: "", password: "" });
    setIsSignup(false);

  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.error || "Signup failed");
  }
};

  return (
    <div className="container">
      <h2>Signup</h2>
      <input placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button className="btn-success" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}