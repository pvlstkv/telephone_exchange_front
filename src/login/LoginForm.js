import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log((await axios.get('http://localhost:8080/hello')).data)
    try {
      // axios.get('http://localhost:8080/hello').then(
      //   function(response){
      //     console.log(response.data)
      //   }
      // )
      console.log(username, password);
      const response = await axios.post('http://localhost:8080/api/auth/signin', { login:username, password:password });
      console.log(response)
      if (response.status === 202) {
        localStorage.setItem('token', response.data.token);
        // window.location.href = '/';
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
