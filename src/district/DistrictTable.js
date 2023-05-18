import React, { useState, useEffect } from 'react';
import axios from 'axios';
import District from './District';
import { Link } from 'react-router-dom';


function DistrictTable() {
  const [districts, setDistricts] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState([]);
  let jwt = localStorage.getItem('token')
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  

  useEffect(() => {
    const fetchDistricts = async ()=>{
      axios.get(`http://localhost:8080/districts/all-extended`, axiosConfig)
      .then(response=>{
        setDistricts(response.data)
        console.log('cities', response.data)
      })
        }
    fetchDistricts();
  }, []);

  const handleRowMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  return (
    <div>
      <h1>"Таблица районы"</h1>
      <p>{`${districts.length} найдено записей`}</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Названия района</th>
            <th>Название города</th>
            <th>Номера телефонных станций</th>
            <th>Первые две цифры</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district, ind) => (
            <tr
              key={ind}
              onMouseEnter={() => handleRowMouseEnter(ind)}
              onMouseLeave={handleRowMouseLeave}
              style={{ backgroundColor: highlightedRow === ind ? 'yellow' : ind % 2 === 0 ? 'white' : 'lightgray' }}
            >
              <District ind={ind} district={district}></District>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        to='/districts/creating'
      > Создать новый район</Link>
    </div>
  );
}

export default DistrictTable;
