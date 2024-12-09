import React, { useState } from 'react';
import '../Styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text();  // Read response as text
        throw new Error(`Server error: ${response.status}, ${errorText}`);
      }
  
      const data = await response.json();  // Proceed with JSON parsing if successful
  
      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
      console.error(error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
