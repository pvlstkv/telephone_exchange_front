import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Select from 'react-select'

function SubscriberProfile (){
  const [user, setUser] = useState({});
  const [oldUser, setOldUser ] = useState({})
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('')
  let jwt = localStorage.getItem('token')

  const location = useLocation();
  const {userId} = location.state
  const {mode} = location.state
  console.log('mode is ', mode)
  console.log('userId is ', userId)

  const [oldSelectedNumbers, setOldSelectedNUmbers] = useState()
  const[selectedNumbers, setSelectedNumbers] = useState([])

  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  

  
  useEffect(() => {
            const fetchUser = async () => {
              axios.get(`http://localhost:8080/subscribers/${userId}`, axiosConfig)
              .then(response=>{
                setUser(response.data);
                setOldUser(response.data)

                const fetchPhoneNumbers= async ()=>{
                    let ids = response.data.phoneNumberIds.join(',')
                    console.log('phoneNumberIds are', ids)
                    if (ids.length>0){
                      axios.get(`http://localhost:8080/phone-numbers/${ids}`, axiosConfig)
                      .then(response=>{
                          // console.log('all telephones are', response.data)
                          const selected = response.data.map(item=>({
                            value:item.id,
                            label:item.phone
                          }))
                          setSelectedNumbers(selected)
                          setOldSelectedNUmbers(selected)
                          console.log('selected', selected)
                      })      
                    }            
                  }
                fetchPhoneNumbers()
              })
            };
        console.log('in use effect')
        if (mode === 'edit'){
          fetchUser();
        } else if(mode === 'create'){
          setUser({
            ...user,
            id:null,
            phoneNumberIds:[],
            type:"PERSON",
            roles:["USER"]
          })
          console.log('in crating mode')
          setEditMode(true)
          handleEditMode();
        }
    }, [])

    
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password'){
        console.log('setting encodepassword', user.encodePassword)
        setUser(
              {...user,
                password:value,
                encodePassword: true
              }
            )
        return
    }
    console.log(name);
    console.log(user)
    setUser({ ...user, [name]: value });
  };

  const handleNumberChange=(selectedNumber)=>{
      console.log('selectedNUmber is', selectedNumber)
      setSelectedNumbers(selectedNumber)
      const numberIds = selectedNumber.map(item=>item.value)
      console.log('selectedNUmberIds are', numberIds)
      setUser({
        ...user,
        phoneNumberIds: numberIds
      })
      console.log('user phones are', user.phoneNumberIds)
  }

  function handleCancelEdit(event){
    setEditMode(false)
    setUser(oldUser)
    setSelectedNumbers(oldSelectedNumbers)
  }

  const handleSave = async (event) => {
        event.preventDefault();
        console.log('user is', user)
        if (mode === 'edit'){
          await axios.put(`http://localhost:8080/subscribers/${id}`, user, axiosConfig);  
          setEditMode(false)
        }else{
          if(user.login === '' && user.password === ''){
            alert('нельзя создать пользователя, не указав его логин и пароль')
            return
          }
          axios.post('http://localhost:8080/subscribers', user, axiosConfig)
          .then(response=>{
            console.log(response)
            setUser(null)
            setMessage('подписчик успешно создан')
          })
        }
 };
 const { id, type, name, address, installationDate, login,  password,  roles } = user;

  const [userRole, setUserRole] = useState(roles)
  const [userType, setUserType] = useState(type)

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    if (name === 'role'){
      setUserRole(value);
      setUser({
        ...user,
        roles: [value]
      })
    }
    if (name === 'type'){
      setUserType(value)
      setUser({
        ...user,
        type: value
      })
    }
   
  };


  const [allPhones, setAllPhones] = useState([])
  const handleEditMode= ()=> {
    axios.get('http://localhost:8080/phone-numbers', axiosConfig)
    .then(response=>{
      const options = response.data.filter(item=>item.subscriberId === null).map(item=>({
        
          value:item.id,
          label:item.phone
        
      }))
      setAllPhones(options)
      console.log('all phone',options)
    })
    setEditMode(true);
  }

  return (
    <div>
     {mode ==='edit' && <h1>Профиль подписчика</h1> }
     {mode === 'create' && <h1> Создание нового профиля</h1>}
      {mode === 'edit' && <div>
        <label>ID:</label>
        <span>{id}</span>
      </div>}
      <div>
        <label>Тип:</label>
        {editMode ? (
            <select
              name="type"
              value={userType}
              onChange={handleSelectChange}
              style={{ marginBottom: "1rem" }}
            >
            <option value="PERSON">PERSON</option>
            <option value="COMPANY">COMPANY</option>
            </select>

        ) : (
          <span>{type}</span>
        )}
      </div>
      <div>
        <label>Имя:</label>
        {editMode ? (
          <input type="text" name="name" value={name} onChange={handleInputChange} />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div>
        <label>Адрес:</label>
        {editMode ? (
          <input type="text" name="address" value={address} onChange={handleInputChange} />
        ) : (
          <span>{address}</span>
        )}
      </div>
      <div>
        <label>Дата установки:</label>
        {editMode ? (
          <input type="date" name="installationDate" value={installationDate} onChange={handleInputChange} />
        ) : (
          <span>{installationDate}</span>
        )}
      </div>
      <div>
        <label>Логин:</label>
        {mode === 'create'? 
          <input type="text" name="login" onChange={handleInputChange} />: <span>{login}</span> }
      </div>
      <div>
      {editMode ? (<span>
        <label>Пароль:</label>
            <input type="password" name="password" value={password} onChange={handleInputChange} />
          </span>
        ) : (
          <span>{password}</span>
        )}
      </div>
      <div>
        {/* <label>Phone Numbers:</label> */}
        {
        // editMode ? (
          // <input type="text" name="phoneNumberIds" value={phoneNumberIds} onChange={handleInputChange} />
        //   <select
        //   name="phoneNumberIds"
        //   value={user.phoneNumbers}
        //   onChange={handleInputChange}
        //   multiple
        // >
        //   {phoneNumbers.map((phoneNumber) => (
        //     <option key={phoneNumber.id} value={phoneNumber.id}>
        //       {phoneNumber.number}
        //     </option>
        //   ))}
        // </select>
      //   <select multiple name="phoneNumberIds"  value={phoneNumbers} onChange={handleSelectChange}
      //   // style={{width: "300px", backgroundColor:'green', color: 'black'}}
      //   >
      //     {phoneNumbers.map((phoneNumber, idx) => (
      //       <option key={idx} value={phoneNumber} 
      //       // style={{width: "300px", backgroundColor:'blue', color: 'black'}}
      //       >{phoneNumber.phone}</option>
      //   ))}
      // </select>
// {}        ) : (
          // <span>{<ul>
          //   {selectedNumbers && selectedNumbers.map((item, idx) => (
          //     <li key={idx}>{item.label}</li>
          //   ))}
          // </ul>}</span>
        //  )
      }   
      </div>
      <div>
        <label>телефонные номера:</label>
        {editMode ? (
          <Select options={allPhones} value={selectedNumbers} isMulti onChange={handleNumberChange}></Select>
        ):(
          <span>{<ul>
            {selectedNumbers && selectedNumbers.map((item, idx) => (
              <li key={idx}>{item.label}</li>
            ))}
          </ul>}</span>
        )}
      </div>
      <div>
        <label>Роль:</label>
        {editMode ? (
            <select
            name="role"
            value={userRole}
            onChange={handleSelectChange}
            style={{ marginBottom: "1rem" }}
            >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            </select>

        ) : (
          <span>{roles}</span>
        )}
      </div>
      {editMode ? (
        <div>
           {mode ==='edit' && <button onClick={handleCancelEdit}>Cancel edit</button>}
            <button onClick={handleSave}>Save</button>
            <div>{message.length > 0 && message}</div>
        </div>
      ) : (
        <button onClick={handleEditMode}>Edit</button>
      )}
    </div>
  );

  
};

export default SubscriberProfile;
