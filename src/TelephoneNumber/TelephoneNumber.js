import React from 'react';

const TelephoneNumber = ({ index, telephoneNumber }) => {
  return (
    <div>
        <td>{index}</td>
      <td>Номер телефона: {telephoneNumber.phone}</td>
      <td>Имя подписчика: {telephoneNumber.subscriber.name}</td>
      <td>Адрес подписчика: {telephoneNumber.subscriber.address}</td>
      <td>Номер телефонной станции: {telephoneNumber.exchange.number}</td>
    </div>
  );
};

export default TelephoneNumber;
