import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MainPage() {

  const navigate = useNavigate();
  let isAuthenticated = JSON.parse(localStorage.getItem('authenticated'))
  if (!isAuthenticated){
      navigate('/login')
      return
  }
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
        </ul>
      </nav>
    </div>
  );
}

export default MainPage;
