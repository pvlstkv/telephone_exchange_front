import React from 'react';
import { Link } from 'react-router-dom';

const TelephoneExchange = ({ index, exchange }) => {
  return (
    <>
        <td>{index}</td>
      <td> {exchange.number}</td>
      <td> {exchange.district && exchange.district.name}</td>
      <td> {exchange.subscribers && exchange.subscribers.map(item=>item.name)}</td>
      <td> {exchange.firstTwoDigits}</td>
      
    </>
  );
};

export default TelephoneExchange;
