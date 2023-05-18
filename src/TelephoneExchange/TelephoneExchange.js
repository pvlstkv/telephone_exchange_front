import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TelephoneExchange = ({ index, exchange }) => {

  let jwt = localStorage.getItem('token')
    let axiosConfig = {
      headers:{
          Authorization: "Bearer " + jwt
      }
    }  
    let id = exchange.id;
    console.log('id of exhange is', id)

    const handleDelete =  (event) =>{
      axios.delete(`http://localhost:8080/telephone-exchanges/${id}`, axiosConfig)
      window.location.reload()
    }  
  return (
    <>
        <td>{index}</td>
      <td> {exchange.number}</td>
      <td> {exchange.district && exchange.district.name}</td>
      <td> {exchange.subscribers && exchange.subscribers.map(item=>item.name)}</td>
      <td> {exchange.firstTwoDigits}</td>

      <td> <button onClick={handleDelete}>Удалить</button></td> 

      
    </>
  );
};

export default TelephoneExchange;
