import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Welcome, {user?.username}</h2>
      <button onClick={() => navigate('/trips')}>View Trips</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Dashboard;