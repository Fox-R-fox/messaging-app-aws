import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (token) {
      axios.get('/users', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));
    }
  }, [token]);

  const register = () => {
    axios.post('/register', { username, password })
      .then(() => setMessage('User registered'))
      .catch(error => setMessage('Error registering user'));
  };

  const login = () => {
    axios.post('/login', { username, password })
      .then(response => setToken(response.data.token))
      .catch(error => setMessage('Invalid credentials'));
  };

  return (
    <div>
      <h1>Messaging App</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <p>{message}</p>
      <h2>Users</h2>
      <ul>
        {users.map(user => <li key={user._id}>{user.username}</li>)}
      </ul>
    </div>
  );
};

export default App;
