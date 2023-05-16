import React from 'react';
import { Link } from 'react-router-dom';

const TelephoneNumber = ({ index, telephoneNumber }) => {
  let id = telephoneNumber.id;
  return (
    <>
        <td>{index}</td>
      <td> {telephoneNumber.phone}</td>
      <td> {telephoneNumber.subscriber.name}</td>
      <td> {telephoneNumber.subscriber.address}</td>
      <td> {telephoneNumber.exchange.number}</td>
      <td><Link to={{
        pathname:`/telephone-numbers/editing/${id}`, 
        // telephoneNumber:telephoneNumber
        }}>Редактировать</Link></td>
    </>
  );
};

export default TelephoneNumber;
