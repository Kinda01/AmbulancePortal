import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password, role }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleRegistration}>
      <input
        type="text"
        id="reg-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        id="reg-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select
        id="reg-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="call_center">Call Center</option>
        <option value="dispatcher">Dispatcher</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
