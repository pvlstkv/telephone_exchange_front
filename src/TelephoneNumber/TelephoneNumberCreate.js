import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';

function TelephoneNumberCreate() {
    const [subscriberOptions, setSubscriberOptions] = useState([]);
    const [exchangeOptions, setExchangeOptions] = useState([]);
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);
    const [selectedExchange, setSelectedExchange] = useState(null);
    const [phone, setPhone] = useState('');
    const [success, setSuccess] = useState('')

    let jwt = localStorage.getItem('token')
    let axiosConfig = {
      headers:{
          Authorization: "Bearer " + jwt
      }
    }  
  
    useEffect(() => {
      
      axios.get('http://localhost:8080/subscribers', axiosConfig)
        .then(response => {
          const options = response.data.map(subscriber => ({
            value: subscriber.id,
            label: subscriber.name
          }));
          setSubscriberOptions(options);
        })

      axios.get('http://localhost:8080/telephone-exchanges', axiosConfig)
        .then(response => {
          const options = response.data.map(exchange => ({
            value: exchange.id,
            label: exchange.number
          }));
          setExchangeOptions(options);
        })

    }, []);
  
    // const handleSubscriberChange = (selectedOption) => {
    //   setSelectedSubscriber(selectedOption);
    // };
  
    const handleExchangeChange = (selectedOption) => {
      setSelectedExchange(selectedOption);
    };
  
    const navigate = useNavigate()
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        phone: phone,
        // subscriberId: selectedSubscriber.value,
        exchangeId: selectedExchange.value
      };
      axios.post('http://localhost:8080/phone-numbers', data, axiosConfig)
        .then(response => {
          console.log(response.data)
          setSuccess('номер успешно добавлен')
          setSelectedExchange(null)
          setSelectedSubscriber(null)
          setPhone('')
          setTimeout(()=>{
            navigate('/telephone-numbers')
          },2000)
        })
    };

    const handleInput = (event) =>{
      setPhone(event.target.value)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Phone:
          <input type="text" value={phone} onChange={handleInput} />
        </label>
        <br />
        {/* <label>
          Subscriber:
          <Select options={subscriberOptions} value={selectedSubscriber} onChange={handleSubscriberChange} />
        </label> */}
        <br />
        <label>
          Exchange:
          <Select options={exchangeOptions} value={selectedExchange} onChange={handleExchangeChange} />
        </label>
        <br />
        <button type="submit">Create Entity</button>
        <div>{success}</div>
      </form>
    );
  }
  
  export default TelephoneNumberCreate;
  