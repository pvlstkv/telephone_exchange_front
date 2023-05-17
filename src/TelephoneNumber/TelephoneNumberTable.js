import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TelephoneNumber from './TelephoneNumber';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TelephoneNumberTable() {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState([]);
  const navigate = useNavigate()
  let jwt = localStorage.getItem('token')
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  

  useEffect(() => {
    const fetchPhoneNumbers = async ()=>{
      axios.get(`http://localhost:8080/phone-numbers/all-extended`, axiosConfig)
      .then(response=>{
        setPhoneNumbers(response.data)
        console.log('cities', response.data)
      })
        }
    fetchPhoneNumbers();
  }, []);

  const handleRowMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  const handleGoHome = ()=>{
    navigate('/')
  }

  return (
    <div>
      <h1>"Таблица номера телефонов"</h1>
            <button onClick={handleGoHome}>Главная страница</button>

      <p>{`${phoneNumbers.length} найдено записей`}</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Номер телефона:</th>
            <th>Имя подписчика:</th>
            <th>Адрес подписчика: </th>
            <th>Номер телефонной станции: </th>
          </tr>
        </thead>
        <tbody>
          {phoneNumbers.map((telephoneNumber, ind) => (
            <tr
              key={ind}
              onMouseEnter={() => handleRowMouseEnter(ind)}
              onMouseLeave={handleRowMouseLeave}
              style={{ backgroundColor: highlightedRow === ind ? 'yellow' : ind % 2 === 0 ? 'white' : 'lightgray' }}
            >
              {<TelephoneNumber index={ind} telephoneNumber={telephoneNumber}></TelephoneNumber>}
               
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/telephone-numbers/creating'> Создать новый номер</Link>
    </div>
  );
}

export default TelephoneNumberTable;
