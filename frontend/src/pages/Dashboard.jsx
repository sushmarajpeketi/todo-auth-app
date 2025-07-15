import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Dashboard.css';
import axios from '../axiosInstance'; 

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return user ? (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-heading">Welcome, {user.name}</h1>
        <button onClick={logout} className="dashboard-logout-button">Logout</button>
        
        {/* TODO List UI will be added here */}
      </div>
    </div>
  ) : (
    <p className="dashboard-loading">Loading...</p>
  );
};

export default Dashboard;
