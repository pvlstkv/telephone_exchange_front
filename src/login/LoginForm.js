import React, { useState } from 'react';
import axios from 'axios';
import MainPage from '../MainPage';
import jwtDecode from 'jwt-decode';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username, password);
      const response = await axios.post('http://localhost:8080/api/auth/signin', { login:username, password:password });
      console.log('login response is ', response)
      if (response.status === 202) {
        localStorage.setItem('token', response.data.value)
        localStorage.setItem('authenticated', true)
        window.location.href = '/';
        console.log(response.data.token)
      } else {
        const { message } = await response.json();
        alert(message);
      }
    
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
