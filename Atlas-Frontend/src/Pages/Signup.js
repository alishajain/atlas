import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Signup = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/login')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  // Add a new user to the database
  const addUser = () => {
    axios.post('http://localhost:5000/api/login', { username, password })
      .then((response) => {
        setUsers([...users, response.data]);
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  // Password input
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default Signup;
