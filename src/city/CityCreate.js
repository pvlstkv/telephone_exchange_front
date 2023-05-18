import axios from 'axios';
import React, { useState } from 'react';

export default function CityCreate(){
    
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
        headers:{
            Authorization: "Bearer " + jwt
        }
    }  

    const [city, setCity] = useState({})
    const [message, setMessage] = useState('')

    const handleInput = (event)=>{
        const { name, value } = event.target;
        setCity({
            name:value
        })
    }

    const handleSave = (event)=>{
        axios.post('http://localhost:8080/cities', city, axiosConfig)
        .then(response=>{
            console.log(response)
            setMessage('город успешно добавлен')
        })
    }
    return (
        <>
            <span>название города</span>
            <input type="text" name='name' onChange={handleInput}></input>
            <button onClick={handleSave}> Сохранить</button>
            {message.length > 0 && <div>{message}</div>}
        </>
    );
}