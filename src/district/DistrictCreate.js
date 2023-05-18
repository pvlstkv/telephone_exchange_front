import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function DistrictCreate(){
    
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
        headers:{
            Authorization: "Bearer " + jwt
        }
    }  

    const [district, setDistrict] = useState({})
    const [cities, setCities] = useState([])
    const [message, setMessage] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:8080/cities', axiosConfig)
        .then(response=>{
            const _cities = response.data.map(item=>({
                value:item.id,
                label:item.name
            }))
            setCities(_cities)
        })
    }, [])

    const handleInput = (event)=>{
        const { name, value } = event.target;
        setDistrict({
            ...district,
            name: value
        })
    }

    const handleSelect = (city) =>{
        setDistrict({
            ...district,
            cityId:city.value
        })
    }

    const handleSave = (event)=>{
        axios.post('http://localhost:8080/districts', district, axiosConfig)
        .then(response=>{
            console.log(response)
            setMessage('район успешно добавлен')
        })
    }
    return (
        <>
            <span>название района</span>
            <input type="text" name='name' onChange={handleInput}></input>
            <div>
                <span>выберите город</span>
                <Select options={cities} onChange={handleSelect}></Select>
            </div>
           
            <button onClick={handleSave}> Сохранить</button>
            {message.length > 0 && <div>{message}</div>}
        </>
    );
}