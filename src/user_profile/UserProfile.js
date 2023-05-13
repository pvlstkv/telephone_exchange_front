import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function UserProfile (){
  const [user, setUser] = useState({});
  const [oldUser, setOldUser ] = useState({})
  const [editMode, setEditMode] = useState(false);
  let jwt = localStorage.getItem('token')
  let decodedJwt = jwtDecode(jwt)
  let userId = decodedJwt.id
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  
  useEffect(() => {
            const fetchUser = async () => {
            const response = await axios.get(`http://localhost:8080/subscribers/${userId}`, axiosConfig);
            setUser(response.data);
            setOldUser(response.data)
        };
        fetchUser();
    }, [])

  const [phoneNumbers, setPhoneNumbers] = useState([])
  useEffect(()=>{
    async function fetchPhoneNumbers(){
      if (user.phoneNumberIds && user.phoneNumberIds.length > 0) {
        let ids = user.phoneNumberIds.join(',')
        const response = await axios.get(`http://localhost:8080/phone-numbers/${ids}`, axiosConfig)
        setPhoneNumbers(response.data)
        console.log(response.data)
      }
    }
    fetchPhoneNumbers()
  }, [user])

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
    if (name === 'phoneNumberIds') {
      const ids = value.split(',').map((id) => parseInt(id.trim()));
      setUser({
        ...user,
        phoneNumberIds: ids,
      });
      return;
    }

    console.log(name);
    console.log(user)
    setUser({ ...user, [name]: value });
  };


  function handleCancelEdit(event){
    setEditMode(false)
    setUser(oldUser)
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
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}
    </div>
  );
};

export default UserProfile;
