import React, { useState } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Get the login function from context

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await apiClient.post('/api/auth/login', {
        username: username,
        password: password
      });
      console.log('Login successful:', response.data);

      // 3. Set the user in the context
      // For now, just store the username. We'll store more (like tokens) later.
      login({ username: username });

      navigate('/'); // Redirect to home page

    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError(err.response?.data || 'Login failed. Please check your credentials.');
    }
  };

  // ... (keep the form return statement the same) ...
  return (
    <form onSubmit={handleSubmit} style={{ width: '300px', margin: '2rem auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </div>
      <button type="submit" style={{ padding: '0.5rem' }}>Login</button>
    </form>
  );
}

export default LoginPage;