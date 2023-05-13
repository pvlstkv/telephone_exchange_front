import React, { useState } from 'react';
import axios from 'axios';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      } else if(response.status === 401){
        alert()
      }else {
        alert(response.status);
      }
    
    } catch (err) {
      if (err.code == 'ERR_NETWORK'){
        setError('ошибка подключения к серверу')
        alert('net')
      }else  if(err.code == 'ERR_BAD_REQUEST'){
        setError('ошибка авторизации, проверьте логин и пароль')
      }
      console.error('error happend', err);
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
      <label>{error.length > 0 ? <span>{error}</span>: <span/> }</label>
    </form>
  );
};

export default LoginForm;
