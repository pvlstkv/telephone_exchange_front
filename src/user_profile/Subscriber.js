import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Subscriber  = ({index, subscriber})  =>{
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
      headers:{
          Authorization: "Bearer " + jwt
      }
    }  
    let id = subscriber.id;

    const handleDelete =  (event) =>{
        axios.delete(`http://localhost:8080/subscribers/${id}`, axiosConfig)
        window.location.reload()
      }

    return(
        <>
        <td>{index}</td>
        <td>{subscriber.type}</td>
        <td>{subscriber.name}</td>
        <td>{subscriber.address ? subscriber.address : ''}</td>
        <td>{subscriber.login}</td>
        <td>{subscriber.roles.map(it=>it).join(', ')}</td>
        <td>{subscriber.phoneNumbers.map(it=>it.phone).join(', ')}</td>
        <td>{subscriber.installationDate}</td>
        <td><Link
                to={`/subscribers/editing/${subscriber.id}`} 
                state={{userId:subscriber.id, mode:'edit'}}
            >
            Редактировать
            </Link>
        </td>
        <td> <button onClick={handleDelete}>Удалить</button></td>   
        </>
    )
}

export default Subscriber