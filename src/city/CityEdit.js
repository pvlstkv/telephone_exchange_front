import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function CityEdit(){
    let {id} = useParams()
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
      headers:{
          Authorization: "Bearer " + jwt
      }
    }  
    const [city, setCity] = useState({})
    const [districts, setDistricts] = useState([])
    const [selectedDistricts, setSelectedDistricts] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/cities/${id}`, axiosConfig)
        .then(response=>{
            setCity(response.data[0])
            let districtIds = response.data[0].districtIds.join(',')
            axios.get('')
        })
    },[])

    useEffect(()=>{
        axios.get('http://localhost:8080/districts', axiosConfig)
        .then(response => {
            const _districts = response.data
                .filter(item=>item.cityId === null)
                .map(item=>({
                    value:item.id,
                    label: item.name
                }))
            setDistricts(_districts)
            setSelectedDistricts(city.di)
        })
    },[city])

    const handleInput = (event)=>{
        const { name, value } = event.target;
        setCity({
            name:value
        })
    }
    const handleSelectInput = (event)=>{

    }

    return(
        <>
         <span>название города</span>
        <input type="text" name='name' onChange={handleInput}></input>
        <span>районы города</span>
        <Select ></Select>
        </>
    )
}