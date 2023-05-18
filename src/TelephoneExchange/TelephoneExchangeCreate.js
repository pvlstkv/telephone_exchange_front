import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function TelephoneExchangeCreate(){
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
        headers:{
            Authorization: "Bearer " + jwt
        }
    }  

    const [exchange, setExchange] = useState({})
    const [districts, setDistricts] = useState([])
    const [firstTwoDigits, setFirstTwoDigits] = useState('')
    const [message, setMessage] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:8080/districts', axiosConfig)
        .then(response=>{
            //добавить города
            const _districts = response.data.map(item=>({
                value:item.id,
                label:item.name
            }))
            setDistricts(_districts)
        })
    }, [])

    const handleInput = (event)=>{
        const { name, value } = event.target;
        console.log(name)
        console.log('inputing number')
        console.log('inputing number')

        let twoDigits = value.slice(0, 2)
        console.log('12 digits is', twoDigits)
        setFirstTwoDigits(twoDigits)
        console.log('name and value are ', name, value)
        setExchange({
            ...exchange,
            [name]: value,
            'firstTwoDigits':twoDigits
        })
    }


    const handleSelect = (district) =>{
        setExchange({
            ...exchange,
            districtId:district.value
        })
    }

    const handleSave = (event)=>{
        console.log('send this', exchange)
        axios.post('http://localhost:8080/telephone-exchanges',exchange, axiosConfig)
        .then(response=>{
            console.log(response)
            setMessage('телефонная станция успешно добавлена')
        })
    }

    return (
        <>
            <div>
                <div>
                    <span>номер телефона</span>
                    <input type='number' name='number' onChange={handleInput}></input>                    
                </div>
                <div>
                    <span> первые две цифры</span>
                    <input readOnly value={firstTwoDigits}></input>
                </div>
                <div>
                    <span>выберите район</span>
                    <Select options={districts} onChange={handleSelect}></Select>
                </div>
            </div>
            <button onClick={handleSave}> Сохранить</button>
            {message.length > 0 && <div>{message}</div>}
        </>
    )

} 