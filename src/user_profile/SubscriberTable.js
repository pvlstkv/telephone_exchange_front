import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Subscriber from './Subscriber';

function SubscriberTable() {
  const [subscribers, setSubscribers] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState([]);
  let jwt = localStorage.getItem('token')
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  

  useEffect(() => {
    const fetchSubscribers = async ()=>{
      axios.get(`http://localhost:8080/subscribers/all-extended`, axiosConfig)
      .then(response=>{
        setSubscribers(response.data)
        console.log('subscribers', response.data)
      })
        }
        fetchSubscribers();
  }, []);

  const handleRowMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  return (
    <div>
      <h1>"Таблица подписчиков"</h1>
      <p>{`${subscribers.length} найдено записей`}</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Тип подписчика:</th>
            <th>Имя подписчика:</th>
            <th>Адрес подписчика: </th>
            <th>Логин: </th>
            <th>Роль в системе: </th>
            <th>Номера телефонов: </th>
            <th>Дата установки: </th>

          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, ind) => (
            <tr
              key={ind}
              onMouseEnter={() => handleRowMouseEnter(ind)}
              onMouseLeave={handleRowMouseLeave}
              style={{ backgroundColor: highlightedRow === ind ? 'yellow' : ind % 2 === 0 ? 'white' : 'lightgray' }}
            >
              {<Subscriber index={ind} subscriber={subscriber}/>}
               
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/telephone-numbers/creating'> Создать нового подписчика</Link>
    </div>
  );
}

export default SubscriberTable;
