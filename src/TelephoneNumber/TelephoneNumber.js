import { Button } from 'bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TelephoneNumber = ({ index, telephoneNumber }) => {

  let jwt = localStorage.getItem('token')
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  
  let id = telephoneNumber.id;

  const handleDelete =  (event) =>{
    axios.delete(`http://localhost:8080/phone-numbers/${id}`, axiosConfig)
    window.location.reload()
  }

  return (
    <>
        <td>{index}</td>
      <td> {telephoneNumber.phone}</td>
      <td> {telephoneNumber.subscriber && telephoneNumber.subscriber.name}</td>
      <td> {telephoneNumber.subscriber && telephoneNumber.subscriber.address}</td>
      <td> {telephoneNumber.exchange.number}</td>
       <td><Link to={{
        pathname:`/telephone-numbers/editing/${id}`, 
        }}>Редактировать</Link></td>
     <td> <button onClick={handleDelete}>Удалить</button></td>
     
    </>
  );
};

export default TelephoneNumber;
