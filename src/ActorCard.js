import React, {useState} from 'react';
import API_ROOT from './api_root';

const ActorCard = (props) => {
    const [mode, setMode] = useState('')

    const updateActor = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        var formObj = {};
        formData.forEach((value, key) => formObj[key] = value);
        formObj['ActorId'] = Number(event.target.id)
        var json = JSON.stringify(formObj);

  
        await fetch(`${API_ROOT}/actors/${event.target.id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json' 
          },
          body: json
        });

        setMode('')
        props.refresh()
      };

      const deleteActor = async event => {
        event.preventDefault();
        console.log(`DELETE /actors/${event.target.id}`)
  
        await fetch(`${API_ROOT}/actors/${event.target.id}`, {
          method: 'DELETE'
        });

        setMode('')
        props.refreshAll()
      };

    return (
        <div className="ActorCard">
            {
                mode === 'edit' 
                ? <form onSubmit={updateActor} id={props.id}>
                    <label> Name: </label>
                    <input type="text" name="FirstName" defaultValue={String(props.FirstName)}/>
                    <br />
                    <label> Surname: </label>
                    <input type="text" name="LastName" defaultValue={String(props.LastName)}/>
                    <br />
                    <button type="submit"> Update </button>
                    <button onClick={() => setMode('')}> Cancel </button>
                </form>
                : <div>
                    <div>Name: {props.FirstName}</div>
                    <div>Surname: {props.LastName}</div>
                    <button onClick={() => setMode('edit')}>Edit</button>
                    {props.showDelete && <button id={props.id} onClick={deleteActor} className="delete_button danger">Delete</button>}
                </div>
            }
            
        </div>
    )
}

export default ActorCard;