import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

 export default function District({ind, district}){
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
      headers:{
          Authorization: "Bearer " + jwt
      }
    }  

    let id = district.id;

    const handleDelete =  (event) =>{
        axios.delete(`http://localhost:8080/districts/${id}`, axiosConfig)
        window.location.reload()
    }    

    return(
        <>
              <td>{ind}</td>
              <td>{district.name}</td>
              <td>{district.city.name}</td>
              <td>{district.exchanges.length > 0 ? district.exchanges.map(exchange => exchange.number).join(', '): "-"}</td>
              <td>{district.exchanges.length > 0 ? district.exchanges.map(exchange => exchange.firstTwoDigits).join(', ') : "-"}</td>
              <td><Link to={{
                pathname:`/districts/editing/${id}`, 
                }}>Редактировать</Link></td>
            <td> <button onClick={handleDelete}>Удалить</button></td> 
        </>
    )
 }