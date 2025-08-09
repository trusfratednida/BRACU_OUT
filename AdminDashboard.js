import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  
  const API_BASE = 'http://192.168.0.100:5000/api/admin';

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/users`);
    setUsers(res.data);
  };
  
  const handleVerify = async (id) => {
    await axios.post(`${API_BASE}/verify/${id}`);
    fetchUsers();
  };
  
  const handleBlock = async (id) => {
    await axios.post(`${API_BASE}/block/${id}`);
    fetchUsers();
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>🌟 Admin Verification Dashboard 🌟</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#34495e', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Role</th>
            <th style={{ padding: '12px' }}>Suspicious</th>
            <th style={{ padding: '12px' }}>Status</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user._id}
              style={{
                backgroundColor: user.isSuspicious ? '#ffebeb' : '#eaffea',
                transition: '0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = user.isSuspicious ? '#ffd6d6' : '#d6ffd6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = user.isSuspicious ? '#ffebeb' : '#eaffea'}
            >
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.role}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                {user.isSuspicious ? '🚨 Yes' : '✅ No'}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                {user.isBlocked ? '❌ Blocked' : user.isVerified ? '✅ Verified' : '⏳ Pending'}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                <button
                  onClick={() => handleVerify(user._id)}
                  disabled={user.isVerified}
                  style={{
                    marginRight: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: user.isVerified ? 'not-allowed' : 'pointer'
                  }}
                >
                  ✅ Verify
                </button>
                <button
                  onClick={() => handleBlock(user._id)}
                  disabled={user.isBlocked}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#c0392b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: user.isBlocked ? 'not-allowed' : 'pointer'
                  }}
                >
                  🚫 Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
