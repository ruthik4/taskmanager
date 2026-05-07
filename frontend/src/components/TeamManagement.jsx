import { useEffect, useState } from "react";
import api from "../services/api";

function TeamManagement({ projectId }) {
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchMembers();
  }, [projectId]);

  const fetchMembers = async () => {
    try {
      const response = await api.get(`/projects/${projectId}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load members");
    }
  };

  const addMember = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/projects/${projectId}/members/${userId}`);
      alert("Member Added!");
      setUserId("");
      fetchMembers();
    } catch (error) {
      console.error(error);
      alert("Failed to add member");
    }
  };

  const removeMember = async (userIdToRemove) => {
    if (!window.confirm("Remove this member?")) return;
    try {
      await api.delete(`/projects/${projectId}/members/${userIdToRemove}`);
      alert("Member removed!");
      fetchMembers();
    } catch (error) {
      console.error(error);
      alert("Failed to remove member");
    }
  };

  return (
    <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
      <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '1rem' }}>Team Members</h3>

      {role === 'ADMIN' && (
        <form onSubmit={addMember} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ flex: 1 }}
          />

          <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Add
          </button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {members.map((member) => (
          <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div>
              <p style={{ color: 'var(--text-main)', fontWeight: '500', fontSize: '0.95rem' }}>{member.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{member.email}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                padding: '0.2rem 0.5rem', 
                borderRadius: '99px',
                backgroundColor: member.role === 'ADMIN' ? 'var(--accent)' : 'var(--bg-card)',
                color: member.role === 'ADMIN' ? 'white' : 'var(--text-muted)',
                border: member.role === 'ADMIN' ? 'none' : '1px solid var(--border)'
              }}>
                {member.role}
              </span>
              {role === 'ADMIN' && (
                <button 
                  onClick={() => removeMember(member.id)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0 0.25rem' }}
                  title="Remove Member"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No members yet.</p>
        )}
      </div>
    </div>
  );
}

export default TeamManagement;
