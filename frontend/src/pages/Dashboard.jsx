import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalTasks: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'var(--text-muted)' }}>Loading live data...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-main)' }}>Platform Statistics</h1>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/projects" className="btn" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', textDecoration: 'none' }}>
            Projects
          </Link>
          <button onClick={handleLogout} className="btn" style={{ backgroundColor: 'var(--border)', color: 'white' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Total Tasks</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)' }}>{dashboardData.totalTasks}</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Completed</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success)' }}>{dashboardData.completed}</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Pending</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{dashboardData.pending}</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Overdue</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--danger)' }}>{dashboardData.overdue}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
