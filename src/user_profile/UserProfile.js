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

  let encodePassword = false;

    useEffect(() => {
            const fetchUser = async () => {
            const response = await axios.get(`http://localhost:8080/subscribers/${userId}`, axiosConfig);
            setUser(response.data);
            setOldUser(response.data)
        };
        fetchUser();
    }, [])
    
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == 'password'){

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
          <input type="text" name="type" value={type} onChange={handleInputChange} />
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
          <input type="text" name="installationDate" value={installationDate} onChange={handleInputChange} />
        ) : (
          <span>{installationDate}</span>
        )}
      </div>
      <div>
        <label>Login:</label>
        <span>{login}</span>
      </div>
      <div>
        <label>Password:</label>
        {editMode ? (
          <input type="password" name="password" value={password} onChange={handleInputChange} />
        ) : (
          <span>{password}</span>
        )}
      </div>
      <div>
        <label>Phone Number IDs:</label>
        {editMode ? (
          <input type="text" name="phoneNumberIds" value={phoneNumberIds} onChange={handleInputChange} />
        ) : (
          <span>{phoneNumberIds}</span>
        )}
      </div>
      <div>
        <label>Roles:</label>
        {editMode ? (
          <input type="text" name="roles" value={roles} onChange={handleInputChange} />
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
