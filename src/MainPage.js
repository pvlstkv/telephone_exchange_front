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
  let jwt = localStorage.getItem('token')
  let decodedJwt = jwtDecode(jwt)
  let userId = decodedJwt.id
  console.log('userId from main page is', userId)
  return (
    <div>
      <h1>Добро пожаловать</h1>
      <nav>
        <ul>
          <li>
            <Link to = "/profile" state={{userId:userId, mode:'edit'}}>Мой профиль</Link>
          </li>
          <li>
            <Link to="/cities">Таблица городов</Link>
          </li>
          <li>
            <Link to="/districts">Таблица районов</Link>
          </li>
          <li>
            <Link to="/telephone-numbers">Таблица телефонных номеров</Link>
          </li>
          <li>
            <Link to="/subscribers"> Таблица подписчиков</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
}

export default MainPage;
