import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/signup", formData);

      alert("Signup Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Signup failed");
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="card" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ color: 'var(--accent)', textAlign: 'center', marginBottom: '1rem' }}>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          Signup
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem' }}>
          Already have an account? <Link to="/" style={{ color: 'var(--accent)' }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
