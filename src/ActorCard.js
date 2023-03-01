import React from 'react';

const ActorCard = (props) => {

    return (
        <ul>
            <li>Name: {props.FirstName}</li>
            <li>Surname: {props.LastName}</li>
        </ul>
    )
}

export default ActorCard;