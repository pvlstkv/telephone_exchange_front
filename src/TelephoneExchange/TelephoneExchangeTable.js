import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TelephoneExchange from './TelephoneExchange';

function TelephoneExchangeTable() {
  const [exchanges, setExchanges] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState([]);
  let jwt = localStorage.getItem('token')
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  

  useEffect(() => {
    const fetchExchanges = async ()=>{
      axios.get(`http://localhost:8080/telephone-exchanges/all-extended`, axiosConfig)
      .then(response=>{
        setExchanges(response.data)
        console.log('exchanges', response.data)
      })
        }
    fetchExchanges();
  }, []);

  const handleRowMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  return (
    <div>
      <h1>"Таблица телефонных станций"</h1>
      <p>{`${exchanges.length} найдено записей`}</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Номер телефона:</th>
            <th>Название района:</th>
            <th>Имена подписчиков: </th>
            <th>Первые две цифры: </th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange, ind) => (
            <tr
              key={ind}
              onMouseEnter={() => handleRowMouseEnter(ind)}
              onMouseLeave={handleRowMouseLeave}
              style={{ backgroundColor: highlightedRow === ind ? 'yellow' : ind % 2 === 0 ? 'white' : 'lightgray' }}
            >
              {<TelephoneExchange index={ind} exchange={exchange}></TelephoneExchange>}
               
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Link to='/telephone-exchanges/creating'> Создать новую станцию</Link> */}
    </div>
  );
}

export default TelephoneExchangeTable;
