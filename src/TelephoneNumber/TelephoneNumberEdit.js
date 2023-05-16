import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TelephoneNumberEdit = () => {
    let {id} = useParams()
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
        headers:{
            Authorization: "Bearer " + jwt
        }
    }  
    const [telephoneNumber, setTelephoneNumber] = useState()
    const [subscriber, setSubscriber] = useState();
    const [exchange, setExchange] = useState();

    useEffect(()=>{
        const fetchPhoneNumber = async ()=>{
            await axios.get(`http://localhost:8080/phone-numbers/${id}`, axiosConfig)
            .then(response =>{
                console.log('response is ',response)
                setTelephoneNumber(response.data[0])
                let subscriberId = response.data[0].subscriberId
                let exchangeId = response.data[0].exchangeId
                console.log('subscriber', subscriberId)
                console.log('exchange', exchangeId)
            })
        }
        fetchPhoneNumber();
    }, [])

    useEffect(()=>{
        const fetchSubscrber = async ()=>{
            axios.get(`http://localhost:8080/subscribers/${telephoneNumber.subscriberId}`, axiosConfig)
                .then(response=>{
                    setSubscriber(response.data)
                })
        }
        if(telephoneNumber){
            fetchSubscrber()
        }
    }, [telephoneNumber])



    useEffect(()=>{
        const fetchExchange = async ()=>{
            axios.get(`http://localhost:8080/telephone-exchanges/${telephoneNumber.exchangeId}`, axiosConfig)
                .then(response=>{
                    setExchange(response.data)
                })
        }
        if(telephoneNumber){
            fetchExchange()
        }
    }, [telephoneNumber])

    console.log(id)
    console.log()
    console.log(exchange)
  return (
    <>
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
        
     }}>
      {telephoneNumber && exchange && subscriber &&
        <div style={{ border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>Номер телефона:</span>
            <span>{telephoneNumber.phone}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Логин:</span>
            <span>{subscriber.login}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Имя:</span>
            <span>{subscriber.name}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Адрес:</span>
            <span>{subscriber.address}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Номер телефоннной станции:</span>
            <span>{exchange.number}</span>
          </div>
        </div>
      }
    </div>
</>

  );
};

export default TelephoneNumberEdit;
