import React from 'react';
import { Link } from 'react-router-dom';

const Subscriber  = ({index, subscriber})  =>{

    return(
        <>
        <td>{index}</td>
        <td>{subscriber.type}</td>
        <td>{subscriber.name}</td>
        <td>{subscriber.address ? subscriber.address : ''}</td>
        <td>{subscriber.login}</td>
        <td>{subscriber.roles.map(it=>it).join(', ')}</td>
        <td>{subscriber.phoneNumbers.map(it=>it.phone).join(', ')}</td>
        <td>{subscriber.installationDate}</td>
        <td><Link
                to={`/subscribers/editing/${subscriber.id}`} 
                state={{userId:subscriber.id}}
            >
            Редактировать
            </Link>
        </td>

        </>
    )
}

export default Subscriber