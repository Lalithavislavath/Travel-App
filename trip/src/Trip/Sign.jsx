import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((u) => u.username === username)) {
      alert('Username already exists');
      return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please log in.');
    navigate('/');
  };
  return (
    <div className="container">
      <h2>Signup</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleSignup}>Sign Up</button>
      <p> Already have an account? <a href="/">Log in</a></p>
    </div>
  );
};
export default Signup