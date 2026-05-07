import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function Tasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedUserId: "",
    deadline: "",
  });
  const [assignInput, setAssignInput] = useState({});
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks/project/${projectId}`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to load tasks");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", {
        ...formData,
        projectId: Number(projectId),
        assignedUserId: Number(formData.assignedUserId),
      });
      alert("Task Created!");
      setFormData({
        title: "",
        description: "",
        assignedUserId: "",
        deadline: "",
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Only ADMIN can create tasks");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.put(`/tasks/${taskId}?status=${status}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task status");
    }
  };

  const unassignTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to unassign this task?")) return;
    try {
      await api.put(`/tasks/${taskId}/unassign`);
      alert("Task unassigned!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to unassign task");
    }
  };

  const handleAssignChange = (taskId, value) => {
    setAssignInput({ ...assignInput, [taskId]: value });
  };

  const reassignTask = async (taskId) => {
    const userId = assignInput[taskId];
    if (!userId) return;
    try {
      await api.put(`/tasks/${taskId}/assign?userId=${userId}`);
      alert("Task assigned!");
      setAssignInput({ ...assignInput, [taskId]: "" });
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to assign task. Is the user a member of this project?");
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to completely delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      alert("Task deleted!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'var(--text-muted)' }}>Loading tasks...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-main)' }}>Project Tasks</h1>
        <Link to="/projects" className="btn" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', textDecoration: 'none' }}>
          Back to Projects
        </Link>
      </div>

      {role === 'ADMIN' && (
        <form onSubmit={handleCreateTask} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '2rem', maxWidth: '500px' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Create New Task</h2>
          
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="number"
              name="assignedUserId"
              placeholder="User ID"
              value={formData.assignedUserId}
              onChange={handleChange}
              required
              style={{ flex: 1 }}
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              style={{ flex: 1 }}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            Assign Task
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {tasks.map((task) => (
          <div key={task.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ color: 'var(--accent)', fontSize: '1.4rem', margin: 0 }}>{task.title}</h2>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '99px', 
                  fontSize: '0.8rem', 
                  fontWeight: 'bold',
                  backgroundColor: task.status === 'COMPLETED' ? 'var(--success)' : task.status === 'IN_PROGRESS' ? 'var(--accent)' : 'var(--bg-dark)',
                  color: task.status === 'PENDING' ? 'var(--text-muted)' : 'white',
                  border: task.status === 'PENDING' ? '1px solid var(--border)' : 'none'
                }}>
                  {task.status}
                </span>
              </div>
              {role === 'ADMIN' && (
                <button 
                  onClick={() => deleteTask(task.id)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.25rem' }}
                  title="Delete Task"
                >
                  ✕
                </button>
              )}
            </div>
            
            <p style={{ color: 'var(--text-main)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{task.description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>
                Assigned To: 
                <span style={{ color: 'var(--text-main)', marginLeft: '0.5rem' }}>
                  {task.assignedTo ? `User ${task.assignedTo.id}` : (
                    role === 'ADMIN' ? (
                      <span style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <input 
                          type="number" 
                          placeholder="User ID" 
                          value={assignInput[task.id] || ''}
                          onChange={(e) => handleAssignChange(task.id, e.target.value)}
                          style={{ width: '80px', padding: '0.2rem', fontSize: '0.8rem' }}
                        />
                        <button onClick={() => reassignTask(task.id)} className="btn btn-primary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Assign</button>
                      </span>
                    ) : 'Nobody'
                  )}
                </span>
              </span>
              <span style={{ color: 'var(--danger)' }}>Due: {task.deadline}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => updateStatus(task.id, "IN_PROGRESS")}
                className="btn"
                style={{ flex: 1, minWidth: '100px', fontSize: '0.9rem', padding: '0.5rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(task.id, "COMPLETED")}
                className="btn"
                style={{ flex: 1, minWidth: '100px', fontSize: '0.9rem', padding: '0.5rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--success)', color: 'var(--success)' }}
              >
                Completed
              </button>
              {role === 'ADMIN' && task.assignedTo && (
                <button
                  onClick={() => unassignTask(task.id)}
                  className="btn"
                  style={{ flex: 1, minWidth: '100px', fontSize: '0.9rem', padding: '0.5rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--danger)', color: 'var(--danger)' }}
                >
                  Unassign
                </button>
              )}
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
}

export default Tasks;
