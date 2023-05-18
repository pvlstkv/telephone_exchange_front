import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const City = ({ index, city }) => {

  let jwt = localStorage.getItem('token')
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  
  let id = city.id;

  const handleDelete =  (event) =>{
    axios.delete(`http://localhost:8080/cities/${id}`, axiosConfig)
    window.location.reload()
  }

  return (
    <>
        <td>{index}</td>
        <td>{city.name}</td>
        <td>{city.districts.length > 0 ? city.districts.map(district => district.name).join(', '): "-"}</td>
       <td><Link to={{
        pathname:`/cities/editing/${id}`, 
        }}>Редактировать</Link></td>
     <td> <button onClick={handleDelete}>Удалить</button></td>
     
    </>
  );
};

export default City;
