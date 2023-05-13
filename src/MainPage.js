import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './styles.css';

function MainPage() {

  const navigate = useNavigate();
  let isAuthenticated = JSON.parse(localStorage.getItem('authenticated'))
  console.log(jwtDecode(localStorage.getItem('token')))

  if (!isAuthenticated){
      navigate('/login')
      return
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authenticated')
    navigate('/login')
  };
  return (
    <div>
      <h1>Welcome to my website!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About Me</Link>
          </li>
          <li>
            <Link to="/projects">My Projects</Link>
          </li>
          <li>
            <Link to="/profile">Мой профиль</Link>
          </li>
          <li>
            <Link to="/cities">Таблица городов</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
}

export default MainPage;
