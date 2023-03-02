import React from 'react';
import ActorCard from './ActorCard';

const ActorTable = (props) => {
  return (
    <div actors={props.actors}>
      <table>
        <thead>
          <tr>
            <th>ActorId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>LastUpdate</th>
            <th>ActorCard</th>
          </tr>
        </thead>
        <tbody>
          {props.actors.map(actor => (
            <tr key={actor.ActorId}>
              <td>{actor.ActorId}</td>
              <td>{actor.FirstName}</td>
              <td>{actor.LastName}</td>
              <td>{actor.LastUpdate}</td>
              <ActorCard id={actor.ActorId} FirstName={actor.FirstName} LastName={actor.LastName} refresh={props.refresh}></ActorCard>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActorTable;