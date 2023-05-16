import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Select from 'react-select'

function SubscriberProfile (){
  const [user, setUser] = useState({});
  const [oldUser, setOldUser ] = useState({})
  const [editMode, setEditMode] = useState(false);
  let jwt = localStorage.getItem('token')

  const location = useLocation();
  const {userId} = location.state
  console.log('userId is ', userId)

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
                  axios.get(`http://localhost:8080/phone-numbers/${ids}`, axiosConfig)
                  .then(response=>{
                      setPhoneNumbers(response.data)
                      const selected = response.data.map(item=>({
                        value:item.id,
                        label:item.phone
                      }))
                      setSelectedNumbers(selected)
                      setOldSelectedNUmbers(selected)
                      console.log('selected', selected)
                  })                  
                }
              fetchPhoneNumbers()
            })
        };
        fetchUser();
    }, [])

  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [oldSelectedNumbers, setOldSelectedNUmbers] = useState()
  const[selectedNumbers, setSelectedNumbers] = useState([])

  // useEffect(()=>{
    
  // }, [user])

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
      setUser({
        ...user,
        phoneNumberIds:selectedNumbers.map(item=>item.value)
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
        console.log(user)
        await axios.put(`http://localhost:8080/subscribers/${id}`, user, axiosConfig);
        setEditMode(false)
    };
    const { id, type, name, address, installationDate, login,  password, phoneNumberIds, roles } = user;

  const [userRole, setUserRole] = useState(roles)
  const [userType, setUserType] = useState(type)
  console.log(type)

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
      const options = response.data.map(item=>({
        
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
      <h1>User Profile</h1>
      <div>
        <label>ID:</label>
        <span>{id}</span>
      </div>
      <div>
        <label>Type:</label>
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
        <label>Name:</label>
        {editMode ? (
          <input type="text" name="name" value={name} onChange={handleInputChange} />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div>
        <label>Address:</label>
        {editMode ? (
          <input type="text" name="address" value={address} onChange={handleInputChange} />
        ) : (
          <span>{address}</span>
        )}
      </div>
      <div>
        <label>Installation Date:</label>
        {editMode ? (
          <input type="date" name="installationDate" value={installationDate} onChange={handleInputChange} />
        ) : (
          <span>{installationDate}</span>
        )}
      </div>
      <div>
        <label>Login:</label>
        <span>{login}</span>
      </div>
      <div>
      {editMode ? (<span>
        <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handleInputChange} />
          </span>
        ) : (
          <span>{password}</span>
        )}
      </div>
      <div>
        <label>Phone Numbers:</label>
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
          <span>{<ul>
            {phoneNumbers && phoneNumbers.map((item, idx) => (
              <li key={idx}>{item.phone}</li>
            ))}
          </ul>}</span>
        //  )
      }   
      </div>
      <div>
        <label>телефонные номера:</label>
        {editMode ? (
          <Select options={allPhones} value={selectedNumbers} isMulti onChange={handleNumberChange}></Select>
        ):(
          <span>{<ul>
            {phoneNumbers && phoneNumbers.map((item, idx) => (
              <li key={idx}>{item.phone}</li>
            ))}
          </ul>}</span>
        )}
      </div>
      <div>
        <label>Role:</label>
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
            <button onClick={handleCancelEdit}>Cancel edit</button>
            <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <button onClick={handleEditMode}>Edit</button>
      )}
    </div>
  );

  
};

export default SubscriberProfile;
