import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import TeamManagement from "../components/TeamManagement";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to load projects");
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", {
        name: projectName,
      });
      alert("Project Created!");
      setProjectName("");
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Only ADMIN can create projects");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${projectId}`);
      alert("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'var(--text-muted)' }}>Loading projects...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-main)' }}>Projects</h1>
        <Link to="/dashboard" className="btn" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', textDecoration: 'none' }}>
          Back to Dashboard
        </Link>
      </div>

      {role === 'ADMIN' && (
        <form onSubmit={handleCreateProject} className="card" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            style={{ flex: 1, minWidth: '200px' }}
          />

          <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Create Project
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project) => (
          <div key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ color: 'var(--accent)', fontSize: '1.4rem' }}>{project.name}</h2>
                <p style={{ color: 'var(--text-muted)' }}>Project ID: <span style={{ color: 'var(--text-main)' }}>{project.id}</span></p>
              </div>
              {role === 'ADMIN' && (
                <button 
                  onClick={() => handleDeleteProject(project.id)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1.2rem' }}
                  title="Delete Project"
                >
                  ✕
                </button>
              )}
            </div>
            
            <Link to={`/projects/${project.id}/tasks`} className="btn" style={{ marginTop: '1rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border)', color: 'var(--text-main)', textDecoration: 'none', textAlign: 'center' }}>
              View Tasks
            </Link>

            <TeamManagement projectId={project.id} />
          </div>
        ))}
        {projects.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No projects found. Create one above!</p>
        )}
      </div>
    </div>
  );
}

export default Projects;
