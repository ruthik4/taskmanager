import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      // Safe fallback: in case the backend returns a raw string instead of a JSON object
      const token = response.data.token || response.data;
      const role = response.data.role || "MEMBER";
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="card" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ color: 'var(--accent)', textAlign: 'center', marginBottom: '1rem' }}>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
          Login
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)' }}>Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
