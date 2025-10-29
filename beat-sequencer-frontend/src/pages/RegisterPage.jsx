import React, { useState } from 'react';
import apiClient from '../services/api'; // Import our API client
import { useNavigate } from 'react-router-dom'; // Import for redirection

function RegisterPage() {
  // 1. Add state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  // 2. Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser form submission
    setError(''); // Clear previous errors

    try {
      // 3. Call the backend API
      const response = await apiClient.post('/api/auth/register', {
        username: username,
        password: password
      });
      console.log('Registration successful:', response.data);
      // 4. Redirect to login page on success
      navigate('/login'); 
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      // 5. Display error message from backend if available
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  return (
    // 6. Use the handleSubmit function
    <form onSubmit={handleSubmit} style={{ width: '300px', margin: '2rem auto' }}>
      <h2>Register</h2>
      {/* 7. Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username">Username</label>
        {/* 8. Connect input to state */}
        <input 
          type="text" 
          id="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Make field required
          style={{ width: '100%' }} 
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        {/* 9. Connect input to state */}
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Make field required
          style={{ width: '100%' }} 
        />
      </div>
      <button type="submit" style={{ padding: '0.5rem' }}>Register</button>
    </form>
  );
}

export default RegisterPage;