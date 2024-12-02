import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  // Add a new user to the database
  const addUser = () => {
    axios.post('http://localhost:5000/users', { name, email })
      .then((response) => {
        setUsers([...users, response.data]);
        setName('');
        setEmail('');
      })
      .catch((error) => {
        console.error('There was an error adding the user!', error);
      });
  };

  axios.get('/users')
  .then((response) => {
    setUsers(response.data);
  })
  .catch((error) => {
    console.error('There was an error fetching the users!', error);
  });
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default User;
