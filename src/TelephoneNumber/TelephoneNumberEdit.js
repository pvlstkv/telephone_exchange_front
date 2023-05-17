import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const TelephoneNumberEdit = () => {
    let {id} = useParams()
    let jwt = localStorage.getItem('token')
    let axiosConfig = {
        headers:{
            Authorization: "Bearer " + jwt
        }
    }  
    const [telephoneNumber, setTelephoneNumber] = useState(null)
    const [message, setMessage] = useState('');
    const [exchange, setExchange] = useState([]);
    const [allExchanges, setAllExchanges] = useState([])
    const [selectedExchange, setSelectedExcahnge] = useState(null)
    let exchangeId;

    useEffect(()=>{
        const fetchPhoneNumber = async ()=>{
            await axios.get(`http://localhost:8080/phone-numbers/${id}`, axiosConfig)
            .then(response =>{
                console.log('response is ',response)
                setTelephoneNumber(response.data[0])
                let subscriberId = response.data[0].subscriberId
                exchangeId = response.data[0].exchangeId
                console.log('subscriber', subscriberId)
                console.log('exchange', exchangeId)
            })
        }
        fetchPhoneNumber();
    }, [])

    // useEffect(()=>{
    //     const fetchSubscrber = async ()=>{
    //         axios.get(`http://localhost:8080/subscribers/${telephoneNumber.subscriberId}`, axiosConfig)
    //             .then(response=>{
    //                 setSubscriber(response.data)
    //             })
    //     }
    //     if(telephoneNumber){
    //         fetchSubscrber()
    //     }
    // }, [telephoneNumber])



    useEffect(()=>{
        const fetchExchange = async ()=>{
          axios.get('http://localhost:8080/telephone-exchanges', axiosConfig)
          .then(response=>{
            const _allExchanges = response.data.map(item=>({
              value : item.id,
              label: item.number
            }))
            setAllExchanges(_allExchanges)
          })
            axios.get(`http://localhost:8080/telephone-exchanges/${telephoneNumber.exchangeId}`, axiosConfig)
                .then(response=>{
                    setExchange({
                      value:response.data.id,
                      label:response.data.number
                    })
                    setSelectedExcahnge({
                      value:response.data.id,
                      label:response.data.number
                    })
                })
        }
        if(telephoneNumber){
            fetchExchange()
        }
    }, [telephoneNumber])

    console.log(id)
    console.log()
    console.log('telephoneNUmber is', telephoneNumber)


    const handleExchange = (selected) =>{
      setSelectedExcahnge(selected)
      setTelephoneNumber({
        ...telephoneNumber,
        exchangeId:selected.value
      })
    }
    const handleInput = (event) =>{
      const { name, value } = event.target;
      setTelephoneNumber({
        ...telephoneNumber, 
        phone:value
      })
    }

    const navigate = useNavigate();
    const handleSave = () =>{
      axios.put(`http://localhost:8080/phone-numbers/${id}`, telephoneNumber, axiosConfig)
      setMessage('изменения успешно сохранены')
      setTimeout(()=>{
        navigate('/telephone-numbers')
      }, 2000)
    }
  return (
    <>
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
        
     }}>
      {telephoneNumber && exchange &&
        <div style={{ border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>Номер телефона:</span>
            <input type="text" name='phone' value={telephoneNumber.phone} onChange={handleInput}></input>
          </div>
          <div> 
            <span>Телефонная станция (номер)</span>
            <Select options={allExchanges} value={selectedExchange} onChange={handleExchange}></Select>
          </div>
          <button onClick={handleSave}>Сохранить</button>
        </div>        
      }
        {message.length > 0 && <span>{message}</span>}
    </div>
</>

  );
};

export default TelephoneNumberEdit;
