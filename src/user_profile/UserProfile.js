import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8080/subscribers/${id}`);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:8080/subscribers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setUser(data);
    setEditMode(false);
  };

  const { id, type, name, address, installationDate, login, encodePassword, password, phoneNumberIds, roles } = user;

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
          <input type="text" name="password" value={password} onChange={handleInputChange} />
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
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}
    </div>
  );
};

export default UserProfile;
